import * as React from "react";
import "./WorldGrid.css";
import { useState } from "react";
import robby from "../../img/robby.png";

const WorldGrid = (props) => {
  const [playing, setPlaying] = useState(false);
  const rows = [];
  const cols = [];
  console.log(props);

  for (let i = 0; i < props.max.x; i++) {
    rows[i] = i;
  }

  for (let i = 0; i < props.max.y; i++) {
    cols[i] = i;
  }

  const playPause = (e) => {
    setPlaying(!playing);
    for (let i = 0; i < props.instructions.length; i++) {
      if (props.instructions[i].toLowerCase() === "f") {
        console.log(props.robot.direction);
        switch (props.robot.direction.toLowerCase()) {
          case "s":
            props.robot.y++;
            break;
          case "n":
            props.robot.y--;
            break;
          case "e":
            props.robot.x++;
            break;
          default:
            props.robot.x--;
            break;
        }
      }
      if (props.instructions[i].toLowerCase() === "l") {
        props.robot.rotation = props.robot.rotation - 90;

        console.log("l");
        console.log(props.robot.rotation);
      }
      if (props.instructions[i].toLowerCase() === "r") {
        props.robot.rotation = props.robot.rotation + 90;
      }
      if (props.robot.rotation === -90) {
        props.robot.rotation = 270;
      }
      if (props.robot.rotation === 360) {
        props.robot.rotation = 0;
      }
      if (props.robot.rotation === 0) {
        props.robot.direction = "s";
      } else if (props.robot.rotation === 90) {
        props.robot.direction = "w";
      } else if (props.robot.rotation === 180) {
        props.robot.direction = "n";
      } else if (props.robot.rotation === 270) {
        props.robot.direction = "e";
      }
    }
  };

  return (
    <div className="grid__container">
      <div className="grid__center">
        {rows.map((row) => (
          <div className="grid__columns">
            {cols.map((column) => {
              return (
                <div className="chess__row">
                  {props.robot.y === row && props.robot.x === column && (
                    <div>
                      <img
                        className="robby"
                        style={{
                          transform: `rotate(${props.robot.rotation}deg)`,
                        }}
                        src={robby}
                        alt="Robot"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div className="grid__pausePlay">
          <div class="playpause">
            <input
              type="checkbox"
              value={playing}
              id="playpause"
              name="check"
              onChange={(e) => {
                playPause(e);
              }}
            />
            <label for="playpause" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldGrid;
