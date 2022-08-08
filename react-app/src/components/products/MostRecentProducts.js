import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

  const [users, setUsers] = useState([]);

    return (
      <>
          <SearchProducts />
      <h1>Most Recent Products Component</h1>
          <div id='RecentProductWrapper'>
            <ul>
              {allProducts && allReviews &&allProducts.map(product => (
                <>
                <div>
                  <Link to={`/products/${product.id}`}>
                    <div>
                      <li>{product.name}</li>
                    </div>
                    <div>
                      <li>{product.price.toFixed(2)} Souls</li>
                    </div>
                    <div>
                      <li>{(users.filter(user => product.seller_id === user.id).username) ? (users.filter(user => product.seller_id === user.id).username) : 'SellerName'}</li>
                    </div>
                    <div>
                      <li>Average Rating Placeholder</li>
                    </div>
                  </Link>
                </div>
                </>
              ))}
              </ul>
            </div>
        </>
    )
}

export default MostRecentProducts
