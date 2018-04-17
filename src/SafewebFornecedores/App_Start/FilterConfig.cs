using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace SafewebFornecedores
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());            
        }
    }    
}
