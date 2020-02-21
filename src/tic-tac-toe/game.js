import { Observable, merge } from 'rxjs';
import { scan, startWith, tap, takeWhile } from 'rxjs/operators';
import { userMove$ } from './userMove';
import { computerMove$, simulaterComputerTurn } from './computerMove';

export const getEmptyCells = (board) =>{
    const emptyCells = [];
    for(let x = 0; x < board.length; x++){
        for(let y=0; y < board[0].length; y++){
            if(board[y][x] == 0){
                emptyCells.push({x, y})
            }
        }
    };
    return emptyCells;        
}

const findOutWinner = board =>{
    for (let i=0;i<3;i++){
        if( (board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) ){
            return board[i][0];
        }
        else if ( (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) ){
                return board[0][i];
        }
    }

    if( (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) || 
        (board[2][0] && board[2][0] == board[1][1] && board[1][1] == board[0][2]) ){
        return board[1][1];
    }

    return null;  
}

const updateGameState = (gameState, move) => {
    if(!move){
        return gameState;
    }
    let updatedBoard = [...gameState.board];
    updatedBoard[move.y][move.x] = gameState.nextPlayer;
    const haveEmptyCells = getEmptyCells(updatedBoard).length == 0 ? false : true;
    let finished = !haveEmptyCells;
    const winner = findOutWinner(updateGameState);
    if(winner) {
        finished = true;
    }
    return {
        board: updatedBoard,
        nextPlayer: gameState.nextPlayer == 1 ? 2 : 1,
        finished: finished,
        winner: winner
    }
}

const initialGame = {
    board: Array(3).fill().map(() => Array(3).fill(0)),
    nextPlayer: 1,
    finished: false,
    winner: null
}
    
export const game$ = merge(userMove$, computerMove$).pipe(
    startWith(null),
    scan(updateGameState, initialGame),
    tap((state) => {
        if(state.nextPlayer == 2 && !state.finished) {
            simulaterComputerTurn(getEmptyCells(state.board))
        }
    }),
    takeWhile(({finished}) => finished == false, true)
)