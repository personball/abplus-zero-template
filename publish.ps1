$env=$args[0]
Remove-Item -Recurse  .\dist\
dotnet publish .\aspnet-core\src\AbpCompanyName.AbpProjectName.Web.Host\ -c Release -o dist
cd .\angular\

if ($env -match "production") {
    echo "production"
    ng build --prod    
}else {
    echo "staging"
    ng build -c staging
}


Move-Item -Force .\dist\AbpProjectName\*  ..\dist\wwwroot\
cd ..

