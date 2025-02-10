import React, { useState } from "react";

interface DraggableBlockProps {
  color: string;
  text?: string;
  initialPosition?: { x: number; y: number };
}

export default function DraggableBlock({
  color,
  text = "DRAG ME!",
  initialPosition = { x: 0, y: 0 },
}: DraggableBlockProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setMousePos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - mousePos.x,
      y: e.clientY - mousePos.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className={`w-20 h-20 text-white flex items-center justify-center rounded-lg cursor-pointer absolute select-none text-center font-semibold`}
      style={{ left: position.x, top: position.y, backgroundColor: color }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {isDragging ? "DRAGGING" : text}
    </div>
  );
}
