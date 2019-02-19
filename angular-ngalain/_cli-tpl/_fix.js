import * as fs from 'fs';
import * as path from 'path';

function fix(options) {

    var apiSwagger=fs.readFileSync('../nswag/swagger.json');
    var apiSchema=JSON.parse(apiSwagger);

    for (const path in apiSchema.paths) {
        if (apiSchema.paths.hasOwnProperty(path)) {
           console.log(path);
        }
    }

    for (const d in apiSchema.definitions) {
        if (apiSchema.definitions.hasOwnProperty(d)) {
           console.log(d); 
        }
    }

    return new Promise((resolve) => {
      resolve();
    });
  }
  
  module.exports = {
    fix
  };