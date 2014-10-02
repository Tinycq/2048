var board = new Array();
var score = 0;
var hasConflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {
    prepareForMobile();
    newgame();
})

function prepareForMobile(){
    if (documentWidth>500){
        gridContainerWidth = 500;
        cellSpace=20;
        cellSideLength = 100;
    }
    else{
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace+'px');
    $('#grid-container').css('board-radius',0.02*gridContainerWidth+'px');
    
    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('board-radius',0.02*cellSideLength);
    }
}
function newgame() {
    //初始化棋盘
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));

        }

    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;

        }
    }
    updateBoardView();

    score = 0;
}


function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength/2);
                theNumberCell.css('left', getPosLeft(i, j) +  cellSideLength/2);
            } else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                costomText(board[i][j], i, j);

            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.32*cellSideLength+'px');
}

function costomText(number, i, j) {
    var theNumberCell = $('#number-cell-' + i + '-' + j);
    switch (number) {

    case 2:
        myflag = '<img src="img/2.png" alt="2" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 4:
        myflag = '<img src="img/4.png" alt="4" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 8:
        myflag = '<img src="img/8.png" alt="8" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 16:
        myflag = '<img src="img/16.png" alt="16" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 32:
        myflag = '<img src="img/32.png" alt="32" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 64:
        myflag = '<img src="img/64.png" alt="64" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 128:
        myflag = '<img src="img/128.png" alt="128" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 256:
        myflag = '<img src="img/256.png" alt="256" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 512:
        myflag = '<img src="img/512.png" alt="512" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 1024:
        myflag = '<img src="img/1024.png" alt="1024" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 2048:
        myflag = '<img src="img/2048.png" alt="2048" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 4096:
        myflag = '<img src="img/4096.png" alt="4096" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    case 8192:
        myflag = '<img src="img/8192.png" alt="8192" width = "'+cellSideLength+'" height = "'+cellSideLength+'"></img>';
        break;
    default:
            myflag = '???';
     }
    theNumberCell.html(myflag);
}

function generateOneNumber() {

    if (nospace(board)) {

        return false;
    }

    //随机一个位置
    var ranx = parseInt(Math.floor(Math.random() * 4));
    var rany = parseInt(Math.floor(Math.random() * 4));
    var times = 0;

    while (times < 50) {
        if (board[ranx][rany] == 0) {
            break;
        }
        ranx = parseInt(Math.floor(Math.random() * 4));
        rany = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] == 0) {
                    ranx = i;
                    rany = j;
                }
            }
        }
    }
    //随机一个数字
    var ranNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[ranx][rany] = ranNumber;
    showNumberWithAnimation(ranx, rany, ranNumber);
    return true;
}

//touchMethod
var mx = 0;
var my = 0;
obj = $("#grid-container");
obj.ontouchstart = function (e) {
    mx = e.touches[0].pageX;
    my = e.touches[0].pageY;
}
obj.ontouchend = function (e) {
    if (mx - e.touches[0].pageX > 10) {
        // 右移动 10 个像素以上
        if (moveRight()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
    } else if (mx - e.touches[0].pageX < -10) {
        // 左移动
        if (moveLeft()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
    } else if (my - e.touches[0].pageY > 10) {
        // 向上
        if (moveUp()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
    } else if (my - e.touches[0].pageY < -10) {
        // 向下
        if (moveDown()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
    }
}
//


//keyboard
$(document).keydown(function (event) {
    
    switch (event.keyCode) {
    case 37: //left
            event.preventDefault();
        if (moveLeft()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
        break;
    case 38: //up
           event.preventDefault();
        if (moveUp()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
        break;
    case 39: //right
        if (moveRight()) {
            event.preventDefault();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
        break;
    case 40: //down
        if (moveDown()) {
            event.preventDefault();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
        break;

    }
});
//touch
document.addEventListener('touchstart',function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});
document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx-startx;
    var deltay = endy-starty;
    
    if(Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth)
        return;
    
    //touch mainfuncution
    if(Math.abs(deltax)>=Math.abs(deltay)){
        if(deltax>0){
            if (moveRight()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }//moveright
        }
        else{
            //moveleft
            if (moveLeft()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
        }
        //x
    }
    else{
        if(deltay>0){
             if (moveDown()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }
            //movedown
        }//y
        else{
            if (moveUp()) {
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 320);
        }//moveup
        }
    }
});



function isGameOver() {
    if (nospace(board) && nomove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("GAME OVER!");

}

function moveLeft() {
    if (!canMoveLeft(board)) 
        return false;

    //moveleft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (!hasConflicted[i][k] && board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] = board[i][k] + board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }

                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) return false;

    //moveright
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {

                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (!hasConflicted[i][k] && board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] = board[i][k] + board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }

                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
//moveUp
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j , k , i , board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (!hasConflicted[k][j] && board[k][j] == board[i][j] && noBlockVertical(j , k , i , board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }

        }
    }
    setTimeout("updateBoardView()", 200);
    return true;

}
//movedown
function moveDown() {
    if (!canMoveDown(board)) return false;
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (!hasConflicted[k][j] && board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }

        }
    }
    setTimeout("updateBoardView()", 100);
    return true;

}