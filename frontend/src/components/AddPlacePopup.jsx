import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddNewCard,
  onLoading,
}) {
  const [newPlace, setNewPlace] = useState("");
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    setNewPlace(newPlace);
    setNewLink(newLink);
  }, [newLink, newPlace]);

  function handleChangeNewPlace(e) {
    setNewPlace(e.target.value);
  }

  function handleChangeNewLink(e) {
    setNewLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddNewCard({
      name: newPlace,
      link: newLink,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText={onLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_theme_light popup__input_type_element-name"
        type="text"
        name="element-name"
        id="element-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeNewPlace}
      />
      <span className="popup__input-error element-name-error"></span>
      <input
        className="popup__input popup__input_theme_light popup__input_type_element-link"
        type="url"
        name="element-link"
        id="element-link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeNewLink}
      />
      <span className="popup__input-error element-link-error"></span>
    </PopupWithForm>
  );
}
