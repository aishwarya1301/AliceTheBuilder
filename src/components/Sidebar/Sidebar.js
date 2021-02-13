import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

function Sidebar(props) {
  const { children } = props;
  return <div className="Sidebar">{children}</div>;
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
