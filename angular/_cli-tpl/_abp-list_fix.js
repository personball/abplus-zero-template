function fix(options, apis, models) {
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
          type: p.type,
          format: p.format 
        });
        if (p.name === 'SkipCount' || p.name === 'MaxResultCount' || p.name === 'To') {
          continue;
        }
        var title = p.description || p.name;
        switch (p.type) {
          case 'string':
            sfDtoSchema.properties[p.name] = {
              type: p.type,
              title: title
            };
            if (p.format && p.format === 'date-time') {
              sfDtoSchema.properties[p.name].format = p.format;
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
              type: 'string',
              title: title,
              enum: [{
                  label: '全部',
                  value: ''
                },
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              default: '',
              ui: {
                widget: 'select'
              }
            };
            break;
          default:
            break;
        }
      }
    }

    if (api.get.responses && api.get.responses['200']) {
      const refVal = api.get.responses['200'].schema['$ref'];
      var mName = refVal.substring(refVal.lastIndexOf('/') + 1, refVal.length);
      var resModel = {};
      if (mName.lastIndexOf('[') > -1) {
        mName = mName.substring(mName.lastIndexOf('[') + 1, mName.lastIndexOf(']'));
      }
      resModel = models[mName];

      // STColumn generate
      for (const key in resModel.properties) {
        if (resModel.properties.hasOwnProperty(key)) {
          const prop = resModel.properties[key];
          var title = prop.description || key;
          var element = {
            title: title,
            index: key
          };

          switch (prop.type) {
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
  options.requestList = getInputList;
  options.SFDtoSchema = sfDtoSchema;//Parameters Name in GetAll method not camelize, a bug for swagger?
  options.STDtoTpl = JSON.stringify(stDtoColumns, null, 4).replace(/"/g, '\'');
}

module.exports = {
  fix
};
