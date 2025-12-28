import axiosInstance from "../axios/axiosInstance";

/**
 * Search products on the backend.
 * Backend contract assumed: GET /products/search?q=term (or /product/search)
 * Adjust the endpoint or query param name to match your backend.
 */
export async function searchProducts(q = "") {
  // try two common endpoints: /products/search and /product/search
  try {
    const res = await axiosInstance.get("/products/search", { params: { q } });
    return res;
  } catch (e) {
    try {
      const res2 = await axiosInstance.get("/product/search", {
        params: { q },
      });
      return res2;
    } catch (err) {
      // rethrow the original error
      throw e;
    }
  }
}
