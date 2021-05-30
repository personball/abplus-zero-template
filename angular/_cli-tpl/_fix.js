function fix(options) {
  options.log = function (msg) {
    var that = options;
    if (that.extraArgs && that.extraArgs.debug) {
      console.log(msg);
    }
  };

  options.log(options);

  //添加EntityName，区别于组件名
  options.EntityName = options.extraArgs.EntityName || options.name;

  const fs = require('fs');
  const path = require('path');
  const tplFixPath = path.join(options._tplDir, `_${options.tplName}_fix.js`);

  options.log(tplFixPath);

  if (fs.existsSync(tplFixPath)) {
    console.log('load tplFix scripts...')
    const tplFix = require(tplFixPath);
    if (tplFix.fix) {
      const apiSwagger = fs.readFileSync('./nswag/swagger.json', 'utf8');
      const apiSwaggerJson = JSON.parse(apiSwagger);
      options.log('load swagger.json:' + apiSwaggerJson.info.title);
      // console.log(apiSwaggerJson.components.schemas);
      console.log('tplFix executing...')
      tplFix.fix(options, apiSwaggerJson.paths, apiSwaggerJson.components.schemas);
      console.log('tplFix end...')
    }
  } else {
    options.log('tplFixPath not exists.');
  }

  return new Promise((resolve) => {
    resolve();
  });
}

module.exports = {
  fix
};
