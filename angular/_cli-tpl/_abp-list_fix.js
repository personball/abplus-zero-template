const { exception } = require("console");

function fix(options, apis, models) {
  console.log('abp-list_fix start...')
  const apiPrefix = '/api/services/app/';
  var apiPath = apiPrefix;
  //options.extraArgs.QueryApi for list template query, like Role/GetAll
  if (options.extraArgs.QueryApi) {
    apiPath = `${apiPrefix}${options.extraArgs.QueryApi}`;
    options.log(apiPath);
  } else {
    console.log(`Please set --QueryApi option, like 'ng g ng-alain:tpl abp-list roles -m=sys --QueryApi=Role/GetAll'.`);
    return;
  }

  const api = apis[apiPath];
  options.log(api);

  var sfDtoSchema = {
    properties: {}
  };
  var stDtoColumns = [];
  //TODO 目前只处理get
  var getInputList = [];
  if (api.get) {
    if (api.get.parameters) {
      for (let i = 0; i < api.get.parameters.length; i++) {
        const p = api.get.parameters[i];
        getInputList.push({
          name: p.name,
          type: p.schema.type,
          format: p.schema.format
        });
        if (p.name === 'SkipCount' || p.name === 'MaxResultCount' || p.name === 'To') {
          continue;
        }
        var title = p.description || p.name;
        var type = p.schema.type || 'enumOrObj';
        switch (type) {
          case 'string':
            sfDtoSchema.properties[p.name] = {
              type: p.schema.type,
              title: title
            };
            if (p.schema.format && p.schema.format === 'date-time') {
              sfDtoSchema.properties[p.name].format = p.schema.format;
              if (p.name === 'From') {
                sfDtoSchema.properties[p.name].ui = {
                  widget: 'date',
                  end: 'to'
                };
                sfDtoSchema.properties['to'] = {
                  format: 'date-time',
                  type: 'string'
                };
              }
            }
            break;
          case 'boolean':
            sfDtoSchema.properties[p.name] = {
              type: 'boolean',
              title: title
            };
            break;
          case 'integer':
            sfDtoSchema.properties[p.name] = {
              type: 'number',
              title: title
            };
            break;
          default:
            sfDtoSchema.properties[p.name] = {
              type: type,
              title: title
            }
            break;
        }
      }
    }

    if (api.get.responses && api.get.responses['200']) {
      const refVal = api.get.responses['200'].content["application/json"].schema['$ref'];
      resModel = getRefModel(refVal, models);

      if (resModel.properties.hasOwnProperty('items')) {
        resModel = getRefModel(resModel.properties.items.items.$ref, models);
      }

      console.log(resModel);

      // STColumn generate
      for (const key in resModel.properties) {
        if (resModel.properties.hasOwnProperty(key)) {
          const prop = resModel.properties[key];
          var title = prop.description || key;
          var element = {
            title: title,
            index: key
          };

          var type = prop.type || 'enumOrObj';
          switch (type) {
            case 'boolean':
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
              break;
            case 'string':
              if (prop.format === 'date-time') {
                element.type = 'date';
              }
              break;
            default:
              break;
          }

          stDtoColumns.push(element);
        }
      }
    }
  }
  options.requestMethodName = 'GetAll';
  options.requestList = getInputList;
  options.SFDtoSchema = sfDtoSchema;//Parameters Name in GetAll method not camelize, a bug for swagger?
  options.STDtoTpl = JSON.stringify(stDtoColumns, null, 4).replace(/"/g, '\'');
}

function getRefModel(refVal, models) {
  var mName = refVal.substring(refVal.lastIndexOf('/') + 1, refVal.length);
  if (mName.lastIndexOf('[') > -1) {
    mName = mName.substring(mName.lastIndexOf('[') + 1, mName.lastIndexOf(']'));
  }
  return models[mName];
}

module.exports = {
  fix
};