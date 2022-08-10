import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetProductThunk } from '../../store/products'
import { getReviewsThunk } from '../../store/reviews'

function TinyReview({productId}) {
    const dispatch = useDispatch()

    useEffect(() => {
     dispatch(GetProductThunk())
     dispatch(getReviewsThunk())
    },[dispatch])

    const products = useSelector(state => state.products)
    const allProducts = Object.values(products)

    const reviews = useSelector(state => state.reviews) //Obj
    const allReviews = Object.values(reviews) //Array

    const ThisProductsReviews = allReviews.filter(review => review.product_id === productId)
    let sum = 0
    ThisProductsReviews.forEach(review => {
        console.log(review.rating, sum)
        review.rating += sum
    })
    if (sum === 0) {
        return 0
    } else {
        return null
    }
    // console.log(AvgRating)



    return (
        <li>Placeholder</li>
    )
}

export default TinyReview
