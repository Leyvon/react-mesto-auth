import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: values["place-name"],
      link: values.link,
    });
  };

  React.useEffect(() => {
    setValues({ "place-name": "", link: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-item"}
      buttonText={"Создать"}
      loadingText={"Создание..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className="popup__input popup__input_type_place-name"
        id="input-place-name"
        type="text"
        name="place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values["place-name"] || ""}
        onChange={handleChange}
        required
      />
      <span className="input-place-name-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="input-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={values.link || ""}
        onChange={handleChange}
        required
      />
      <span className="input-link-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
