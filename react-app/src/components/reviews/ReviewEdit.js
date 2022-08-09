import React, { useState, useEffect } from 'react';
import { editReviewsThunk } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
//CSS import

function EditReview() {
    const dispatch = useDispatch();
    const { reviewId } = useParams();
    const history = useHistory();
    const review = useSelector(state => state.reviews[reviewId]);
    const productId = review.product_id;
    const [content, setContent] = useState(review.reviewBody);
    const [rating, setRating] = useState(review.rating);
    const [errors, setErrors] = useState([]);

    function onClick() {
        history.push(`/products/${productId}`);
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
            history.push(`/products/${productId}`);
        };
    };

    useEffect(() => {
        const arr = []
        if (rating < 1 || rating > 5) {
            arr.push("Please provide rating between 1 and 5.");
        };
        if (content.length > 255) {
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
                    <p>Rating: </p><input type='number' name='rating' placeholder='Rating' value={rating} onChange={e => setRating(e.target.value)}></input>
                </div>
                <div className='edit-buttons'>
                    <button type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
                    <button onClick={onClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditReview;
