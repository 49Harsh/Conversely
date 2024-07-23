import React, { useState, useEffect } from 'react';

const Matrix = () => {
  const [boxes, setBoxes] = useState(Array(9).fill({ clicked: false, order: null }));
  const [clickOrder, setClickOrder] = useState([]);
  const [lastClicked, setLastClicked] = useState(false);

  const handleClick = (index) => {
    if (lastClicked) return;

    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes];
      newBoxes[index] = { clicked: true, order: clickOrder.length };
      return newBoxes;
    });

    setClickOrder((prevOrder) => [...prevOrder, index]);

    if (clickOrder.length === 8) {
      setLastClicked(true);
    }
  };

  useEffect(() => {
    if (lastClicked) {
      clickOrder.forEach((index, order) => {
        setTimeout(() => {
          setBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            newBoxes[index] = { ...newBoxes[index], clicked: true, orange: true };
            return newBoxes;
          });
        }, order * 500);
      });
    }
  }, [lastClicked, clickOrder]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">Interactive 3x3 Matrix</h1>
      <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-lg">
        {boxes.map((box, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              box.clicked
                ? box.orange
                  ? 'bg-orange-500'
                  : 'bg-green-500'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
      <p className="mt-8 text-gray-600 text-center">
        Click on the boxes to change their color. <br />
        When you click the last box, they'll turn orange in the order you clicked them.
      </p>
    </div>
  );
};

export default Matrix;