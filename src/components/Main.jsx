import bigEditButton from '../images/big-edit-button.svg';
import addButton from '../images/add-button.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="ваша аватарка" />
          <button className="profile__edit-avatar-button" type="button" onClick={onEditAvatar}><img className="profile__edit-avatar-img" src={bigEditButton} alt="изменить" /></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}><img className="profile__plus" src={addButton} alt="плюс" /></button>
      </section>

      <section className="gallery">
        <ul className="gallery__items">

          {cards.map((card) => 
            (<Card 
              card={card} 
              key={card._id} 
              handle={onCardClick} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete} />)
          )}

        </ul>
      </section>
    </main>
  );
}

export default Main;