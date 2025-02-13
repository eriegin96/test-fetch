import clsx from "clsx";
import { Body } from "matter-js";
import { useEffect, useState } from "react";

type TMarkProps = {
  id: number;
  width: number;
  height: number;
  content: string;
  value: number;
  color: string;
  body: Body;
  isHit: boolean;
  clearHit: (id: number) => void;
};

export function Mark({
  id,
  width,
  height,
  body,
  color,
  content,
  isHit,
  clearHit,
}: TMarkProps) {
  const [isDown, setIsDown] = useState(isHit);

  useEffect(() => {
    if (isHit) setIsDown(true);
    const timeout = setTimeout(() => {
      setIsDown(false);
      clearHit(id);
    }, 300);
    clearHit(id);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, isHit, clearHit]);

  return (
    <div
      data-name="mark"
      className={clsx("mark", isDown && "mark--down")}
      style={{
        width: width,
        height: height,
        top: body.position.y,
        left: body.position.x,
        backgroundColor: color,
      }}
    >
      {content}
    </div>
  );
}
