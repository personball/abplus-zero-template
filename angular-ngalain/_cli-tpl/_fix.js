function fix(options) {
  const fs = require('fs');
  const apiSwagger = fs.readFileSync('./nswag/swagger.json', 'utf8');
  const apiSwaggerJson = JSON.parse(apiSwagger);
  console.log('use swagger.json:'+apiSwaggerJson.info.title);

  for (const path in apiSwaggerJson.paths) {
    if (apiSwaggerJson.paths.hasOwnProperty(path)) {
      console.log(path);
    }
  }

  for (const def in apiSwaggerJson.definitions) {
    if (apiSwaggerJson.definitions.hasOwnProperty(def)) {
      console.log(def);
    }
  }

  options["abp-definitions"] = apiSwaggerJson.definitions;
  options["abp-apis"]=apiSwaggerJson.paths;

  return new Promise((resolve) => {
    options["apiSwagger"] = "testsssss";
    
    resolve();
  });
}

module.exports = {
  fix
};
