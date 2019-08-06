using System;
using System.Text;
using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.SignalR;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Authentication.External;
using AbpCompanyName.AbpProjectName.Authentication.External.WechatH5;
using AbpCompanyName.AbpProjectName.Authentication.External.WechatMini;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.SmsSenders;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AbpCompanyName.AbpProjectName
{
    [DependsOn(
         typeof(AbpProjectNameApplicationModule),
         typeof(AbpProjectNameEntityFrameworkModule),
         typeof(AbpAspNetCoreModule)
        ,typeof(AbpAspNetCoreSignalRModule)
     )]
    public class AbpProjectNameWebCoreModule : AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpProjectNameWebCoreModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                AbpProjectNameConsts.ConnectionStringName
            );

            // Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(AbpProjectNameApplicationModule).GetAssembly()
                 );
            ConfigureSmsSender();
            ConfigureTokenAuth();
        }
        private void ConfigureSmsSender()
        {
            //AliYun Sms
            if (_appConfiguration["AliYun:IsEnabled"].ToLower() == bool.TrueString.ToLower())
            {
                IocManager.Register<AliYunSmsSenderConfig>();
                var config = IocManager.Resolve<AliYunSmsSenderConfig>();
                config.AccessKeyId = _appConfiguration["AliYun:AccessKeyId"];
                config.AccessKeySecret = _appConfiguration["AliYun:AccessKeySecret"];
                config.SmsEndpoint = _appConfiguration["AliYun:SMSEndpoint"];
                config.SignName = _appConfiguration["AliYun:SMSSignName"];

                IocManager.Register<ISmsSender, AliYunSmsSender>();
            }
        }
        private void ConfigureTokenAuth()
        {
            IocManager.Register<TokenAuthConfiguration>();
            var tokenAuthConfig = IocManager.Resolve<TokenAuthConfiguration>();

            tokenAuthConfig.SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appConfiguration["Authentication:JwtBearer:SecurityKey"]));
            tokenAuthConfig.Issuer = _appConfiguration["Authentication:JwtBearer:Issuer"];
            tokenAuthConfig.Audience = _appConfiguration["Authentication:JwtBearer:Audience"];
            tokenAuthConfig.SigningCredentials = new SigningCredentials(tokenAuthConfig.SecurityKey, SecurityAlgorithms.HmacSha256);
            tokenAuthConfig.Expiration = TimeSpan.FromDays(1);


            IocManager.Register<IExternalAuthConfiguration, ExternalAuthConfiguration>();
            var externalAuthConfig = IocManager.Resolve<IExternalAuthConfiguration>();
            //wechat mini
            if (_appConfiguration["Authentication:WechatMini:IsEnabled"].ToLower() == bool.TrueString.ToLower())
            {
                externalAuthConfig.Providers.Add(new ExternalLoginProviderInfo(
                    "WechatMini",
                    _appConfiguration["Authentication:WechatMini:AppId"],
                    _appConfiguration["Authentication:WechatMini:AppSecret"],
                    typeof(WechatMiniAuthProviderApi)));
            }

            //wechat H5
            if (_appConfiguration["Authentication:WechatH5:IsEnabled"].ToLower() == bool.TrueString.ToLower())
            {
                externalAuthConfig.Providers.Add(new ExternalLoginProviderInfo(
                    "WechatH5",
                    _appConfiguration["Authentication:WechatH5:AppId"],
                    _appConfiguration["Authentication:WechatH5:AppSecret"],
                    typeof(WechatH5AuthProviderApi)));
            }

        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameWebCoreModule).GetAssembly());
        }
    }
}

