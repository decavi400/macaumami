using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Class1
    {
    }

    public class resultObj
    {
        public bool isSuccess = false;
        public object data1 = null;
        public object data2 = null;
        public object data3 = null;
        public List<int> errorCode = new List<int>();
        
    }

    public class QueryObj_ABOUT : ABOUT
    {
        public string keyword = "";
        public QueryObj_ABOUT()
        {
            this.lang = lang_type.zh_hant.ToString();
        }
    }
    public class QueryObj_JOIN : JOIN
    {
        public string keyword = "";
        public QueryObj_JOIN()
        {
            this.lang = lang_type.zh_hant.ToString();
        }
    }
    public class QueryObj_COOPERATE : COOPERATE
    {
        public string keyword = "";
        public QueryObj_COOPERATE()
        {
            this.lang = lang_type.zh_hant.ToString();
        }
    }

    public class QueryObj_Common
    {
        public string keyword = "";
    }



    public enum lang_type
    {
        zh_hant,
        zh_hans,
        en_us,
        pt,
    }


}
