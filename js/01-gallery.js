import { galleryItems } from "./gallery-items.js";

const list = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`
  )
  .join("");
list.insertAdjacentHTML("beforeend", markup);

list.addEventListener("click", openModal);

function openModal(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const modalImg = evt.target.dataset.source;
  const instance = basicLightbox.create(
    ` <img src="${modalImg}" width="800" height="600">`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeModal);
      },

      onClose: (instance) => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  );

  instance.show();

  function closeModal(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}