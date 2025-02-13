import Matter from "matter-js";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TPinProps = {
  id: number;
  size: number;
  position: Matter.Vector;
  isHit: boolean;
  clearHit: (id: number) => void;
};

export function Pin({ id, position, size, isHit, clearHit }: TPinProps) {
  const [isGlow, setIsGlow] = useState(isHit);

  useEffect(() => {
    if (isHit) setIsGlow(true);
    const timeout = setTimeout(() => {
      setIsGlow(false);
      clearHit(id);
    }, 300);
    clearHit(id);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, isHit, clearHit]);

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
    ></div>
  );
}
