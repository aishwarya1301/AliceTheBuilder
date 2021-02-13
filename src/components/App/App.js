import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactGA from "react-ga";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Configurator from "../Configurator/Configurator";
import Solution from "../Solution/Solution";
import Glass from "../../Solver/Glass";
import Board from "../../Solver/Board";
import Solver from "../../Solver/Solver";
import Button from "../Button/Button";
import Move from "../../Solver/Move";
import Settings from "../Settings/Settings"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import background from './my_bg.png'

import Typography from '@material-ui/core/Typography';


const STAGE_CONFIGURATION = "configuration";
const STAGE_SOLUTION = "solution";
var added = false;

const colorMap = {
  RED: "#ccff8c",
  BLUE: "#81de76",
  PURPLE: "#3a55b4",
  
  GREEN: "#8cd9ff",
  PINK: "#750545",
  AQUA: "#B60A55",
  GREY: "#F17171",
  BABY: "#FFBF6B",
  ORANGE: "#FFE374",

  YELLOW: "#6caddf",
  
};

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

const colors = Object.values(colorMap);

function createGlass(arr, nFloors) {
  const glass = new Glass(nFloors);
  glass.pushArrayOfBalls(arr.map((idx) => colors[idx]));
  return glass;
}

let COMPLEX_BOARD = [];

function cloneGlasses(glasses) {
  return glasses.map((glass) => glass.clone());
}

function clearGlass(glasses, index, nFloors) {
  const clonedGlasses = cloneGlasses(glasses);
  clonedGlasses.splice(index, 1, new Glass(nFloors));
  return clonedGlasses;
}

function addGlass(glasses, index, nFloors) {
  const clonedGlasses = cloneGlasses(glasses);
  clonedGlasses.splice(index + 1, 0, new Glass(nFloors));
  return clonedGlasses;
}

function removeGlass(glasses, index, nFloors) {
  const clonedGlasses = cloneGlasses(glasses);
  clonedGlasses.splice(index, 1);
  if (clonedGlasses.length === 0) {
    clonedGlasses.push(new Glass(nFloors));
  }
  return clonedGlasses;
}

function addBallToGlass(glasses, index, color) {
  const clonedGlasses = cloneGlasses(glasses);
  const glass = clonedGlasses[index];
  const tempGlass = glass.clone()
  console.log(glass)
  console.log(glass.getCapacity())
  console.log(glass.isFull())
  var consecutive3rd = false
  var message = "The tower is filled to its capacity. Please choose another tower";
    if(!tempGlass.isEmpty() && tempGlass.pop()==color)
        if(!tempGlass.isEmpty() && tempGlass.pop() == color){
          consecutive3rd = true
          message = "Cannot place 3 consecutive blocks of same color!"
        }
            
  if (!glass.isFull() && !consecutive3rd) {
    glass.push(color);
    added = true;
  }else{
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
    })
  }
  return clonedGlasses;
}
function areAllGlassesFilled(glasses, numOfFilledTowers){
  console.log("Glasses ", glasses)
  for (const g in glasses)
    {
      const glass = glasses[g];
      console.log(glass.isFull())
      if(g < numOfFilledTowers*2 && !glass.isFull())
        return false;
    }
  return true; 
}
function anyWinner(glasses, p1Colors, p2Colors){
  var p1Score = 0
  var p2Score = 0
  console.log("anywinner");
  console.log(p1Colors)
  console.log(p2Colors)
  for (const glass of glasses){
    console.log(glass)  
    if(glass.isFull() && glass.hasOnlySingleColorBalls()){
      // console.log(glass.top())
      // console.log(glass.top())
      var color = glass.top()
      if (p1Colors.includes(color)) p1Score+=1
      else if (p2Colors.includes(color)) p2Score +=1
    }
  }
  if(p1Score===p1Colors.length) return 1
  else if (p2Score === p2Colors.length) return 2
  return 0
}

