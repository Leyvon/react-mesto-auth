import success from '../images/success.svg';
import error from '../images/error.svg';

const InfoTooltipPopup = ({status, isOpen, onClose}) => {
  return (
    <div className={`popup popup_type_info-tool-tip ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        {status ? 
          <>
            <img className="popup__img" src={success} alt="успех" />
            <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
          </>
          :
          <>
            <img className="popup__img" src={error} alt="ошибка" />
            <h2 className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
          </>
        }
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltipPopup;