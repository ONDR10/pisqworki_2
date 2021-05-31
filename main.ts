/* variables */
let mode = 0; // 2 options (mode: 0/1) 
let player1 = 0;  // player/bot
let player2 = 1;  // player/bot
let confirm = 0;  // variable for confirm (AB button)
let deskarr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // desk
let resultarr = [0, 0, 0]; // describe wins
let i = 0, j = 0, y = 0;

/* functions */
function incraselevel(myint = 0)
{
    if (myint != 3) {
        myint++;
    }
    else {
        myint = 0;
    }
    return myint;
}
function decraselevel(myint = 0)
{
    if (myint != 0) {
        myint--;
    }
    else {
        myint = 3;
    }
    return myint;
}




/* Program */
basic.forever(function () {
    // reset variables
    player1 = 0;
    player2 = 1;
    confirm = 0;
    deskarr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    resultarr = [0, 0, 0];

	// player1 in mode: 1
    if (mode) {
        basic.showString("Vyber 1. hraca:");
        while (1) {
            if (player1 != 0) {
                basic.showNumber(player1);
            }
            else {
                basic.showString("P1");
            }
            input.onButtonPressed(Button.A, function () {
                player1 = decraselevel(player1);
            })
            input.onButtonPressed(Button.B, function () {
                player1 = incraselevel(player1);
            })
            input.onButtonPressed(Button.AB, function () {
                confirm = 1;
            })
            if (confirm == 1) {
                break;
            }
        }
    }

    confirm = 0;
    // player2 in mode: 1
    if (mode) {
        basic.showString("Vyber 2. hraca:");
    }
    // player2 in mode: 0
    else {
        basic.showString("Vyber obtiaznost: ");
    }
    while (1) {
            if (player2 != 0) {
                basic.showNumber(player2);
            }
            else if (mode == 0){
                basic.showString("P");
            }
            else {
                basic.showString("P1");
            }
            input.onButtonPressed(Button.A, function () {
                player2 = decraselevel(player2);
            })
            input.onButtonPressed(Button.B, function () {
                player2 = incraselevel(player2);
            })
            input.onButtonPressed(Button.AB, function () {
                confirm = 1;
            })
            if (confirm == 1) {
                break;
            }
        }
    
    // GAME
    while (1) {
        /* wariables */
        let row = 0;
        let column = 0;
        let diagonal_1 = 0;
        let diagonal_2 = 0;
        /* game */

        /* control */
        for (j = 1; j < 3; j++) {
            for (i = 0; i < 3; i++) {
                for (y = 0; y < 3; y++) {
                    // row
                    if (deskarr[i][y] == j) {
                        row++;
                        if (row == 3) {
                            resultarr[0] = 1; // 1 means row_win
                            resultarr[1] = i; // which row is winning
                            resultarr[2] = j; // which player is winner
                        } 
                    }
                    
                    // column
                    if (deskarr[y][i] == j) {
                        column++;
                        if (row == 3) {
                            resultarr[0] = 2; // 2 means column_win
                            resultarr[1] = i; // which column is winning
                            resultarr[2] = j; // which player is winner
                        }
                    }
                    
                    // diagonal 1
                    if (deskarr[i][i] == j && y == 0) {
                        diagonal_1++;
                        if (row == 3) {
                            resultarr[0] = 3; // 3 means diagonal_win
                            resultarr[1] = 1; // which diagonal is winning (1 == top-left corner to bottom-right corner)
                            resultarr[2] = j; // which player is winner
                        }
                    }

                    // diagonal 2
                    if (deskarr[i][2 - i] == j && y == 0) {
                        diagonal_2++;
                        if (row == 3) {
                            resultarr[0] = 3; // 3 means diagonal_win
                            resultarr[1] = 2; // which diagonal is winning (2 == top-right corner to bottom-right corner)
                            resultarr[2] = j; // which player is winner
                        }
                    }
                }
            }
        }
    }
    // evaluation
    if (player1 == 0 && player2 == 0) {
        if (1) {

        }
        else {

        }
    }
    else if (player1 == 0 || player2 == 0) {
        if (1) {

        }
        else {

        }
    }
    else {
        if (1) {

        }
        else {

        }
    }
})
