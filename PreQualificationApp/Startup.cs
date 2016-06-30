using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PreQualificationApp.Startup))]
namespace PreQualificationApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
