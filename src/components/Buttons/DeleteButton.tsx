import React from 'react';
import './Buttons.css';

interface DeleteButton {
    actionDelete: React.MouseEventHandler<HTMLDivElement>,
    id: string
}

const DeleteButton: React.FC<DeleteButton> = ({actionDelete, id}:DeleteButton) => {
    return (
        <div id={id} onClick={actionDelete} className="button-delete">&#215;</div>
    )
}

export default DeleteButton;
