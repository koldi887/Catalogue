import productsSlice, {
    ProductsStateType,
    setError,
    setFetching,
    setProducts
} from "./productsSlice";

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
    it('should handle initialstate', () => {
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
