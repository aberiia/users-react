import React, {useState} from 'react';
import NewUserModal from '../Modal/NewUserModal';
import './Buttons.css';

export default function CreateNewUser({theme}) {
    const [open, setOpen] = useState(false);
    const handleAddUser = () => {
        setOpen(true);
    }
  return (
    <>
    <div className='create_new_user-button' onClick={handleAddUser}>&#43;</div>
    <NewUserModal
        theme={theme}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
    );
}
