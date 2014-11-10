/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});

  var findSpot = function(rowNumber){
    if(rowNumber === n){ //defined base case
      solution = board.rows();
      return;
    } 
    for(var col = 0; col < n; col ++){
      board.togglePiece(rowNumber, col)
      if(board.hasColConflictAt(col)){
        board.togglePiece(rowNumber, col);
      }else{
        //go to the next row
        findSpot(rowNumber+1);
      }
    }
  }
  findSpot(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  
  var findSpot = function(rowNumber){
    if(rowNumber === n){
     // console.log(board2.rows());
      ++solutionCount;
      return;
    }
    for(var col = 0; col < n; col ++){
      board.togglePiece(rowNumber, col);
      if(!board.hasColConflictAt(col)){
        //got to next
        findSpot(rowNumber+1);        
      }
      //unplace the piece for finding other possible soultion
      board.togglePiece(rowNumber, col);
      
    }
  }
  findSpot(0, board);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n: n});
  var res = undefined;
  var findSpot = function(rowNumber){
    if(rowNumber === n){
      res = (solution.length === 0)? [] : solution[0];
      return;
    }     
    for(var col = 0; col < n; col++){
      board.togglePiece(rowNumber, col);
      if(!board.hasAnyQueenConflictsOn(rowNumber, col)){
        if(rowNumber === n-1){
          solution.push(board.rows());
        }
        findSpot(rowNumber + 1);
      }

      board.togglePiece(rowNumber, col);
    }

  };
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  findSpot(0, board);
  return res;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var findSpot = function(rowNumber){
    if(rowNumber === n){
      ++solutionCount;
      return;
    }  
    for(var col = 0; col < n; col++){
      board.togglePiece(rowNumber, col);
      if(!board.hasAnyQueenConflictsOn(rowNumber, col)){
        findSpot(rowNumber + 1);
      }
      board.togglePiece(rowNumber, col);
    }
  };
  findSpot(0, board);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
