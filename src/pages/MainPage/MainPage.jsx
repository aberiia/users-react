import React, { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import Loader from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton';
import './MainPage.css';

const url = 'https://randomuser.me/api/?results=30';

export default function Try() {
  const [userInp, setUserInp] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { data, error, status, isLoading, refetch } = useQuery("data", () =>
    fetch(url)
      .then((res) => res.json())
      .then(data => data.results));

  useEffect(() => {
    if (data) {
      if (userInp !== '') setUserInp('');
      setFilteredData([...data]);
    }
  }, [data]);

  // changes userInput state 
  const handleInput = (event) => setUserInp(event.target.value)
  useEffect(() => {
    !isLoading && setFilteredData(data);
  }, [isLoading, data]);

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
    data &&
      setFilteredData(
        [...data].filter((user) => {
          if (!!userInp) {
            let rg = new RegExp(userInp.toUpperCase());
            return rg.test(user.name.first.toUpperCase());
          }
          return user;
        })
      );
  }, [userInp]);

  console.log(status)
  if (isLoading) return <Loader />;

  if (error) {
    return `An error has occurred: ${error.message}`;
  }


  return (
    <div className='data-container'>

      <input className="search-input" type="text" value={userInp} onChange={handleInput} placeholder="Search" />
      {filteredData.map((user) => (
        <UserCard handleNameChange={handleEdit} id={user.login.uuid} deleteButton={handleDelete} key={user.login.uuid} picture={user.picture.thumbnail} firstname={user.name.first} lastname={user.name.last} email={user.email} />
      ))}
      {filteredData.length === 0 && <p className="message-notFound"> No users found</p>}
      <LoadMoreButton handler={refetch} />
    </div>
  )
}
