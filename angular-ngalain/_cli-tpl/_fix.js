function fix(options) {
  const fs = require('fs');
  const apiSwagger = fs.readFileSync('./nswag/swagger.json', 'utf8');
  const apiSwaggerJson = JSON.parse(apiSwagger);
  console.log('use swagger.json:' + apiSwaggerJson.info.title);

  options["abpDtos"] = apiSwaggerJson.definitions;
  options["abpApis"] = apiSwaggerJson.paths;

  // console.log(options);
  // console.log(options.abpApis);
  // console.log(options.abpDtos);

  //options.extraArgs.SFDto for SFSchema
  //options.extraArgs.STDto for STColumn
  var sfDtoSchema={};
  if (options.extraArgs && options.extraArgs.SFDto) {
    const sfDto=options.abpDtos[options.extraArgs.SFDto];

    for (const key in sfDto) {
      if (sfDto.hasOwnProperty(key)) {
        const element = sfDto[key];
        if (key==='type') {
          continue;
        }
        
        if (key==='properties') {
          var element2={};
          for (const k in element) {
            if (element.hasOwnProperty(k)) {
              const e = element[k];
              if (e.type==='array') {
                continue;
              }
              element2[k]=e;
            }
          }
          sfDtoSchema[key]=element2;
          continue;  
        }

        sfDtoSchema[key]=element;
      }
    }

    options.SFDtoTpl = JSON.stringify(sfDtoSchema, null, 4);
  }

  var stDtoColumns = [];
  if (options.extraArgs && options.extraArgs.STDto) {
    const stDto = options.abpDtos[options.extraArgs.STDto];

    for (const key in stDto.properties) {
      if (stDto.properties.hasOwnProperty(key)) {
        const prop = stDto.properties[key];
        var element = {
          'title': key,
          'index': key
        };

        if (prop.type === 'boolean') {
          element.type = 'badge';
          element.badge = {
            true: {
              text: 'True',
              color: 'success'
            },
            false: {
              text: 'False',
              color: 'default'
            }
          };
        }

        stDtoColumns.push(element);
      }
    }

    options.STDtoTpl = JSON.stringify(stDtoColumns);
  }

  console.log(options["abpDtos"][options.extraArgs.SFDto]);
  return new Promise((resolve) => {
    resolve();
  });
}

module.exports = {
  fix
};
