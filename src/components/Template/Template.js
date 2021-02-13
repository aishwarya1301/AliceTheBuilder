import React from "react";
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types";
import "./Template.css";

function Template(props) {
  const { testTubes, children, p1Turn, isConfigStage} = props;
  console.log("isconfigstage template.js", isConfigStage, p1Turn)

  return (
    
    // <div className="Template">
    //    <Grid container>
    //     <Grid item xs={2}>
    //       {children != null ? <div style={!p1Turn ? {pointerEvents: "none", opacity: "0.4"} : {}} className="SidepanelWrapper">{children[0]}</div> : <div></div>}
    //     </Grid>
    //     <Grid item xs={8}>
    //       <div className="TestTubesWrapper">{testTubes}</div>
    //     </Grid>
    //     <Grid item xs={2}>
    //       {children != null ? <div style={p1Turn ? {pointerEvents: "none", opacity: "0.4"} : {}} className="SidepanelWrapper">{children[1]}</div> : <div></div>} 
    //     </Grid>
    //   </Grid> 
    // </div> 


    // <div className="Template">
    <Grid container spacing={2} align="center" justify = "center" alignItems = "center">
      <Grid item xs={2}>
       {children != null ? 
       <div style={!isConfigStage ? {pointerEvents: "none", opacity: "1.0"}: !p1Turn ? {pointerEvents: "none", opacity: "0.4"} : {}} className="SidepanelWrapper">{children[0]}</div> : <div></div>}
      </Grid>
      <Grid item xs={8}>{testTubes}
      {/* <div className="TestTubesWrapper">{testTubes}</div> */}
      </Grid>
      <Grid item xs={2}>
        {children != null ? <div style={!isConfigStage ? {pointerEvents: "none", opacity: "1.0"}: p1Turn ? {pointerEvents: "none", opacity: "0.4"} : {}} className="SidepanelWrapper">{children[1]}</div> : <div></div>} 
      </Grid>  
    </Grid>
    // </div> 
  );
}

Template.propTypes = {
  testTubes: PropTypes.node.isRequired,
};

export default Template;
