import ProductsMock from "../mock/products.json";

const getProducts = (id = null) => {
  return id ? ProductsMock.find((p) => p.id === id) : ProductsMock;
};

export const productState = (product) => {
  if (product.units >= 50) return "Plenty of Stock";
  if (product.units > 0) return "Shortage";

  return "Out of Stock";
};

export default getProducts;
