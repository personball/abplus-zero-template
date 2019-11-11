namespace AbpCompanyName.AbpProjectName
{
    public enum ErrorCode : int
    {
        #region System 0-99

        SystemBusy = 2,

        Forbidden = 3,

        ItemNotExists = 4,

        RequestParametersError = 5,

        WechatAuthByCodeFailed = 6,
        WechatUserInfoSyncFail = 7,
        WechatAccessTokenIsEmpty = 8,

        ChangePasswordFailed = 9,
        
        /// <summary>
        /// 会员标签正在使用中，删除失败！
        /// </summary>
        DeleteTagFailAsMemberTagInUse = 10

        #endregion


    }
}

