import { ProductType } from '../types/ProductType';
import { instance } from './index';

export const productsApi = {
    requestProducts() {
        return instance.get<ProductType[]>('products')
            .then(response => response.data);
    },
};