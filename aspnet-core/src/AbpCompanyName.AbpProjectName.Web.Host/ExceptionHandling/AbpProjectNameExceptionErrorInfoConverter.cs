using System;
using Abp.Dependency;
using Abp.Domain.Entities;
using Abp.Localization;
using Abp.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.Web.Host.ExceptionHandling
{
    public class AbpProjectNameExceptionErrorInfoConverter : IExceptionToErrorInfoConverter, ITransientDependency
    {
        private readonly ILocalizationManager _localizationManager;

        public IExceptionToErrorInfoConverter Next { set; private get; }

        public AbpProjectNameExceptionErrorInfoConverter(ILocalizationManager localizationManager)
        {
            _localizationManager = localizationManager;
        }

        public ErrorInfo Convert(Exception exception)
        {
            while (exception is AggregateException && exception.InnerException != null)
            {
                exception = exception.InnerException;
            }

            if (exception is DbUpdateConcurrencyException)
            {
                return new ErrorInfo((int)ErrorCode.SystemBusy,L(ErrorCode.SystemBusy.ToString()));
            }

            if (exception is AbpProjectNameBusinessException)
            {
                var ex = exception as AbpProjectNameBusinessException;
                return new ErrorInfo(ex.Code, L(ex.Message));
            }

            if (exception is EntityNotFoundException)
            {
                return new ErrorInfo((int)ErrorCode.ItemNotExists, L(ErrorCode.ItemNotExists.ToString()));
            }

            if (exception is ArgumentException)
            {
                var argEx = exception as ArgumentException;
                var argMsg = exception.Message ?? L(ErrorCode.RequestParametersError.ToString());
                return new ErrorInfo((int)ErrorCode.RequestParametersError, argMsg, $"ParamName:{argEx.ParamName}");
            }

            return Next.Convert(exception);
        }

        private string L(string name)
        {
            try
            {
                return _localizationManager.GetString(AbpProjectNameConsts.LocalizationSourceName, name);
            }
            catch (Exception)
            {
                return name;
            }
        }
    }
}

