function showNumberWithAnimation(x,y,randNumber){
    
    var numberCell = $('#number-cell-'+x+'-'+y);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    costomText(randNumber,x,y);
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top : getPosTop(x,y),
        left: getPosLeft(x,y)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}
function updateScore(score){
    $('#score').text(score);
    
}
