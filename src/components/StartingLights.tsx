
import { useEffect, useState } from "react";
import "./StartingLights.css";

type StartingLightsProps = {
  onComplete: () => void;
};

export default function StartingLights({
  onComplete,
}: StartingLightsProps) {
  const [lights, setLights] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= 5; i++) {
      timers.push(
        setTimeout(() => setLights(i), i * 700)
      );
    }

    timers.push(
      setTimeout(() => {
        setLights(0);
        setLightsOut(true);
      }, 4300)
    );

    timers.push(
      setTimeout(() => {
        onComplete();
      }, 5400)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="starting-overlay">
      <div className="starting-content">
        <div className="starting-label">
          THE GRID IS SET
        </div>

        <div className="starting-light-board">
          {[1, 2, 3, 4, 5].map((number) => (
            <div
              key={number}
              className={`starting-light ${
                number <= lights ? "active" : ""
              }`}
            />
          ))}
        </div>

        <div className="starting-message">
          {lightsOut
            ? "LIGHTS OUT — GO!"
            : "GET READY"}
        </div>
      </div>
    </div>
  );
}
