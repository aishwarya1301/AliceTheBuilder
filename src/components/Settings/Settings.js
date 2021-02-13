import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from "../Button/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: "30px",
        margin: "10px",
    },
    control: {
      padding: theme.spacing(5),
    },
  }));



function Settings(props) {
    const classes = useStyles();

    const { settings, handleChangeForm, onStartHandler } = props
    
    const onSubmit = (data) => {
        console.log("onSubmit", data);
    }

    return(
        
    <div>   
        <Paper variant="outlined" className={classes.paper}>
        <Grid container className={classes.root} spacing={2} align="center" justify = "center" alignItems = "center">
            <Grid item xs={12}>
                <Typography variant="h6">
                SETTINGS
                </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="player1Name"
                    label="Player 1 Name"
                    value={settings["player1Name"]}
                    variant="outlined"
                    size="small"
                    onChange={handleChangeForm("player1Name")}
                    error={settings["player1Name"] === ""}
                    helperText={settings["player1Name"] === "" ? "Name required": " "}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="player2Name"
                    label="Player 2 Name"
                    value={settings["player2Name"]}
                    variant="outlined"
                    size="small"
                    onChange={handleChangeForm("player2Name")}
                    error={settings["player2Name"] === ""}
                    helperText={settings["player2Name"] === "" ? "Name required": " "}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="numTowers"
                    label="Number of towers"
                    value={settings["numTowers"]}
                    variant="outlined"
                    size="small"
                    type="number"
                    onChange={handleChangeForm("numTowers")}
                    error={settings["numTowers"] === "" || settings["numTowers"] < 1 || settings["numTowers"] > 4}
                    helperText={settings["numTowers"] === "" ? "Required": settings["numTowers"] < 1 || settings["numTowers"] > 4? "Values in range 1-4": " " }
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="numLevels"
                    label="Number of Floors"
                    value={settings["numFloors"]}
                    variant="outlined"
                    size="small"
                    type="number"
                    onChange={handleChangeForm("numFloors")}
                    error={settings["numFloors"] === "" || settings["numFloors"] < 2 || settings["numFloors"] > 5}
                    helperText={settings["numFloors"] === "" ? "Required": settings["numFloors"] < 2 || settings["numFloors"] > 5? "Values in range 2-5": " " }
                />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} padding={5}>
                <Button text="START" onClick={() => onStartHandler()} />
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
        </Paper>
    </div> 
    );
}

export default Settings