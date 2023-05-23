import React from 'react'
import Userbar from '../../components/userBar/UserBar';
import UserData from '../../components/userData/UserData';
function PersonalData(){

  return(
    <>
      <div>
        <div>
          <Userbar/>
        </div>
        <div>
          <UserData/>
        </div>
      </div>
    </>
  )



}
export default PersonalData;