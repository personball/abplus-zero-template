using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AbpCompanyName.AbpProjectName.Tags.Dto
{
    [AutoMapFrom(typeof(Tag))]
    public class TagDto : EntityDto
    {
        /// <summary>
        /// 标签名称
        /// </summary>
        [MaxLength(Tag.NameMaxLength)]
        public string Name { get; set; }

        /// <summary>
        /// 标签类型
        /// </summary>
        [JsonConverter(typeof(StringEnumConverter))]
        public TagType Type { get; set; }

        /// <summary>
        /// 标签描述
        /// </summary>
        [MaxLength(Tag.DescriptionMaxLength)]
        public string Description { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        [MaxLength(Tag.ColorMaxLength)]
        public string Color { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreationTime { get; set; }
    }
}
