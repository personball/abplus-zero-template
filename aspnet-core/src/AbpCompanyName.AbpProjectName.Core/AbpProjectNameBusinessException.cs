using System;
using Abp;
using Abp.Logging;

namespace AbpCompanyName.AbpProjectName
{
    public class AbpProjectNameBusinessException : AbpException, IHasErrorCode, IHasLogSeverity
    {
        public LogSeverity Severity { get; set; } = LogSeverity.Warn;
        public int Code { get; set; }

        public AbpProjectNameBusinessException(ErrorCode errorCode)
            : base(errorCode.ToString())
        {
            Code = (int)errorCode;
        }

        public AbpProjectNameBusinessException(ErrorCode errorCode, string message)
            : base(message)
        {
            Code = (int)errorCode;
        }

        public AbpProjectNameBusinessException(ErrorCode errorCode, Exception innerException)
            : base(errorCode.ToString(), innerException)
        {
            Code = (int)errorCode;
        }

        public AbpProjectNameBusinessException(ErrorCode errorCode, string message, Exception innerException)
            : base(message, innerException)
        {
            Code = (int)errorCode;
        }

    }
}

