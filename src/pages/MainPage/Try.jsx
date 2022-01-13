import React, { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import Loader from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton';

const url = 'https://randomuser.me/api/?results=5';


export default function Try() {
    const [userInp, setUserInp] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const { data, error, isLoading, refetch } = useQuery("data", () =>
        fetch(url)
            .then((res) => res.json())
            .then(data => data.results));

    useEffect(() => {
        if (data) {
            setFilteredData([...data]);
        }
    }, [data]);

    const handleInput = (event) => setUserInp(event.target.value)
     useEffect(() => {
        !isLoading && setFilteredData(data);
      }, [isLoading, data]);
    
      useEffect(() => {
        data &&
        setFilteredData(
            [...data].filter((user) => {
              if (!!userInp) {
                let rg = new RegExp(userInp.toLowerCase());
                return rg.test(user.name.first.toLowerCase());
              }
              return user;
            })
          );
      }, [userInp]);
    if (isLoading) return <Loader />;
    if (error) return `An error has occurred: ${error.message}`;
    if (filteredData.length === 0) return <div> No users found</div>
    return (
        <div className='data-container'>
            <input className="search-input" type="text" value={userInp} onChange={handleInput} placeholder="Search" />
            {filteredData.map((user) => (
                <UserCard key={user.login.uuid} picture={user.picture.thumbnail} name={`${user.name.first} ${user.name.last}`} email={user.email} />
            ))}
            <LoadMoreButton handler={refetch} />
        </div>
    )
}
