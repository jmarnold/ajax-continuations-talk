using FubuValidation.StructureMap;
using StructureMap.Configuration.DSL;

namespace AjaxContinuations
{
	public class AjaxContinuationsRegistry : Registry
	{
		public AjaxContinuationsRegistry()
		{
			Scan(x =>
			     	{
			     		x.TheCallingAssembly();
			     		x.WithDefaultConventions();
			     	});

			ForSingletonOf<IEntityRepository>().Use<EntityRepository>();
			this.FubuValidation();
		}
	}
}