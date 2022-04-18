import productsSlice, {
    getProducts,
    ProductsStateType,
    setError,
    setFetching,
    setProducts
} from "./productsSlice";
import { productsApi } from "../../api/products-api";

jest.mock("../../api/products-api")

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

const productsApiMock = productsApi as jest.Mocked<typeof productsApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    productsApiMock.requestProducts.mockClear();
});

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
    describe("products reducer thunks", () => {
        it("getProducts thunk success", async () => {
            productsApiMock.requestProducts.mockReturnValueOnce(Promise.resolve(products));
            const thunk = getProducts();
            thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(2);
            expect(dispatchMock).toHaveBeenCalledWith(setProducts(products));
        });

        it("getProducts thunk rejected", async () => {
            productsApiMock.requestProducts.mockReturnValueOnce(Promise.reject('error'));
            const thunk = getProducts();
            thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(2);
            expect(dispatchMock).toHaveBeenCalledWith(setError('Some error has been occurred'));
        });
    });
})