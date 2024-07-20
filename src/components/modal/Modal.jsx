// Modal.js

import './styles.scss'; // Import your CSS file for styling

const ModalComp = ({ isOpen, onClose,content }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <span className="close" onClick={onClose}>&times;</span>
            <div className="modal-content">
            
              
            {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComp;
