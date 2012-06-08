using FubuMVC.Ajax;
using FubuMVC.Core;
using FubuMVC.Spark;
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

			Import<RequestCorrelation>();
			Import<ValidationPreview>();

			this.UseSpark();
			this.Validation(x => x.Actions.Include(call => FubuSemanticExtensions.IsHttpPost(call) && !FubuSemanticExtensions.IsValidationPreview(call)));
		}
	}
}