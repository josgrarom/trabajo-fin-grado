import React from 'react'
import CreateList from '../../components/createList/CreateList';
import Userbar from '../../components/userBar/UserBar';
import UserGamesLists from '../../components/userGamesLists/UserGamesLists';
import UserProfileData from '../../components/userProfileData/UserProfileData';

function UserProfile() {
  
  return(
    <div>
      <Userbar/>
      <div>
        <UserProfileData/>
      </div>
      <div>
        <UserGamesLists/>
      </div>
      <div>
        <CreateList/>
      </div>
    </div>
  )
}

export default UserProfile;