import Matter from "matter-js";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TPinProps = {
  size: number;
  position: Matter.Vector;
  isHit: boolean;
};

export function Pin({ position, size, isHit }: TPinProps) {
  const [isGlow, setIsGlow] = useState(isHit);

  useEffect(() => {
    if (isHit) setIsGlow(true);

    const timeout = setTimeout(() => {
      setIsGlow(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isHit]);

  return (
    <div
      className={clsx("pin", isGlow && "pin--hit")}
      data-name="pin"
      style={{
        width: size * 2,
        height: size * 2,
        top: position.y,
        left: position.x,
      }}
    />
  );
}
