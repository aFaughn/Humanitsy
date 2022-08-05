import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GetProductThunk } from '../../store/products'
import { getReviewsThunk } from '../../store/reviews'
import SearchProducts from './SearchProducts'

function MostRecentProducts() {
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(GetProductThunk())
   dispatch(getReviewsThunk())
  },[dispatch])

  const products = useSelector(state => state.productReducer)
  const allProducts = Object.values(products)

  const reviews = useSelector(state => state.reviewReducer)
  const allReviews = Object.values(reviews)

    return (
      <>
      <h1>Most Recent Products Component</h1>
          <SearchProducts />
          <div id='RecentProductWrapper'>
            <ul>
              {allProducts && allReviews && allProducts.map(product => (
                <>
                  <div>
                    <li>{product.name}</li>
                  </div>
                  <div>
                    <li>{product.price.toFixed(2)} Souls</li>
                  </div>
                  <div>
                    <li>{product.seller_id}</li>
                  </div>
                  <div>
                    <li>{allReviews.filter(review => review.product_id === product.id).map(review => (
                      <p>{review.rating}</p>
                    ))}</li>
                  </div>
                </>
              ))}
              </ul>
            </div>
        </>
    )
}

export default MostRecentProducts
