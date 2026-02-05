import { useState } from "react";

export default function HappyHearts() {
    const getRandomOffset = () => {
  const x = (Math.random() - 0.5) * 100; // от -50px до +50px
  const y = -Math.random() * 100;         // вверх до -100px
  return { x, y };
};

  const [hearts, setHearts] = useState([]);

  const handleClick = () => {
    const newHeart = { 
      id: Math.random(), 
      ...getRandomOffset() 
    };
    setHearts(prev => [...prev, newHeart]);
    
    // удалить сердце через 1 сек
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <span 
        className="heart" 
        onClick={handleClick} 
        style={{ fontSize: "60px", cursor: "pointer", display: "inline-block" }}
      >
        ❤️
      </span>

      {hearts.map(h => (
        <span key={h.id} className="floating-heart" style={{
          position: "absolute",
          left: `calc(50% + ${h.x}px)`,
          top: `calc(50% + ${h.y}px)`,
          fontSize: "24px",
          animation: "floatOut 1s ease-out forwards",
        }}>💖</span>
      ))}

      <style jsx>{`
        @keyframes floatOut {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, -50px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
