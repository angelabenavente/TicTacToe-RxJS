import { Subject, timer } from 'rxjs'

const computerMove$ = new Subject();

export const simulaterComputerTurn = (validCells) => {
  const randomCell = Math.floor(Math.random() * validCells.length);

  timer(500).subscribe(() => computerMove$.next(validCells[randomCell]));
}