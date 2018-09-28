// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    //主要用来处理元素容器宽高比
    "postcss-aspect-ratio-mini": {}, 
    "postcss-write-svg": { utf8: false }, 
    "postcss-cssnext": {}, 
    //插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位著作权归作者所有。
    //写代码的过程中，就不需要写vw，直接写px就可以了
    "postcss-px-to-viewport": { 
      viewportWidth: 414, // (Number) The width of the viewport. 
      viewportHeight: 672, // (Number) The height of the viewport. 
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
      mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
    },
    "postcss-viewport-units":{}, 
    //cssnano 主要用来压缩和清理CSS代码
    "cssnano": { 
      preset: "advanced", 
      autoprefixer: false, 
      "postcss-zindex": false //只要启用了这个插件，z-index的值就会重置为1，所以设置为false
    }
  }
}
