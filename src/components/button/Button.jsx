import "./button.styles.css";

function Button({ text, onClick, className, children }) {
  return (
    <button
      onClick={(e) => onClick && onClick(e)}
      className={`button ${className}`}
    >
      {text}
      {children}
    </button>
  );
}

export { Button };
