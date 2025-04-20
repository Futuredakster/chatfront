const Buttons = ({ text, className }) => {
    return (
      <a
        href="https://platform.openai.com/playground/assistants?assistant=asst_wrelSU6kbn1FmXbraHXoEdd1&mode=assistant"
        target="_blank" // opens in a new tab
        rel="noopener noreferrer" // security best practice
        className={`${className ?? ""} cta-wrapper`}
      >
        <div className="cta-button group">
          <div className="bg-circle" />
          <p className="text">{text}</p>
        </div>
      </a>
    );
  };
  
  export default Buttons;
  
  
