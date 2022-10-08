import success from "../images/success.svg";
import error from "../images/error.svg";
import Popup from "./Popup";

const InfoTooltipPopup = ({status, isOpen, onClose}) => {
  return (
    <Popup isOpen={isOpen} name="info-tool-tip" onClose={onClose}>
      {status ? (
        <>
          <img className="popup__img" src={success} alt="успех" />
          <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
        </>
      ) : (
        <>
          <img className="popup__img" src={error} alt="ошибка" />
          <h2 className="popup__title">
            Что-то пошло не так! Попробуйте ещё раз.
          </h2>
        </>
      )}
    </Popup>
  );
};

export default InfoTooltipPopup;
