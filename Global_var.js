
var commandKey ={};
var moveKey = {};

var Current_Pair;
var Display;

var Game;

var stack = [];
var occupation_chart = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
];

var Colors = [
    0xa612e0, // purpur
    0xffe100, // yellow
    0xeb1c3b, // red
    0x00ff00, // green
    0x0000ff, // blue
];

var rotation_dx = [
    0, -1, 0, 1,
];

var rotation_dy = [
    1, 0, -1, 0,
];


PUYO_SIZE = 50;
