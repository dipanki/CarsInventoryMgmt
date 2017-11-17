using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CarsInventoryMgmt.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /Error/

        public ViewResult Error(string code)
        {
            ViewBag.ErrorCode = code;
            return View();
        }
        public ViewResult NotFound()
        {
            Response.StatusCode = 200; //you may want to set this to 404
            return View("NotFound");
        }

    }
}
