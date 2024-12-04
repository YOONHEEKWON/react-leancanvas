import { useEffect, useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

export default function CanvasTitle({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false); //버튼 상태
  const [title, setTtitle] = useState(value); //수정완료 타이틀
  useEffect(() => {
    setTtitle(value);
  }, [value]);

  const handleDoneTitle = () => {
    setIsEditing(false);
    onChange(title);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleDoneTitle();
    }
  };

  return (
    <div className="flex items-center justify-center mb-10">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
            onKeyDown={handleKeyDown}
            value={title}
            onChange={e => setTtitle(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={handleDoneTitle}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center ">{title}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}
