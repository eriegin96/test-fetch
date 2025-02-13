import clsx from "clsx";
import { useEffect, useState } from "react";

type TScoreProps = {
  content: string;
  color: string;
  isScored: boolean;
};

export const Score = ({
  color,
  content,
  isScored: isScoredDefault,
}: TScoreProps) => {
  const [isScored, setIsScored] = useState(isScoredDefault);

  useEffect(() => {
    setIsScored(true);
    const timeout = setTimeout(() => {
      setIsScored(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isScoredDefault]);

  return (
    <div
      className={clsx("score", isScored && "score--slide-down")}
      style={{ backgroundColor: color }}
    >
      {content}
    </div>
  );
};
