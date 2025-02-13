import clsx from "clsx";
import { useEffect, useState } from "react";

type TScoreProps = {
  index: number;
  content: string;
  color: string;
};

export const Score = ({ color, content, index }: TScoreProps) => {
  const [isDown, setIsDown] = useState(true);

  useEffect(() => {
    setIsDown(true);

    const timeout = setTimeout(() => {
      setIsDown(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  return (
    <div
      className={clsx("score", isDown && "score--slide-down")}
      style={{ backgroundColor: color }}
    >
      {content}
    </div>
  );
};
