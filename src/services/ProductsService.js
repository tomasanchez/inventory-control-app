const ProductsService = class ProductsService {
  constructor(productProvider) {
    this.productProvider = productProvider;
  }

  getAll(onSuccess, onError) {
    return this.productProvider?.getProducts(onSuccess, onError);
  }
};

export default ProductsService;
