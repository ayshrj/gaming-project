import React, { useRef, useEffect } from "react";

const CircleCursor = ({ circleSize = 20 }) => {
  const circleRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const speed = 0.01;
      if (!circleRef.current) return;

      // Adjust for circle center
      const circleCenterX = mouse.current.x - circleSize / 2;
      const circleCenterY = mouse.current.y - circleSize / 2;

      const dx = mouse.current.x - previousMouse.current.x;
      const dy = mouse.current.y - previousMouse.current.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const mouseVelocity = Math.sqrt(dx * dx + dy * dy);
      const scaleValue = (Math.min(mouseVelocity * 4, 150) / 150) * 0.5;

      circleRef.current.style.transform = `
        translate(${circleCenterX}px, ${circleCenterY}px) 
        rotate(${angle}deg) 
        scale(${1 + scaleValue}, ${1 - scaleValue})
      `;

      previousMouse.current = { x: mouse.current.x, y: mouse.current.y };

      requestRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      className="circle"
      style={{
        position: "fixed",
        height: `${circleSize}px`,
        width: `${circleSize}px`,
        border: "1px solid white",
        borderRadius: "100%",
        pointerEvents: "none",
        // cursor: "hidden",
        // marginLeft: `-${circleSize / 2}px`,
        // marginTop: `-${circleSize / 2}px`,
        zIndex: 999999,
      }}
    />
  );
};

export default CircleCursor;
