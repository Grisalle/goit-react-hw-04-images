import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ handlerCloseModal, selectedIMG }) => {
  useEffect(() => {
    const onEsc = e => {
      if (e.code !== 'Escape') {
        return;
      }
      handlerCloseModal();
    };
    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [handlerCloseModal]);

  const onOverlayClick = ({ target }) => {
    if (!target.classList.contains('Overlay')) {
      return;
    }
    handlerCloseModal();
  };

  return (
    <div className="Overlay" onClick={onOverlayClick}>
      <div className="Modal">
        <img src={selectedIMG} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  selectedIMG: PropTypes.string.isRequired,
  handlerCloseModal: PropTypes.func.isRequired,
};
