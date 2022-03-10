let disabled4 = false
let disabled3 = false
let disabled2 = false
let disabled = false
let disable = false
let pos2 = 0
let pos1 = 0
let p22 = 0
let random2 = 0
let p2 = 0
let random = 0
let first2 = false
let first = false
// NEW LEVELS //
let current_level = 1
let current_speed_fast = 280
let current_speed_slow = 680
control.inBackground(function () {
    const levels = [1, 2, 3]
    // 2 LEVEL
    control.waitMicros(15000000)
    //basic.showNumber(2)
    //control.waitMicros(3000000)
    //led.enable(false)
    //led.enable(true)
    current_level = levels[1]
    current_speed_slow = 700
    current_speed_fast = 310
    led.unplot(pos1, pos2)
    pos2 = (pos2 - 1)
    led.plot(pos1, pos2)
    console.log("(2) Current level: " + current_level)
    // 3 LEVEL
    control.waitMicros(25000000)
    current_level = levels[2]
    current_speed_slow = 750
    current_speed_fast = 360
    led.unplot(pos1, pos2)
    pos2 = (pos2 - 1)
    led.plot(pos1, pos2)
    console.log("(3) Current level: " + current_level)
})

// ZOBRAZENIE V STREDE //
pos1 = 2
pos2 = 4
led.plot(pos1, pos2)
// Útoky
rychle_utoky()
pomale_utoky()

// FUNKCIE (UTOKY) //
function check() {
    if (pos1 == random && pos2 == p2 || pos1 == random2 && pos2 == p22) {
        disable = true
        console.log("Disabling...")
        control.waitMicros(100000)
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
function rychle_utoky() {
    disabled = disable
    if (disabled) {
        console.log('Rychle utoky: Disabled')
        return
    } else {
        random = randint(0, 4)
        p2 = -1
        loops.everyInterval(current_speed_fast, function () {
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
                    first = false
                    check()
                }

            }
        })
    }
}

function pomale_utoky() {
    disabled3 = disable
    if (disabled3) {
        console.log("Pomale utoky: Disabled")
    } else {
        random2 = randint(0, 4)
        p22 = -1
        loops.everyInterval(current_speed_slow, function () {
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
                    if (disabled3) {
                        console.log("Switched")
                    } else {
                        check()
                        led.unplot(random2, p22)
                        p22 = -1
                        random2 = randint(0, 4)
                        first2 = false
                        check()
                    }

                }

            }
        })
    }
}

// TLACIDLA //
input.onButtonPressed(Button.A, function () {
    disabled2 = disable
    if (disabled2) {
        return console.log("Disabled");
    } else {
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
    }
})

input.onButtonPressed(Button.B, function () {
    disabled4 = disable
    if (disabled4) {
        return console.log("Disabled")
    } else {
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
    }
})

input.onButtonPressed(Button.AB, function () {
    led.enable(true)
    control.reset()
})