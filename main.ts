/* errors */
// Bot 2 sa nevie branit ***************** asi vyriesene
// Zla podmienka pre Bot 2 v nahode ****** asi vyriesene (chyba bola inde)
// ! Bot 2 prepisuje policka inym botom ** asi vyriesene
// ! Za hraca hra Bot 2 ****************** asi vyriesene
// Player nemoze hrat ******************** asi vyriesene
// Remiza a prehra *********************** asi vyriesene 
// ? Bot 1 prepisuje policka ************* asi vyriesene
// Bot 3 robi 2 tahy naraz *************** asi vyriesene
// Bot 3 prehra aj ked remizuje ********** asi vyriesene (chyba bola v podmienke vypisovania "win")

// Bot 3 nie je dokonceny - ! nevie obranovat ! vyriesene


/* variables */
let mode = 0; // 2 options (mode: 0/1) 
let player1 = 0;  // player/bot
let player2 = 1;  // player/bot
let confirm = 0;  // variable for confirm (AB button)
let deskarr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // desk
let resultarr = [0, 0, 0]; // describe wins
let i = 0, j = 0, y = 0;
let helpint = 0; // "speed in win" in player section
let round = 0; // which player playing now 
let desk_empy_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // array for random bot
let x = 0; // help with Bots
let potencionalwinarr = [0, 0, 0]; // find potencional wins
let player_position = 0; // player position when he playing.

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
    helpint = 0;
    desk_empy_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    potencionalwinarr = [0, 0, 0];
    x = 0;

	// player1 in mode: 1
    if (mode) {
        player1 = 1; // default Bot1
        basic.showString("1. hrac:");
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
        basic.showString("2. hrac:");
    }
    // player2 in mode: 0
    else {
        //basic.showString("Vyber obtiaznost: ");
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
    confirm = 0;

    // clear screen
    basic.clearScreen();

    // GAME
    let myint = 0; // 9 moves possible
    for (myint = 0; myint < 9; myint++) {
        /* wariables */
        let row = 0;
        let column = 0;
        let diagonal_1 = 0;
        let diagonal_2 = 0;
        // reset variables
        potencionalwinarr = [0, 0, 0];

        /* game */

        // find potencional wins
        for (i = 0; i < 3; i++) {
            /* row */
            if (((deskarr[i][0] + deskarr[i][1] + deskarr[i][2]) == 2) || ((deskarr[i][0] + deskarr[i][1] + deskarr[i][2]) == 4)) {
                if (((deskarr[i][0] + deskarr[i][1]) != 0) && ((deskarr[i][0] + deskarr[i][2]) != 0) && ((deskarr[i][1] + deskarr[i][2]) != 0)) {
                    if ((deskarr[i][0] == 0) || (deskarr[i][1] == 0) || (deskarr[i][2] == 0)) {
                        if (((deskarr[i][0] + deskarr[i][1] + deskarr[i][2] == 4) && (round == 1)) || ((deskarr[i][0] + deskarr[i][1] + deskarr[i][2] == 2) && (round == 0)) || (potencionalwinarr[0] == 0)) {
                            potencionalwinarr[0] = 1; // 1 means row_win
                            potencionalwinarr[1] = i; // where is potencional win
                            if (deskarr[i][0] == 0) {
                                potencionalwinarr[2] = 0; // where is empy arr
                            }
                            else {
                                potencionalwinarr[2] = (deskarr[i][1] == 0) ? 1 : 2;
                            }
                        }
                    }
                }    
            }
            /* column */
            if (((deskarr[0][i] + deskarr[1][i] + deskarr[2][i]) == 2) || ((deskarr[0][i] + deskarr[1][i] + deskarr[2][i]) == 4)) {
                if (((deskarr[0][i] + deskarr[1][i]) != 0) && ((deskarr[0][i] + deskarr[2][i]) != 0) && ((deskarr[1][i] + deskarr[2][i]) != 0)) {
                    if ((deskarr[0][i] == 0) || (deskarr[1][i] == 0) || (deskarr[2][i] == 0)) {                    
                        if (((deskarr[0][i] + deskarr[1][i] + deskarr[2][i] == 4) && (round == 1)) || ((deskarr[0][i] + deskarr[1][i] + deskarr[2][i] == 2) && (round == 0)) || (potencionalwinarr[0] == 0)) {
                            potencionalwinarr[0] = 2; // 2 means column_win
                            potencionalwinarr[1] = i; // where is potencional win
                            if (deskarr[0][i] == 0) {
                                potencionalwinarr[2] = 0; // where is empy arr
                            }
                            else {
                                potencionalwinarr[2] = (deskarr[1][i] == 0) ? 1 : 2;
                            }
                        }
                    }
                }    
            }
            /* diagonal */
            if (((deskarr[0][0] + deskarr[1][1] + deskarr[2][2]) == 2) || ((deskarr[0][0] + deskarr[1][1] + deskarr[2][2]) == 4)) {
                if (((deskarr[0][0] + deskarr[1][1]) != 0) && ((deskarr[0][0] + deskarr[2][2]) != 0) && ((deskarr[1][1] + deskarr[2][2]) != 0)) {
                    if ((deskarr[0][0] == 0) || (deskarr[1][1] == 0) || (deskarr[2][2] == 0)) {
                        if (((deskarr[0][0] + deskarr[1][1] + deskarr[2][2] == 4) && (round == 1)) || ((deskarr[0][0] + deskarr[1][1] + deskarr[2][2] == 2) && (round == 0)) || (potencionalwinarr[0] == 0)) {
                            potencionalwinarr[0] = 3; // 3 means diagonal_win
                            potencionalwinarr[1] = i; // where is potencional win
                            if (deskarr[0][0] == 0) {
                                potencionalwinarr[2] = 0; // where is empy arr
                            }
                            else {
                                potencionalwinarr[2] = (deskarr[1][1] == 0) ? 1 : 2;
                            }
                        }
                    }
                }    
            }
            /* second diagonal */
            if (((deskarr[0][2] + deskarr[1][1] + deskarr[2][0]) == 2) || ((deskarr[0][2] + deskarr[1][1] + deskarr[2][0]) == 4)) {
                if (((deskarr[0][2] + deskarr[1][1]) != 0) && ((deskarr[0][2] + deskarr[2][0]) != 0) && ((deskarr[1][1] + deskarr[2][0]) != 0)) {
                    if ((deskarr[0][2] == 0) || (deskarr[1][1] == 0) || (deskarr[2][0] == 0)) {
                        if (((deskarr[0][2] + deskarr[1][1] + deskarr[2][0] == 4) && (round == 1)) || ((deskarr[0][2] + deskarr[1][1] + deskarr[2][0] == 2) && (round == 0)) || (potencionalwinarr[0] == 0)) {
                            potencionalwinarr[0] = 4; // 4 means second_diagonal_win
                            potencionalwinarr[1] = i; // where is potencional win
                            if (deskarr[0][2] == 0) {
                                potencionalwinarr[2] = 0; // where is empy arr
                            }
                            else {
                                potencionalwinarr[2] = (deskarr[1][1] == 0) ? 1 : 2;
                            }
                        }
                    }
                }    
            }        
        }

        // find empty blocks
        for (i = 0, j = 0; i < 3; i++) {
            for (y = 0; y < 3; y++) {
                if (deskarr[i][y] == 0) {
                    desk_empy_arr[j] = i*3 + y;
                    j++;
                }
            }
        }


        // Player 
        if ((round == 0 && player1 == 0) || (round == 1 && player2 == 0)) {
            while (1) {
                confirm = 0;
                while (deskarr[Math.trunc(player_position/3)][player_position%3] != 0) {
                    player_position++;
                    if (player_position > 8) {
                        player_position = 0;
                    } 
                }
            
                input.onButtonPressed(Button.A, function () {
                    player_position--;
                    while (deskarr[Math.trunc(player_position/3)][player_position%3] != 0) {
                        player_position--;
                        if (player_position < 0) {
                            player_position = 8;
                        }
                    }  
                })

                input.onButtonPressed(Button.B, function () {
                    player_position++;
                    if (player_position > 8) {
                        player_position = 8;
                        x = 1;
                    }
                    while ((deskarr[Math.trunc(player_position/3)][player_position%3] != 0) || (x == 1)) {
                        player_position++;
                        if (player_position > 8) {
                            player_position = 0;
                        }
                        x = 0;
                    }
                })

                input.onButtonPressed(Button.AB, function () {
                    deskarr[Math.trunc(player_position/3)][player_position%3] = round + 1;
                    confirm = 1;
                })
                
                led.plotBrightness(i = player_position%3 + 1, y = Math.trunc(player_position/3) + 1, ((3*128) - ((1+round)*128)));
                pause(300);
                led.unplot(i, y);
                pause(300);

                if (confirm == 1) {
                    break;
                }
            }
        } 
        // Bot 1 (random)
        else if ((round == 0 && player1 == 1) || (round == 1 && player2 == 1)) {
            x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
            deskarr[Math.trunc(x/3)][x%3] = round+1;
            pause(300);
        }
        // Bot 2 (medium) && Bot 3 (invincible)
        else {
            if ((deskarr[1][1] == 0) && ((round == 0 && player1 == 2) || (round == 1 && player2 == 2))) {
                deskarr[1][1] = round+1;
                pause(300);
            }
            else if (potencionalwinarr[0] != 0) {
                if (potencionalwinarr[0] == 1) {
                    deskarr[potencionalwinarr[1]][potencionalwinarr[2]] = round + 1;
                }
                else if (potencionalwinarr[0] == 2) {
                    deskarr[potencionalwinarr[2]][potencionalwinarr[1]] = round + 1;
                }
                else if (potencionalwinarr[0] == 3) {
                    deskarr[potencionalwinarr[2]][potencionalwinarr[2]] = round + 1;
                }
                else if (potencionalwinarr[0] == 4) {
                    deskarr[potencionalwinarr[2]][2 - potencionalwinarr[2]] = round + 1;
                }
                else {
                    basic.showLeds(`
                    # # # # #
                    # . . . .
                    # # # . .
                    # . . . .
                    # # # # #
                    `)
                }
            }
            // Bot 2
            else if ((round == 0 && player1 == 2) || (round == 1 && player2 == 2)) {
                x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
                deskarr[Math.trunc(x/3)][x%3] = round+1;
                pause(300);
            }
            // Bot 3
            else {
                if (myint == 0) {
                    if (Math.floor(Math.random() * 2) == 0) {
                        deskarr[1][1] = round + 1;
                    }
                    else {
                        i = Math.floor(Math.random() * 4)
                        if (i == 0) {
                            deskarr[0][0] = round + 1;
                        }
                        else if (i == 1) {
                            deskarr[0][2] = round + 1;
                        }
                        else if (i == 2) {
                            deskarr[2][0] = round + 1;
                        }
                        else {
                            deskarr[2][2] = round + 1;
                        }
                    }
                }
                else if (myint == 1) {
                    if (deskarr[1][1] != 0) {
                        switch (Math.floor(Math.random() * 4)) {
                            case 0:
                                deskarr[0][0] = round + 1;
                                break;
                            case 1:
                                deskarr[0][2] = round + 1;
                                break;
                            case 2:
                                deskarr[2][0] = round + 1;
                                break;
                            case 3:
                                deskarr[2][2] = round + 1;
                                break;
                        }
                    }
                    else {
                        deskarr[1][1] = round + 1;
                    }
                }
                else if (myint == 2) {
                    if (deskarr[1][1] == round + 1) {
                        if ((deskarr[0][0] + deskarr[0][2] + deskarr[2][0] + deskarr[2][2]) != 0) {
                            if (deskarr[0][0] != 0) {
                                deskarr[2][2] = round + 1;
                            }
                            else if (deskarr[0][2] != 0) {
                                deskarr[2][0] = round + 1;
                            }
                            else if (deskarr[2][0] != 0) {
                                deskarr[0][2] = round + 1;
                            }
                            else if (deskarr[2][2] != 0) {
                                deskarr[0][0] = round + 1;
                            }
                        }
                        else {
                            switch (Math.floor(Math.random() * 4)) {
                            case 0:
                                deskarr[0][0] = round + 1;
                                break;
                            case 1:
                                deskarr[0][2] = round + 1;
                                break;
                            case 2:
                                deskarr[2][0] = round + 1;
                                break;
                            case 3:
                                deskarr[2][2] = round + 1;
                                break;
                            }
                        }
                    }
                    else {
                        if ((deskarr[1][1] == 0) && ((deskarr[0][1] + deskarr[1][0] + deskarr[1][2] + deskarr[2][1]) != 0)) {
                            deskarr[1][1] = round + 1;
                        }
                        else {
                            if (deskarr[0][0] == (round + 1)) {
                                deskarr[2][2] = round + 1;
                            }
                            else if (deskarr[0][2] == (round + 1)) {
                                deskarr[2][0] = round + 1;
                            }
                            else if (deskarr[2][0] == (round + 1)) {
                                deskarr[0][2] = round + 1;
                            }
                            else {
                                deskarr[0][0] = round + 1;
                            }
                        }
                    }
                }
                else if (myint == 3) {
                    if (((deskarr[0][0] + deskarr[1][1] + deskarr[2][2]) > 3) && ((deskarr[0][0] != 0) && (deskarr[1][1] != 0) && (deskarr[2][2] != 0))) {
                        if (deskarr[1][1] == (round + 1)) {
                            switch (Math.floor(Math.random() * 4)) {
                            case 0:
                                deskarr[0][1] = round + 1;
                                break;
                            case 1:
                                deskarr[1][0] = round + 1;
                                break;
                            case 2:
                                deskarr[1][2] = round + 1;
                                break;
                            case 3:
                                deskarr[2][1] = round + 1;
                                break;
                            }
                        }
                        else {
                            if (Math.floor(Math.random() * 2) == 0) {
                                deskarr[0][2] = round + 1;
                            }
                            else {
                                deskarr[2][0] = round + 1;
                            }
                        }
                    }
                    else if (((deskarr[0][2] + deskarr[1][1] + deskarr[2][0]) > 3) && ((deskarr[0][2] != 0) && (deskarr[1][1] != 0) && (deskarr[2][0] != 0))) {
                        if (deskarr[1][1] == (round + 1)) {
                            switch (Math.floor(Math.random() * 4)) {
                                case 0:
                                    deskarr[0][1] = round + 1;
                                    break;
                                case 1:
                                    deskarr[1][0] = round + 1;
                                    break;
                                case 2:
                                    deskarr[1][2] = round + 1;
                                    break;
                                case 3:
                                    deskarr[2][1] = round + 1;
                                    break;
                            }
                        }
                        else {
                            if (Math.floor(Math.random() * 2) == 0) {
                                deskarr[0][0] = round + 1;
                            }
                            else {
                                deskarr[2][2] = round + 1;
                            }
                        }
                    }
                    else if ((deskarr[0][1] + deskarr[1][0]) == ((2 - round) * 2)) {
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                deskarr[0][2] = round + 1;
                                break;
                            case 1:
                                deskarr[2][0] = round + 1;
                                break;
                            case 2:
                                deskarr[0][0] = round + 1;
                                break;
                        }   
                    }
                    else if ((deskarr[0][1] + deskarr[1][2]) == ((2 - round) * 2)) {
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                deskarr[0][0] = round + 1;
                                break;
                            case 1:
                                deskarr[0][2] = round + 1;
                                break;
                            case 2:
                                deskarr[2][2] = round + 1;
                                break;
                        }   
                    }
                    else if ((deskarr[1][0] + deskarr[2][1]) == ((2 - round) * 2)) {
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                deskarr[0][0] = round + 1;
                                break;
                            case 1:
                                deskarr[2][0] = round + 1;
                                break;
                            case 2:
                                deskarr[2][2] = round + 1;
                                break;
                        }   
                    }
                    else if ((deskarr[1][2] + deskarr[2][1]) == ((2 - round) * 2)) {
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                deskarr[0][2] = round + 1;
                                break;
                            case 1:
                                deskarr[2][0] = round + 1;
                                break;
                            case 2:
                                deskarr[2][2] = round + 1;
                                break;
                        }   
                    }
                    else if (deskarr[1][1] == (round + 1)) {
                        if ((deskarr[0][1] + deskarr[1][0] + deskarr[1][2] + deskarr[2][1]) == ((2 - round) *  2)) {
                            x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
                            deskarr[Math.trunc(x/3)][x%3] = round+1;
                        }
                        if (deskarr[0][1] == (2 - round)) {
                            if ((deskarr[2][0] == (2 - round)) || (deskarr[2][2] == (2 - round))) {
                                switch (Math.floor(Math.random() * 4)) {
                                    case 0:
                                        deskarr[0][0] = round + 1;
                                        break;
                                    case 1:
                                        deskarr[0][2] = round + 1;
                                        break;
                                    case 2:
                                        deskarr[1][0] = round + 1;
                                        break;
                                    case 3:
                                        deskarr[1][2] = round + 1;
                                        break;
                                }
                            }
                        }
                        else if (deskarr[1][0] == (2 - round)) {
                            if ((deskarr[0][2] == (2 - round)) || (deskarr[2][2] == (2 - round))) {
                                switch (Math.floor(Math.random() * 4)) {
                                    case 0:
                                        deskarr[0][0] = round + 1;
                                        break;
                                    case 1:
                                        deskarr[0][1] = round + 1;
                                        break;
                                    case 2:
                                        deskarr[2][0] = round + 1;
                                        break;
                                    case 3:
                                        deskarr[2][1] = round + 1;
                                        break;
                                }
                            }
                        }
                        else if (deskarr[1][2] == (2 - round)) {
                            if ((deskarr[0][0] == (2 - round)) || (deskarr[2][0] == (2 - round))) {
                                switch (Math.floor(Math.random() * 4)) {
                                    case 0:
                                        deskarr[0][1] = round + 1;
                                        break;
                                    case 1:
                                        deskarr[0][2] = round + 1;
                                        break;
                                    case 2:
                                        deskarr[2][1] = round + 1;
                                        break;
                                    case 3:
                                        deskarr[2][2] = round + 1;
                                        break;
                                }
                            }
                        }
                        else if (deskarr[2][1] == (2 - round)) {
                            if ((deskarr[0][0] == (2 - round)) || (deskarr[0][2] == (2 - round))) {
                                switch (Math.floor(Math.random() * 4)) {
                                    case 0:
                                        deskarr[1][0] = round + 1;
                                        break;
                                    case 1:
                                        deskarr[1][2] = round + 1;
                                        break;
                                    case 2:
                                        deskarr[2][0] = round + 1;
                                        break;
                                    case 3:
                                        deskarr[2][2] = round + 1;
                                        break;
                                }
                            }
                        }
                        else {
                            x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
                            deskarr[Math.trunc(x/3)][x%3] = round+1;
                        }
                    }
                    else {
                        x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
                        deskarr[Math.trunc(x/3)][x%3] = round+1;
                    }
                }
                else if (myint == 4) {
                    if (deskarr[1][1] == 2 - round) {
                        if (deskarr[0][0] == 0) {
                            deskarr[0][0] = round + 1;
                        }
                        else if (deskarr[0][2] == 0) {
                            deskarr[0][2] = round + 1;
                        }
                        else if (deskarr[2][0] == 0) {
                            deskarr[2][0] = round + 1;
                        }
                        else if (deskarr[2][2] == 0) {
                            deskarr[2][2] = round + 1;
                        }
                    }
                    else {
                        if (((deskarr[0][0] + deskarr[1][1] + deskarr[2][2]) > 3) && ((deskarr[0][0] != 0) && (deskarr[1][1] != 0) && (deskarr[2][2] != 0))) {
                            if (deskarr[0][1] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[1][0] = round + 1;
                                }
                                else {
                                    deskarr[2][0] = round + 1;
                                }
                            }
                            else if (deskarr[1][0] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[0][1] = round + 1;
                                }
                                else {
                                    deskarr[0][2] = round + 1;
                                }
                            }
                            else if (deskarr[1][2] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[2][0] = round + 1;
                                }
                                else {
                                    deskarr[2][1] = round + 1;
                                }
                            }
                            else if (deskarr[2][1] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[0][2] = round + 1;
                                }
                                else {
                                    deskarr[1][2] = round + 1;
                                }
                            }
                        }
                        else if (((deskarr[0][2] + deskarr[1][1] + deskarr[2][0]) > 3) && ((deskarr[0][2] != 0) && (deskarr[1][1] != 0) && (deskarr[2][0] != 0))) {
                            if (deskarr[0][1] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[1][2] = round + 1;
                                }
                                else {
                                    deskarr[2][2] = round + 1;
                                }
                            }
                            else if (deskarr[1][0] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[2][1] = round + 1;
                                }
                                else {
                                    deskarr[2][2] = round + 1;
                                }
                            }
                            else if (deskarr[1][2] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[0][0] = round + 1;
                                }
                                else {
                                    deskarr[0][1] = round + 1;
                                }
                            }
                            else if (deskarr[2][1] == 2-round) {
                                if (Math.floor(Math.random() * 2) == 0) {
                                    deskarr[0][0] = round + 1;
                                }
                                else {
                                    deskarr[1][0] = round + 1;
                                }
                            }
                        }
                    }
                }
                else if (myint == 5) {
                    if ((deskarr[0][0] + deskarr[0][2] + deskarr[2][0] + deskarr[2][2]) == 0) {
                        if (deskarr[0][1] == (round + 1)) {
                            if (Math.floor(Math.random() * 2) == 0) {
                                deskarr[0][0] = round + 1;
                            }
                            else {
                                deskarr[0][2] = round + 1;
                            } 
                        }
                        else if (deskarr[1][0] == (round + 1)) {
                            if (Math.floor(Math.random() * 2) == 0) {
                                deskarr[0][0] = round + 1;
                            }
                            else {
                                deskarr[2][0] = round + 1;
                            } 
                        }
                        else if (deskarr[1][2] == (round + 1)) {
                            if (Math.floor(Math.random() * 2) == 0) {
                                deskarr[0][2] = round + 1;
                            }
                            else {
                                deskarr[2][2] = round + 1;
                            } 
                        }
                        else if (deskarr[2][1] == (round + 1)) {
                            if (Math.floor(Math.random() * 2) == 0) {
                                deskarr[2][0] = round + 1;
                            }
                            else {
                                deskarr[2][2] = round + 1;
                            } 
                        }
                    }
                    else if ((((deskarr[0][1] + deskarr[1][0] + deskarr[2][2]) == ((2 - round) * 3)) && (deskarr[0][1] != 0) && (deskarr[1][0] != 0) && (deskarr[2][2])) || (((deskarr[1][2] + deskarr[2][1] + deskarr[0][0]) == ((2 - round) * 3)) && (deskarr[1][2] != 0) && (deskarr[2][1] != 0) && (deskarr[0][0]))) {
                        if ((deskarr[0][1] == (round + 1)) || (deskarr[1][2] == (round + 1))) {
                            deskarr[2][0] = round + 1;
                        }
                        else {
                            deskarr[0][2] = round + 1;
                        } 
                    }
                    else if ((((deskarr[0][1] + deskarr[1][2] + deskarr[2][0]) == ((2 - round) * 3)) && (deskarr[0][1] != 0) && (deskarr[1][2] != 0) && (deskarr[2][0])) || (((deskarr[1][0] + deskarr[2][1] + deskarr[0][2]) == ((2 - round) * 3)) && (deskarr[1][0] != 0) && (deskarr[2][1] != 0) && (deskarr[0][2]))) {
                        if ((deskarr[0][1] == (round + 1)) || (deskarr[1][0] == (round + 1))) { 
                            deskarr[2][2] = round + 1;
                        }
                        else {
                            deskarr[0][0] = round + 1;
                        } 
                    }
                    else {
                        x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
                        deskarr[Math.trunc(x/3)][x%3] = round+1;
                    }
                }
                else if (myint == 6) {
                    if ((deskarr[0][1] == (round + 1)) || (deskarr[2][1] == (round + 1))) {
                        if (Math.floor(Math.random() * 2) == 0) {
                            deskarr[1][0] = round + 1;
                        }
                        else {
                            deskarr[1][2] = round + 1;
                        }
                    }
                    else if ((deskarr[1][0] == (round + 1)) || (deskarr[1][2] == (round + 1))) {
                        if (Math.floor(Math.random() * 2) == 0) {
                            deskarr[0][1] = round + 1;
                        }
                        else {
                            deskarr[2][1] = round + 1;
                        }
                    }
                    else {
                        basic.showLeds(`
                        # # # # .
                        # . . . .
                        # # # . .
                        # . . . .
                        # # # # .
                        `)
                    }
                }
                else {
                    x = desk_empy_arr[Math.floor(Math.random() * (9-myint))];
                    deskarr[Math.trunc(x/3)][x%3] = round+1;
                }
            }
        }

        // change round
        if (round == 0) {
            round = 1;
        }
        else if (round == 1) {
            round = 0;
        }
        else {
            _py.VALUE_ERROR
        }
        
        // draw desk
        for(i = 0; i < 3; i++) {
            for (y = 0; y < 3; y++) {
                if (deskarr[i][y] != 0) {
                    led.plotBrightness(y + 1, i + 1, 255 + 128 - 128 * deskarr[i][y]);
                }
            }
        }


        /* control */
        for (j = 1; j < 3; j++) {
            // reset diagonal variables
            diagonal_1 = 0;
            diagonal_2 = 0;
            for (i = 0; i < 3; i++) {
                // reset row and column variables
                row = 0;
                column = 0;
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
                        if (column == 3) {
                            resultarr[0] = 2; // 2 means column_win
                            resultarr[1] = i; // which column is winning
                            resultarr[2] = j; // which player is winner
                        }
                    }
                    
                    // diagonal 1
                    if (deskarr[i][i] == j && y == 0) {
                        diagonal_1++;
                        if (diagonal_1 == 3) {
                            resultarr[0] = 3; // 3 means diagonal_win
                            resultarr[1] = 1; // which diagonal is winning (1 == top-left corner to bottom-right corner)
                            resultarr[2] = j; // which player is winner
                        }
                    }

                    // diagonal 2
                    if (deskarr[i][2 - i] == j && y == 0) {
                        diagonal_2++;
                        if (diagonal_2 == 3) {
                            resultarr[0] = 3; // 3 means diagonal_win
                            resultarr[1] = 2; // which diagonal is winning (2 == top-right corner to bottom-right corner)
                            resultarr[2] = j; // which player is winner
                        }
                    }
                }
            }
        }
   
        // pause
        pause(1000);        
   
        // ending afer win/lost
        if (resultarr[0] != 0) {
            break;        
        }
    }
    confirm = 0;
    
    // evaluation   
        while (1) {
            // draw desk
            for(i = 0; i < 3; i++) {
                for (y = 0; y < 3; y++) {
                    if (deskarr[i][y] != 0) {
                        led.plotBrightness(y + 1, i + 1, 255 + 128 - 128 * deskarr[i][y]);
                    }
                }
            }
            for (i = 0; i < 4; i++) {
                // row_win
                if (resultarr[0] == 1) {
                    for (y = 0; y < 3; y++) {
                        led.unplot(y+1, resultarr[1]+1);
                        pause(100);   
                    }
                    for (y = 0; y < 3; y++) {
                        led.plotBrightness(y+1, resultarr[1]+1, 255 + 128 - 128 * resultarr[2]);
                        pause(100);   
                    }   
                }
                // column_win
                else if (resultarr[0] == 2) {
                    for (y = 0; y < 3; y++) {
                        led.unplot(resultarr[1]+1, y+1);
                        pause(100);   
                    }
                    for (y = 0; y < 3; y++) {
                        led.plotBrightness(resultarr[1]+1, y+1, 255 + 128 - 128 * resultarr[2]);
                        pause(100);   
                    }   
                }
                // diagonal_win
                else if (resultarr[0] == 3 && resultarr[1] == 1) {
                    for (y = 0; y < 3; y++) {
                        led.unplot(y+1, y+1);
                        pause(100);   
                    }
                    for (y = 0; y < 3; y++) {
                        led.plotBrightness(y+1, y+1, 255 + 128 - 128 * resultarr[2]);
                        pause(100);   
                    }   
                }
                // second diagonal_win 
                else if (resultarr[0] == 3) {
                    for (y = 0; y < 3; y++) {
                        led.unplot(y+1, 3-y);
                        pause(100);   
                    }
                    for (y = 0; y < 3; y++) {
                        led.plotBrightness(y+1, 3-y, 255 + 128 - 128 * resultarr[2]);
                        pause(100);   
                    }   
                }
                // draw
                else if (resultarr[0] == 0) {
                    ;
                }
                // error
                else {
                    basic.showLeds(`
                    # # # # #
                    # . . . .
                    # # # # .
                    # . . . .
                    # # # # #
                    `)
                    pause(10000);
                }
            }
            // Player
            basic.clearScreen();
            if ((player1 == 0 && player2 != 0) || (player1 != 0 && player2 == 0)) {
                if ((player1 == 0 && resultarr[2] == 1) || (player1 != 0 && resultarr[2] == 2)) {
                    if (helpint == 0) {
                        basic.showString("Win");
                        pause(333);
                        helpint++;
                    }
                    basic.showIcon(IconNames.Happy);
                    pause(333);
                    basic.clearScreen();
                    pause(333); 
                }
                else if (myint == 9) {
                    basic.showString("DRAW");
                }
                else {
                    if (helpint == 0) {
                        basic.showString("Lost");
                        pause(333);
                        helpint++;
                    }
                    basic.showIcon(IconNames.Sad);
                    pause(333);
                    basic.clearScreen();
                    pause(333);
                }
            }
            else {    
                if (resultarr[0] == 0) {
                    basic.showString("DRAW");
                }
                else if (player1 == 0 && player2 == 0) {
                    basic.showString("P");
                }
                else {
                    basic.showString("Bot");
                }
                pause(200);
                if (resultarr[0] != 0) {
                    for (y = 0; y < 2; y++) {
                        basic.clearScreen();
                        pause(100);
                        basic.showNumber(resultarr[2]);
                        pause(100);
                        basic.clearScreen();
                    }
                }   
            }
            // ending
            input.onButtonPressed(Button.AB, function () {
                confirm = 1;
            })
            if (confirm == 1) {
                break;
            }
        }
    confirm = 0; // reset
    // pause before restart
    pause(2000);
})
