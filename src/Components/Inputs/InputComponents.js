import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import "./styles.css";
import MissionControl from "../../helpers/mission-control.js";
import Robot from "../../helpers/robot.js";
import WorldGrid from "../WorldGrid/WorldGrid";

const InputComponents = (props) => {
  const mission = new MissionControl();
  const [worldDimensionString, setWorldDimensionString] = useState("");
  const [robotOriginString, setRobotOriginString] = useState("");
  const [robotInstructionsString, setRobotInstructionsString] = useState("");
  const [instructions, setInstructions] = useState("RRFLL");
  const [worldDimensions, setWorldDimensions] = useState({
    min: { x: 0, y: 0 },
    max: { x: 4, y: 5 },
  });
  const [robotPosition, setRobotPosition] = useState({
    x: 0,
    y: 0,
    direction: "s",
    rotation: 0,
  });

  const [worldError, setWorldError] = useState(true);
  const [originError, setOriginError] = useState(true);
  const [instructionsError, setInstructionsError] = useState(true);

  const getWorldDimensions = (e) => {
    let worldReg = e.target.value;
    setWorldDimensionString(e.target.value);

    if (!/^(\d+([ ]+\d+){1})$/g.test(worldReg)) {
      setWorldError(true);
      return;
    }
    setWorldError(false);

    let splitWorld = e.target.value.split(" ");
    let worldCopy = { ...worldDimensions };
    worldCopy.max = {
      x: parseInt(splitWorld[0]),
      y: parseInt(splitWorld[1]),
    };

    setWorldDimensions(worldCopy);
  };
  const setRobotOrigin = (e) => {
    let robotReg = e.target.value;
    setRobotOriginString(e.target.value);
    if (!/^(^\d+[ ]+\d+[ ]+[NnEeSsWw])$/g.test(robotReg)) {
      setOriginError(true);
      return;
    }
    setOriginError(false);
    let splitOrigin = e.target.value.split(" ");
    let originCopy = { ...robotPosition };
    originCopy.x = parseInt(splitOrigin[0]);
    originCopy.y = parseInt(splitOrigin[1]);
    originCopy.direction = splitOrigin[2];
    originCopy.rotation = parseInt(splitOrigin[3]);
    switch (originCopy.direction) {
      case "n": {
        originCopy.rotation = 180;
        break;
      }
      case "s": {
        originCopy.rotation = 0;
        break;
      }
      case "w": {
        originCopy.rotation = 90;
        break;
      }
      default: {
        originCopy.rotation = 270;
        break;
      }
    }
    setRobotPosition(originCopy);
  };

  const setRobotInstructions = (e) => {
    let instructionReg = e.target.value;
    setRobotInstructionsString(e.target.value);
    if (!/^[RrLlFf]+$/g.test(instructionReg)) {
      setInstructionsError(true);
      return;
    }
    setInstructionsError(false);

    setInstructions(e.target.value);
  };

  return (
    <div className="mid__container">
      <div className="inputcomponents">
        <h5>Please, enter grid dimensions</h5>
        {worldError ? (
          <div className="inputcomponents__error">
            Dimensions must be a pair of integers separated by a space
          </div>
        ) : (
          <div className="inputcomponents__correct">Dimensions accepted</div>
        )}

        <Input
          inputProps={{ "aria-label": "description" }}
          value={worldDimensionString}
          placeholder="4 5"
          onChange={(e) => {
            getWorldDimensions(e);
          }}
        />
        <h5>Please, enter robot coordinates</h5>

        {originError ? (
          <div className="inputcomponents__error">
            Two numbers and direction (N, S, E, W) separated by a space
          </div>
        ) : (
          <div className="inputcomponents__correct">Robot origin accepted</div>
        )}
        <Input
          inputProps={{ "aria-label": "description" }}
          value={robotOriginString}
          placeholder="0 0 S"
          onChange={(e) => {
            setRobotOrigin(e);
          }}
        />
        <h5>Please, enter robot instructions</h5>
        {instructionsError ? (
          <div className="inputcomponents__error">
            Instructions is a string of the letters “L”, “R”, and “F”
          </div>
        ) : (
          <div className="inputcomponents__correct">
            Robot instructions accepted
          </div>
        )}

        <Input
          inputProps={{ "aria-label": "description" }}
          value={robotInstructionsString}
          placeholder="RRFLL"
          onChange={(e) => {
            setRobotInstructions(e);
          }}
        />
        <h5>Do you want to deploy another robot?</h5>

        <Button color="primary" variant="outlined" style={{ marginTop: 20 }}>
          Deploy
        </Button>
      </div>
      <WorldGrid
        max={worldDimensions.max}
        robot={robotPosition}
        instructions={instructions}
      />
    </div>
  );
};

export default InputComponents;
