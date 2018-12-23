$paths=@( 
".\vue\dist\",
".\vue\node_modules\",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Application\bin",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Application\obj",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Core\bin",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Core\obj",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.EnityFrameworkCore\bin",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.EnityFrameworkCore\obj",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Migrator\bin",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Migrator\obj",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Web.Core\bin",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Web.Core\obj",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Web.Host\bin",
".\aspnet-core\src\AbpCompanyName.AbpProjectName.Web.Host\obj"
)

function Clean{

    param($Path)

    if(Test-Path $Path){
        Write-Host "Removing ${Path}..."
        Remove-Item -Recurse $Path
    }
    
}

foreach($path in $paths){Clean($path)}

