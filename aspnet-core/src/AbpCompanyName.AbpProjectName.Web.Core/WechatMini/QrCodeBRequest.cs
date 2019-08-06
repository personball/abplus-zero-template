#pragma warning disable CS1570
namespace AbpCompanyName.AbpProjectName.WechatMini
{
    public class QrCodeBRequest
    {
        public QrCodeBRequest()
        {
            line_color = new WechatColor();
        }
        /// <summary>
        /// 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
        /// </summary>
        public string scene { get; set; }
        /// <summary>
        /// 必须是已经发布的小程序存在的页面（否则报错），例如 "pages/index/index" ,根路径前不要填加'/',不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
        /// </summary>
        public string page { get; set; }
        /// <summary>
        /// 二维码的宽度
        /// </summary>
        public int width { get; set; }
        /// <summary>
        /// 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
        /// </summary>
        public bool auto_color { get; set; }
        /// <summary>
        /// auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
        /// </summary>
        public WechatColor line_color { get; set; }
        /// <summary>
        /// 是否需要透明底色， is_hyaline 为true时，生成透明底色的小程序码
        /// </summary>
        public bool is_hyaline { get; set; }

        public class WechatColor
        {
            public int r { get; set; }
            public int g { get; set; }
            public int b { get; set; }
        }
    }
}
#pragma warning restore CS1570