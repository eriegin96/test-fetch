import clsx from "clsx";
import { useEffect, useState } from "react";

type TScoreProps = {
  content: string;
  color: string;
  isScored: boolean;
};

export const Score = ({ color, content, isScored }: TScoreProps) => {
  const [isDown, setIsDown] = useState(isScored);

  useEffect(() => {
    if (isScored) setIsDown(true);

    const timeout = setTimeout(() => {
      setIsDown(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isScored]);

  return (
    <div
      className={clsx("score", isDown && "score--slide-down")}
      style={{ backgroundColor: color }}
    >
      {content}
    </div>
  );
};
