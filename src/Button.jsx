import { useNavigate } from 'react-router-dom';
const Button = ({ text, className }) => {
  const navigate = useNavigate();

  return (
    <a
      onClick={(e) => {
        e.preventDefault(); // Prevent the default behavior of the link
        navigate('/interface'); // Navigate to /interface
      }}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
      </div>
    </a>
  );
};

export default Button;
