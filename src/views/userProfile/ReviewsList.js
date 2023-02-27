import React from 'react'
import Userbar from '../../components/userBar/UserBar';
import ReviewsUserList from '../../components/reviewsUserList/ReviewsUserList';

function ReviewsList(){

  return(
    <>
    <div>
      <Userbar/>
    </div>
    <div>
      <h1>Reviews</h1>
      <ReviewsUserList/>
    </div>
    </>
  )



}
export default ReviewsList;