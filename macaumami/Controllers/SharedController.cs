using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;


namespace macaumami.Controllers
{
    public class SharedController : Controller
    {

        [HttpPost]
        public JsonResult GetBackendMenu()
        {
            List<object> objs = new List<object>();
            objs.Add(new { name = "首頁", url = "#" });
            objs.Add(new { name = "XX管理", url = "#" });
            return Json(objs);
        }





        [HttpPost]
        public JsonResult QueryObjInit(string type)
        {
            switch(type.ToLower())
            {
                case "about": return Json(new QueryObj_ABOUT());
                case "join": return Json(new QueryObj_JOIN());
                case "cooperate": return Json(new QueryObj_COOPERATE());
                default:return Json(new QueryObj_Common());
            }
        }

        [HttpPost]
        public JsonResult DataObjInit(string type)
        {
            switch (type.ToLower())
            {
                case "about": return Json(new ABOUT());
                case "join": return Json(new JOIN());
                case "cooperate": return Json(new COOPERATE());
                default: return Json("");
            }
        }

    }
}