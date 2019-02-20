function fix(options, apis, models) {
  options.SFDtoTpl = 'Edit';
  options.STDtoTpl = 'Edit';
  options.testFix = 'done';
  options.log('fix from abp-edit');

  if (options.extraArgs && options.extraArgs.SFDto) {
    options.log(models[options.extraArgs.SFDto]);
  }
}

module.exports = {
  fix
};
