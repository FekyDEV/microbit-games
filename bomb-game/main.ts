function check () {
    if (pos1 == random && pos2 == p2 || pos1 == random2 && pos2 == p22) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        control.waitMicros(3000000)
        led.enable(false)
        return
    }
}
function rychle_utoky () {
    random = randint(0, 4)
    p2 = -1
    loops.everyInterval(220, function () {
        if (!first) {
            p2 = (p2 + 1)
            led.plot(random, p2)
            first = true
        } else {
            if (p2 !== 4) {
                check()
                led.unplot(random, p2)
                p2 = (p2 + 1)
                led.plot(random, p2)
                
            } else {
                check()
                led.unplot(random, p2)
                p2 = -1
                random = randint(0, 4)
                console.log("END")
                first = false
            }

        }
        console.log("+")
    })
}
input.onButtonPressed(Button.A, function () {
    // DOLAVA
    if (pos1 == 0) {
        // BLIK BLIK
        led.unplot(pos1, pos2)
        control.waitMicros(100000)
        led.plot(pos1, pos2)
    } else {
        led.unplot(pos1, pos2)
        pos1 = pos1 - 1
        led.plot(pos1, pos2)
    }
})
input.onButtonPressed(Button.AB, function () {
    led.enable(true)
    control.reset()
})
function pomale_utoky () {
    random2 = randint(0, 4)
    p22 = -1
    loops.everyInterval(620, function () {
        if (!first2) {
            p22 = (p22 + 1)
            led.plot(random2, p22)
            first2 = true
        } else {
            if (p22 !== 4) {
                check()
                led.unplot(random2, p22)
                p22 = (p22 + 1)
                led.plot(random2, p22)
            } else {
                check()
                led.unplot(random2, p22)
                p22 = -1
                random2 = randint(0, 4)
                console.log("END")
                first2 = false
            }

        }
        console.log("+")
    })
}
input.onButtonPressed(Button.B, function () {
    // DOPRAVA
    if (pos1 == 4) {
        // BLIK BLIK
        led.unplot(pos1, pos2)
        control.waitMicros(100000)
        led.plot(pos1, pos2)
    } else {
        led.unplot(pos1, pos2)
        pos1 = pos1 + 1
        led.plot(pos1, pos2)
    }
})
let pos2 = 0
let pos1 = 0
let first = false
let first2 = false
let random = 0
let p2 = 0
let random2 = 0
let p22 = 0
// ZOBRAZENIE V STREDE
pos1 = 2
pos2 = 4
led.plot(pos1, pos2)
// Útoky
rychle_utoky()
pomale_utoky()
