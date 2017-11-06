using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using LinqKit;
using System.Data.Entity.Core.Objects;

namespace macaumami.Controllers
{
    public class HomeController : Controller
    {
        public resultObj ret = new resultObj();

        [HttpPost]
        public JsonResult AboutSearch(QueryObj_ABOUT q)
        {
            ret = new resultObj();
            var predicate = PredicateBuilder.New<ABOUT>(true);
            predicate = predicate.And(p => p.lang == q.lang);
            predicate = predicate.And(p => p.content.Contains(q.keyword));
            
            
            using (var DB = new MACAUMAMIEntities())
            {
                var objs = DB.ABOUT.Where(predicate).ToList();
                if(objs.Count > 0)
                {
                    ret.isSuccess = true;
                    ret.data1 = objs;
                    ret.data2 = objs.Count;
                }
            }
            return Json(ret);
        }

        [HttpPost]
        public JsonResult AboutSave(ABOUT data)
        {
            ret = new resultObj();

            if (data.content == null) data.content = "";//不同物件 需要處理不同的欄位預設值
            using (var DB = new MACAUMAMIEntities())
            {
                data.date_modify = DateTime.Now;
                if (data.id == 0)
                {
                    data.date_created = DateTime.Now;
                    DB.ABOUT.Add(data);
                }
                else
                {
                    var obj = DB.ABOUT.Find(data.id);
                    DB.Entry(obj).CurrentValues.SetValues(data);
                }
                DB.SaveChanges();

                ret.isSuccess = true;
                ret.data1 = data;
            }
            return Json(ret);
        }

        [HttpPost]
        public JsonResult JoinSearch(QueryObj_JOIN q)
        {
            ret = new resultObj();
            var predicate = PredicateBuilder.New<JOIN>(true);
            predicate = predicate.And(p => p.lang == q.lang);
            predicate = predicate.And(p => p.content.Contains(q.keyword) || p.title.Contains(q.title));

            using (var DB = new MACAUMAMIEntities())
            {
                var objs = DB.JOIN.Where(predicate).ToList(); //這裡需要分頁功能
                if (objs.Count > 0)
                {
                    ret.isSuccess = true;
                    ret.data1 = objs;
                    ret.data2 = objs.Count;
                }
            }
            return Json(ret);
        }

        [HttpPost]
        public JsonResult JoinSave(JOIN data)
        {
            ret = new resultObj();

            if (data.content == null) data.content = "";//不同物件 需要處理不同的欄位預設值
            if (data.title == null) data.title = "";

            using (var DB = new MACAUMAMIEntities())
            {
                data.date_modify = DateTime.Now;
                if (data.id == 0)
                {
                    data.date_created = DateTime.Now;
                    DB.JOIN.Add(data);
                }
                else
                {
                    var obj = DB.JOIN.Find(data.id);
                    DB.Entry(obj).CurrentValues.SetValues(data);
                }
                DB.SaveChanges();

                ret.isSuccess = true;
                ret.data1 = data;
            }
            return Json(ret);
        }



        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}