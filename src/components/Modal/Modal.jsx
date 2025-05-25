import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      ></div>

      {/* Modal Panel */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          // Close modal if backdrop is clicked, but not if content inside modal is clicked
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
      {/* Basic CSS for modal animation - could be in a global CSS file or Tailwind config */}
      <style jsx global>{`
        @keyframes modalShowAnimation {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalShow {
          animation: modalShowAnimation 0.3s forwards;
        }
      `}</style>
    </>
  );
};

export default Modal;
