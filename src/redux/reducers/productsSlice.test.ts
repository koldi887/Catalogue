import productsSlice, {
    getProducts,
    ProductsStateType,
    setError,
    setFetching,
    setProducts
} from "./productsSlice";
import { productsApi } from "../../api/products-api";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock("../../api/products-api")
const productsApiMock = productsApi as jest.Mocked<typeof productsApi>;

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const products = [
    {
        productName: "Foxit software PhantomPDF Standard",
        tags: [
            "PDF",
            "Change",
            "Create",
            "Maintenance",
            "Business",
            "FoxIT"
        ],
        category: "Daily Business",
        manufacturerUrl: "https://www.foxitsoftware.com/de/pdf-editor",
        description: [
            "PhantomPDF provides powerful PDF Editor capabilities to allow authors to update their documents themselves.",
            "Standard - Simple interface and limited functionality."
        ],
        option1: "1 Year Maintenance",
        option2: "Without Maintenance"
    }
]

const initialState: ProductsStateType = {
    error: '',
    isFetching: false,
    products: []
}

describe('Products slice actions', () => {
    describe('Products slice actions', () => {
        it('should handle initial state', () => {
            expect(productsSlice(undefined, { type: "products" })).toEqual(initialState);
        })

        it('should change error state value', () => {
            const actual = productsSlice(initialState, setError('some error'))
            expect(actual).toEqual({ ...initialState, error: 'some error' })
        });

        it('should change fetching state value', () => {
            const actual = productsSlice(initialState, setFetching())
            expect(actual).toEqual({ ...initialState, isFetching: true })
        });

        it('should change products state value', () => {
            const actual = productsSlice(initialState, setProducts(products))
            expect(actual).toEqual({ ...initialState, products: products })
        });
    })

    describe("async actions", () => {
        it("getProducts thunk success", async () => {
            productsApiMock.requestProducts.mockReturnValueOnce(Promise.resolve(products))
            const store = mockStore({});

            await store.dispatch(getProducts() as any)

            expect(store.getActions()[0].type).toEqual(getProducts.pending.type)
            expect(store.getActions()[1]).toEqual(setFetching())
            expect(store.getActions()[2]).toEqual(setProducts(products))
        });

        it("getProducts thunk rejected", async () => {
            productsApiMock.requestProducts.mockReturnValueOnce(Promise.reject(''))
            const store = mockStore({});

            await store.dispatch(getProducts() as any)

            expect(store.getActions()[0].type).toEqual(getProducts.pending.type)
            expect(store.getActions()[1]).toEqual(setFetching())
            expect(store.getActions()[2]).toEqual(setError('Some error has been occurred'))
        });
    });
})