using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AbpCompanyName.AbpProjectName.Tags
{
    /// <summary>
    /// 标签类型
    /// </summary>
    [JsonConverter(typeof(StringEnumConverter))]
    public enum TagType
    {
        MemberUser = 0
    }
}