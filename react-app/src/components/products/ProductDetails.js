import react, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory} from 'react-router-dom'
import { GetProductThunk, DeleteProductThunk, EditProductThunk, GetProductDetailThunk } from '../../store/products'
import { getReviewsThunk, deleteReviewThunk, editReviewsThunk } from '../../store/reviews'
// Cart Imports //

function ProductDetails() {
    const dispatch = useDispatch()
    const{ productId} = useParams()
    // const userId = useSelector(state => state.session.user?.id)
    //  const cart = useSelector(state => state.cart[id])
    const reviews = useSelector(state => state.reviewReducer)
    const history = useHistory()
    const [review, setReview] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(()=> {
        dispatch(GetProductThunk())
    },[dispatch, productId])

    const product = useSelector(state => state.productReducer[productId])


    async function handleDelete(e) {
        e.preventDefault();
        await fetch(`/api/products/${productId}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async () => await dispatch(DeleteProductThunk(productId)));
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
                    <button onClick={handleDelete}>Delete This Product</button>
                </div>
            </>
        )
    }

export default ProductDetails
