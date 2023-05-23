import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {  //функциональный компонент App

  const [cards, setCards] = useState([]);


  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() { // обработчик открытия попап профиля
    setIsEditProfilePopupOpen(true);
  }


  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  function handleAddPlaceClick() { // обработчик открытия попап добавления места
    setIsAddPlacePopupOpen(true);
  }


  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() { // обработчик открытия попап аватарки 
    setIsEditAvatarPopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  function handleCardClick(props) {
    setSelectedCard(props);
  }

  const [loggedIn, setLoggedIn] = useState(false);
  function handleLogin() {
    setLoggedIn(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      // обновите стейт cards - удаление карточки через filter (не пропускаем свою карточку)
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  const [currentUser, setCurrentUser] = useState({ name: '', about: '', _id: '' });

  useEffect(() => {
    api.getUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])

  function handleUpdateUser(inputData) {
    api.editUser(inputData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onUpdateAvatar(inputData) {
    api.changeAvatar(inputData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(inputData) {
    api.addNewCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        //закрытие попапа только в случае успеха
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }


  return (
    //BrowserRouter- для синхронизации пользовательского интерфейса с URL.Это родительский компонент, который используется для хранения всех остальных компонентов
    // Компонент BrowserRouter отслеживает историю навигации в процессе работы ReactRouter. 
    // Когда пользователь переходит назад или вперёд в браузере, BrowserRouter синхронизирует отображаемый контент.
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>

        <div className="root">

          <div className="page">

            <Header />

            <Routes>

              {/* sign-up - регистрация */}
              <Route path='/sign-up' /*element={<Register />}*/ />

              {/* sign-in - авторизация, вход, страница входа */}
              <Route path='/sign-in' element={<Login /*onAuthorization={handleAuthorization}*/ />} />
              <Route path="/" element={<ProtectedRouteElement element={Main} loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />} />



            </Routes>

            {/* 
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            /> */}

            <Footer />

          </div>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />



          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />



          <PopupWithForm
            name='confirmation-remove'
            title='Вы уверены?'
            submitText='Да'
          />


          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={onUpdateAvatar}
          />


        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;