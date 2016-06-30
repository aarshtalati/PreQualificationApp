using System.Web;
using System.Web.Optimization;

namespace PreQualificationApp
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			#region Script_Bundles

			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
						"~/Scripts/jquery.validate*"));

			// Use the development version of Modernizr to develop with and learn from. Then, when you're
			// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
						"~/Scripts/modernizr-*"));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
					  "~/Scripts/bootstrap.js",
					  "~/Scripts/respond.js",
					  "~/Scripts/material.js",
					  "~/Scripts/ripples.js"
					  ));

			bundles.Add(new ScriptBundle("~/bundles/angular").Include(
						"~/Scripts/angular.js"
						, "~/Scripts/angular-route.js"
						, "~/Scripts/angular-sanitize.js"
						, "~/Scripts/angular-animate.js"
						, "~/Scripts/angular-resource.js"
						));


			bundles.Add(new ScriptBundle("~/bundles/angularui").Include(
				//, "~/Scripts/angular-ui.js"
				//, "~/Scripts/angular-ui/ui-bootstrap.js"
				//, "~/Scripts/angular-ui/ui-bootstrap-tpls-0.10.0.js"

				"~/Scripts/select2.js"
				, "~/Scripts/angular-toastr.js"
			));

			bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory(
				"~/Scripts/App/", "*.js", true));

			#endregion


			#region Style_Bundles

			bundles.Add(new StyleBundle("~/Content/css").Include(
					  "~/Content/site.css"));

			bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
				"~/Content/bootstrap.css"
				//, "~/Content/bootstrap-theme.css"
				, "~/Content/bootstrap-material-design.css"
				, "~/Content/ripples.css"
			));

			bundles.Add(new StyleBundle("~/Content/fonts").Include(
				"~/Content/font-awesome.css"
			));

			bundles.Add(new StyleBundle("~/Content/angularui").Include(
			   "~/Content/select2.css"
			   , "~/Content/angular-toastr.css"
		   ));

			#endregion
		}
	}
}
