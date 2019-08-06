namespace AbpCompanyName.AbpProjectName.WechatH5.ApiResults
{
    public class H5TplMsgResult
    {
        /// <summary>
        /// 0表示调用成功
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 错误信息
        /// </summary>
        public string errmsg { get; set; }
        /// <summary>
        /// 消息id
        /// </summary>
        public long msgid { get; set; }
    }
}
