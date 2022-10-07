import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm 
    title={'Новое место'} 
    name={'add-item'}
    buttonText={'Создать'}
    loadingText={'Создание...'}
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}
    isLoading={isLoading}>
      <input 
      className="popup__input popup__input_type_place-name" 
      id="input-place-name" 
      type="text" 
      name="place-name" 
      placeholder="Название" 
      minLength="2" 
      maxLength="30"
      value={name || ''}
      onChange={handleNameChange}
      required />
      <span className="input-place-name-error popup__input-error"></span>
      <input 
      className="popup__input popup__input_type_link" 
      id="input-link" 
      type="url" 
      name="link" 
      placeholder="Ссылка на картинку" 
      value={link || ''}
      onChange={handleLinkChange}
      required />
      <span className="input-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;