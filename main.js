import { Game } from "./modules/game.mjs"

const canvas = document.getElementById("game-board")

const game = new Game(canvas)

const welcomeDialog = document.getElementById("welcome-dialog")
const launchGameButton = document.getElementById("launch-game-button")

game.launch()

launchGameButton.addEventListener('click', () => {
    game.start()
    welcomeDialog.close()
})
