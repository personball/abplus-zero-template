function fix(options, apis, models) {
  options.SFDtoTpl = 'Create';
  options.STDtoTpl = 'Create';
  options.testFix = 'done';
  options.log('fix from abp-create');

  if (options.extraArgs && options.extraArgs.SFDto) {
    options.log(models[options.extraArgs.SFDto]);
  }


 // //SFSchema generate
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

}

module.exports = {
  fix
};
