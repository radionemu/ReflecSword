var canvas = document.getElementById("Layer_Draw");
var context = canvas.getContext("2d");

var lineLength = 100;
var drawingColor = "gray";
var drewColor = "black";

canvas. addEventListener ( "mousedown" , function (me) {mDown (me)},false );
canvas. addEventListener ( "mousemove" , function (me) {mMove (me)}, false );
canvas. addEventListener ( "mouseup" , function (me) {mUp (me)}, false );
canvas. addEventListener ( "mouseout" , function (me) {mOut (me)}, false );
var stX = 0;var stY = 0;
var nowX = 0;var nowY = 0;

//캔버스 시작함수
function canvasStart(){
    context.clearRect(0,0,450,600);
}

//마우스를 캔버스에서 움직였을 때 그림 그리기 여부
var drag = false ;
function mDown(me){
    context.clearRect(0,0,450,600);
    stX = me. offsetX ; //눌렀을 때 현재 마우스 X좌표를 stX에 담음
    stY = me. offsetY ; //눌렀을 때 현재 마우스 Y좌표를 stY에 담음
    nowX = stX; nowY = stY;
    if(stY<=400){
        drag=false;
        return;
    }
    drag = true ; //그림 그리기는 그리는 상태로 변경
}
function mMove(me){
    //drag가 false 일때는 return(return 아래는 실행 안함)
    if (!drag){
        return ;
    }
    context.clearRect(0,0,450,600);
    nowX = me. offsetX ;
    nowY = me. offsetY ;
    if(nowY<=400){
        drag=false;
    }
    if((stX-nowX)*(stX-nowX)+(stY-nowY)*(stY-nowY)>=lineLength*lineLength){
        drag = false;
    }
    canvasDraw(nowX, nowY);
}

function canvasDraw(currentX,currentY){
    context. beginPath ();
    context.lineCap = "round";
    context.lineWidth = 3;
    if(drag){
        context.strokeStyle=drawingColor;
        context.setLineDash([5]);
    }else{
        context.strokeStyle=drewColor;
        context.setLineDash([0]);
    }
    //마우스를 누르고 움직일 때마다 시작점을 재지정
    context. moveTo (stX,stY);
    //마우스 시작점부터 현재 점까지 라인 그리기
    context. lineTo (currentX,currentY);
    context.strokeStyle = lineColor;
    context. stroke ();
}

function mUp(me){
    drag = false ; //마우스를 떼었을 때 그리기 중지
    canvasDraw(nowX, nowY);
    SEPlay(DrawSE);
}
function mOut(me){
    drag = false ; //마우스가 캔버스 밖으로 벗어났을 때 그리기 중지
    canvasDraw(nowX, nowY);
}