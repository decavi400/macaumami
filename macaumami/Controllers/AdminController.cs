using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;


namespace macaumami.Controllers
{
    public class AdminController : Controller
    {

        public ActionResult About() { return View(); }
        public ActionResult Join() { return View(); }

    }
}