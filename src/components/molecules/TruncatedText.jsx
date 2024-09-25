import { useState } from 'react'

const TruncatedText = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleText = () => {
      setIsExpanded(!isExpanded);
    };
  
    const truncatedText = text.length > maxLength && !isExpanded
      ? `${text.substring(0, maxLength)}`
      : text;
  
    return (
      <span>
        {truncatedText}
        {text.length > maxLength && (
          <button
            onClick={toggleText}
            className="text-blue-500 hover:underline ml-1"
          >
            {isExpanded ? 'tutup' : 'selengkapnya...'}
          </button>
        )}
      </span>
    );
  };

export default TruncatedText;