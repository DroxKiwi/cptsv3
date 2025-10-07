import React, { useEffect, useState, useRef } from "react";

const ScrollChangePosition = (props) => {
  const [position, setPosition] = useState("fixed"); // Gère la position (`fixed` ou `absolute`)
  const [offsetTop, setOffsetTop] = useState(0); // Garde en mémoire la position où fixer l'élément
  const shapeRef = useRef(null); // Référence de la forme

  useEffect(() => {
    if (props.targetRef) {
      const handleScroll = () => {
        if (props.targetRef.current && shapeRef.current) {
          const targetPosition = props.targetRef.current.getBoundingClientRect().top;
          const shapePosition = shapeRef.current.getBoundingClientRect().top;

          if (targetPosition <= 0 && position === "fixed") {
            // Passe à "absolute" et fixe la position actuelle
            setPosition("absolute");
            setOffsetTop(window.scrollY + shapePosition);
          } else if (targetPosition > 0 && position === "absolute") {
            // Repasse à "fixed" si on remonte
            setPosition("fixed");
          }
        }
      };

      // Ajouter un écouteur pour le défilement
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [position]);

  return (
    <div 
      ref={shapeRef}
      style={{
        position: position,
        top: position === "fixed" ? "150px" : `${offsetTop}px`,
        zIndex: 1000,
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="575" viewBox="0 0 1920 275" fill="none">
          <path d="M2019.32 249.542C2026.39 289.219 2135.42 523.265 2104.92 501.938C1759.11 260.125 105.199 401.425 -97.6837 198.542C-132.184 164.042 -225.378 -137.458 -64.6839 75.542C251.804 495.047 1985.82 61.5423 2019.32 249.542Z" fill="#008CDD" fill-opacity="0.33"/>
          <path d="M1969.4 143.604C1976.47 183.281 1999.9 292.932 1969.4 271.605C1623.58 29.7919 55.2778 295.487 -147.604 92.6045C-182.104 58.1044 -101.361 -21.1056 -66.6043 5.28917C351.896 323.105 1935.9 -44.3955 1969.4 143.604Z" fill="#008CDD" fill-opacity="0.33"/>
        </svg>
    </div>
  );
};

export default ScrollChangePosition;
