$paths=@( 
".\vue\dist\",
".\vue\node_modules\",
".\angular\node_modules\",
".\angular-ngalain\node_modules\"
)

function Clean{

    param($Path)

    if(Test-Path $Path){
        Write-Host "Removing ${Path}..."
        Remove-Item -Recurse $Path
    }
    
}

foreach($path in $paths){Clean($path)}

dotnet clean -v n .\aspnet-core\AbpCompanyName.AbpProjectName.sln
