import { Game } from "./modules/game.mjs"

const canvas = document.getElementById("game-board")

const game = new Game(canvas)

game.initialize()
