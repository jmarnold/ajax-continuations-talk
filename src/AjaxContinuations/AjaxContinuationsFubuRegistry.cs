using FubuMVC.Ajax;
using FubuMVC.Core;
using FubuMVC.Core.Localization;
using FubuMVC.Validation;

namespace AjaxContinuations
{
	public class AjaxContinuationsFubuRegistry : FubuRegistry
	{
		public AjaxContinuationsFubuRegistry()
		{
			Actions
				.IncludeClassesSuffixedWithController();

			Routes
				.IgnoreControllerNamesEntirely()
				.HomeIs<ProductController>(c => c.Index(null));

			Views
				.TryToAttachWithDefaultConventions();

			Import<BasicLocalizationSupport>();

			Import<RequestCorrelation>();
			this.Validation(x => x.Actions.Include(call => call.ParentChain().Route.AllowedHttpMethods.Contains("POST")));
		}
	}
}