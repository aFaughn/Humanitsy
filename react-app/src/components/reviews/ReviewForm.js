import React, { useEffect, useState } from 'react';
import { createReviewsThunk } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux'
import './ReviewForm.css';

function ReviewForm({ productId, hide }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);

    function onClick() {
        hide()
    }
    async function onSubmit(e) {
        e.preventDefault();

        const review = {
            user_id: user.id,
            product_id: productId,
            reviewBody: content,
            rating
        }

        const newReview = await dispatch(createReviewsThunk(review))
        if (newReview) {
            hide()
        }
        return newReview
    }
    useEffect(() => {
        const arr = []
        if (rating < 1 || rating > 5) {
            arr.push("Please provide rating between 1 and 5.")
        }
        if (content.length > 255) {
            arr.push('Please provide content in 255 characters.')
        }
        setErrors(arr)
    }, [rating, content]);

    return (
        <div className='review-form'>
            <form id='new-review-form' key={hide} onSubmit={onSubmit}>
                <div>
                    {errors.length > 0 && errors.map(error =>
                        <div key={error} className="review-error">{error}</div>
                    )}
                </div>
                <div>
                    <textarea className='review-content' name='content' value={content} placeholder="Bearer of the curse,- seek- seek- lest-" onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div className='review-rating'>
                    {/* Todo: Make clicking a rating button display what is currently selected. */}
                    <input type='radio' className='rate-product-button'></input>
                    <input type='radio' className='rate-product-button'></input>
                    <input type='radio' className='rate-product-button'></input>
                    <input type='radio' className='rate-product-button'></input>
                    <input type='radio' className='rate-product-button'></input>
                </div>
                <div className='review-actions'>
                    <button className='detail-button' type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
                    <button className='detail-button' onClick={onClick}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm
