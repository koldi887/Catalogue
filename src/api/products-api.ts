import { instance } from "./index";
import { ProductType } from "../types/ProductType";

export const productsApi = {
    requestProducts() {
        return instance.get<ProductType[]>('products')
            .then(response => response.data)
    },
}