import React from 'react'
import UserLists from '../../components/userLists/UserLists';
import { auth } from '../../api/firebaseConfig';

function UserData() {
  const user = auth.currentUser;
  return(
    <div>
      <h1>e-mail={user.email}</h1>
    </div>
  )
}

export default UserData;