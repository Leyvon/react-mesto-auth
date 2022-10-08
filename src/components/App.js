import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Registration from './Registration';
import InfoTooltipPopup from './InfoTooltipPopup';
import auth from '../utils/Auth';

function App() {
  // Все состояния открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  // Состояние загрузки, ожидание ответа от сервера
  const [isLoading, setIsLoading] = React.useState(false);
 
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoggedSuccessfully, setIsLoggedSuccessfully] = React.useState(false);
  
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards ] = React.useState([]);

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleShowInfoOpen = () => {
    setIsInfoTooltipPopupOpen(true);
  }

  const handleLoginIn = () => {
    setLoggedIn(!loggedIn);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  const handleUpdateUser = ({name, about}) => {
    setIsLoading(true);
    api.editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleUpdateAvatar = ({link}) => {
    setIsLoading(true);
    api.editUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked){
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
        })
        .catch((err) => {
          console.log(`${err}`); 
        });
    } else {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
        })
        .catch((err) => {
          console.log(`${err}`); 
        });
    }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`); 
      });
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    setIsLoading(true);
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getEmail = () => {
    const jwt = localStorage.getItem('token');
    if (jwt){
      auth.checkToken(jwt)
        .then((res) => {
          localStorage.setItem('email', res.data.email);
        })
        .catch((err) => {
          console.log(`${err}`); 
        });
    }
  }

  const submitLogin = (userEmail, password) => {
    auth.login(userEmail, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        handleLoginIn();
        getEmail();
        history.push('/');
      })
      .catch((err) => {
        console.log(`${err}`); 
      });
  }

  const submitRegist = (userEmail, password) => {
    auth.register(userEmail, password)
      .then((res) => {
        setIsLoggedSuccessfully(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsLoggedSuccessfully(false);
        console.log(`${err}`);
      })
      .finally(() => {
        handleShowInfoOpen();
      });
  }

  const exit = () => {
    handleLoginIn();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }

  React.useEffect(() => {
    getEmail();
    if (localStorage.getItem('email')) {
      handleLoginIn();
      history.push('/');
    }
  }, []);

  React.useEffect(() => {
    Promise.all([api.getInitialUserInfo(), api.getInitialCards()])
    .then(([UserInfo, InitialCards]) => {
      setCurrentUser(UserInfo);
      setCards(InitialCards);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      
      <div className="page">
      
        <Header loggedIn={loggedIn} onClick={exit} />
          <Switch>
            <ProtectedRoute
              exact
              path={"/"}
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick} 
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route exact path="/sign-in">
              <Login submit={submitLogin}/>
            </Route>

            <Route exact path="/sign-up">
              <Registration submit={submitRegist} />
            </Route>

            <Redirect to="/" />
          </Switch>
        <Footer />

      </div>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} /> 

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

      <InfoTooltipPopup status={isLoggedSuccessfully} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />
      
    </CurrentUserContext.Provider>
   
  );
}

export default App;
