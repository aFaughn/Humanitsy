const GET_FILTERED_PRODUCTS = '/get/cat/'

const getFilteredProduct = (category) => ({
    type: GET_FILTERED_PRODUCTS,
    category
})

export const GetFilteredProductThunk = (cat) => async (dispatch) => {
    const response = await fetch(`/api/cat/${cat}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getFilteredProduct(data.category))
        return data
    } else {
        return {'Message':`Failed: Could not fetch filtered products by category: ${cat}`}
    }
}

const initialState = {}
const categories = (state = initialState, action) => {
    let newState = { ...state } //true deep copy json.parse(json.stringify(state)) back into self.
    switch (action.type) {
        case GET_FILTERED_PRODUCTS:
            newState = {}
            newState[action.category] = action.filtered_product
            return newState;
        default:
            return state
    }
}

export default categories
