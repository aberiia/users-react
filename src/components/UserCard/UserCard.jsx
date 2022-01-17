import React, { useState } from 'react';
import DeleteButton from '../Buttons/DeleteButton';
import ModalForm from '../Modal/Modal';
import { useSelector } from 'react-redux';
import {ReactComponent as Edit} from "../../assets/edit.svg";
import './UserCard.css';


export const UserCard = ({ picture, firstname, lastname, email, deleteButton, id, handleNameChange }) => {
    const [open, setOpen] = useState(false);
    const theme = useSelector((state) => state.theme);
    return (
        <div className={theme === "light" ? "user-data" : "user-data--dark"}>
            <div className="thumbnail-wrapper">
                <img className="thumbnail" src={picture} alt={firstname} />
            </div>
            <div className="user-info">
                <div className="user-name--wrapper">
                <p className="user-name">{firstname}</p>
                <p className="user-name">{lastname}</p>
                <Edit className="edit-button" width="14" height="14" onClick={() => setOpen(true)}/>
                </div>
        
                <p className="user-email">{email}</p>
            </div>
            <ModalForm 
                id={id}
                submitHandler={handleNameChange} 
                firstname={firstname} 
                lastname={lastname} 
                isOpen={open}
                onClose={() => setOpen(false)} 
            />
            
            <DeleteButton id={id} actionDelete={deleteButton} />
        </div>
    )
}