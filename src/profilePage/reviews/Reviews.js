/* eslint-disable */


import React from 'react';
import BeautyStars from 'beauty-stars';
import './Reviews.css';

const Reviews = (props) => {

    const profileOnClick = param => e => {
        props.viewProfilePage(param);
    };

    return (
        <div class="reviews-container">
            {(props.reviews).map((review, index) => {
                return (
                    <div className="review-container" key={index}>
                            <div className="review-header">
                                <div class="reviewer-profile-img-container"></div>
                                <img class="reviewer-profile-img" onClick={profileOnClick(review.reviewer)} src={review.reviewer.photoURL}/>
                                <span class="reviewer-name" onClick={profileOnClick(review.reviewer)}> {review.reviewer.displayName}</span> | {review.date}
                                <BeautyStars value={review.rating} size="12" activeColor="#ebb134"/>
                            </div>
                        <div>{review.reviewBody}</div>
                    </div>
                )
            })}
        </div>
  );
}

export default Reviews;


