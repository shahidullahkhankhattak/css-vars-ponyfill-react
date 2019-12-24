# Css Vars Ponyfill React

[![N|Solid](https://shahidullahkhan.com/images/powered.png)](https://shahidullahkhan.com)

[![Build Status](https://shahidullahkhan.com/images/passing.svg)](https://travis-ci.org/joemccann/dillinger)

##### npm module to remove problems of css vars in un supported browsers e.g Internet explorer 9+

## Installation
run following command:

```>  npm install css-vars-ponyfill-react --save```

## Usage
in your main index.js or app.js file use


```
import {CssVarsPonyfill} from 'css-vars-ponyfill-react'
```

and call the function anywhere in your index.js or app.js code

```
CssVarsPonyfill()
```

and if you add external stylesheets as well (mostly required in prod builds) just use it as:

```
CssVarsPonyfill({
    externalStyleSheets: true
})
```