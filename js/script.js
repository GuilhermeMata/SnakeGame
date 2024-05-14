const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
               { x: 200, y: 200 },
               { x: 230, y: 200 }
]

let direction, loopId

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

const GameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    MoveSnake()
    DrawSnake()

    loopId = setTimeout(() => {
            GameLoop()
        }, 300)
}

GameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction !== "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction !== "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction !== "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction !== "Down") {
        direction = "up"
    }

    
})