"use client";
import { useState } from "react";

export default function Topic({ topic }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="card w-100 border-0">
      <div className="d-flex align-items-center">
        <button className="btn btn-link text-decoration-none p-3 p-0" onClick={() => setIsOpen(!isOpen)}>V</button>
        <h2 className="m-0 p-0">{topic.title}</h2>
      </div>

      
      {isOpen && (
        <div className="card-body">
          <p className="ms-4">
            {topic.description}
          </p>
        </div>
      )}
      
    </div>
  );
}
