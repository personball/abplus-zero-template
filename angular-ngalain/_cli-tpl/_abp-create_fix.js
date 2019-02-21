function fix(options, apis, models) {
  const apiPrefix = '/api/services/app/';
  var apiPath = apiPrefix;
  //options.extraArgs.CreateApi for create template, like User/Create
  if (options.extraArgs.CreateApi) {
    apiPath = `${apiPrefix}${options.extraArgs.CreateApi}`;
    options.log(apiPath);
  } else {
    console.log(`Please set --CreateApi option, like 'ng g ng-alain:tpl abp-create create -m=sys -t=users --CreateApi=User/Create'.`);
    return;
  }

  const api = apis[apiPath];
  options.log(api);

  var sfDtoSchema = {
    properties: {}
  };

  if (api.post && api.post.parameters && api.post.parameters.length > 0) {
    const refVal = api.post.parameters[0].schema['$ref'];
    var mName = refVal.substring(refVal.lastIndexOf('/') + 1, refVal.length);
    var postModel = models[mName];
    sfDtoSchema.required = postModel.required;

    for (const key in postModel.properties) {
      if (postModel.properties.hasOwnProperty(key)) {
        const prop = postModel.properties[key];
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
