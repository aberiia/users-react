import React, { useState } from "react";
import DeleteButton from "../Buttons/DeleteButton.tsx";
import ModalForm from "../Modal/Modal.tsx";
import { useSelector } from "react-redux";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { RootState } from "../../redux/store/store";
import "./UserCard.css";

interface UserCard {
  picture: string,
  firstname: string,
  lastname: string,
  email: string,
  deleteButton: React.MouseEventHandler<HTMLButtonElement>,
  id: string,
  handleNameChange: React.ChangeEventHandler<HTMLInputElement>
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

      <DeleteButton id={id} actionDelete={deleteButton} />
    </div>
  );
};
