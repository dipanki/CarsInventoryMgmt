using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace CarsInventoryMgmt
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();
        }

        protected void Application_Error()
        {
            Exception ex = Server.GetLastError();
            Random rand = new Random();
            HttpException httpException = ex as HttpException;
            if (!ex.Message.Contains("HTTP headers"))
            {
                if (httpException != null)
                {
                    string action;
                    switch (httpException.GetHttpCode())
                    {
                        case 404:
                            // page not found
                            action = "NotFound";
                            break;
                        case 500:
                            // server error
                            action = "Error";
                            break;
                        default:
                            action = "Error";
                            break;
                    }
                    string errorCode = rand.Next(102, 999).ToString();
                    ExceptionLog(new StackTrace(ex, true).ToString(), errorCode, ex.Message.Replace("\n", " "));
                    if (action == "NotFound")
                    {
                        Response.Redirect(String.Format("~/Error/{0}", action), true);
                    }
                    Response.Redirect(String.Format("~/Error/{0}?code={1}", action, errorCode), true);
                }
                else
                {
                    string errorCode = rand.Next(102, 999).ToString();
                    ExceptionLog(new StackTrace(ex, true).ToString(), errorCode, ex.Message.Replace("\n", " "));
                    Response.Redirect(String.Format("~/Error/Error?code={0}", errorCode), true);
                }
            }
        }
        protected void ExceptionLog(string Source, string ErrorCode, string Exc)
        {
            try
            {
                string Dirctry = ConfigurationManager.AppSettings["ExceptionFile"];
                if (!Directory.Exists(Dirctry))
                    Directory.CreateDirectory(Dirctry);

                string logFile = Dirctry + "ExcLog_Global_" + DateTime.Now.Month + "_" + DateTime.Now.Year + ".txt";
                StreamWriter sw = new StreamWriter(logFile, true);
                sw.WriteLine("********** {0} **********", DateTime.Now);
                sw.Write("ERROR CODE: " + ErrorCode);
                sw.WriteLine(" ");
                sw.WriteLine("SOURCE: " + Source);
                sw.WriteLine("EXCEPTION: " + Exc);
                sw.WriteLine("Exception Logged in DB : " + Convert.ToString(false));
                sw.WriteLine("********** X **********");
                sw.WriteLine(" ");
                sw.Close();
            }
            catch (Exception ex)
            {

            }
        }
    }
}