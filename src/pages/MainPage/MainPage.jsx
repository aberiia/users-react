import React, { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import Loader from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton';
import { useSelector,useDispatch } from 'react-redux';
import { getUsers } from '../../actions/getUsers';
import './MainPage.css';
import store from '../../store/store';

const url = 'https://randomuser.me/api/?results=30';

export default function MainPage() {
  const theme = useSelector((state) => state.theme);  
  const initUsers = useSelector((state) => state.users);
  // statuses
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
 
  const [userInp, setUserInp] = useState('');
  const [filteredData, setFilteredData] = useState([] || initUsers.users[0]);

  // loading users on mount
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (initUsers.users[0]) {
      if (userInp !== '') setUserInp('');
      setFilteredData([...initUsers.users[0]]);
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
    initUsers.users[0] &&
      setFilteredData(
        [...initUsers.users[0]].filter((user) => {
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
