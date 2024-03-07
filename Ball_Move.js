//공이 여러개일 때 관리방법
//

/*moveBall 개편안
* 단위시간당 움직이는 거리로
*  */

var move;



//공 x좌표, 공 y좌표, 가로벡터, 세로벡터, 공 지름
var BALL = function(x,y, ddx, ddy, bR){
    this.bx = x;
    this.by = y;
    this.dx = ddx;
    this.dy = ddy;
    this.br = bR;
    this.velocity = 1;
    this.status = 1;
}
var balls = [];
var changeAngle=false;
var life = 3;

//canvas
var dcanvas = document.getElementById("Layer_Ball");
var ctx = dcanvas.getContext("2d");

function start(){
    //캔버스 초기화
    ctx.clearRect(0,0, 450, 600);
    canvasStart();
    canvasStart();
    clearInterval(move);
    balls = [];
    sstart();
    var Ball = new BALL(225,500, 0, -1, 10);
    //var Ball2 = new BALL(120, 200, 1, 1, 10);
    balls.push(Ball);
    //balls.push(Ball2);
    score = 0;
    plusnum = 0;
    document.getElementById("lifenum").innerText = life;
    move = setInterval(moveBall,1);
}
async function respawn(){
    document.getElementById("lifenum").innerText = life;
    document.getElementById("respawnindicator").style.display = "block";
    for (var i =3; i>= 1; i--){
        document.getElementById("respnum").innerText = i;
        await timer(1000);
    }
    var Ball = new BALL(225,500, 0, -1, 10);
    balls.push(Ball);
    document.getElementById("respawnindicator").style.display = "none";
}

function result(n){
    var hs = document.getElementById(n+"-hiscrn");
    hs.innerText = "0".repeat(7 - (HIscore[currentStage-1].toString().length)) + HIscore[currentStage-1];
    var sc = document.getElementById(n+"-scrn");
    sc.innerText = "0".repeat(7 - (score.toString().length)) + score;
    if(HIscore[currentStage-1] < score){
        sc.style.color = "yellow";
    }else{
        sc.style.color = "white";
    }
}
var prevx =0;
var prevy = 0;

function moveBall(){
    ctx.clearRect(0,0,450,600);
    balls.forEach(function (b){
        if( b.by+b.br>=650){
            //이건 나중에
            const ind = balls.indexOf(b);
            balls.splice(ind, 1);
            if(balls.length == 0){
                if(life == 0){
                    if(currentStage == 5){
                        end = true;
                    }
                    result("f");
                    fadein("failedabs");
                    clearInterval(move);
                }else{
                    life--;
                    respawn();
                }
                combo = 0;
            }
        }
        //중력
        //gravity(b);
        //벽 반사로직
        if(b.bx-b.br<=0 || b.bx+b.br>=450){
            b.dx = -b.dx;
        }
        if(b.by-b.br<=0){
            b.dy = -b.dy;
        }
        //그림 반사로직
        if(calcLength(b)<=b.br && b.bx>=(nowX<stX?nowX:stX) && b.bx<=(nowX>stX?nowX:stX) && !changeAngle){//닿았을 때
            var m = (nowY-stY)/(nowX-stX);
            var newdx = (1-m*m)*b.dx/(m*m+1)+2*m*b.dy/(m*m+1) ;
            var newdy = 2*m*b.dx/(m*m+1)-(1-m*m)*b.dy/(m*m+1) ;
            b.dx = newdx;
            b.dy = newdy;
            changeAngle = true;
            combocal(0);
        }else if(calcLength(b)>b.br){
            changeAngle = false;
        }
        //벽돌 반사로직
        if(currentStage != 5){
            test1(b);
        }else{
            BossDetection(b);
        }
        prevx = b.bx;
        prevy = b.by;
        b.bx += b.dx*b.velocity;
        b.by += b.dy*b.velocity;
        drawBall(b);

        document.getElementById("combonum").innerText="x"+combo;
    });
}
function drawBall(b){
    ctx.beginPath();
    ctx.fillStyle = ballColor;
    ctx.arc(b.bx, b.by, b.br, 0, 2*Math.PI);
    ctx.fill();
}
function calcLength(b){
    if(drag){	//그리는 도중에는 거리 계산 X
        return;
    }
    return Math.abs((nowY-stY)*b.bx-(nowX-stX)*b.by+nowX*stY-stX*nowY)/Math.sqrt((stX-nowX)*(stX-nowX)+(stY-nowY)*(stY-nowY));
}

//중력

//중력상수
const g = 0.005;
function gravity(b){
    b.dy += g;
}