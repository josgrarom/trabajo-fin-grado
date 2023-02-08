import React from 'react'
import CreateList from '../../components/createList/CreateList';
import UserData from '../../components/userData/UserData';
import UserLists from '../../components/userLists/UserLists';


function UserProfile() {
  
  return(
    <div>

      <div>
        <UserData/>
      </div>

      <div>
        <UserLists/>
      </div>
      <div>
        <CreateList/>
      </div>
    </div>
  )
}

export default UserProfile;