import { Board } from "./board.mjs"
import { Cell } from "./cell.mjs"

export class Game {
    #cells = []

    #pause = true

    constructor(canvas) {
        this.canvas = canvas

        this.board = new Board(this.canvas)

        this.board.drawBackground()

        this.launch = this.launch.bind(this)

        this.initBrowserEvents()
    }

    launch() {
        this.board.drawBackground()
        this.board.drawGrid()

        if (this.#cells.length === 0) {
            this.firstGeneration()
        }

        if (this.#pause) {
            for (let i = 0; i < this.board.size.cellNumberX; i++) {
                for (let j = 0; j < this.board.size.cellNumberY; j++) {
                    this.#cells[i][j].draw()
                }
            }
        } else {
            for (let i = 0; i < this.board.size.cellNumberX; i++) {
                for (let j = 0; j < this.board.size.cellNumberY; j++) {
                    this.setCellNeighborsByCoords(i, j);
                }
            }

            for (let i = 0; i < this.board.size.cellNumberX; i++) {
                for (let j = 0; j < this.board.size.cellNumberY; j++) {
                    this.#cells[i][j].next()
                }
            }
        }

        setTimeout(() => {
            requestAnimationFrame(this.launch)
        }, 100)
    }

    firstGeneration() {
        this.board.drawBackground()
        this.board.drawGrid()

        for (let i = 0; i < this.board.size.cellNumberX; i++) {
            this.#cells[i] = []

            for (let j = 0; j < this.board.size.cellNumberY; j++) {
                this.#cells[i][j] = new Cell(this.board.context, i, j, this.board.size.cellSize)
                this.#cells[i][j].alive = Math.random() > 0.8
                this.#cells[i][j].draw()
            }
        }
    }

    setCellNeighborsByCoords(x, y) {
        let aliveNeighborsNumber = 0

        const neighborsCoords = [
            [x, y + 1],
            [x, y - 1],
            [x + 1, y],
            [x - 1, y],
            [x + 1, y + 1],
            [x - 1, y - 1],
            [x + 1, y - 1],
            [x - 1, y + 1]
        ]

        for (const [xCord, yCord] of neighborsCoords) {
            if (this.#cells[xCord]?.[yCord]?.alive) {
                aliveNeighborsNumber++
            }

        }

        this.#cells[x][y].neighbors = aliveNeighborsNumber
    }

    start() {
        this.#pause = false
    }

    stop() {
        this.#cells = []
    }

    initBrowserEvents() {
        addEventListener('keypress', ({ code }) => {
            switch (code) {
                case 'Space':
                case 'KeyP':
                    this.#pause = !this.#pause
                    break
                case 'KeyG':
                    this.board.grid = !this.board.grid
                    break
                case 'KeyN':
                    this.stop()
                    break
            }
        })

        this.canvas.addEventListener('click', () => {
            this.#pause = !this.#pause
        })

        this.canvas.addEventListener('touchend', () => {
            this.#pause = !this.#pause
        })
    }
}
