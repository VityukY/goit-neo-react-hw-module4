import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement');

export default function ImageModal({fullImage, imageAlt, closeHandler, modalIsOpen}) {
  Modal.setAppElement('#root');
  return (
    <div>
      <Modal
        
        isOpen={modalIsOpen}
        onRequestClose={closeHandler}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img height={600} src={fullImage} alt={imageAlt} />
      </Modal>
    </div>
  );
}

