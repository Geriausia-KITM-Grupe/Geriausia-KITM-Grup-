import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="confirm-modal__backdrop">
      <div className="confirm-modal">
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button
            className="confirm-modal__btn confirm-modal__btn--confirm"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="confirm-modal__btn confirm-modal__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

// READ ME BEFORE USING THIS COMPONENT

// Simple logic to handle the modal visibility and actionsimport React, { useState } from "react";
// import ConfirmModal from "../../components/ConfirmModal";
// import "../../components/ConfirmModal.css";

// function example() {
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [exampleToRemove, setexampleToRemove] = useState(null);

//   // Handler to open confirm modal
//   const handleShowConfirm = (exampleId) => {
//     setexampleToRemove(exampleId);
//     setShowConfirm(true);
//   };

//   // Handler for confirming deletion
//   const confirmDelete = async () => {
//     if (exampleToRemove) {
//       // Replace this with your actual delete logic
//       console.log("Deleting example with id:", exampleToRemove);
//       setexampleToRemove(null);
//       setShowConfirm(false);
//     }
//   };

//   // Handler for canceling deletion
//   const cancelDelete = () => {
//     setexampleToRemove(null);
//     setShowConfirm(false);
//   };

//   return (
//     <div>
//       <h2>My examples</h2>
//       <ul>
//         {examples.map((example) => (
//           <li key={example.id}>
//             {example.name}
//             <button onClick={() => handleShowConfirm(example.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <ConfirmModal  (send props to ConfirmModal component)
//         isOpen={showConfirm}
//         message="Are you sure you want to remove this example?"
//         onConfirm={confirmDelete}
//         onCancel={cancelDelete}
//       />
//     </div>
//   );
// }

// export default Myexamples;
