import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory} from 'react-router-dom'
import { GetProductThunk, DeleteProductThunk, EditProductThunk, GetProductDetailThunk } from '../../store/products'
import { getReviewsThunk, deleteReviewThunk, editReviewsThunk } from '../../store/reviews'
import EditProduct from './EditProduct';
import Reviews from '../reviews/Reviews';
import ReviewForm from '../reviews/ReviewForm';
// Cart Imports //

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

    useEffect(()=> {
        dispatch(GetProductThunk())
    },[dispatch, productId])

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
            dispatch(DeleteProductThunk(productId));
        history.push('/')
    }

        return (
            <>
                <h1>Product Details Component</h1>
                <div>
                    <p>name: {product?.name}</p>
                    <p>damage: {product?.base_damage}</p>
                    <p>can_be_buffed: {product?.can_be_buffed}</p>
                    <p>description: {product?.description}</p>
                    <p>posted: {product?.posted}</p>
                    <p>price: {product?.price.toFixed(2)} Souls</p>
                    <p>scaling_type: {product?.scaling_type}</p>
                    <p>seller_id: {product?.seller_id}</p>
                    <p>weapon_type: {product?.weapon_type}</p>
                    <p>url: {product?.image_url}</p>
                    <img src={product?.image_url} alt='product image'></img>
                </div>
                <div>
                    {session.user && product && product.seller_id === userId && (
                        <div id='owner_buttons'>
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                    <Reviews productId={productId}/>
                    {review && <ReviewForm productId={productId} hide={() => setReview(false)} />}
                    {review_user.length === 0 && <button className='detail-button' onClick={reviewClick}>Write a Review</button>}
                    {edit && <EditProduct productId={productId} hide={() => setEdit(false)} />}
                </div>
            </>
        )
    }

export default ProductDetails
