const isBrowser = typeof window !== "undefined";
const rootElem = isBrowser ? document : null;
const isNativeSupport =
    isBrowser &&
    window.CSS &&
    window.CSS.supports &&
    window.CSS.supports("(--a: 0)");

const isBodySelectorMatched = selector => {
    if (selector.includes("."))
        return rootElem.body.className.includes(selector.replace(".", ""));
    else if (selector.includes("#"))
        return rootElem.body.id.includes(selector.replace("#", ""));
    return false;
};

export const CssVarsPonyfillReact = params => {
    try {
        function processPonyfill() {
            if (isNativeSupport) return;
            const minified = [...rootElem.querySelectorAll("style")]
                .map(style => style.innerHTML)
                .join("")
                .replace(/[\n][\s]+/g, "");
            const cssBlocks = minified.match(/([^{]+{)([^{^}]*)(})/gi);
            const allMatches = cssBlocks
                .map(cssBlock => {
                    const pattern = /([^{]+)({)(((\s*)([-a-zA-Z0-9_]+)(:)([^;]+)(;?))*)(\s*})/gm;
                    const destructArray = pattern.exec(cssBlock);
                    if (!destructArray) return;
                    const [, selector, , insideString] = destructArray;
                    const cssPropsValsMatches = insideString.match(/(--[^:]+)(:)([^;]+)/g);
                    if (cssPropsValsMatches) {
                        const cssPropsVals = cssPropsValsMatches.map(cssPropVal => {
                            const [varName, varVal] = cssPropVal.split(":");
                            return { select: `var(${varName})`, replace: varVal.trim() };
                        });
                        return {
                            selector: selector.replace(/ /g, ""),
                            variables: cssPropsVals
                        };
                    }
                })
                .filter(cssBlock => cssBlock !== undefined);

            const [rootCssVars] = allMatches
                .filter(match => match.selector === ":root")
                .map(rootVars => {
                    return rootVars.variables;
                });
            const [bodyCssVars] = allMatches
                .filter(match => {
                    return isBodySelectorMatched(match.selector);
                })
                .map(match => match.variables);
            const finalCssVars = rootCssVars.map(cssVar => {
                if (bodyCssVars && bodyCssVars.length) {
                    const [bodyCssVar] = bodyCssVars.filter(
                        bCssVar => bCssVar.select === cssVar.select
                    );
                    if (bodyCssVar) return bodyCssVar;
                }
                return cssVar;
            });

            let finalCss = minified.replace(/\n/g, "");
            for (var i = 0; i < finalCssVars.length; i++) {
                let cssVarSelect = finalCssVars[i].select.replace(
                    /[-\/\\^$*+?.()|[\]{}]/g,
                    "\\$&"
                );
                let cssVarReplace =
                    finalCssVars[i].replace.indexOf("#") === 0 ?
                    finalCssVars[i].replace.substr(0, 7) :
                    finalCssVars[i].replace;
                finalCss = finalCss.replace(new RegExp(cssVarSelect, "g"), cssVarReplace);
            }

            let newCss = rootElem.createElement("style");
            newCss.innerHTML = finalCss;
            rootElem.head.appendChild(newCss);
        }

        function recurseStyles(object, current, length) {
            if(current < length) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', object[current]);
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) { 
                        xhr.onreadystatechange = null;
                        var style = document.createElement('style');
                        style.type = 'text/css';
                        style.innerHTML = this.responseText;
                        document.getElementsByTagName('head')[0].appendChild(style);
                        recurseStyles(object, current + 1, length);
                    }
                };
                xhr.send();
            } else {
                processPonyfill();
            }
        }
        const includeExternal = params && params.externalStyleSheets;
        const stylesheetLinks = Array.from(document.head.querySelectorAll("[rel='stylesheet']")).map(function(obj) { return obj.href });
        const sheetsLength = stylesheetLinks.length;
        if(sheetsLength > 0 && includeExternal) 
            recurseStyles(stylesheetLinks, 0, sheetsLength);
        else 
            processPonyfill();
    } catch (ex) {
        if (params && params.onError) {
            params.onError(ex);
        }
    }
};