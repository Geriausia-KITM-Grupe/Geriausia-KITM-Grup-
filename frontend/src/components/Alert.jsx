const Alert = ({ message, onClose }) => {
  if (!message) return null;
  const isSuccess = message.toLowerCase().includes("success");
  return (
    <div className={`alert ${isSuccess ? "alert--success" : "alert--error"}`}>
      {message}
      <button className="alert__close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
