function fix(options) {
  options.log = function (msg) {
    var that = options;
    if (that.extraArgs && that.extraArgs.debug) {
      console.log(msg);
    }
  };

  options.log(options);

  const fs = require('fs');
  const path = require('path');
  const tplFixPath = path.join(options._tplDir, `_${options.tplName}_fix.js`);

  options.log(tplFixPath);

  if (fs.existsSync(tplFixPath)) {
    const tplFix = require(tplFixPath);
    if (tplFix.fix) {
      const apiSwagger = fs.readFileSync('./nswag/swagger.json', 'utf8');
      const apiSwaggerJson = JSON.parse(apiSwagger);
      options.log('load swagger.json:' + apiSwaggerJson.info.title);
      tplFix.fix(options, apiSwaggerJson.paths, apiSwaggerJson.definitions);
    }
  } else {
    options.log('tplFixPath not exists.');
  }




  // options["abpDtos"] = apiSwaggerJson.definitions;
  // options["abpApis"] = apiSwaggerJson.paths;

  // //options.extraArgs.GetAllApi for list template query
  // //options.extraArgs.SFDto for SFSchema
  // //options.extraArgs.STDto for STColumn

  // //SFSchema generate
  // const itIsListTpl = options.tplName === 'abp-list';
  // var sfDtoSchema = {};
  // if (options.extraArgs && options.extraArgs.SFDto) {
  //   if (itIsListTpl) {
  //     //无需required,无需minLength等,排除分页参数
  //     //从paths中取
  //     const api = options.abpApis[options.extraArgs.GetAllApi];
  //     if (sfDto.properties) {

  //     }
  //   } else {
  //     const sfDto = options.abpDtos[options.extraArgs.SFDto];
  //     for (const key in sfDto) {
  //       if (sfDto.hasOwnProperty(key)) {
  //         const element = sfDto[key];
  //         if (key === 'type') {
  //           continue;
  //         }

  //         if (key === 'properties') {
  //           var element2 = {};
  //           for (const k in element) {
  //             if (element.hasOwnProperty(k)) {
  //               const e = element[k];
  //               if (e.type === 'array' || ) {
  //                 continue;
  //               }
  //               element2[k] = e;
  //             }
  //           }
  //           sfDtoSchema[key] = element2;
  //           continue;
  //         }
  //         sfDtoSchema[key] = element;
  //       }
  //     }
  //   }

  //   options.SFDtoTpl = JSON.stringify(sfDtoSchema, null, 4).replace(/"/g, '\'');
  // }
  options.SFDtoTpl = 'TMP';
  // //STColumn generate
  // var stDtoColumns = [];
  // if (options.extraArgs && options.extraArgs.STDto) {
  //   const stDto = options.abpDtos[options.extraArgs.STDto];

  //   for (const key in stDto.properties) {
  //     if (stDto.properties.hasOwnProperty(key)) {
  //       const prop = stDto.properties[key];
  //       var element = {
  //         'title': key,
  //         'index': key
  //       };
  //       if (prop.description) {
  //         element.title = prop.description;
  //       }

  //       if (prop.type === 'boolean') {
  //         element.type = 'badge';
  //         element.badge = {
  //           true: {
  //             text: 'True',
  //             color: 'success'
  //           },
  //           false: {
  //             text: 'False',
  //             color: 'default'
  //           }
  //         };
  //       }

  //       stDtoColumns.push(element);
  //     }
  //   }

  //   options.STDtoTpl = JSON.stringify(stDtoColumns, null, 4).replace(/"/g, '\'');

  // }
  options.STDtoTpl = 'TMP';
  // console.log(options["abpDtos"][options.extraArgs.SFDto]);



  return new Promise((resolve) => {
    resolve();
  });
}

module.exports = {
  fix
};
