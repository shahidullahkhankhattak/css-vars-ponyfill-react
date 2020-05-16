# Css Vars Ponyfill React

[![N|Solid](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAAgCAYAAACRiqPIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAUkSURBVHhe7Zx/TFtVFMcPPxy0IKxlFFZgzNKoYWXZnDRmI1mc0bE/jFvCyIa6Pw1myRy67h//MrrEjBgIiVH/2R+YOENMWOIfThNnXJhRmGJYMzEDHPJjK0jLNqBFWfCew7vlPdoHr0Xs++N8kpuee+49977H+75zLpA0rXf6t8WPhr6A0D/3gWH+b2yP5MHrrjpIe+2XdxdZhEwqQTGmswiZVIMaTFdshkkpLETGFLAQGVPAQmRMAQuRMQUsRMYUsBDXxW7wec9DR1UtlCseJjlYiIwpYCEypoCFyJgCQ0Lcm++BV0tqqR0p2q94l5HjK8fQJ8GxzZm5ZOP88uwisvFTro0NxyRqv5yPGIlR7xcPHNeLl+A+LxR4lV6CWGuhFc+PorWWbgWwn4AO925lUIc4c2rcYg2Nbys0VJ0Hn13pIhgXPacuj5eXnqG95WcMq12Tas3oNRi5hyQxJMSK3FL6HJwZhdxMC7zpaqA+0rjtCDzr8MYde8q2Q7EADhbXgDe/kuxnCnZCXmYO2SVZhVCYZad4bGPzk+RHMB59gUgQTrtfiYrRSAzy/o43dMX4tM0TjT9adhCqcl3KyJJIkUOOvTCzMEd2opTbPeAMXoT67rNwevSO4k2croGzUD/Qq/RSgBDfKbsf2jb4GgyXZnxgP9zzw6djl6Fgk418+JB32Srh3K0LmjH5UH+/P0TZBvu/hm6CJ99NfpxzY2aIbGRyPkjx2IYjAcULMLcQId83U920FgpQslZMZ+B7+PpuF7xYVKOMxCLjce1HM6zk+zLQRSLFeyvIstF4MgzPTYiHeFybQSzPKVnyDDSI7TBTYcbEFs1wceZQNotm2CY4bFHmJoiR/TRYDkCz2wGX/O3QpbjWvAch3NYq6Yuzpg6GhYhZEUWFGXBkbpx8lTnbYWp+mmxJ/4NBcOeUkR0QYsG4XfmPQ9+9W1EBr2Tflj1w7smT1NQUZG2mUol7PpHn0ohCL0ZNIDIF26xOpReLjC8Tc+Ta0wszdA8nH6uH7ya6yZcUwXaRDS9Cj0aMfmgRGbIt6ACvXVsqS6yyH39OjfMAwHiLWLMFLoUV5zpYaz8i7Iee8Er/2vfgFHN8emvqYFiIWApRVCiuj//sJN+Dh7FlKyfDQgJABmZHKA7FgA966u8QlT180Gqu/fUzvN3/ITU14YcRysSYdd/p/0TxLqEXoyY30ypelJDSi0XGXw/5NUcKzIpb1pENl+mF5gGxhqVo6fwWDsAw+ZFi2GdzQI8ovb5xkT0lmjkJYHHA0utfDCWWCRiLUEdFMvtNQMfgFaGsl5cz2wbdg2Eh/jjVR6UXS54EyytmLVmKZam+OXub+jhuycgmG/ljdgwq8yrozGcEWWaxxB5zPq94jbO/sJoy8VrgC6O+TsyKuPd6oAM+lie3B3rEzy32wdyFa6EJqBbzmp0OxadP1zgKokms2QReIRANIvu2BT1wisrhcagOfgufxeSIxPaLMncZWkQBPFwR74/2Sa4Zh7SjP/kWFVsXLI/yjLgSFOGx0kNkWzOz4cLtTs35D0sfZkAUMf6y0bzzLfD1fRA912G5P7H9pWiJx+wkxY6xMuOh/fnoV7T2ajHte96Dkdk7dC1XJ69rXhw1uJ5E77pXy7ZL4H9WxIMPXwHfjXhiY4xiSIiMHizE/wrDpZlhNhIWImMKuDQzpoAzImMKWIiMKWAhMqaAhciYAhYiYwpYiIwpSMcvwGGYVEJfwtToqiODYVKBfVM+NLrq4F+deWPzTHLIrwAAAABJRU5ErkJggg==)](https://shahidullahkhan.com)

[![Build Status](http://shahidullahkhan.com/images/passing.svg)](https://travis-ci.org/joemccann/dillinger)

##### npm module to remove problems of css vars in un supported browsers e.g Internet explorer 9+

## Installation
run following command:

```>  npm install css-vars-ponyfill-react --save```

## Usage
in your main index.js or app.js file use


```
import { CssVarsPonyfill } from 'css-vars-ponyfill-react'
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

in case anything goes wrong, you can get the error message with the following callback function.

```
CssVarsPonyfill({
    externalStyleSheets: true,
    onError: (error) => {
        // your logic here
    }
})
```
