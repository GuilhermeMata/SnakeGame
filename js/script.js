const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio('../assets/audio.mp3')

const size = 30

const snake = [
               { x: 270, y: 240 },
               { x: 300, y: 240 },
               { x: 330, y: 240 },
               { x: 360, y: 240 }
]

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}

const randomNumber = (min , max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round (number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`;


}


const food =  {
    x: randomPosition(0, 570),
    y: randomPosition(0, 570),
    color: randomColor()
}              

let direction, loopId

const DrawFood = () => {

    const { x, y, color } = food


    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect (x, y, size, size)
    ctx.shadowBlur = 0
}

const DrawSnake = () => {
    ctx.fillStyle = "#ddd"
    
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "white" 
        }

        ctx.fillRect(position.x, position.y, size, size)
    })

}

const MoveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

const DrawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo (i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo (0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

DrawGrid()


const CheckEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition() 
        }
        food.x = x
        food.y = y  
        food.color =randomColor()   
    }
}

const CheckCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2
    const wallCollision = 
        head.x < 0 || head.x > 570 || head.y < 0 || head.y > 570


    const selfCollision = snake .find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
        
    if (wallCollision || selfCollision) {
        alert("Fim de Jogo")
    }
}

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText - score
    canvas.style.filter = "blur(2px)"
}


const GameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    DrawGrid()
    DrawFood()
    MoveSnake()
    DrawSnake()
    CheckEat()
    CheckCollision()

    loopId = setTimeout(() => {
            GameLoop()
        }, 180)
}

GameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})