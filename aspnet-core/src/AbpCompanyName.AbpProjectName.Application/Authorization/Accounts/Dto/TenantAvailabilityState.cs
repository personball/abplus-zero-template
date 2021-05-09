using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum TenantAvailabilityState
    {
        Available = 1,
        InActive,
        NotFound
    }
}

