using System;
using System.Security.Cryptography;
using System.Text;
using Abp;
using AbpCompanyName.AbpProjectName.Wechat.DecryptResults;
using Newtonsoft.Json;

namespace AbpCompanyName.AbpProjectName.Wechat
{
    public static class StringExtensions
    {
        public static T DecryptWechatData<T>(this string encryptedData, string iv, string sessionKey) where T : DecryptResult
        {
            Check.NotNullOrWhiteSpace(encryptedData, nameof(encryptedData));
            Check.NotNullOrWhiteSpace(iv, nameof(iv));
            Check.NotNullOrWhiteSpace(sessionKey, nameof(sessionKey));

            //创建解密器生成工具实例  
            AesCryptoServiceProvider aes = new AesCryptoServiceProvider();
            //设置解密器参数  
            aes.Mode = CipherMode.CBC;
            aes.BlockSize = 128;
            aes.Padding = PaddingMode.PKCS7;
            //格式化待处理字符串  
            byte[] byte_encryptedData = Convert.FromBase64String(encryptedData);
            byte[] byte_iv = Convert.FromBase64String(iv);
            byte[] byte_sessionKey = Convert.FromBase64String(sessionKey);

            aes.IV = byte_iv;
            aes.Key = byte_sessionKey;
            //根据设置好的数据生成解密器实例  
            ICryptoTransform transform = aes.CreateDecryptor();

            //解密  
            byte[] decrypted = transform.TransformFinalBlock(byte_encryptedData, 0, byte_encryptedData.Length);

            //生成结果  
            string plainText = Encoding.UTF8.GetString(decrypted);

            //反序列化结果，生成用户信息实例  
            return JsonConvert.DeserializeObject<T>(plainText);
        }
    }
}
