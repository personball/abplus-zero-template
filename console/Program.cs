using System;

namespace AbpCompanyName.AbpProjectName
{
    class Program
    {
        static void Main(string[] args)
        {
            //As Topshelf not support dotnet core yet, just simple run below code for a sample.
            var bs = new AbpCompanyNameAbpProjectNameBootstrap();
            bs.Start();

            Console.ReadLine();
        }
    }
}
