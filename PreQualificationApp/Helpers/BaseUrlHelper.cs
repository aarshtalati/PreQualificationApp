using System.Web;

namespace PreQualificationApp.Helpers
{
	public class BaseUrlHelper
	{
		public static string getBaseUrl(bool appendHash = true)
		{
			var request = HttpContext.Current.Request;
			var appUrl = HttpRuntime.AppDomainAppVirtualPath;
			var baseUrl = string.Format("{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, appUrl);
			if (!appendHash && !baseUrl.EndsWith("/"))
				baseUrl += "/";
			else if (appendHash && !baseUrl.EndsWith("/#"))
				baseUrl += "/#";
			var response = HttpContext.Current.Response;
			return baseUrl;
		}
	}
}