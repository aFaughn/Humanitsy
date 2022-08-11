import React, { useState, useEffect } from 'react';
import { getReviewsThunk } from '../../store/reviews';
import { deleteReviewThunk } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Reviews.css'

function Reviews({ productId }) {
    const dispatch = useDispatch();
    const allReviews = Object.values(useSelector(state => state.reviews))
    const reviews = allReviews.filter(review => (review.product_id === Number(productId)))
    const user = useSelector(state => state.session.user)
    const [users, setUsers] = useState([]);

    const avgOf = (array) => {
        let total = 0;
        if (!array.length) {
            return null;
        } else {
            for (let i = 0; i < array.length; i++) {
                let num = array[i];
                total += num
            };
            return total / array.length
        }
    }

    const averageScore = avgOf(reviews.map(review => review.rating))

    const userMatcher = (userArr, id) => {
        return userArr?.find(user => user.id === id)?.username
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
        dispatch(getReviewsThunk())
    }, [dispatch])

    function onDelete(e) {
        e.preventDefault();
        let id = e.target.className.split('-')[1]
        dispatch(deleteReviewThunk(id))

    }

    return (
        <>
            {reviews &&
                <div className='reviews-container'>
                    <div id='average-review-container'>
                    {!averageScore && (
                        <h2>Nobody has used this weapon yet! (or has lived to tell the tale...)</h2>
                        )}
                    {averageScore && (
                        <h2>Average Rating: {'⭐'.repeat(averageScore)}</h2>
                        )}
                    </div>
                    <h3>Ramblings of Mad Hollows (aka Reviews)</h3>
                    {reviews.map(review => {
                        return (
                            <div key={review.id} className='review-card'>
                                {!review.reviewBody && (
                                    <div className='review-content'>
                                        {userMatcher(users, review.user_id)} is having conniptions...
                                    </div>
                                )}
                                {review.reviewBody && (
                                    <div className='review-speechless'>
                                        <p>{userMatcher(users, review.user_id)}: "{review.reviewBody}"</p>
                                    </div>
                                )}
                                <p className='rating-stars'>{userMatcher(users, review.user_id)}'s rating: {'⭐'.repeat(review.rating)}</p>
                                {user && user.id === review.user_id && (
                                    <div className='review-action-buttons'>
                                        <NavLink to={`/edit/${review.id}`}>
                                            <button id='edit-review' className={`edit-${review.id}`}>Edit</button>
                                        </NavLink>
                                        <button id='delete-review' className={`delete-${review.id}`} onClick={onDelete}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}

                </div>
            }
        </>
    )
}

export default Reviews
