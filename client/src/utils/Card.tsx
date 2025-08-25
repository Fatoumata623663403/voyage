import React from "react";


interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  right?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, title, right }) => {
  return (
    <div className={`p-4 bg-white rounded shadow ${className}`}>
      {title || right ? (
        <div className="flex justify-between items-center mb-2">
          {title && <h3 className="font-bold">{title}</h3>}
          {right && <div>{right}</div>}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Card;