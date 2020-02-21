import { game$ } from './tic-tac-toe/game';
import { drawGame, writeMessage } from './tic-tac-toe/draw'; 

export default () => {
    
    game$.subscribe(gameState => {
        drawGame(gameState);
    }, 
    err => console.log("error: ", err), 
    data => console.log("COMPLETE"));

}