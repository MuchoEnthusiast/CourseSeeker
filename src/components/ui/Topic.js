"use client";
import { useState } from "react";
import Attachment from "./Attachment";

export default function Topic({ topic }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="card w-100 border-0">
      <div className="d-flex align-items-center">
        <button className="btn btn-link text-decoration-none p-3 p-0 fs-4" onClick={() => setIsOpen(!isOpen)}>{isOpen ? (<i className="bi bi-chevron-up"></i>) : (<i className="bi bi-chevron-down"></i>)}</button>
        <h2 className="m-0 p-0">{topic.title}</h2>
      </div>

      
      {isOpen && (
        <div className="card-body ms-4">
          <p>
            {topic.description}
          </p>
          <div className="d-flex flex-wrap">
            {
              topic.attachments.map((attachment, index) => (
                <Attachment key={index} attachment={attachment} />
              ))
            }
          </div>
        </div>
      )}
      
    </div>
  );
}
