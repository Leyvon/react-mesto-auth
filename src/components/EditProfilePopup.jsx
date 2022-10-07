import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, isLoading}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  } 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  return (
    <PopupWithForm 
    title={'Редактировать профиль'} 
    name={'edit-profile'}
    buttonText={'Сохранить'}
    loadingText={'Сохранение...'}
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}
    isLoading={isLoading}>
      <input 
      className="popup__input popup__input_type_name" 
      id="input-name" 
      type="text" 
      name="name" 
      placeholder="Имя" 
      minLength="2" 
      maxLength="40"
      onChange={handleNameChange}
      value={name || ''}
      required />
      <span className="input-name-error popup__input-error"></span>
      <input 
      className="popup__input popup__input_type_about" 
      id="input-about" 
      type="text" 
      name="about" 
      placeholder="Описание" 
      minLength="2" 
      maxLength="200"
      onChange={handleDescriptionChange}
      value={description || ''}
      required />
      <span className="input-about-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;