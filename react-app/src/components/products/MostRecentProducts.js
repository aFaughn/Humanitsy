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
  console.log(allReviews)

    return (
      <>
          <SearchProducts />
      <h1>Most Recent Products Component</h1>
          <div id='RecentProductWrapper'>
            <ul>
              {allProducts && allReviews &&allProducts.map(product => (
                <>
                <div>
                  <div>
                    <li>{product.name}</li>
                  </div>
                  <div>
                    <li>{product.price.toFixed(2)} Souls</li>
                  </div>
                  <div>
                    <li>{product.seller_id}</li>
                  </div>
                </div>
                </>
              ))}
              </ul>
            </div>
        </>
    )
}

export default MostRecentProducts
