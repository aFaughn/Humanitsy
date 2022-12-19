const GET_PRODUCTS = '/get/products'
const GET_PRODUCT = '/get/product/detail'
const SEARCH_PRODUCTS = '/get/searchProducts'
const CREATE_PRODUCT = '/post/product'
const EDIT_PRODUCT = '/edit/product'
const DELETE_PRODUCT = '/delete/product'

const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
});

const getProduct = (product) => ({
    type: GET_PRODUCT,
    product
});

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
});

const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    product
});

const deleteProduct = (product) => ({
    type: DELETE_PRODUCT,
    product
});

const searchProducts = (products) => ({
    type: SEARCH_PRODUCTS,
    products
});

export const GetProductThunk = () => async (dispatch) => {
    const response = await fetch('/api/products')
    if (response.ok) {
        const data = await response.json()
        dispatch(getProducts(data.products))
        return data
    } else {
        return {"message":'Failed: Get Product fetch failed'}
    }
}

export const GetProductDetailThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getProduct(data))
        return data
    } else {
        return {'message':`Failed: Could not fetch product ${id}`}
    }

}

export const CreateProductThunk = (product) => async (dispatch) => {
    const response = await fetch(`/api/products/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(createProduct(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }

}
export const EditProductThunk = (product) => async (dispatch) => {
    const response = await fetch(`/api/products/${product.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editProduct(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const DeleteProductThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteProduct(data))
        return data
    } else {
        console.log({ "message": "Failed: Unsuccessful delete" })
    }
}

export const SearchProductsThunk = (params) => async (dispatch) => {
    const response = await fetch(`/api/products/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(searchProducts(data.products));
        return data;
    } else {
        return { "Message": "Failed: Unable to search for results" }
    }
};


const initialState = {}
const products = (state = initialState, action) => {
    let newState = { ...state } //true deep copy json.parse(json.stringify(state)) back into self.
    switch (action.type) {
        case GET_PRODUCTS:
            action.products.forEach(product => newState[product.id] = product)
            return newState;

        case GET_PRODUCT:
            const new_State = {}
            new_State[action.product.id] = action.product
            return new_State;

        case CREATE_PRODUCT:
            newState[action.product.id] = action.product
            return newState;

        case EDIT_PRODUCT:
            newState[action.product.id] = action.product
            return newState

        case DELETE_PRODUCT:
            delete newState[action.product.id];
            return newState;
        case SEARCH_PRODUCTS:
            action.products.forEach(product => newState[product.id] = product)
            return newState;
        default:
            return state
    }
}

export default products
