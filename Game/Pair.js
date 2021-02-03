
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
    this.Gravity();

    this.update_puyos();

    this.Position_check();
}



_Pair.prototype.Gravity = function () {
    this.gravity_tick ++;
    if (this.gravity_tick > Game.gravity_limit) {
        this.gravity_tick = 0;
        this.y ++;
    }
}




_Pair.prototype.Input_handler = function () {

    if (moveKey[37]) { // left
        this.x --;
    }

    if (moveKey[39]) { // right
        this.x ++;
    }

    if (commandKey[38]) { // up, cw rotation
        this.rotation = (this.rotation + 1) % 4;
    }
    if (commandKey[90]) { // z, ccw rotation
        this.rotation = ((this.rotation - 1) % 4) + 4 * (((this.rotation - 1) % 4) < 0);
    }
}






_Pair.prototype.Position_check = function () {
    
    // If contact left wall
    if (this.puyo1.x < 0 || this.puyo2.x < 0 ) {
        while (this.puyo1.x < 0 || this.puyo2.x < 0 ) {
            this.x ++;
            this.update_puyos();
        }
    }

    // If contact right wall
    if (this.puyo1.x >= 6 || this.puyo2.x >= 6) {
        while (this.puyo1.x >= 6 || this.puyo2.x >= 6) {
            this.x --;
            this.update_puyos();
        }
    }

    // If contact floor
    if (this.puyo1.y >= 12 || this.puyo2.y >= 12) {
        this.new_pair();
    }

    // If contact stack 
    if (occupation_chart[this.puyo1.y][this.puyo1.x] || 
        occupation_chart[this.puyo2.y][this.puyo2.x]) {
        
        // Splitting cases
        while (this.puyo1.y < 12 && !occupation_chart[this.puyo1.y][this.puyo1.x]) {
            this.puyo1.y ++;
        }
        while (this.puyo2.y < 12 && !occupation_chart[this.puyo2.y][this.puyo2.x]) {
            this.puyo2.y ++;
        }

        this.new_pair();
    }

    this.puyo1.update();
    this.puyo2.update();
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




_Pair.prototype.update_puyos = function () { 
    // Update puyos
    this.puyo1.x = this.x;
    this.puyo1.y = this.y;
    this.puyo2.x = this.x + rotation_dx[this.rotation];
    this.puyo2.y = this.y + rotation_dy[this.rotation];
}