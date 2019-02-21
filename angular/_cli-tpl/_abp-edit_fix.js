function fix(options, apis, models) {
  const apiPrefix = '/api/services/app/';
  var apiPath = apiPrefix;
  //options.extraArgs.UpdateApi for edit template, like User/Update
  if (options.extraArgs.UpdateApi) {
    apiPath = `${apiPrefix}${options.extraArgs.UpdateApi}`;
    options.log(apiPath);
  } else {
    console.log(`Please set --UpdateApi option, like 'ng g ng-alain:tpl abp-edit edit -m=sys -t=users --UpdateApi=User/Update'.`);
    return;
  }

  const api = apis[apiPath];
  options.log(api);

  var sfDtoSchema = {
    properties: {}
  };

  if (api.put && api.put.parameters && api.put.parameters.length > 0) {
    
    const refVal = api.put.parameters[0].schema['$ref'];
    var mName = refVal.substring(refVal.lastIndexOf('/') + 1, refVal.length);
    var putModel = models[mName];
    sfDtoSchema.required = putModel.required;

    for (const key in putModel.properties) {
      if (putModel.properties.hasOwnProperty(key)) {
        const prop = putModel.properties[key];
        var title = prop.description || key;
        var element = {};
        element.title = title;
        switch (prop.type) {
          case 'string':
            element.type = prop.type;
            element.minLength = prop.minLength;
            element.maxLength = prop.maxLength;
            break;
          case 'array':
            element.type = 'string';
            element.ui = {
              widget: 'checkbox',
              grid: {
                offset: 6,
                span: 12
              },
              checkAll: true,
              asyncData: '//() => this.userService.getRoles().pipe(map(r => r.items.map(i => ({label: i.displayName,value: i.name}))))',
              default: []
            };
            break;
          default:
            element.type = prop.type;
            break;
        }
        sfDtoSchema.properties[key] = element;
      }
    }
  }
  options.SFDtoTpl = JSON.stringify(sfDtoSchema, null, 4).replace(/"/g, '\'');
}

module.exports = {
  fix
};
