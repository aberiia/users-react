import React, { useState, useEffect } from 'react';
import DeleteButton from '../Buttons/DeleteButton';
import ModalForm from '../Modal/Modal';
import {ReactComponent as Edit} from "../../assets/edit.svg";
import './UserCard.css';


export const UserCard = ({ picture, firstname, lastname, email, deleteButton, id, handleNameChange }) => {
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState(firstname);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     const body = document.querySelector('body');
    //     body.style.overflow = open ? 'hidden' : 'auto';
    //   }, [open]);

    const handleEditMode = () => {
        setEditing(!editing);
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleUpdateDone = (e) => {
        if (e.key === "Enter" && input.length > 0) {
            setEditing(false);
        }
    }
    return (
        <div className="user-data">
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