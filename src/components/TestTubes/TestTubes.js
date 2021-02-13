import React from "react";
import PropTypes from "prop-types";
import Glass from "../../Solver/Glass";
import TestTube from "../TestTube/TestTube";
import "./TestTubes.css";

function TestTubes(props) {
  const { glasses, activeGlass, onTestTubeClick , numTowers, isConfigStage, onTestTubeDoubleClick, numFloors} = props;
  const createKey = (glass, index) => `${index}:${glass.toString()}`;
  console.log("To check test tubes", numTowers);
  return (
    <div className="TestTubes">
      {glasses.map((glass, index) => (
        <div style= {(isConfigStage && index>=numTowers*2) ? {pointerEvents: "none", opacity: "0.4", backgroundColor: "#5999a7"} : {}} key={createKey(glass, index)} className="TestTubeWrapper">
          <TestTube
            glass={glass}
            active={activeGlass.includes(index)}
            onClick={() => onTestTubeClick(index)}
            onDoubleClick={() => onTestTubeDoubleClick(index)}
            numFloors={numFloors}
          />
        </div>
      ))}
    </div>
  );
}

TestTubes.propTypes = {
  glasses: PropTypes.arrayOf(PropTypes.instanceOf(Glass)).isRequired,
  activeGlass: PropTypes.array,
  onTestTubeClick: PropTypes.func,
  onTestTubeDoubleClick : PropTypes.func
};

TestTubes.defaultProps = {
  activeGlass: [],
  onTestTubeClick: () => {},
  onTestTubeDoubleClick: () => {}
};

export default TestTubes;