function blockwisewinner (glasses, p1Colors, p2Colors, numFloors){
  var p1counts = {}
  var p2counts = {}
  for (var i = 2; i<=numFloors;i++){
    p1counts[i]=0
    p2counts[i]=0
  }
  for (var glass of glasses){
    const balls = glass.getAllBalls();
    var same_clr_counter =1;
    var cur_clr = balls[0]
    for (let b = 1; b<balls.length;b++){
      if (balls[b]==cur_clr) same_clr_counter++
      else{
        if (same_clr_counter>1){
          if(p1Colors.includes(cur_clr)) p1counts[same_clr_counter]+=1
          else if (p2Colors.includes(cur_clr)) p2counts[same_clr_counter]+=1
          same_clr_counter=1
          cur_clr = balls[b]
        }
      }
    }
    if (same_clr_counter>1){
      if(p1Colors.includes(cur_clr)) p1counts[same_clr_counter]+=1
      else if (p2Colors.includes(cur_clr)) p2counts[same_clr_counter]+=1
    }
  }
  console.log(p1counts)
  console.log(p2counts)
  for (let bsize=numFloors;bsize>1;bsize--){
    if(p1counts[bsize]>p2counts[bsize]) return 1
    else if (p1counts[bsize]<p2counts[bsize]) return 2
  }
  return 0 
}

