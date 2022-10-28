import React, { useState, useEffect } from 'react';
import { editReviewsThunk, getReviewsThunk } from '../../store/reviews';
import { GetProductThunk } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './ReviewEdit.css'

function EditReview() {
    const dispatch = useDispatch();
    const { reviewId } = useParams();
    const history = useHistory();
    const review = useSelector(state => state.reviews[reviewId]);
    const [errors, setErrors] = useState([]);
    if (review?.product_id) window.localStorage.setItem('reviewProductId', JSON.stringify(review?.product_id))
    if (review?.reviewBody) window.localStorage.setItem('reviewContent', JSON.stringify(review?.reviewBody))
    if (review?.rating) window.localStorage.setItem('reviewRating', JSON.stringify(review?.rating))
    const [content, setContent] = useState(JSON.parse(window.localStorage.getItem('reviewContent')));
    const [rating, setRating] = useState(JSON.parse(window.localStorage.getItem('reviewRating')));

    useEffect(() => async () => {
       await dispatch(getReviewsThunk())
       await dispatch(GetProductThunk())
    },[dispatch])

    console.log(reviewId, review, content, rating);

    function onClick() {
        history.push(`/products/${review.product_id ? review.product_id : JSON.parse(window.localStorage.getItem('reviewProductId'))}`);
    };

    async function onSubmit(e) {
        e.preventDefault();
        const review = {
            id: reviewId,
            reviewBody: content,
            rating
        };
        const editedReview = await dispatch(editReviewsThunk(review));
        if (editedReview) {
            console.log(review?.product_id)
            history.push(`/products/${JSON.parse(window.localStorage.getItem('reviewProductId'))}`);
        };
    };

    useEffect(() => {
        const arr = []
        if (rating < 1 || rating > 5) {
            arr.push("Please provide rating between 1 and 5.");
        };
        if (content?.length > 255) {
            arr.push('Please provide content in 255 characters.');
        };
        setErrors(arr);
    }, [rating, content]);

    return (
        <div className='edit-form'>
            <h3>Edit Your Review</h3>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.length > 0 && errors.map(error =>
                        <div key={error} className="edit-error">{error}</div>
                    )}
                </div>
                <div className='edit-content'>
                    <textarea name='content' placeholder="Write your edit here...or don't!" value={content} onChange={e => setContent(e.target.value)} ></textarea>
                </div>
                <div className='edit-rating'>
                    <p>Rating: </p><input type='number' name='rating' placeholder='1-5' value={rating} onChange={e => setRating(e.target.value)}></input>
                </div>
                <div className='edit-buttons'>
                    <button className='detail-button' type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
                    <button className='detail-button' onClick={onClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditReview;
