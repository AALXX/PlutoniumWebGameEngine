import { PlutoniumEngine } from "./src/Core/Engine.js"
let GameEngine: PlutoniumEngine;

// * Aplication Entry point
window.onload = () => {

    GameEngine = new PlutoniumEngine();
    GameEngine.start();
}

window.onresize = () => {
    GameEngine.resize();
}