import { useEffect } from "react";
import {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Events,
  Common,
} from "matter-js";
import "./App.css";
import {
  BALL_AMOUNT,
  BALL_LABEL,
  MARK_LABEL,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "./constants";
import { createBounding, spawnBall, spawnMarks, spawnPins } from "./utils";

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

    const markList: Body[] = spawnMarks();
    Composite.add(engine.world, markList);

    const boundingList: Body[] = createBounding();
    Composite.add(engine.world, boundingList);

    // Handle score
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      pairs.forEach(({ bodyA, bodyB }) => {
        // Get score
        if (bodyA.label === BALL_LABEL && bodyB.label === MARK_LABEL) {
          Composite.remove(engine.world, bodyA);
        } else if (bodyB.label === BALL_LABEL && bodyA.label === MARK_LABEL) {
          Composite.remove(engine.world, bodyB);
        }
      });
    });

    const timeScaleTarget = 1;
    let ballCount = 0,
      lastTime = Common.now();
    Events.on(engine, "afterUpdate", (event) => {
      // console.log(event);
      const timeScale = (event?.delta || 1000 / 60) / 1000;

      // tween the timescale for bullet time slow-mo
      engine.timing.timeScale +=
        (timeScaleTarget - engine.timing.timeScale) *
        12 *
        timeScale *
        ballCount;

      if (ballCount <= BALL_AMOUNT) {
        // every 1.5 sec (real time)
        if (Common.now() - lastTime >= 1500) {
          // spawn Ball
          Composite.add(engine.world, spawnBall());
          ballCount += 1;

          // update last time
          lastTime = Common.now();
        }

        if (event.timestamp > 20000 && Common.now() - lastTime >= 80) {
          Composite.add(engine.world, spawnBall());
          ballCount += 1;
          lastTime = Common.now();
        }
      }
    });

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(engine.world, false, true);
    };
  }, []);

  return <div>a</div>;
}

export default App;
