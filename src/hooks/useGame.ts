import { useEffect, useState } from "react";
import {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Events,
  Common,
} from "matter-js";
import {
  BALL_AMOUNT,
  BALL_LABEL,
  BALL_SIZE,
  MARK_HEIGHT,
  MARK_LABEL,
  MARK_LIST,
  MARK_WIDTH,
  PIN_LABEL,
  PIN_SIZE,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../constants";
import { createBounding, spawnBall, spawnMarks, spawnPins } from "../utils";
import { TBall, TMark, TPin, TScore } from "../types/game";

export const useGame = () => {
  const [balls, setBalls] = useState<TBall[]>([]);
  const [pins, setPins] = useState<TPin[]>([]);
  const [marks, setMarks] = useState<TMark[]>([]);
  const [scoreStack, setScoreStack] = useState<TScore[]>([]);

  useEffect(() => {
    // create an engine
    const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });

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
    setPins(
      pinList.map((p) => ({
        id: p.id,
        size: PIN_SIZE,
        body: p,
        isHit: false,
      }))
    );

    const markList: Body[] = spawnMarks(MARK_LIST);
    Composite.add(engine.world, markList);
    setMarks(() =>
      MARK_LIST.map((m, idx) => ({
        ...m,
        id: markList[idx].id,
        body: markList[idx],
        height: MARK_HEIGHT,
        width: MARK_WIDTH,
        isHit: false,
      }))
    );

    const boundingList: Body[] = createBounding();
    Composite.add(engine.world, boundingList);

    // Handle score
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      pairs.forEach(({ bodyA, bodyB }) => {
        // Get score
        if (bodyA.label === BALL_LABEL && bodyB.label === MARK_LABEL) {
          Composite.remove(engine.world, bodyA);
          setBalls((prev) => prev.filter(({ id }) => id !== bodyA.id));
          setMarks((prev) =>
            prev.map((m) => {
              if (m.id === bodyA.id) {
                setScoreStack((prev) => {
                  return [
                    {
                      id: prev.length + 1,
                      content: m.content,
                      color: m.color,
                      value: m.value,
                    },
                    ...prev,
                  ];
                });
                return { ...m, isHit: true };
              }
              return m;
            })
          );
        } else if (bodyB.label === BALL_LABEL && bodyA.label === MARK_LABEL) {
          Composite.remove(engine.world, bodyB);
          setBalls((prev) => prev.filter(({ id }) => id !== bodyB.id));
          setMarks((prev) =>
            prev.map((m) => {
              if (m.id === bodyA.id) {
                setScoreStack((prev) => {
                  return [
                    {
                      id: prev.length + 1,
                      content: m.content,
                      color: m.color,
                      value: m.value,
                    },
                    ...prev,
                  ];
                });
                return { ...m, isHit: true };
              }
              return m;
            })
          );
        }
      });

      // Handle pin glow
      pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === BALL_LABEL && bodyB.label === PIN_LABEL) {
          setPins((prev) =>
            prev.map((p) => {
              if (p.id === bodyB.id) return { ...p, isHit: true };
              return p;
            })
          );
        } else if (bodyB.label === BALL_LABEL && bodyA.label === PIN_LABEL) {
          setPins((prev) =>
            prev.map((p) => {
              if (p.id === bodyA.id) return { ...p, isHit: true };
              return p;
            })
          );
        }
      });
    });

    // clear animation state
    Events.on(engine, "collisionEnd", (event) => {
      const pairs = event.pairs;

      pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === BALL_LABEL && bodyB.label === MARK_LABEL) {
          setMarks((prev) =>
            prev.map((m) => (m.id === bodyB.id ? { ...m, isHit: false } : m))
          );
        } else if (bodyB.label === BALL_LABEL && bodyA.label === MARK_LABEL) {
          setMarks((prev) =>
            prev.map((m) => (m.id === bodyA.id ? { ...m, isHit: false } : m))
          );
        }
      });

      // Handle pin glow
      pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === BALL_LABEL && bodyB.label === PIN_LABEL) {
          setPins((prev) =>
            prev.map((p) => {
              if (p.id === bodyB.id) return { ...p, isHit: false };
              return p;
            })
          );
        } else if (bodyB.label === BALL_LABEL && bodyA.label === PIN_LABEL) {
          setPins((prev) =>
            prev.map((p) => {
              if (p.id === bodyA.id) return { ...p, isHit: false };
              return p;
            })
          );
        }
      });
    });

    const timeScaleTarget = 1;
    let ballCount = 0,
      lastTime = Common.now();
    Events.on(engine, "afterUpdate", (event) => {
      const timeScale = 1000 / 60 / 1000;

      // tween the timescale for bullet time slow-mo
      engine.timing.timeScale +=
        (timeScaleTarget - engine.timing.timeScale) *
        12 *
        timeScale *
        ballCount;

      if (ballCount <= BALL_AMOUNT) {
        // every 1 sec (real time)
        if (Common.now() - lastTime >= 1000) {
          // spawn Ball
          const newBall = spawnBall();
          Composite.add(engine.world, newBall);
          setBalls((prev) => [
            ...prev,
            { id: newBall.id, size: BALL_SIZE, body: newBall },
          ]);
          ballCount += 1;
          // update last time
          lastTime = Common.now();
        }

        // spawn bundle
        if (event.timestamp > 25000 && Common.now() - lastTime >= 80) {
          const newBall = spawnBall();
          Composite.add(engine.world, newBall);
          setBalls((prev) => [
            ...prev,
            { id: newBall.id, size: BALL_SIZE, body: newBall },
          ]);
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

  return { balls, pins, marks, scoreStack };
};
