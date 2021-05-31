/* variables */
let mode = 0; // 2 options (mode: 0/1) 
let player1 = 0;  // player/bot
let player2 = 1;  // player/bot
let confirm = 0;  // variable for confirm (AB button)

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


    // evaluation
    
})
