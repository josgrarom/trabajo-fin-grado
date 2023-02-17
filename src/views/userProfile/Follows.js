import React from 'react'
import Userbar from '../../components/userBar/UserBar';
import UserFollows from '../../components/userFollows/UserFollows';

function Follows(){

  return(
    <>
    <div>
      <Userbar/>
    </div>
    <div>
      <h1>Follows</h1>
      <UserFollows/>
    </div>
    </>
  )



}
export default Follows;