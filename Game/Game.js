
class _Game {

    FRAME_RATE = 20;

    boardx = 100;
    boardy = 50;

    gravity_limit = 25;


    constructor () {

        // remove one color
        Colors.splice(Math.random()*5, 1);

        Display = new _Display(this.boardx, this.boardy);
        Current_Pair = new _Pair();

        this.INTERVAL = setInterval(this.tick, this.FRAME_RATE);

    };
};

_Game.prototype.tick = function () {

    Current_Pair.tick(); 

    commandKey = {};
};