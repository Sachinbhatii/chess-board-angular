import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Chess Board';

  board: string[][] = [];
  selectedCell: any;
  currentTurn: string = 'white';

  rows = [0, 1, 2, 3, 4, 5, 6, 7];
  cols = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor() {
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.board[0][4] = '♛'; // Black King
    this.board[7][4] = '♔'; // White King
  }

  isBlack(row, col) {
    return (row + col) % 2 === 1;
  }

  onCellClick(row, col) {
    let currentPlace = this.board[row][col];

    if (currentPlace === '♛' || currentPlace === '♔') {
      if (
        (currentPlace === '♔' && this.currentTurn === 'white') ||
        (currentPlace === '♛' && this.currentTurn === 'black')
      ) {
        this.selectedCell = { row, col };
      }
    } else {
      if (this.selectedCell) {
        const { row: fromRow, col: fromCol } = this.selectedCell;

        if (this.isValidKingMove(fromRow, fromCol, row, col)) {
          this.board[row][col] = this.board[fromRow][fromCol];
          this.board[fromRow][fromCol] = null;

          this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';

          this.selectedCell = null;
        }
      }
    }
  }

  isValidKingMove(row, col, toRow, toCol) {
    const rowDiff = Math.abs(row - toRow);
    const colDiff = Math.abs(col - toCol);

    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  }
}
