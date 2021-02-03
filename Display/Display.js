
class _Display {

    constructor (boardx, boardy) {

        this.container = new PIXI.Container();  // create container 
        app.stage.addChild(this.container);

        this.boardx = boardx;                   // set board locations
        this.boardy = boardy;

        this.frame = new PIXI.Graphics();       // create boarder graphics
        this.frame.position.x = this.boardx;
        this.frame.position.y = this.boardy;
        this.frame.zIndex = 0;

        this.frame.beginFill(0x000000);    
        this.frame.lineStyle(10, 0xffffff);     
        this.frame.drawRect(0 -10, 0 -10, 6*PUYO_SIZE +10*2, 12*PUYO_SIZE +10*2);  
        
        this.container.addChild(this.frame);



        this.stack = new PIXI.Container();       
        this.stack.position.x = this.boardx;
        this.stack.position.y = this.boardy;  
        this.stack.zIndex = 1;

        this.container.addChild(this.stack);
    }
}

_Display.prototype.new_Puyo = function (x,y, color) {

    graphics = new PIXI.Graphics();       // create boarder graphics
    graphics.position.x = x * PUYO_SIZE;
    graphics.position.y = y * PUYO_SIZE;
    graphics.zIndex = 3; 

    graphics.beginFill(color);    
    //graphics.lineStyle(10, color);     
    graphics.drawRect(0,0,PUYO_SIZE,PUYO_SIZE);
    
    this.stack.addChild(graphics);
    return graphics;
}