import React, { useState } from "react";

function Card({name, image}) {
  const [{xCoord, yCoord, degree}] = useState({
    xCoord: Math.random() * 40 - 20,
    yCoord: Math.random() * 40 - 20,
    degree: Math.random() * 90 - 45
  });
  const transform = `translate(${xCoord}px, ${yCoord}px) rotate(${degree}deg)`;

  return <img className="Card"
            alt={name}
            src={image}
            style={{transform}} />;
}

export default Card