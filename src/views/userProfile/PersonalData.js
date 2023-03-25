import React from 'react'
import ChangePassword from '../../components/changePassword/ChangePassword';
import ChangeUsername from '../../components/changeUsername/ChangeUsername';
import DeleteUser from '../../components/deleteUser/DeleteUser';
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
        <div>
          <ChangePassword/>
        </div>
        <div>
          <ChangeUsername/>
        </div>
        <div>
          <DeleteUser/>
        </div>
      </div>
    </>
  )



}
export default PersonalData;