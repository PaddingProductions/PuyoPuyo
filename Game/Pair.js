
class _Pair {

    gravity_tick = 0;

    constructor () {
        this.puyo1 = new _Puyo(2,0, undefined, this);
        this.puyo2 = new _Puyo(2,1, undefined, this);

        this.x = this.puyo1.x;
        this.y = this.puyo1.y;

        // rotation 0 is straight down, rest revolves clockwise to 3
        this.rotation = 0;
    }
}



_Pair.prototype.tick = function () {

    this.Input_handler();

    
    // Gravity
    this.gravity_tick ++;
    if (this.gravity_tick > Game.gravity_limit) {
        this.gravity_tick = 0;
        this.y ++;
    }

    // Update puyos
    this.puyo1.x = this.x;
    this.puyo1.y = this.y;
    this.puyo2.x = this.x + rotation_dx[this.rotation];
    this.puyo2.y = this.y + rotation_dy[this.rotation];
    
    var destory = false;

    destory = destory || ("destory" == this.puyo1.tick());
    destory = destory || ("destory" == this.puyo2.tick());

    if (destory) this.new_pair();

}




_Pair.prototype.Input_handler = function () {

    let original = this.x;

    if (moveKey[37]) { // left
        this.x --;
    }

    if (moveKey[39]) { // right
        this.x ++;
    }

    // if passed boarder
    if (this.x < 0 || this.x >= 6) {
        this.x = original;
    }
    // if contacts stack
    if (occupation_chart[this.y][this.x] ||
        occupation_chart[this.y + rotation_dy[this.rotation]][this.x + rotation_dy[this.rotation]]) {

        this.x = original;
    }


    if (commandKey[38]) { // up, cw rotation
        this.rotation = (this.rotation + 1) % 4;
    }
    if (commandKey[90]) { // z, ccw rotation
        this.rotation = ((this.rotation - 1) % 4) + 4 * (((this.rotation - 1) % 4) < 0);
    }
}





_Pair.prototype.new_pair = function () {

    // push one up, as it only runs when it's overlapping
    this.puyo1.y --;
    this.puyo2.y --;

    this.puyo1.update();
    this.puyo2.update();

    stack.push(this.puyo1);
    stack.push(this.puyo2); 

    occupation_chart[this.puyo1.y][this.puyo1.x] = 1;
    occupation_chart[this.puyo2.y][this.puyo2.x] = 1;
    
    this.puyo1 = new _Puyo(2,0, undefined, this);
    this.puyo2 = new _Puyo(2,1, undefined, this);

    this.rotation = 0;
    
    this.x = this.puyo1.x;
    this.y = this.puyo1.y;

    this.puyo1.update();
    this.puyo2.update();
}