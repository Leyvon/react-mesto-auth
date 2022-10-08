import Popup from "./Popup";

const ImagePopup = ({card, isOpen, onClose}) => {
  return (
    <Popup isOpen={isOpen} name={"enlargement"} onClose={onClose}>
      <img
        className="popup__big-image"
        alt="большая картинка места"
        src={card.link}
      />
      <h3 className="popup__place-name">{card.name}</h3>
    </Popup>
  );
};

export default ImagePopup;
