const isBrowser = typeof window !== "undefined";
const rootElem = isBrowser ? document : null;

const isBodySelectorMatched = selector => {
  if (selector.includes("."))
    return rootElem.body.className.includes(selector.replace(".", ""));
  else if (selector.includes("#"))
    return rootElem.body.id.includes(selector.replace("#", ""));
  return false;
};

export const CssVarsPonyfillReact = () => {
  const minified = [...rootElem.querySelectorAll("style")]
    .map(style => style.innerHTML)
    .join(";")
    .replace(/[\n][\s]+/g, "");
  const cssBlocks = minified.match(/([^{]+{)([^{^}]*)(})/gi);
  const allMatches = cssBlocks
    .map(cssBlock => {
      const pattern = /([^{]+)({)((([-a-zA-Z0-9_]+)(:)([^;]+)(;?))*)(})/gm;
      const [, selector, , insideString] = pattern.exec(cssBlock);
      const cssPropsValsMatches = insideString.match(/(--[^:]+)(:)([^;]+)/g);
      if (cssPropsValsMatches) {
        const cssPropsVals = cssPropsValsMatches.map(cssPropVal => {
          const [varName, varVal] = cssPropVal.split(":");
          return { select: `var(${varName})`, replace: varVal };
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
    const [bodyCssVar] = bodyCssVars.filter(
      bCssVar => bCssVar.select === cssVar.select
    );
    if (bodyCssVar) return bodyCssVar;
    return cssVar;
  });

  let finalCss = minified;
  for (var i = 0; i < finalCssVars; i++) {
    finalCss.replace(finalCssVars[i].select, finalCssVars[i].replace);
  }

  let newCss = rootElem.createElement("style");
  newCss.innerHTML = finalCss;
  rootElem.head.appendChild(newCss);
};
