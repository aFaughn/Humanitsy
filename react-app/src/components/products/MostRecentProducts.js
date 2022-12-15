import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetProductThunk } from '../../store/products'
import { getReviewsThunk } from '../../store/reviews'
import CategorizedWeapons from './CategorizedWeapons';
import TinyReview from '../reviews/TinyReview'
import Search from '../search/Search';
import './MostRecentProducts.css'

function MostRecentProducts() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const userId = useSelector(state => state.session.user?.id)

  useEffect(() => {
    dispatch(GetProductThunk())
    dispatch(getReviewsThunk())
  },[dispatch])

  const cart = localStorage.getItem(`cart_${userId}`)

  //Create an instance of cart to prevent issues later.
  //This is only needed for brand new users - a more streamlined solution is likely
  //possible
  if (!cart) {
       localStorage.setItem(`cart_${userId}`,'[]')
  }

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
          <div className='search-wrapper'>
              <Search/>
          </div>
          <div id='RecentProductWrapper'>
            <CategorizedWeapons/>
            <h1 id='most-recent-product-banner'>Most Recent Products</h1>
            <ul className='product-card-container'>
              {allProducts && allReviews &&allProducts.map(product => (
                  <Link to={`/products/${product.id}`} className='card-link'>
                    <div key={product.id} className='product-card'>
                        <div>
                          <li>{product?.name.length > 23 ? `${product.name.slice(0,23)}...` : product.name}</li>
                        </div>
                        <div>
                          <img className='product-img' onError={(e) => e.target.src = '/static/images/backupImage.png'} src={product.image_url} alt='product'></img>
                        </div>
                        <div>
                          <li>{product?.price.toFixed(2)} Souls</li>
                        </div>
                        <div>
                          <li>{users?.find(user => user.id === product.seller_id)?.username.length > 23 ? `${users?.find(user => user.id === product.seller_id)?.username.slice(0,23)}...` : users?.find(user => user.id === product.seller_id)?.username }</li>
                        </div>
                        <div>
                          <TinyReview productId={product.id}/>
                        </div>
                    </div>
                  </Link>
              ))}
              </ul>
           </div>
        </>
    )
}

export default MostRecentProducts
