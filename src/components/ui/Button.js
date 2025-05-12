// Button component
export default function Button({ children, onClick, variant = 'primary', ...props }) {
  return (
    <button 
      className={`button ${variant}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
