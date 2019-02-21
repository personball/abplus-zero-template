export class AppConsts {

    static remoteServiceBaseUrl: string;
    static appBaseUrl: string;
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'AbpProjectName'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };

    static readonly passwordComplexity = {
        requireDigit: 'Abp.Zero.UserManagement.PasswordComplexity.RequireDigit',
        requireLowercase: 'Abp.Zero.UserManagement.PasswordComplexity.RequireLowercase',
        requireNonAlphanumeric: 'Abp.Zero.UserManagement.PasswordComplexity.RequireNonAlphanumeric',
        requireUppercase: 'Abp.Zero.UserManagement.PasswordComplexity.RequireUppercase',
        requiredLength: 'Abp.Zero.UserManagement.PasswordComplexity.RequiredLength',
    }
}
