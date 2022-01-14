import React from 'react';
import './Buttons.css';

export default function DeleteButton({actionDelete, id}) {
    return (
        <div id={id} onClick={actionDelete} className="button-delete">&#215;</div>
    )
}
