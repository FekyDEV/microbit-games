// USER
let pos1 = 0 // SIRKA
let pos2 = 0 // VYSKA
let end = false
    led.plot(pos1, pos2)

// AI
let ai_pos1 = 4
let ai_pos2 = 5
    led.plot(ai_pos1, ai_pos2)

// SHOOT
let sh_pos1 = 0
let sh_pos2 = pos2
    //led.plot(sh_pos1, sh_pos2)

// AI (PRESUN)
let ai_count = 0
let reverse = false
let first = true
loops.everyInterval(2000, function () {
    ai_count = (ai_count + 1)
    
    if (((ai_count == 6 && first == true) || (ai_count == 4 && first == false))  || (ai_count == 4 && reverse == true)) {
        console.log("x")
        if (reverse == false) reverse = true;
        else if (reverse == true) reverse = false;
            ai_count = 0
        first = false

        led.unplot(ai_pos1, ai_pos2)
        ai_pos2 = reverse ? (ai_pos2 + 1) : (ai_pos2 - 1)
        led.plot(ai_pos1, ai_pos2)
         } 
         else {
             console.log(ai_count + " / " + reverse)
        led.unplot(ai_pos1, ai_pos2)
        ai_pos2 = reverse ? (ai_pos2 + 1) : (ai_pos2 - 1)
        led.plot(ai_pos1, ai_pos2)
         }
    
})

// STRELA
let shooted = false
function shoot() {
    let count = 0
    let done = false
    let sh_pos_2 = pos2

    if(!shooted) {
if(!done) {
    loops.everyInterval(700, function () {
        if (count == 0 && !done) {
            if (sh_pos1 == ai_pos1 && sh_pos_2 == ai_pos2) { game.addScore(1); control.waitMicros(700000); led.plot(pos1, pos2) }
            sh_pos1 = pos1 + 1
            sh_pos2 = pos2
            led.plot(sh_pos1, sh_pos_2)
            count = count + 1
            shooted = true
        } else {
            if (count !== 5) {
                if (sh_pos1 == ai_pos1 && sh_pos_2 == ai_pos2) { game.addScore(1); control.waitMicros(700000); led.plot(pos1, pos2)  }
                if(done) {} else {
                    led.unplot(sh_pos1, sh_pos_2)
                sh_pos2 = pos2
                sh_pos1 = sh_pos1 + 1
                    led.plot(sh_pos1, sh_pos_2)
                count = count + 1
                }
            } else {
                count = 0
                done = true
                shooted = false; return;
            }


        }
    })
} else {
    done = false
    shooted = false
}
    }
    
}

basic.forever(function () {
 	input.onButtonPressed(Button.A, function() {
        led.unplot(pos1, pos2)
        if(pos2 !== 4 && !end) {
            pos2 = pos2 + 1
            led.plot(pos1, pos2)
        } else {
            if(pos2 == 0) {
                end = false
                    pos2 = pos2 + 1
                    led.plot(pos1, pos2)
            } else {
                end = true
                    pos2 = pos2 - 1
                    led.plot(pos1, pos2)
            }
        }
            
    })
    
    input.onButtonPressed(Button.B, function () {
        shoot()
    })
})
