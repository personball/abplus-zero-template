using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace AbpCompanyName.AbpProjectName.Localization
{
    public class AbpModuleNameLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(AbpModuleNameConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(AbpModuleNameLocalizationConfigurer).GetAssembly(),
                        "AbpCompanyName.AbpProjectName.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
