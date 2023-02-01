import './AuthenticatedHome.css';
import SignOut from '../../components/signOut/SignOut';
import SearchBar from '../../components/searchBar/SearchBar';
function AuthenticatedHome() {

  return (
    <div>
      <SearchBar/>
      <SignOut/>
    </div>
  );
}

export default AuthenticatedHome;