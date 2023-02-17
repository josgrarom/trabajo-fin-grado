import React from 'react'
import Userbar from '../../components/userBar/UserBar';
import UserData from '../../components/userData/UserData';
function PersonalData(){

  return(
    <>
    <div>
      <Userbar/>
    </div>
    <div>
      <h1>Datos</h1>
      <UserData/>
    </div>
    </>
  )



}
export default PersonalData;