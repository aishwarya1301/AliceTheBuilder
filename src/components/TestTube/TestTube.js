import React from "react";
import PropTypes from "prop-types";
import Glass from "../../Solver/Glass";
import Ball from "../Ball/Ball";
import {cancellablePromise, useCancellablePromises, useClickPreventionOnDoubleClick}  from "../utils.js"
import "./TestTube.css";

function TestTube(props) {
  const { glass, active, onClick, onDoubleClick, numFloors} = props;
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(onClick, onDoubleClick);

  const balls = glass.getAllBalls();
  const createKey = (color, index) => `${index}:${color}`;
  const ht = numFloors * 35
  return (
    <div
      className={`TestTube ${active ? "active" : ""}`}
      onClick={() => handleClick()}
      onDoubleClick={() => handleDoubleClick()}
      role="button"
      tabIndex={0}
      onKeyPress={({ key }) => {
        if (key === "Enter") {
          onClick();
        }
      }}
      style={{height: ht}}
    >
      <div className="BallWrapper">
        {balls.map((color, index) => (
          <Ball key={createKey(color, index)} color={color} />
        ))}
      </div>
    </div>
  );
}

TestTube.propTypes = {
  glass: PropTypes.instanceOf(Glass).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func
};

TestTube.defaultProps = {
  active: false,
  onClick: () => {},
  onDoubleClick: () => {}
};

export default TestTube;
