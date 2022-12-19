import './CategorizedWeapons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { GetFilteredProductThunk } from '../../store/categories';
import TinyReview from '../reviews/TinyReview';

/*
TODO: Give the current category an :active psuedoclass and highlight it.
TODO: Media Query: When screen size is less than 600px, reduce or shorten category names.
*/

function CategorizedWeapons() {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const userId = useSelector(state => state.session.user?.id)

    const [catScroll, setCatScroll] = useState(0);
    //Store the active category
    const [selectedCat, setSelectedCat] = useState('');
    //Store all items returned from category selection -> Map them in JSX
    const [filteredItems, setFilteredItems] = useState([]);
    //Randomized Key value to play CSS animations on scroll
    const [randomKey, setRandomKey] = useState(Math.random());

    //Handles the dynamic rendering of filtered products
    useEffect(() => {
        // Dispatch thunk in store/products.js to fetch all weapons returned from selectedCat
        dispatch(GetFilteredProductThunk(selectedCat))
        // Store weapons as filteredItems state
    },[dispatch, selectedCat])

    const categories = [
                        ['Greatsword','Straight-Sword','Bow','Dagger','Hammer'],
                        ['Axe','Spear','Katana','Curved-Sword','Gauntlet'],
                        ['Ring', 'Halberd', 'Throwable','Whip']]

    const filtered_prod = useSelector(state => state.category)
    const allFilteredProd = Object.values(filtered_prod)


    return (
        <div id='categories-wrapper'>
            <div id='cat-container'>
                <h1 id='category-section-title'>Product Categories</h1>
                <ul id='categories-ul'>
                    <li id='cat-scroll'><FontAwesomeIcon icon={faArrowLeft} onClick={() => catScroll === 0 ? setCatScroll(categories.length - 1) : setCatScroll(catScroll - 1)}/></li>
                    {categories[catScroll].map(item => (
                        <li className='category-listing' onClick={(e) => setSelectedCat(item)}>{item}</li>
                        ))}
                    <li id='cat-scroll'><FontAwesomeIcon icon={faArrowRight} onClick={() => catScroll === categories.length - 1 ? setCatScroll(0) : setCatScroll(catScroll + 1)}/></li>
                </ul>
            </div>
            <div id='filtered-prod-container'>
                    <div id='filt-card-container'>
                        <ul>
                        {allFilteredProd && allFilteredProd.map(product => (
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
            </div>
        </div>
    )
}

export default CategorizedWeapons;
