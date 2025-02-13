import clsx from "clsx";
import { Body } from "matter-js";
import { useEffect, useState } from "react";

type TMarkProps = {
  width: number;
  height: number;
  content: string;
  value: number;
  color: string;
  body: Body;
  isHit: boolean;
};

export function Mark({
  width,
  height,
  body,
  color,
  content,
  isHit,
}: TMarkProps) {
  const [isDown, setIsDown] = useState(isHit);

  useEffect(() => {
    if (isHit) setIsDown(true);

    const timeout = setTimeout(() => {
      setIsDown(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [isHit]);

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
