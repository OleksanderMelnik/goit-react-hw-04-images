import { useEffect, useCallback } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

export const Modal = ({ largeImageURL, alt, onCloseModal }) => {
  
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onCloseModal]);

  const handleClick = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

    return (
      <Overlay onClick={handleClick}>
        <ModalContent>
          <img src={largeImageURL} alt={alt} />
        </ModalContent>
      </Overlay>
    );
  }

