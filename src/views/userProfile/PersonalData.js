import React from 'react'
import ChangePassword from '../../components/changePassword/ChangePassword';
import DeleteUser from '../../components/deleteUser/DeleteUser';
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
    <div>
      <ChangePassword/>
    </div>
    <div>
      <DeleteUser/>
    </div>
    
    </>
  )



}
export default PersonalData;