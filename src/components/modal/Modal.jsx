

import './styles.scss'; // Import your CSS file for styling

const ModalComp = ({ isOpen, onClose,content }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay2" onClick={onClose}>
          <div className="modal2" onClick={(e)=>e.stopPropagation()}>
            <span className="close2" onClick={onClose}>&times;</span>
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
