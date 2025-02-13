import { useEffect, useState } from "react";
import { Body } from "matter-js";

type TBallProps = {
  size: number;
  body: Body;
};

export function Ball({ size, body }: TBallProps) {
  const [position, setPosition] = useState<Matter.Vector>(body.position);

  useEffect(() => {
    let frame: number | undefined;
    const updateBallPosition = () => {
      setPosition({
        x: body.position.x,
        y: body.position.y,
      });
      frame = requestAnimationFrame(updateBallPosition);
    };

    updateBallPosition();

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [body]);

  return (
    <div
      className="ball"
      data-name="ball"
      style={{
        width: size * 2,
        height: size * 2,
        top: position.y,
        left: position.x,
      }}
    />
  );
}
