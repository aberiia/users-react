import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { UserCard } from "../../components/UserCard/UserCard";
import { LoadMoreButton } from "../../components/Buttons/LoadMoreButton";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/getUsers";
import { InitUser } from "../../types/UserData";
import "./MainPage.css";
import { RootState } from "../../redux/store/store";

type UsersArray = readonly InitUser[];

export default function MainPage(): JSX.Element {
  const theme = useSelector((state: RootState) => state.theme);

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
  const handleDelete = (e: Event & { target: HTMLDivElement }) => {
    const id = e.target.getAttribute("id");
    setFilteredData(filteredData.filter((user) => user.login.uuid !== id));
  };

  const handleEdit = (
    e: Event & { target: HTMLDivElement },
    firstname: string,
    lastname: string
  ) => {
    const id = e.target.getAttribute("id");

    setFilteredData(
      filteredData.map((user) => {
        if (user.login.uuid === id) {
          user.name.first = firstname;
          user.name.last = lastname;
        }
        return user;
      })
    );
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
      (
      <div className="data-container">
        <input
          className={theme === "light" ? "search-input" : "search-input--dark"}
          type="text"
          value={userInp}
          onChange={handleInput}
          placeholder="Search"
        />
        {filteredData.map((user) => (
          <UserCard
            handleNameChange={handleEdit}
            id={user.login.uuid}
            deleteButton={handleDelete}
            key={user.login.uuid}
            picture={user.picture.thumbnail}
            firstname={user.name.first}
            lastname={user.name.last}
            email={user.email}
          />
        ))}
        {filteredData.length === 0 && (
          <p className="message-notFound"> No users found</p>
        )}
        <LoadMoreButton handler={refetch} />
      </div>
      )
    </>
  );
}
