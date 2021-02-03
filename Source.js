const app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: 0x000000, 
    resolution: window.devicePixelRatio || 1,
});

PIXI.settings.SORTABLE_CHILDREN =true;
document.body.appendChild(app.view);



function Source_loop () {

    Game = new _Game ();

    clearInterval(SOURCE_INTERVAL);
}




SOURCE_INTERVAL = setInterval(Source_loop,33);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);