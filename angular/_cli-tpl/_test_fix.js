function fix(options, apis, models) {
  options.SFDtoTpl = 'TEST';
  options.STDtoTpl = 'TEST';
  options.testFix = 'done';
  options.log('fix from test');

  if (options.extraArgs && options.extraArgs.SFDto) {
    options.log(models[options.extraArgs.SFDto]);
  }
}

module.exports = {
  fix
};
