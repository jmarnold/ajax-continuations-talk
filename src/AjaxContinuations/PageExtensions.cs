using HtmlTags;

namespace AjaxContinuations
{
	public static class PageExtensions
	{
		public static FormTag ValidationSummary<T>(this FormTag form)
		{
			form.Id(typeof(T).Name);
			var summary = new HtmlTag("div")
				.AddClasses("alert", "alert-error", "validation-container")
				.Append(new HtmlTag("p").Text("There are errors with the information you provided."))
				.Append(new HtmlTag("ul").AddClass("validation-summary"))
				.Style("display", "none");
			form.Append(summary);
			return form;
		}
	}
}