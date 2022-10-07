import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, handle, onCardLike, onCardDelete}){
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки (true или false)
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const handleClick = () => {
    handle(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <li className="gallery__item">
      <img className="gallery__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="gallery__description">
        <h2 className="gallery__place">{card.name}</h2>
        <div className="gallery__mark">
          <button className={`gallery__heart ${isLiked && 'gallery__heart_active'}`} type="button" onClick={handleLikeClick}></button>
          <span className="gallery__count">{card.likes.length > 0 ? card.likes.length : ''}</span>
        </div>
      </div>
      {isOwn && <button className="gallery__delete-button" type="button" onClick={handleDeleteClick}></button>}
    </li>
  );
}

export default Card;