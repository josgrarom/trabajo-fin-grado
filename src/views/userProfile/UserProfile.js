import React from 'react'
import { useParams } from 'react-router-dom';
import { auth } from '../../api/firebaseConfig';
import CreateList from '../../components/createList/CreateList';
import Userbar from '../../components/userBar/UserBar';
import UserGamesLists from '../../components/userGamesLists/UserGamesLists';
import UserProfileData from '../../components/userProfileData/UserProfileData';

function UserProfile() {
  const {id} = useParams();
  const userId = auth.currentUser.uid;
  var otherUser = true;
  if(id===undefined)otherUser=false
  return(
    <div>
      {id===undefined&&
      <Userbar/>}
      <div>
        <UserProfileData id={id} image="default-avatar-profile.jpg"/>
      </div>
      {id===undefined&&
      <div>
        <CreateList/>
      </div>}
      <div>
      {id===undefined?(<UserGamesLists otherUser={otherUser} id={userId}/>):
      (<UserGamesLists otherUser={otherUser} id={id}/>)}        
      </div>
    </div>
  )
}

export default UserProfile;