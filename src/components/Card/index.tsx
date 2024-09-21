import React from 'react';

interface CardProps {
  id: number;
  image: string;
  flipped: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ id, image, flipped, onClick }) => {
  return (
    <div
      className={`w-36 h-48 m-2 cursor-pointer rounded-xl bg-cover bg-center  ${flipped ? '' : 'bg-card'}`}
      onClick={onClick}
    >
      {flipped ? (
        <img src={image} alt={`Pokemon ${id}`} className="w-full h-full object-cover rounded-xl" />
      ) : (
        <div className="w-full h-full"></div>
      )}
    </div>
  );
};
