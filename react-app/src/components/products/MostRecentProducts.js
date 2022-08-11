import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetProductThunk } from '../../store/products'
import { getReviewsThunk } from '../../store/reviews'
import TinyReview from '../reviews/TinyReview'
import SearchProducts from './SearchProducts'
import './MostRecentProducts.css'

function MostRecentProducts() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(GetProductThunk())
    dispatch(getReviewsThunk())
  },[dispatch])


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const products = useSelector(state => state.products)
  const allProducts = Object.values(products)

  const reviews = useSelector(state => state.reviews)
  const allReviews = Object.values(reviews)

    return (
      <>
          {/* <SearchProducts /> */}
          <div id='RecentProductWrapper'>
            <h1 id='most-recent-product-banner'>Most Recent Products</h1>
            <ul className='product-card-container'>
              {allProducts && allReviews &&allProducts.map(product => (
                <div key={product.id} className='product-card'>
                  <Link to={`/products/${product.id}`}>
                    <div>
                      <li>{product.name}</li>
                    </div>
                    <div>
                      <img className='product-img' src={product.image_url} alt='product'></img>
                    </div>
                    <div>
                      <li>{product.price.toFixed(2)} Souls</li>
                    </div>
                    <div>
                      <li>{users.find(user => user.id === product.seller_id)?.username}</li>
                    </div>
                    <div>
                      <TinyReview productId={product.id}/>
                    </div>
                  </Link>
                </div>
              ))}
              </ul>
           </div>
        </>
    )
}

export default MostRecentProducts
