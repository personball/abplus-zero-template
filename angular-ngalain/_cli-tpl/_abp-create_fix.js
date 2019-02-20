function fix(options, apis, models) {
  options.SFDtoTpl = 'Create';
  options.STDtoTpl = 'Create';
  options.testFix = 'done';
  options.log('fix from abp-create');

  if (options.extraArgs && options.extraArgs.SFDto) {
    options.log(models[options.extraArgs.SFDto]);
  }
}

module.exports = {
  fix
};
