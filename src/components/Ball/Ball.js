import React from "react";
import PropTypes from "prop-types";
import "./Ball.css";

function Ball(props) {
  const { color, onClick, count } = props;
  return (
    <div 
      className="Ball"
      onClick={() => onClick()}
      style={ count <=0 ? {pointerEvents: "none", opacity: "0.4", backgroundColor: color } : { backgroundColor: color }}
      role="button"
      tabIndex={0}
      onKeyPress={({ key }) => {
        if (key === "Enter") {
          onClick();
        }
      }}
    />
  );
}

Ball.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Ball.defaultProps = {
  onClick: () => {},
};

export default Ball;
