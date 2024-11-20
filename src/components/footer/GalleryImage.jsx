import React, { useState } from "react";
import Modal from "react-modal";

const images = [
  {
    src: "./src/assets/images/GalleryImage/gallery1.jpg",
    alt: "Image 1",
  },
  {
    src: "./src/assets/images/GalleryImage/gallery2.jpg",
    alt: "Image 2",
  },
  {
    src: "./src/assets/images/GalleryImage/gallery3.jpg",
    alt: "Image 3",
  },
  {
    src: "./src/assets/images/GalleryImage/gallery4.jpg",
    alt: "Image 4",
  },
  {
    src: "./src/assets/images/GalleryImage/gallery5.jpg",
    alt: "Image 5",
  },
  {
    src: "./src/assets/images/GalleryImage/gallery6.jpg",
    alt: "Image 6",
  },
];

function ImageGallery() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="cursor-pointer hover:scale-90 transition-all ease-in-out duration-300 w-1/6"
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <img
          src={selectedImage?.src}
          alt={selectedImage?.alt}
          className="w-full"
        />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default ImageGallery;
