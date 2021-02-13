import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Glass from "../../Solver/Glass";
import TestTubes from "../TestTubes/TestTubes";
import Template from "../Template/Template";
import Sidebar from "../Sidebar/Sidebar";
import Ball from "../Ball/Ball";
import Button from "../Button/Button";
import "./Configurator.css";
import Typography  from "@material-ui/core/Typography";

function Configurator(props) {

  const { initializeBoard } = props
  // useEffect(() => {
  //   console.log("Mounted")
  //   initializeBoard();
  // }, []);

  const {
    glasses,
    colors,
    activeGlass,
    onTestTubeClick,
    onClear,
    onAdd,
    onRemove,
    onColorClick,
    onSolve,
    p1Turn,
    p1Colors,
    p2Colors,
    colorCounts,
    numTowers,
    numFloors,
    settings,
    onTestTubeDoubleClick
  } = props;
console.log("In configurator,", numTowers)
  return (
    <Template
      testTubes={
        <TestTubes
          glasses={glasses}
          activeGlass={activeGlass}
          onTestTubeClick={(index) => onTestTubeClick(index)}
          onTestTubeDoubleClick = {(index) => onTestTubeDoubleClick(index)}
          numTowers = {numTowers}
          numFloors = {numFloors}
          isConfigStage = {true}
        />
      }
      isConfigStage={true}
      p1Turn={p1Turn}
    >
      <Toolbox
        colors={p1Colors}
        onClear={() => onClear()}
        onAdd={() => onAdd()}
        onRemove={() => onRemove()}
        onColorClick={(color) => onColorClick(color)}
        onSolve={() => onSolve()}
        colorCounts={colorCounts}
        playerName={settings["player1Name"]}
        isConfigStage={true}
      />
      <Toolbox
        colors={p2Colors}
        onClear={() => onClear()}
        onAdd={() => onAdd()}
        onRemove={() => onRemove()}
        onColorClick={(color) => onColorClick(color)}
        onSolve={() => onSolve()}
        colorCounts={colorCounts}
        playerName={settings["player2Name"]}
        isConfigStage={true}
      />
    </Template>
  );
}

Configurator.propTypes = {
  glasses: PropTypes.arrayOf(PropTypes.instanceOf(Glass)).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGlass: PropTypes.array.isRequired,
  onTestTubeClick: PropTypes.func,
  onClear: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onColorClick: PropTypes.func,
  onSolve: PropTypes.func,
  numTowers: PropTypes.number,
  onTestTubeDoubleClick: PropTypes.func
};

Configurator.defaultProps = {
  onTestTubeClick: () => {},
  onClear: () => {},
  onAdd: () => {},
  onRemove: () => {},
  onColorClick: () => {},
  onSolve: () => {},
  onTestTubeDoubleClick:() => {},
};

export function Toolbox(props) {
  const { colors, onColorClick, onAdd, onClear, onRemove, onSolve, colorCounts, playerName, isConfigStage, currentMove, numberOfMoves } = props;
  return (
    <Sidebar>
      <Typography variant="subtitle2"> {playerName}</Typography>
      {!isConfigStage ? 
      <p>
        {currentMove} / {numberOfMoves}
      </p>: 
      <p></p>}
      <div className="BallWrapper">
        {colors.map((color) => (
          <div key={color} className="SingleBallWrapper">
            <Ball color={color} count={colorCounts[color]} onClick={() => onColorClick(color)} />
            {isConfigStage ? 
              <Typography variant="subtitle2"> {`    `} x{colorCounts[color]}</Typography>
            :<Typography></Typography>}
          </div>
        ))}
      </div>
      {/* <Button text="CLEAR" onClick={() => onClear()} />
      <Button text="ADD" onClick={() => onAdd()} />
      <Button text="REMOVE" onClick={() => onRemove()} />
      <Button text="SOLVE" onClick={() => onSolve()} /> */}
    </Sidebar>
  );
}

Toolbox.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onColorClick: PropTypes.func,
  onAdd: PropTypes.func,
  onClear: PropTypes.func,
  onRemove: PropTypes.func,
  onSolve: PropTypes.func,
};

Toolbox.defaultProps = {
  onColorClick: () => {},
  onAdd: () => {},
  onClear: () => {},
  onRemove: () => {},
  onSolve: () => {},
};

export default Configurator;
