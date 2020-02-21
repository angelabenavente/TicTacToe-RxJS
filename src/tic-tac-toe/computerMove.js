import { Subject, timer } from 'rxjs'

export const computerMove$ = new Subject();

export const simulaterComputerTurn = (validCells) => {
  const randomCell = Math.floor(Math.random() * validCells.length);

  timer(500).subscribe(() => computerMove$.next(validCells[randomCell]));
}