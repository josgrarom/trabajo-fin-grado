import React from 'react'
import CreateList from '../../components/createList/CreateList';
import UserData from '../../components/userData/UserData';
import UserFollows from '../../components/userFollows/UserFollows';
import UserGamesLists from '../../components/userGamesLists/UserGamesLists';


function UserProfile() {
  
  return(
    <div>

      <div>
        <UserData/>
      </div>

      <div>
        <UserGamesLists/>
      </div>
      <div>
        <CreateList/>
      </div>
      <div>
        <h1>Follows</h1>
        <UserFollows/>
      </div>
    </div>
  )
}

export default UserProfile;