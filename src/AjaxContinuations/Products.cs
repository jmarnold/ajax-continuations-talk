using System;
using System.Collections.Generic;
using FubuMVC.Core.Ajax;
using FubuValidation;

namespace AjaxContinuations
{
    public class Product : IEntity
    {
        public  Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class ProductListViewModel
    {
        public IEnumerable<Product> Products { get; set; }
    }

    public class ProductListRequest
    {
    }

	public class ProductTemplate
	{
	}

    public class ProductController
    {
        private readonly IEntityRepository _repository;

        public ProductController(IEntityRepository repository)
        {
            _repository = repository;
        }

		public Product get_product_dialog(ProductTemplate dialog)
        {
            return new Product();
        }

        public AjaxContinuation post_products_create(Product product)
        {
            _repository.Update(product);
            var continuation = AjaxContinuation.Successful();
            continuation.ShouldRefresh = true;
            return continuation;
        }

        public ProductListViewModel Index(ProductListRequest request)
        {
            return new ProductListViewModel
                       {
                           Products = _repository.All<Product>()
                       };
        }
    }
}