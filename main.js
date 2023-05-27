import { Game } from "./modules/game.mjs"
import { DIALOG_STORAGE_KEY } from "./modules/constants.mjs";

const canvas = document.getElementById("game-board")

const game = new Game(canvas)

const welcomeDialog = document.getElementById("welcome-dialog")
const launchGameButton = document.getElementById("launch-game-button")

game.launch()

const today = new Date()
const lastDialogOpenedDate = new Date(localStorage.getItem(DIALOG_STORAGE_KEY))

if (lastDialogOpenedDate.getFullYear() === today.getFullYear() &&
    lastDialogOpenedDate.getMonth() === today.getMonth() &&
    lastDialogOpenedDate.getDay() === today.getDay()) {
    game.start()
    welcomeDialog.close()
} else {
    welcomeDialog.showModal()
}

launchGameButton.addEventListener('click', () => {
    game.start()
    welcomeDialog.close()
    localStorage.setItem(DIALOG_STORAGE_KEY, today.toISOString())
})
