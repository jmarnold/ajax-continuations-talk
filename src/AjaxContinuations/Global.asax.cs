using System;
using Bottles;
using FubuMVC.Core;
using FubuMVC.StructureMap;

namespace AjaxContinuations
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            FubuApplication
                .For<AjaxContinuationsFubuRegistry>()
                .StructureMapObjectFactory(x => x.AddRegistry<AjaxContinuationsRegistry>())
                .Bootstrap();

			PackageRegistry.AssertNoFailures();
        }
    }
}