function App(props) {

  const classes = useStyles();

  const [activeGlass, setActiveGlass] = useState([]);
  const [stage, setStage] = useState(STAGE_CONFIGURATION);
  const [moves, setMoves] = useState([]);
  const [currMove, setCurrMove] = useState(new Move(-1, -1));
  const [moveIndex, setMoveIndex] = useState(0);
  const [solutionGlasses, setSolutionGlasses] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [color, setColor] = useState("");
  const [p1Turn, setP1Turn] = useState(true);
  const settingsDict = {
    "player1Name"  : "Alice",
    "player2Name" : "Bob",
    "numTowers" : 4, 
    "numFloors" : 4
  };
  const [settings, setSettings] = useState(settingsDict);
  const [p1SolveMoves, setP1SolveMoves] = useState(0);
  const [p2SolveMoves, setP2SolveMoves] = useState(0);
  const [validated, setValidated] = useState(false);
  const [p1Colors, setP1Colors] = useState([])
  const [p2Colors, setP2Colors] = useState([])
  const [colorCounts, setColorCounts] = useState({});
  const [gameOver, setGameOver] = useState(false)

  const initializeBoard = () => {
    console.log("Initialize", settings["numTowers"], colors, [...colors].splice(0, settings["numTowers"]))
    setP1Colors([...colors].splice(0, settings["numTowers"]));
    setP2Colors([...colors].splice(settings["numTowers"], settings["numTowers"]));
    console.log("p1colors ", p1Colors, "p2Colors ", p2Colors)
    var counts = {}
    
    for(var c in colors){
      counts[colors[c]] = settings["numFloors"];
    }
    console.log("counts ", counts)
    setColorCounts(colorCounts => ({...colorCounts, ...counts}))
    // console.log("colorCounts ", colorCounts)

    COMPLEX_BOARD = new Array(settings['numTowers']*2+2).fill(createGlass([], settings["numFloors"]));
    setGlasses(COMPLEX_BOARD)
    
  }

  const onStartHandler = () => {
    var message = "";
    Object.entries(settings).forEach(([k,v]) => {
      // console.log("The key: ",k)
      if(v == "")
        message = "All fields are required. "
    })
    if(settings["numTowers"] < 1 || settings["numTowers"] > 4 || settings["numFloors"] < 2 || settings["numTowers"] > 5) message += "Check allowed range"
    
    if(message != ""){
      toast.error(message);
      setValidated(false);
      // console.log("If ")
    }
    else{
      // console.log("else ")
      setActiveGlass([])
      setStage(STAGE_CONFIGURATION)
      setMoves([])
      setCurrMove(new Move(-1,-1))
      setMoveIndex(0)
      setSolutionGlasses([])
      setGlasses([])
      setColor("")
      setP1Turn(true)
      setP1SolveMoves(0)
      setP2SolveMoves(0)
      setValidated(true);
      setP1Colors([])
      setP2Colors([])
      setColorCounts({})
      setGameOver(false)   
      initializeBoard();   
    }
  };

  const handleChangeForm = (name) => (event) => {
    setSettings({ ...settings, [name] : event.target.value });
  };
  
  const onClearHandler = (index) => {
    console.log("ClearH", index)
    var colors = glasses[index].getAllBalls()
    console.log("ClearH", colors)
    var tempCounts = Object.assign({}, colorCounts)
    for (const c of colors){
      tempCounts[c] += 1;
    }
    setColorCounts(colorCounts => ({...colorCounts, ...tempCounts}));
    setGlasses(clearGlass(glasses, index, settings["numFloors"]));
  };

  const onAddHandler = () => {
    setGlasses(addGlass(glasses, activeGlass, settings["numFloors"]));
    setActiveGlass([activeGlass[0] + 1]);
  };

  const onRemoveHandler = () => {
    setGlasses(removeGlass(glasses, activeGlass, settings["numFloors"]));
    setActiveGlass([Math.max(activeGlass[0] - 1, 0)]);
  };

  const onColorClickHandler = (color) => {
    setColor(color);
    // setGlasses(addBallToGlass(glasses, activeGlass, color));
  };

  const errorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
    })
  }

  const successToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
    })
  }

  const addBlockHandler = (actGlass) => {
    if(actGlass.length === 0)
      errorToast("Select a Tower")
    else{
      console.log("in add ", color)
      if(color != ""){
        console.log("In add block handler", actGlass)
        const ret_glasses = addBallToGlass(glasses, actGlass, color);
        setGlasses(ret_glasses);
        if(added){
          setP1Turn(!p1Turn);
          added = false;
          console.log("Player 1", p1Turn);
          // console.log("onclick color counts ", colorCounts)
          setColorCounts({...colorCounts, [color]: colorCounts[color]-1});
          setColor("");
        }
        if(areAllGlassesFilled(ret_glasses, settings["numTowers"])){
          successToast("All towers filled! Let's solve the puzzle now");
          // onSolveHandler();
        }
        setActiveGlass([]);
      }
      else{
        errorToast("Select a block");
      }
    }
  }

  const onTestTubeClickHandler = (index) => {
    if(stage == STAGE_CONFIGURATION){
      setActiveGlass([index]);
      addBlockHandler([index]);
    }
    else{
      var acg = [];
      if(currMove.from == -1){
        setCurrMove(new Move(index, -1));
        acg.push(index);
      }
      else if(currMove.to == -1){
        setCurrMove(new Move(currMove.from, index));
        acg.push(index);
        acg.push(currMove.from);
      }
      else{
        // acg = [];
        setCurrMove(new Move(index, -1));
        acg.push(index);
      }

      setActiveGlass(acg)
      console.log("Test tube handler: ", currMove.from, currMove.to)
      console.log("Is disabled: ", currMove.from == -1 || currMove.to == -1)
    }
    
  };

  const onSolveHandler = () => {
    const board = new Board(glasses);
    const startMs = Date.now();
    const report = Solver(board);
    const endMs = Date.now();
    ReactGA.timing({
      value: endMs - startMs,
      category: "Solver",
      variable: "DFS",
      label: `${report.isSolvable ? "Solvable" : "Unsolvable"}`,
    });
    if(!areAllGlassesFilled(glasses, settings["numTowers"])){
      errorToast("Fill all towers to move to the solve phase!")
    }
    else{
      if (!report.isSolvable) {
        toast.error("This board is not solvable...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: true,
        });
        return;
      }
      setMoveIndex(0);
      setMoves(report.moves);
      console.log(report.moves);
      setSolutionGlasses(cloneGlasses(glasses));
      setStage(STAGE_SOLUTION);
    }
  };

  const onNextHandler = () => {
    const move = moves[moveIndex];
    const board = new Board(solutionGlasses);
    board.moveBall(move);
    setSolutionGlasses(board.getGlasses());
    setMoveIndex(moveIndex + 1);
  };

  const onPreviousHandler = () => {
    const move = moves[moveIndex - 1];
    const board = new Board(solutionGlasses);
    board.moveBall(move.invert());
    setSolutionGlasses(board.getGlasses());
    setMoveIndex(moveIndex - 1);
  };

  const submitMoveHandler = () => {
    const board = new Board(solutionGlasses);
    var status = board.moveContBall(currMove);
    setSolutionGlasses(board.getGlasses());
    console.log("Submit move handler ", currMove.from, currMove.to);
    setCurrMove(new Move(-1, -1));
    setActiveGlass([]);
    //CHECK IF MOVE HAPPENED AND CHANGE THIS
    if(status < 0){
      toast.error("This is an invalid move ...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
      });
      return; // return without switching the player's turn since it was invalid move
    }
    //Update moves and toggle player turn
    if(p1Turn){
      setP1SolveMoves(p1SolveMoves+1)
    }else{
      setP2SolveMoves(p2SolveMoves+1)
    }
    setP1Turn(!p1Turn);
    //Check if any winner or any one exhausted their moves
    var winner = anyWinner(board.getGlasses(), p1Colors, p2Colors);
    if (winner ===1 ){
      
      toast.success(settings["player1Name"] + " wins", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 9000,
        hideProgressBar: true,
      });
    
    setGameOver(true)
    setTimeout(() => {setValidated(false)}, 9000);
    
  }
    else if (winner ===2 ){
    toast.success(settings["player2Name"] + " wins", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 9000,
      hideProgressBar: true,
    });
    setGameOver(true)
    setTimeout(() => {setValidated(false)}, 9000);
    //TODO: How to quit game?
  }  else if (p1SolveMoves>=moves.length|| p2SolveMoves>=moves.length){ //Draw
    var winner = blockwisewinner(board.getGlasses(), p1Colors, p2Colors, settings["numFloors"])
    switch(winner){
      case 1:
        toast.success(settings["player1Name"] + " wins", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 9000,
          hideProgressBar: true,
        });
      
      setGameOver(true)
      setTimeout(() => {setValidated(false)}, 9000);
      break;
      case 2:
        toast.success(settings["player2Name"] + " wins", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 9000,
          hideProgressBar: true,
        });
        setGameOver(true)
        setTimeout(() => {setValidated(false)}, 9000);
      break;
      case 0:
        toast.success("It's a draw", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 9000,
          hideProgressBar: true,
        });
        setGameOver(true)
        setTimeout(() => {setValidated(false)}, 9000);
        break;
    }
  }
    
    
  }

  const onRestartHandler = () => {
    setStage(STAGE_CONFIGURATION);
  };

  // console.log("Player 1", p1Turn);

  
  
  return (
    <div >
      <ToastContainer />
        <Grid container className={classes.root} spacing={2} >
          <Grid item xs={12}>
            <Typography variant="h3" align="center" >
              Alice the Builder
            </Typography>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>



          <Grid item xs={3} className={classes.root}>
            <Settings settings={settings} handleChangeForm={handleChangeForm} onStartHandler={onStartHandler}/>
          </Grid>
          
          
          
          <Grid item xs={9} className={classes.root}>
            {validated ?
            <Paper variant="outlined" className={classes.paper}>
              <Grid container className={classes.root} spacing={2}  align="center" justify = "center" alignItems = "center">
                {stage === STAGE_CONFIGURATION ? (
                  
                
                <div>

                <Typography variant="subtitle1">
                  {p1Turn ? settings["player1Name"] + "'s Turn" : settings["player2Name"] + "'s Turn"}
                </Typography>
                <Grid item xs={12}>
                  <Configurator
                    colors={colors}
                    glasses={glasses}
                    activeGlass={activeGlass}
                    onTestTubeClick={onTestTubeClickHandler}
                    onClear={onClearHandler}
                    onAdd={onAddHandler}
                    onRemove={onRemoveHandler}
                    onColorClick={onColorClickHandler}
                    onSolve={onSolveHandler}
                    p1Turn={p1Turn}
                    p1Colors={p1Colors}
                    p2Colors={p2Colors}
                    colorCounts={colorCounts}
                    numTowers = {settings['numTowers']}
                    numFloors = {settings['numFloors']}
                    settings={settings}
                    onTestTubeDoubleClick = {onClearHandler}
                  />
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}></Grid>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Button text="ADD BLOCK" onClick={() => addBlockHandler(activeGlass)} />
                  </Grid> */}
                  {/* <Grid item xs={12}> 
                    <Button text="CLEAR TOWER" onClick={() => onClearHandler()} />
                  </Grid> */}
                  <Grid item xs={12}> 
                  < Button text="SOLVE" onClick={() => onSolveHandler()} />
                  </Grid>
                </div>
              )
              : (
                <div style={gameOver ? {pointerEvents: "none", opacity: "1.0"}: {}}>
                  <Typography variant="body">
                    {p1Turn ? settings["player1Name"] + "'s Turn" : settings["player2Name"] + "'s Turn"}
                  </Typography>
     
                  <Solution
                    glasses={solutionGlasses}
                    moves={moves}
                    moveIndex={moveIndex}
                    onNext={onNextHandler}
                    onPrevious={onPreviousHandler}
                    onRestart={onRestartHandler}
                    onTestTubeClick={onTestTubeClickHandler}
                    activeGlass={activeGlass}
                    numTowers = {settings['numTowers']}
                    numFloors = {settings['numFloors']}
                    p1Colors={p1Colors}
                    p2Colors={p2Colors}
                    colorCounts={colorCounts}
                    settings={settings}
                    p1SolveMoves={p1SolveMoves}
                    p2SolveMoves={p2SolveMoves}
                    movesTotal={moves.length}
                  />
                  <Button text="Submit move" disabled={currMove.from == -1 || currMove.to == -1} onClick={() => submitMoveHandler()} />
                  
                </div>
              )}
          

              </Grid>
            </Paper>
        
        :
          <Paper variant="outlined" className={classes.paper}>
            <Grid container className={classes.root} spacing={2} align="center" justify = "center" alignItems = "center">
            <div class="jumbotron">

            <Typography variant="h6" align="left" >Hey there, welcome to Alice the Builder gamebox! You and your opponent have to each build <em>n</em> towers comprising of <em>f</em> floors.
            Initially each of you are given a collection of <em>f</em> blocks in <em>n</em> different colors (a total of <em>n*f</em> blocks).

            You will play against your opponent in two stages,
            </Typography>
                <br></br>
            <Typography variant="body1" align="justify">
            <b>Unsorted tower building phase: </b>In this phase you and your opponent have to start building the tower block by block until both have exhausted your blocks.
            </Typography>
            <Typography variant="body2" align="justify">
             --- Click on a block and then choose a tower to place it in <br></br>
                        
                        --- Double click on a tower to clear all the blocks in the tower<br></br>
                    
                    --- You are not allowed to stack more than two blocks of the same color together<br></br>
                    

            </Typography>
            
             <br></br>
             
             <Typography variant="body1" align="justify">   
                 
                 
                     <b>Sort the tower phase: </b>In the second phase, you have to sort the towers one block in each turn with the help of two empty towers. Your aim is to
                     finish sorting all the blocks that you started with, into homogenous towers (consisting of only blocks of the original color assigned to you) within a given number of moves.
            </Typography>

            <Typography variant="body2" align="justify">--- Select the tower you want to move a block from first, followed by the tower you want to move it to and submit your move.
                         </Typography>
                            
                         <br></br>

                         <Typography variant="body1" align="justify"> <b>The first player who constructs maximum number of tallest homogenous towers (with colors assigned to them) in least number of moves WINS. 
   </b> </Typography>
           
                  </div>
                {/* <div><img src='./my_bg.png' width="120%" height="110%"/></div> */}
            </Grid>
          </Paper>
          
        }
        </Grid>
        </Grid>
          
        
      </div>
    
  );
    
}

export default App;
