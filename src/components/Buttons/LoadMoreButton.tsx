import React from 'react';
import './Buttons.css';

interface LoadMoreButton {
    handler: React.MouseEventHandler<HTMLButtonElement>
}

export const LoadMoreButton: React.FC<LoadMoreButton> = ({handler}: LoadMoreButton) => {
    
    return (
        <button className="refresh-button" onClick={handler}>Reload</button>
    )
}
