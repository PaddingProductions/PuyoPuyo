
class _Puyo {

    constructor (x, y, color, master) {

        color = Colors[Math.floor( Math.random()*4) ];

        this.display = Display.new_Puyo(x,y,color);

        this.x = x;
        this.y = y;

        this.gravity_tick = 0;
        this.master = master;
    }
}

_Puyo.prototype.tick = function () {


    this.update();

    // If contacted bottom
    if (this.y >= 12 || occupation_chart[this.y][this.x] == 1) {
        return "destory";
    }
    return "";
}

_Puyo.prototype.update = function () {

    this.display.x = this.x*PUYO_SIZE;
    this.display.y = this.y*PUYO_SIZE;
}