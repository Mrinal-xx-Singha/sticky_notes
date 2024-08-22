import React, { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset,autoGrow } from "../utils";
import { setZIndex } from "../assets/fakeData";

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);

  let mouseStartPosition = { x: 0, y: 0 };
  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const textAreaRef = useRef(null);



  const mouseDown = (e) => {
    setZIndex(cardRef.current)
    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY,
    };

    console.log("mouseMoveDir", mouseMoveDir);
    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

     const newPosition = setNewOffset(cardRef.current,mouseMoveDir)

    setPosition(newPosition);
  };
  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
        onFocus={()=>{
            setZIndex(cardRef.current)
        }}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
