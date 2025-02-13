import { useGame } from "./hooks/useGame";
import "./App.css";
import { Pin } from "./components/Pin";
import { Ball } from "./components/Ball";
import { WORLD_HEIGHT, WORLD_WIDTH } from "./constants";
import { Mark } from "./components/Mark";
import { Score } from "./components/Score";

function App() {
  const { balls, pins, marks, scoreStack, clearPinHit, clearMarkHit } =
    useGame();

  return (
    <div className="game" style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}>
      {pins.map(({ id, body, size, isHit }) => (
        <Pin
          key={id}
          id={id}
          size={size}
          position={body.position}
          isHit={isHit}
          clearHit={clearPinHit}
        />
      ))}
      {balls.map(({ id, body, size }) => (
        <Ball key={id} size={size} body={body} />
      ))}
      {marks.map(
        ({ id, body, width, height, content, value, color, isHit }) => (
          <Mark
            key={id}
            id={id}
            content={content}
            value={value}
            width={width}
            height={height}
            body={body}
            color={color}
            clearHit={clearMarkHit}
            isHit={isHit}
          />
        )
      )}
      <div className="score-stack">
        {scoreStack.map(({ id, content, color, isScored }) => (
          <Score key={id} content={content} color={color} isScored={isScored} />
        ))}
      </div>
    </div>
  );
}

export default App;
