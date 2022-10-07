

function ImagePopup({card, isOpen, onClose}){

  return (
    <div className={`popup popup_type_enlargement ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__field" onClick={(e) => e.stopPropagation()}>
        <img className="popup__big-image" alt="большая картинка места" src={card.link} />
        <h3 className="popup__place-name">{card.name}</h3>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;