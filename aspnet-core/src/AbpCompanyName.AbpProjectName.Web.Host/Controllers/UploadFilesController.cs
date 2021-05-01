using System;
using System.Threading.Tasks;
using Abp.IO;
using Abp.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Controllers;

namespace AbpCompanyName.AbpProjectName.Web.Host.Controllers
{
    public class UploadFilesController : AbpProjectNameControllerBase
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IWebHostEnvironment _env;
        //see IFileStorage in abplus 
        //private readonly IFileStorage _fileStorage;

        public UploadFilesController(
            IWebHostEnvironment env
            //, IFileStorage fileStorage
            )
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();

            //_fileStorage = fileStorage;
        }

        [HttpPost("UploadFile")]
        [DontWrapResult]
        public async Task<IActionResult> Post(IFormFile file)
        {
            var fileExtName = ".jpg";
            var originFileName = file.FileName;
            var start = originFileName.LastIndexOf('.');
            if (start != -1)
            {
                fileExtName = originFileName.Substring(start, originFileName.Length - start);
            }

            var fileName = $"{Guid.NewGuid().ToString("N")}{fileExtName}";

            var imgSrc = string.Empty;

            using (var fs = file.OpenReadStream())
            {
               // imgSrc = await _fileStorage.Save(fs, fileName, "canteen/product");
            }

            return Ok(new
            {
                imgSrc
            });
        }
    }
}
