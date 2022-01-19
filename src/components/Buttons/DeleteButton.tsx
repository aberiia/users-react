import React from 'react';
import './Buttons.css';

interface DeleteButton {
    handleDelete: React.MouseEventHandler<HTMLDivElement>,
    id: string
}

const DeleteButton: React.FC<DeleteButton> = ({handleDelete, id}:DeleteButton) => {
    return (
        <div id={id} onClick={handleDelete} className="button-delete">&#215;</div>
    )
}

export default DeleteButton;
