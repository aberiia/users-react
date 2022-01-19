import React, { useState } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import ModalForm from "../Modal/Modal";
import { useSelector } from "react-redux";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { RootState } from "../../redux/store/store";
import "./UserCard.css";
import {HandleEdit} from '../../types/Handlers';

interface UserCard {
  picture: string,
  firstname: string,
  lastname: string,
  email: string,
  deleteButton: React.MouseEventHandler<HTMLDivElement>,
  id: string,
  handleNameChange: HandleEdit
}

export const UserCard: React.FC<UserCard>= ({
  picture,
  firstname,
  lastname,
  email,
  deleteButton,
  id,
  handleNameChange,
}: UserCard) => {
  const [open, setOpen] = useState(false);
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <div className={theme === "light" ? "user-data" : "user-data--dark"}>
      <div className="thumbnail-wrapper">
        <img className="thumbnail" src={picture} alt={firstname} />
      </div>
      <div className="user-info">
        <div className="user-name--wrapper">
          <p className="user-name">{firstname}</p>
          <p className="user-name">{lastname}</p>
          <Edit
            className="edit-button"
            width="14"
            height="14"
            onClick={() => setOpen(true)}
          />
        </div>

        <p className="user-email">{email}</p>
      </div>
      <ModalForm
        theme={theme}
        id={id}
        submitHandler={handleNameChange}
        firstname={firstname}
        lastname={lastname}
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <DeleteButton id={id} handleDelete={deleteButton} />
    </div>
  );
};