using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarsInventoryMgmt.Models
{
    public class Common
    {
        /// <summary>
        /// Encryption data
        /// </summary>
        /// <param name="text">string to encrypt</param>
        /// <returns>Encrypted data</returns>
        public string Encrypt(string text = "")
        {
            byte[] bytes = System.Text.ASCIIEncoding.ASCII.GetBytes(text);
            string EncryptText = Convert.ToBase64String(bytes);
            return EncryptText;
        }
        /// <summary>
        /// Decrypt data
        /// </summary>
        /// <param name="text">string to decrypt</param>
        /// <returns>Decrypt data</returns>
        public string Decrypt(string text)
        {
            byte[] bytes = Convert.FromBase64String(text);
            string DescriptText = System.Text.ASCIIEncoding.ASCII.GetString(bytes);
            return DescriptText;
        }
    }
}