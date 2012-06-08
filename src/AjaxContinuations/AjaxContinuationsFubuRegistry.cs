using FubuMVC.Core;

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
		}
	}
}