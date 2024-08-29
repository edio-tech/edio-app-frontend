const ErrorMessage = ({ errors }) => {
  if (!errors) return null;

  const errorMessage = Array.isArray(errors.detail) ? errors.detail[0]?.msg || "An unknown error occurred." : typeof errors === "string" ? errors : "An unknown error occurred.";

  return (
    <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
