import { useState } from 'react';
import Modal from 'react-modal';

const images = [
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733914254/gallery1_usdfxw.jpg',
    alt: 'Image 1',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733914254/gallery2_nsgfo5.jpg',
    alt: 'Image 2',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733914254/gallery3_wibuio.jpg',
    alt: 'Image 3',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733914255/gallery4_okwbcm.jpg',
    alt: 'Image 4',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733914255/gallery5_gv0ctx.jpg',
    alt: 'Image 5',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733914254/gallery2_nsgfo5.jpg',
    alt: 'Image 6',
  },
];

function ImageGallery() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // const openModal = (image) => {
  //   setSelectedImage(image);
  //   setModalIsOpen(true);
  // };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className=''>
      <div className='flex justify-center items-center'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className='cursor-pointer transition-all ease-in-out duration-300 w-1/6'
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        className='modal'
        overlayClassName='overlay'
      >
        <img src={selectedImage?.src} alt={selectedImage?.alt} className='w-full' />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default ImageGallery;
