import { ProductsPage } from '../pages/product-page/ProductsPage';
import { AddressesPage } from '../pages/addresses-page/AddressesPage';
import { OverviewPage } from '../pages/OverviewPage';

export enum ROUTE {
    MAIN = '/',
    PRODUCTS = '/products',
    ADDRESSES = '/addresses',
    OVERVIEW = '/overview',
    OTHER_ROUTES = '/*',
}

export const routesList = [
    {
        path: ROUTE.PRODUCTS,
        element: <ProductsPage/>,
    },
    {
        path: ROUTE.ADDRESSES,
        element: <AddressesPage/>
    },
    {
        path: ROUTE.OVERVIEW,
        element: <OverviewPage/>,
    },
    {
        path: ROUTE.OTHER_ROUTES,
        element: <ProductsPage/>,
    },
];