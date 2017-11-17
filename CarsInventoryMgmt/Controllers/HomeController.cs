using CarsInventoryMgmt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;

namespace CarsInventoryMgmt.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        CarsInventoryMgmtEntities _db = new CarsInventoryMgmtEntities();
        Common _cs = new Common();
        /// <summary>
        /// This method uses for view Home page
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// This method uses for Load Car List
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="searchstr"></param>
        /// <param name="take"></param>
        /// <returns></returns>
        public PartialViewResult CarList(int limit = 0, string searchstr = "", int take = 5)
        {
            ViewBag.Limit = limit;
            ViewBag.Take = take;
            ViewBag.SearchStr = searchstr;
            return PartialView("~/Views/Home/Partial/_CarList.cshtml", _db.sp_Get_Car_Details_By_User_Id(WebSecurity.CurrentUserId, limit, searchstr, take).ToList());
        }
        /// <summary>
        /// This method uses for Open popup of Add/Edit Car View
        /// </summary>
        /// <returns></returns>
        public ActionResult AddEditCar(string carid = "0", string counter ="")
        {            
            ViewBag.Counter = counter;
            int _objCarId = Convert.ToInt32((carid != "0") ? _cs.Decrypt(carid) : carid);
            ViewBag.Car_Id = carid;
            ViewBag.PageTitle = (_objCarId == 0) ? "Add New Car" : "Update Car Details";
            var objCarDetails = _db.CarDetails.ToList().FirstOrDefault(x => x.Car_Id == _objCarId);
            return PartialView("~/Views/Home/Partial/_AddEditCar.cshtml", objCarDetails);
        }
        /// <summary>
        /// This method uses for Add/Edit Car Details
        /// </summary>
        /// <param name="objCarDetails"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddEditCar(CarDetail objCarDetails, string carid = "0")
        {
            if (ModelState.IsValid)
            {
                int _objCarId = Convert.ToInt32((carid != "0") ? _cs.Decrypt(carid) : carid);
                if (_objCarId == 0)
                {
                    _db.sp_Insert_Car_Details(WebSecurity.CurrentUserId, objCarDetails.Brand, objCarDetails.Model, objCarDetails.Year, objCarDetails.Price, objCarDetails.New);
                    return Json(new { success = "true" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var _carDetails = _db.sp_Update_Car_Details(_objCarId, objCarDetails.Brand, objCarDetails.Model, objCarDetails.Year, objCarDetails.Price, objCarDetails.New);
                    return Json(_carDetails, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { success = "false" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
