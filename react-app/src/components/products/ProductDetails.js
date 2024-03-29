import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory} from 'react-router-dom'
import { GetProductThunk, DeleteProductThunk } from '../../store/products'
import EditProduct from './EditProduct';
import Reviews from '../reviews/Reviews';
import ReviewForm from '../reviews/ReviewForm';
import "./ProductDetails.css";

function ProductDetails() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.products[productId])
    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const reviews = useSelector(state => state.reviews)
    //TODO Cart
    const history = useHistory()
    const [review, setReview] = useState(false)
    const [edit, setEdit] = useState(false)
    let review_user;
    if (reviews) {
        review_user = Object.values(reviews).filter(review => { if (review.user_id === userId && review.product_id === Number(productId)) return true })
    }

    const cart = localStorage.getItem(`cart_${userId}`)

    //Create an instance of cart to prevent issues later.
    //This is only needed for brand new users - a more streamlined solution is likely
    //possible
    if (!cart) {
         localStorage.setItem(`cart_${userId}`,'[]')
    }
    useEffect(()=> {
        dispatch(GetProductThunk())
    },[dispatch, productId])

    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);

    function handleEdit(e) {
        e.preventDefault()
        setReview(false)
        setEdit(true)
    }

    function reviewClick(e) {
        if (!session.user) {
            history.push('/login')
        }
        setEdit(false)
        setReview(true)
    }

    async function handleDelete(e) {
        e.preventDefault();
            await dispatch(DeleteProductThunk(productId));
        history.push('/')
    }

    async function addToCart(e) {
        e.preventDefault();
        if (!localStorage.getItem(`cart_${userId}`)) {
            localStorage.setItem(`cart_${userId}`, JSON.stringify([]))
        }
        let curCart = JSON.parse(localStorage.getItem(`cart_${userId}`))
        curCart.push(product);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(curCart));
        console.log(curCart);
    }

        return (
            <>
                <div id='details-component-wrapper'>
                    <div>
                        <div id='title-wrapper'>
                            <h1>{product?.name}</h1>
                            {users && product && (
                                <h3>Masterfully crafted by: {users.find(user => user.id === product.seller_id)?.username}</h3>
                            )}
                        </div>
                        <div id='details-container'>
                            <div className='product-stats'>
                                <img onError={(e) => e.target.src = '/static/images/backupImage.png'} src={product?.image_url} alt='product' id='product-image'></img>
                                <div id='details-container'>
                                    <p>Product Stats</p>
                                </div>
                                <div id='stats-container'>
                                    <div id='one-detail'>
                                        <div><img title='Damage' src='/static/icons/sword.png' alt='Base Damage'className='detail-icon'></img></div>
                                        <div>{product?.base_damage}</div>
                                    </div>
                                    <div id='one-detail'>
                                        <div><img title='Buffable' src='/static/icons/star.png' alt='Buffable' className='detail-icon'></img></div>
                                        <div class='product-stat'> {product?.can_be_buffed ? 'Yes' : 'No' }</div>
                                    </div>
                                    <div id='one-detail'>
                                        <div><img title='Created On:' src='/static/icons/wall-clock.png' alt='posted' className='detail-icon'></img></div>
                                        <div class='product-stat'> {product?.posted}</div>
                                    </div>
                                    <div id='one-detail'>
                                        <div><img title='Price' src='/static/icons/dollar.png' alt='price' className='detail-icon'></img></div>
                                        <div class='product-stat'> {product?.price.toFixed(2)} Souls</div>
                                    </div>
                                    <div id='one-detail'>
                                        <div><img title='Scaling Type' src='/static/icons/up-arrow.png' alt='scaling' className='detail-icon'></img></div>
                                        <div class='product-stat'> {product?.scaling_type}</div>
                                    </div>
                                    <div id='one-detail'>
                                        <div><img title='Weapon Type' src='/static/icons/privacy.png' alt='weapon type' className='detail-icon'></img></div>
                                        <div class='product-stat'> {product?.weapon_type}</div>
                                    </div>
                                    {/* TODO: Attribute Icon creators */}
                                </div>
                            </div>
                            <div id='description-container'>
                                <p>Description: {product?.description}</p>
                            </div>
                        </div>
                        <button onClick={addToCart} className='add-to-cart'>Add To Cart</button>
                    </div>
                    <div>
                        {session.user && product && product.seller_id === userId && (
                            <div id='owner_buttons'>
                                <button  id='detail-button-del' className='detail-button' onClick={handleDelete}>Delete</button>
                                <button className='detail-button' onClick={handleEdit}>Edit</button>
                            </div>
                        )}
                        <Reviews productId={productId}/>
                        {review && <ReviewForm productId={productId} hide={() => setReview(false)} />}
                        {review_user.length === 0 && review === false && <button className='detail-button' onClick={reviewClick}>Write a Review</button>}
                        {edit && <EditProduct productId={productId} hide={() => setEdit(false)} />}
                    </div>
                </div>
            </>
        )
    }

export default ProductDetails
