rem update nswag/swagger.json before call this batch
rem call nswag/refresh.bat before call this batch
rem %1 list-name %2 EntityName %3 module-name

call ng g ng-alain:tpl abp-list %1 -m=%3 --EntityName=%2 --QueryApi=%2/GetAll --modal=false

call ng g ng-alain:tpl abp-create create -m=%3 -t=%1 --EntityName=%2 --CreateApi=%2/Create --modal

call ng g ng-alain:tpl abp-edit edit -m=%3 -t=%1 --EntityName=%2 --UpdateApi=%2/Update --modal