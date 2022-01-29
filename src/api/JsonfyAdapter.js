import axios from "axios";

const getProvider = () => {
  return axios.create({ baseURL: "https://jsonfy.com" });
};

function JsonfyAdapter(onSuccess = () => {}, onError = () => {}) {
  return {
    getProducts: () =>
      getProvider().get("items").then(onSuccess()).catch(onError()),
    getProduct: (id) =>
      getProvider().get(`items/${id}`).then(onSuccess()).catch(onError()),
  };
}

export default JsonfyAdapter;
