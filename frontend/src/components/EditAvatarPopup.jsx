import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onLoading,
}) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar(avatar);
  }, [avatar]);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_edit_avatar"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на аватар"
        required
        onChange={handleChangeAvatar}
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  );
}
