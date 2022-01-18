import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton';
import { useSelector,useDispatch } from 'react-redux';
import { getUsers } from '../../redux/actions/getUsers';
import './MainPage.css';

export default function MainPage() {
  const theme = useSelector((state) => state.theme);  

  const {error, loading, users: initUsers}=useSelector(state=> state.users);
  
  // statuses
 
  const [userInp, setUserInp] = useState('');
  const [filteredData, setFilteredData] = useState([] || initUsers);

  // loading users on mount
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (initUsers) {
      if (userInp !== '') setUserInp('');
      setFilteredData([...initUsers]);
    }
  }, [initUsers]);

  // changes userInput state 
  const handleInput = (event) => setUserInp(event.target.value)

  //removes userCard from data list 
  const handleDelete = (e) => {
    const id = e.target.getAttribute("id")
    setFilteredData(filteredData.filter(user => user.login.uuid !== id));
  }

  const handleEdit = (e, firstname,lastname) => {
    const id = e.target.getAttribute("id");
    
    setFilteredData(filteredData.map(user => {
        if (user.login.uuid === id) {
          user.name.first = firstname
          user.name.last = lastname
        }
        return user;
      })
    );
  }
 
  useEffect(() => {
    initUsers &&
      setFilteredData(
        [...initUsers].filter((user) => {
          if (!!userInp) {
            let rg = new RegExp(userInp.toUpperCase());
            return rg.test(user.name.first.toUpperCase());
          }
          return user;
        })
      );
  }, [userInp]);

  if (loading) return <Loader />;

  if (error !== null) {
    return `An error has occurred: ${error.message}`;
  }

  const refetch = () => {
    dispatch(getUsers());
  }

  return (
    <div className='data-container'>
      <input className={theme ==="light"? "search-input": "search-input--dark" } type="text" value={userInp} onChange={handleInput} placeholder="Search" />
      {filteredData.map((user) => (
        <UserCard handleNameChange={handleEdit} id={user.login.uuid} deleteButton={handleDelete} key={user.login.uuid} picture={user.picture.thumbnail} firstname={user.name.first} lastname={user.name.last} email={user.email} />
      ))}
      {filteredData.length === 0 && <p className="message-notFound"> No users found</p>}
      <LoadMoreButton handler={refetch} />
    </div>
  )
}
