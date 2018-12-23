# abplus-zero-template
A Startup Project Template

# 使用方式

  abplus init Abplus.ZeroDemo -T personball/abplus-zero-template -t vue
  
  [abplus命令说明](https://github.com/personball/Abp-CLI)

# 说明

基于4.3.0版[aspnetboilerplate/module-zero-core-template](https://github.com/aspnetboilerplate/module-zero-core-template)的Vue项目模板修改而来，主要有以下变更：

1. 升级asp.net core 到2.2版
1. 升级ef core 到2.2版
1. 集成NLog替换log4net
1. 实现业务异常和错误码以及错误提示本地化机制，[详情参考](https://personball.com/abp/2017/08/28/abp-error-code-design)
1. 配置swagger ui使用程序集xml以便在线api文档显示注释
1. swagger endpoint改为相对路径
1. 添加一个MemberUser对象继承于User，并为之配置TPH关系
1. 升级ef core 2.2后，在EntityFrameworkCore程序集下新增`AbpProjectNameEntityTypeConfiguration<T>`基类，并启用自动发现并应用继承该基类的实体配置类
1. 默认连接字符串改为使用本地localdb


[vue项目启动说明](https://github.com/personball/abplus-zero-template/tree/master/vue)

# MIT
