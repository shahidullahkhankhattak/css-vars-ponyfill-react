const isBrowser = typeof window !== "undefined";
const rootElem = isBrowser ? document : null;

const isBodySelectorMatched = selector => {
  if (selector.includes("."))
    return rootElem.body.className.includes(selector.replace(".", ""));
  else if (selector.includes("#"))
    return rootElem.body.id.includes(selector.replace("#", ""));
  return false;
};

export const CssVarsPonyfill = () => {
  const minified = [...rootElem.querySelectorAll("style")]
    .map(style => style.innerHTML)
    .join("")
    .replace(/[\n][\s]+/g, "");
  const cssBlocks = minified.match(/([^{]+{)([^{^}]*)(})/gi);
  const allMatches = cssBlocks
    .map(cssBlock => {
      const pattern = /([^{]+)({)((([-a-zA-Z0-9_]+)(:)([^;]+)(;?))*)(\s*})/gm;
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
      finalCssVars[i].replace.indexOf("#") === 0
        ? finalCssVars[i].replace.substr(0, 7)
        : finalCssVars[i].replace;
    finalCss = finalCss.replace(new RegExp(cssVarSelect, "g"), cssVarReplace);
  }

  let newCss = rootElem.createElement("style");
  newCss.innerHTML = finalCss;
  rootElem.head.appendChild(newCss);
};