import { useEffect, useCallback } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

export const Modal = ({ largeImageURL, alt, modalClick }) => {
  
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        modalClick();
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [modalClick]);

  const handleClick = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        modalClick();
      }
    },
    [modalClick]
  );

    return (
      <Overlay onClick={handleClick}>
        <ModalContent>
          <img src={largeImageURL} alt={alt} />
        </ModalContent>
      </Overlay>
    );
  }

