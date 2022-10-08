import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  loadingText,
  children,
  onSubmit,
  isLoading,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={`form_${name}`} onSubmit={onSubmit}>
        {children}
        <button className="popup__button" type="submit">
          {isLoading ? loadingText : buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
