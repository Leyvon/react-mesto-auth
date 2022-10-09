import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      buttonText={"Сохранить"}
      loadingText={"Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className="popup__input popup__input_type_name"
        id="input-name"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.name || ""}
        required
      />
      <span className="input-name-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        id="input-about"
        type="text"
        name="about"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={values.about || ""}
        required
      />
      <span className="input-about-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
