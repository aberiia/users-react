import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { UserCard } from "../../components/UserCard/UserCard";
import { LoadMoreButton } from "../../components/Buttons/LoadMoreButton";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/getUsers";
import { InitUser } from "../../types/UserData";
import { RootState } from "../../redux/store/store";
import "./MainPage.css";
import { deleteUser } from "../../redux/actions/deleteUser";
import {updateUserInfo} from '../../redux/actions/updateUserInfo';
import CreateNewUser from "../../components/Buttons/CreateNewUser";
import {useNavigate} from 'react-router-dom';

type UsersArray = readonly InitUser[];

export default function MainPage(): JSX.Element {
  const theme = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();
  const {
    error,
    loading,
    users: initUsers,
  } = useSelector((state: RootState) => state.users);

  // statuses

  const [userInp, setUserInp] = useState<string>("");
  const [filteredData, setFilteredData] = useState<UsersArray>([] || initUsers);
  console.log("initUsers", initUsers);

  // loading users on mount
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (initUsers) {
      if (userInp !== "") setUserInp("");
      setFilteredData([...initUsers]);
    }
  }, [initUsers]);

  // changes userInput state
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserInp(event.target.value);

  //removes userCard from data list
  const handleDelete =  (e: Event & { target: HTMLDivElement }) => {
    const id = e.target.getAttribute("id");
    dispatch(deleteUser(id));
    refetch();
    // setFilteredData(filteredData.filter((user) => user.id !== id));
  };

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
    return <div>`An error has occurred: ${error.message}`</div>;
  }

  const refetch = () => {
    dispatch(getUsers());
  };

  return (
    <>
      
      <div className="data-container">
        <input
          className={theme === "light" ? "search-input" : "search-input--dark"}
          type="text"
          value={userInp}
          onChange={handleInput}
          placeholder="Search"
        />
        <CreateNewUser theme={theme}/>
        {filteredData.map((user) => (
          <UserCard
            id={user.id}
            deleteButton={handleDelete}
            key={user.id}
            picture={user.picture}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
          />
        ))}
        {filteredData.length === 0 && (
          <p className="message-notFound"> No users found</p>
        )}
        <LoadMoreButton handler={refetch} />
      </div>
      
    </>
  );
}
