import { useState } from 'react';
import {Modal} from '../Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem =({
  galleryItem: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

    return (     
        <>
          <GalleryItem onClick={toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
          </GalleryItem>
          {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={toggleModal}
          />
        )}
        </>
    );
  }
