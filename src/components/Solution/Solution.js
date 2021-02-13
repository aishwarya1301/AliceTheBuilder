import React from "react";
import PropTypes from "prop-types";
import Glass from "../../Solver/Glass";
import Move from "../../Solver/Move";
import TestTubes from "../TestTubes/TestTubes";
import Template from "../Template/Template";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";
import { Toolbox } from "../Configurator/Configurator"

function Solution(props) {
  const { glasses, p1SolveMoves, p2SolveMoves, movesTotal , colorCounts, activeGlass, onTestTubeClick, numTowers, numFloors, p1Colors, p2Colors, settings} = props;
  return (
    <Template 
      isConfigStage={false}
      testTubes={
      <TestTubes 
        glasses={glasses}
        activeGlass={activeGlass}
        onTestTubeClick={(index) => onTestTubeClick(index)}
        numTowers = {numTowers}
        isConfigStage = {false} 
        numFloors = {numFloors}
      />}>

      <Toolbox
        colors={p1Colors}
        onClear={() => props.onClear()}
        onAdd={() => props.onAdd()}
        onRemove={() => props.onRemove()}
        onColorClick={(color) => props.onColorClick(color)}
        onSolve={() => props.onSolve()}
        colorCounts={colorCounts}
        isConfigStage = {false} 
        playerName={settings["player1Name"]}
        currentMove={p1SolveMoves}
        numberOfMoves={movesTotal}
      /> 

      <Toolbox
        colors={p2Colors}
        onClear={() => props.onClear()}
        onAdd={() => props.onAdd()}
        onRemove={() => props.onRemove()}
        onColorClick={(color) => props.onColorClick(color)}
        onSolve={() => props.onSolve()}
        colorCounts={colorCounts}
        isConfigStage = {false} 
        playerName={settings["player2Name"]}
        currentMove={p2SolveMoves}
        numberOfMoves={movesTotal}
      /> 
      {/* <SolutionNavigator
        currentMove={moveIndex}
        numberOfMoves={moves.length}
        // onNext={() => onNext()}
        // onPrevious={() => onPrevious()}
        // onRestart={() => onRestart()}
      /> */}
    </Template>
  );
}

Solution.propTypes = {
  glasses: PropTypes.arrayOf(PropTypes.instanceOf(Glass)).isRequired,
  // moves: PropTypes.arrayOf(PropTypes.instanceOf(Move)).isRequired,
  // moveIndex: PropTypes.number.isRequired,
  // onNext: PropTypes.func.isRequired,
  // onPrevious: PropTypes.func.isRequired,
  // onRestart: PropTypes.func.isRequired,
};

function SolutionNavigator(props) {
  const { currentMove, numberOfMoves, onNext, onPrevious, onRestart } = props;
  return (
    <Sidebar>
      <p>
        {currentMove} / {numberOfMoves}
      </p>
      {/* <Button
        text="Next"
        disabled={currentMove >= numberOfMoves}
        onClick={() => onNext()}
      />
      <Button
        text="Previous"
        disabled={currentMove <= 0}
        onClick={() => onPrevious()}
      />
      <Button text="Restart" onClick={() => onRestart()} /> */}
    </Sidebar>
  );
}

SolutionNavigator.propTypes = {
  currentMove: PropTypes.number.isRequired,
  numberOfMoves: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Solution;
