import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GetProductThunk } from '../../store/products'
import { getReviewsThunk } from '../../store/reviews'

function TinyReview({productId}) {
    const dispatch = useDispatch()

    useEffect(() => {
     dispatch(GetProductThunk())
     dispatch(getReviewsThunk())
    },[dispatch])

    const reviews = useSelector(state => state.reviews) //Obj
    const allReviews = Object.values(reviews) //Array
    const allProductReviews = allReviews.filter(review => review.product_id === productId)

    const avgOf = (array) => {
        let total = 0;
        if (!array.length) {
            return null;
        } else {
            for (let i = 0; i < array.length; i++) {
                let num = array[i];
                total += num
            };
            return total / array.length
        }
    }

    const averageScore = avgOf(allProductReviews.map(review => review.rating))



    return (
        <li>{typeof averageScore === 'number' ? '✰'.repeat(averageScore) : 'No Reviews Yet'}</li>
    )
}

export default TinyReview
