// src/components/Modal.js
const Modal = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-[400px]">
          <h2 className="text-lg font-semibold mb-4">Aviso</h2>
          <p className="mb-4">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  