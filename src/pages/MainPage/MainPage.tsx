import React, { useState, useEffect, useCallback } from "react";
import Loader from "../../components/Loader/Loader";
import { UserCard } from "../../components/UserCard/UserCard";
import { LoadMoreButton } from "../../components/Buttons/LoadMoreButton";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/getUsers";
import { InitUser } from "../../types/UserData";
import { RootState } from "../../redux/store/store";
import { deleteUser } from "../../redux/actions/deleteUser";
import CreateNewUser from "../../components/Buttons/CreateNewUser";

import "./MainPage.css";

type UsersArray = readonly InitUser[];

export default function MainPage(): JSX.Element {
  const theme = useSelector((state: RootState) => state.theme);

  const {
    error,
    loading,
    users: initUsers,
    count,
    isEnd,
    limit,
    offset
  } = useSelector((state: RootState) => state.users);
  // statuses

  const [userInp, setUserInp] = useState<string>("");
  const [filteredData, setFilteredData] = useState<UsersArray>([] || initUsers);
  console.log("initUsers", initUsers);
  // loading users on mount
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(limit, offset));
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
  const handleDelete =  (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLInputElement
    const id = el.getAttribute("id");
    dispatch(deleteUser(id));
    // setFilteredData(filteredData.filter((user) => user.id !== id));
  };

  const loadMore = useCallback(() => {
    dispatch(getUsers(limit, offset));
  }, [limit,offset]);

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
    return <div>`An error has occurred: {error}`</div>;
  }


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
            picture={"http://localhost:8080/api/users/getImage?path=6b2680cb9637e6551b28353a396a2d17.jpg"}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            limit={limit}
            offset ={offset}
          />
        ))}
        {filteredData.length === 0 && (
          <p className="message-notFound"> No users found</p>
        )}
        {!isEnd && <LoadMoreButton handler={loadMore} />}
      </div>
      
    </>
  );
}
