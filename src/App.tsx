import { useEffect } from "react";
import { Engine, Render, Runner, Body, Composite } from "matter-js";
import "./App.css";
import { WORLD_HEIGHT, WORLD_WIDTH } from "./constants";
import { createBounding, spawnBalls, spawnMarks, spawnPins } from "./utils";

function App() {
  useEffect(() => {
    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        wireframes: true,
        showAngleIndicator: true,
      },
    });

    const pinList: Body[] = spawnPins();
    Composite.add(engine.world, pinList);

    const ballList: Body[] = spawnBalls();
    Composite.add(engine.world, ballList);

    const markList: Body[] = spawnMarks();
    Composite.add(engine.world, markList);

    const boundingList: Body[] = createBounding();
    Composite.add(engine.world, boundingList);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
  }, []);

  return <div></div>;
}

export default App;
