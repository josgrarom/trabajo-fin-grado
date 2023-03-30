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
      <ReviewsUserList/>
    </div>
    </>
  )



}
export default ReviewsList;