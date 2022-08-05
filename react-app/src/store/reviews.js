const GET_REVIEWS = '/get/reviews'
const CREATE_REVIEWS = '/create/review'
const EDIT_REVIEWS = '/edit/review'
const DELETE_REVIEW = '/delete/review'

const getReviews = (reviews)=>({
    type: GET_REVIEWS,
    reviews
})

const createReview = (review)=>({
    type: CREATE_REVIEWS,
    review
})

const editReview = (review)=>({
    type: EDIT_REVIEWS,
    review
})

const deleteReview = (review)=>({
    type: DELETE_REVIEW,
    review
})

export const getReviewsThunk = ()=> async (dispatch)=>{
    const response = await fetch('/api/reviews/all');
    if(response.ok){
        const data = await response.json()
        dispatch(getReviews(data.reviews))
        return data
    }
}

export const createReviewsThunk= (review)=> async(dispatch)=>{
    const response = await fetch('/api/reviews/new',{
        headers: {'content-type':'application/json'},
        method:'POST',
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(createReview(data))
        return data;
    }
}

export const editReviewsThunk = (review)=> async(dispatch)=>{
    const response = await fetch(`/api/reviews/${review.id}/edit`,{
        headers: {'content-type':'application/json'},
        method:'PUT',
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(editReview(data))
        return data;
    }
}

export const deleteReviewThunk = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/reviews/${id}/delete`,{
        headers: {'content-type':'application/json'},
        method:'DELETE',
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteReview(data))
        return data;
    }
}

const initialState ={}
const reviewReducer =(state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case GET_REVIEWS:
            action.reviews.forEach(review=>newState[review.id]=review)
            return newState

        case CREATE_REVIEWS:
            newState[action.review.id] = action.review
            return newState;

        case EDIT_REVIEWS:
            newState[action.review.id] = action.review
            return newState;

        case DELETE_REVIEW:
            delete newState[action.review.id];
            return newState;

        default:
            return state
    }
}

export default reviewReducer
