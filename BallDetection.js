//캔버스
var ballCanvas, blockCanvas;
var HealthBarCanvas;
var ballctx,blockctx,HPctx;


//블록 크기 위치 열 행 오프셋
var blockRow = 4;
var blockColumn = 5;
var blockWidth = 70;
var blockHeight = 70;
var blockPadding = 10;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;

//-1 불가 2증 3감 4더블

//5졸개 6중간 7대장

//5스테이지는 보스 전용 연출 줄 것
var m1HP = 2;
var m2HP = 3;
var m3HP = 4;

//블록 맵
var blockMap1=
    [[{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:0},{x:0,y:0,status:0}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:0}],
    [{x:0,y:0,status:5, hp:2},{x:0,y:0,status:4},{x:0,y:0,status:0},{x:0,y:0,status:1}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:0}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:0},{x:0,y:0,status:0}]];

var blockMap2=
    [[{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:2},{x:0,y:0,status:-1}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:4}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:0},{x:0,y:0,status:1}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:2}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:2},{x:0,y:0,status:-1}]];

var blockMap3=[[{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:-1},{x:0,y:0,status:1}],
    [{x:0,y:0,status:6, hp: 3},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:5, hp: 2}],
    [{x:0,y:0,status:0},{x:0,y:0,status:4},{x:0,y:0,status:2},{x:0,y:0,status:1}],
    [{x:0,y:0,status:6, hp: 3},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:5, hp:2}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:-1},{x:0,y:0,status:1}]];

var blockMap4=[[{x:0,y:0,status:0},{x:0,y:0,status:-1},{x:0,y:0,status:2},{x:0,y:0,status:0}],
    [{x:0,y:0,status:6, hp: 3},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:0}],
    [{x:0,y:0,status:7, hp:4},{x:0,y:0,status:4},{x:0,y:0,status:-1},{x:0,y:0,status:1}],
    [{x:0,y:0,status:6, hp: 3},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:3}],
    [{x:0,y:0,status:0},{x:0,y:0,status:-1},{x:0,y:0,status:5, hp: 2},{x:0,y:0,status:0}]];

var blockMap5=[[{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:0},{x:0,y:0,status:0}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:0}],
    [{x:0,y:0,status:0},{x:0,y:0,status:4},{x:0,y:0,status:0},{x:0,y:0,status:1}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:1},{x:0,y:0,status:0}],
    [{x:0,y:0,status:0},{x:0,y:0,status:1},{x:0,y:0,status:0},{x:0,y:0,status:0}]];

var masterBlockStage;

//승리를 위해 깨야하는 블럭의 개수
var wincondition = 0;
//깬 블럭 개수
var breakout = 0;

//점수 총합
var score = 0;
//점수 추가량
var plusnum = 0;

//한계량
var limitScreen = 400;

//시작
function sstart(){
    HealthBarCanvas = document.getElementById("Layer_Healthbar");
    HPctx = HealthBarCanvas.getContext('2d');
    ballCanvas=document.getElementById("Layer_Ball");
    ballctx=ballCanvas.getContext('2d');
    blockCanvas=document.getElementById("Layer_Object");
    blockctx=blockCanvas.getContext('2d');
    //paddleCanvas=document.getElementById("paddle-area");
    //paddlectx=paddleCanvas.getContext('2d');
    WIDTH=ballCanvas.width;
    HEIGHT=ballCanvas.height;
    if(currentStage != 5){
        blockctx.clearRect(0,0,450,600);
        masterBlockStage = stageSel();
        winningCond();
        drawBlock(masterBlockStage);
        drawHP(masterBlockStage);
        console.log("ended");
        startTime=new Date();
    }else{
        bHP = 8;
        zakos = [];
        for(i=0;i<8;i++){
            zakos.push(new ZAKO());
        }
        lock = true;
        imgB.src = "Boss/bossn.png";
        defeated =0;
        isfinal = false;
        bossPattern();
    }
}

//보스전 특별 룰
var end = false

//보스전
var imgB = new Image();
imgB.src = "Boss/bossn.png";
var imgBb = new Image();
imgBb.src = "Boss/bossb.png";

//보스 스펙
var bposX = 0;
var bposY = 0;
var bwidth = 150;
var bheight = 180;
var bHP = 8;
var canbhit = false;

//자코 스펙
class ZAKO{
    constructor(){
        this.zposX=0;
        this.zposY=0;
        this.zprevX=0;
        this.zprevY=0;
        this.zdx=0;
        this.zdy=0;
        this.zrad = 25;
        this.zhp=2;
        this.collision="";
    }
}

var zakos = [];
var zwidth = 50;
var zheight = 50;

function len2circle(z,b){
    return z.zrad+b.br > Math.sqrt(Math.pow(z.zposX-b.bx,2)+Math.pow(z.zposY-b.by,2)); 
}

//보스한정 리플렉트
function BossRelfect(b){
    var lB = bposX;
    var rB = bposX + bwidth;
    var tB = bposY;
    var bB = bposY + bheight;
    var rtrue = false;

    if((b.bx>=lB-b.br&&b.bx<=rB+b.br) && (b.by>=tB-b.br&&b.by<=bB+b.br)) {
        //기울기 정하기
        var x1 = bposX + bwidth/2;
        var y1 = bposY + bheight/2;

        var m = bheight/bwidth;
        var mprime = (b.by-y1)/(b.bx-x1)
        //기울기 비교하기
        if(m < Math.abs(mprime)){
            var b1 = y1 - x1*mprime;
            b.by = b.by-y1 < 0 ? bposY-b.br-1 : bposY+bheight + b.br+1;
            b.bx = (b.by-b1)/mprime;
        }
        else if(m >= Math.abs(mprime)){
            var b1 = y1 - x1*mprime;
            b.bx = b.bx - x1 > 0 ? bposX+bwidth+b.br+1:bposX - b.br-1;
            b.by = b.bx * mprime + b1;
        }
        if(b.by>=tB&&b.by<=bB){
            b.dx = -b.dx;
            rtrue = true;
        }
        if(b.bx>=lB&&b.bx<=rB){
            b.dy = -b.dy;
            rtrue = true;
        }
    }

    return rtrue;
}

var isHITTT = false;

//자코
function zakoCollisionDetection(z, b){
    var rtrue = false;

    var dxb = b.bx-b.pbx; var dyb = b.dy-b.pby; var dxz = z.zposX-z.zprevX; var dyz = z.zposY-z.zprevY;
    var cxb = b.bx; var cyb = b.by; var cxz = z.zposX; cyz = z.zposY;
    var pxb = b.pbx; var pyb = b.pby; var pxz = z.zprevX+z.zrad; var pyz = z.zprevY+z.zrad;
    var r1 = b.br; var r2 = z.zrad;

    var px = pxb-pxz; var cx = cxb-cxz; var py = pyb-pyz; var cy = cyb-cyz; 
    var pcx = px - cx; var pcy = py-cy;
    var da = Math.pow(pcx,2)+Math.pow(pcy,2);
    var db = pcx*cx+pcy*cy; //check later
    var dc = Math.pow(cx,2)+Math.pow(cy,2)-Math.pow(r1+r2,2);

    var det = db*db - da*dc;

    isHITTT = false;
    var t = -1;

    if(det >= 0){
        var result1 = (-db + Math.sqrt(det)) / da;
        var result2 = (-db - Math.sqrt(det)) / da;
        if((result1>=0 && result1<=1)||(result2>=0 && result2<=1)){
            console.log("HiT! HiT! HiT!");
            isHITTT = true;
            rtrue = true;
            result1 = result1 >= 0 ? result1 : 999; result1 = result1 <= 1 ? result1 : 999;
            result2 = result2 >= 0 ? result2 : 999; result2 = result2 <= 1 ? result2 : 999;
            t = Math.min(result1,result2); // final result
        }
    }

    if(t != -1){
        var bxt = pxb*t + (1-t)*cxb; var byt = pyb*t + (1-t)*cyb;
        var zxt = pxz*t + (1-t)*cxz; var zyt = pyz*t + (1-t)*cyz;
    
        //ball-Zako
        var normal = {x : (bxt-zxt), y : (byt-zyt)};
        var invec = {x : (b.dx), y : (b.dy)};
        var invecminus = {x : -invec.x, y: -invec.y};
        //dydx reflect to Zako Normal surface
        var dot = invecminus.x * normal.x + invecminus.y +normal.y;
        var dsize = Math.sqrt(Math.pow(b.dx,2)+Math.pow(b.dy,2));
        var reflection = {x : (invec.x + 2*normal.x*(dot)), y : (invec.y + 2*normal.y*(dot))};
        var refsize = Math.sqrt(Math.pow(reflection.x,2)+Math.pow(reflection.y,2));
        b.dx = reflection.x/refsize*dsize;
        b.dy = reflection.y/refsize*dsize;
        console.log(b.dx+" "+b.dy);
    }
    return rtrue;
}

var defeated = 0;
var isfinal = false;
var lock = true;
//충돌함수
function BossDetection(b){
    for (var i =0; i<zakos.length; i++){
        if(zakos[i].zhp >0){
            var ishit = zakoCollisionDetection(zakos[i], b);
            if(ishit == true){
                zakos[i].zhp--;
                changeVel(b,1.25, 1);
                console.log(i+"번째 자코 체력 : "+zakos[i].zhp);
                if(zakos[i].zhp<=0){
                    defeated ++;
                }
                combocal(1);
                calcscore(5);
            }
        }
    }
    //여기에서 후딱 해치웁시다
    if(defeated == 8){
        isfinal = true;
    }
    if(isfinal == true){
        if(canbhit){
            var isbosshit = BossRelfect(b);
        }
        if(isbosshit == true){
            bHP--;
            combocal(1)
            calcscore(5);
            BossDraw();
        }
        if(bHP <=0){
            combocal(i);
            calcscore(9);
            clearInterval(move);
            iscompleted[currentStage-1] = true;
            allcom = true;
            result("s");
            fadein("complete");
        }
    }
}

function BossDraw(){
    //보스 그리기
    blockctx.clearRect(0,0, 450, 600);
    //졸개 그리기
    for(var i=0; i<zakos.length; i++){
        if(zakos[i].zhp >0){
            if(isHITTT){
                blockctx.beginPath();
                blockctx.fillStyle = "red";
                blockctx.arc(zakos[i].zposX+zakos[i].zrad, zakos[i].zposY+zakos[i].zrad, zakos[i].zrad, 0, 2*Math.PI);
                blockctx.fill();
                // blockctx.fillRect(zakos[i].zposX, zakos[i].zposY, zwidth, zheight);
            }else{
                blockctx.drawImage(imgBb, zakos[i].zposX, zakos[i].zposY, zwidth, zheight);
            }
        }
    }
    if(isfinal == true){
        imgB.src="Boss/BossA.png";
    }
    blockctx.drawImage(imgB, bposX,bposY, bwidth, bheight);
    HPctx.clearRect(0,0, 450, 20)
    HPctx.fillStyle = "red";
    HPctx.fillRect(0,0,(bHP/8)*450,20);
}

//자코 움직임
var speed = 0;
var s = 0;
var bossr = 100;
var maxspeed = 2;

function zakoMove(){
    //s = speed of all zakos
    for(var i=0; i<zakos.length; i++){
        var angle = ((i+s/80)*Math.PI/4)%(Math.PI*2);
        var x = bossr * Math.cos(angle);
        var y = bossr * Math.sin(angle);
        zakos[i].zprevX = zakos[i].zposX; zakos[i].zprevY = zakos[i].zposY;
        zakos[i].zposX = (bposX+bwidth/2) + x - zwidth/2;
        zakos[i].zposY = (bposY+bheight/2) + y - zwidth/2;
        zakos[i].zdx = zakos[i].zposX-zakos[i].zprevX; zakos[i].zdy = zakos[i].zposY-zakos[i].zprevY;
    }
}

//자코제어
function accel(n){
    speed = n;
    s += speed;
}

//return zakos to default position
async function position(n){
    for(var j =0; j<n; j++){
        var count =0;
        for(var i=0; i<zakos.length; i++){
            if(bHP<=0 || end == true) return;
            var angle = ((i)*Math.PI/4)%(Math.PI*2);
            var x = bossr * Math.cos(angle);
            var y = bossr * Math.sin(angle);
            var nx = (bposX+bwidth/2) + x-zwidth/2;
            var ny = (bposY+bheight/2) + y-zwidth/2;
            zakos[i].zprevX = zakos[i].zposX; zakos[i].zprevY = zakos[i].zposY;
            zakos[i].zposX = Lerp(zakos[i].zposX, nx, 0.2);
            zakos[i].zposY = Lerp(zakos[i].zposY, ny, 0.2);
            zakos[i].zdx = zakos[i].zposX-zakos[i].zprevX; zakos[i].zdy = zakos[i].zposY-zakos[i].zprevY;
            BossDraw();
            if(zakos[i].zposX <= nx+0.5 && zakos[i].zposX >= nx-0.5 && zakos[i].zposY <= ny+0.5 && zakos[i].zposY >= ny-0.5) count++;
        }
        if(count == zakos.length)return;
        await timer(15);
    }
}

async function bossposition(nx,ny,n){
    canbhit = true;
    for(var j =0; j<n; j++){
        if(bHP<=0 || end == true) return;
        bposX = Lerp(bposX, nx, 0.2);
        bposY = Lerp(bposY, ny, 0.2);
        if(bposX <= nx+0.5 && bposX >= nx-0.5 && bposY <= ny+0.5 && bposY >= ny-0.5) return;
        BossDraw();
        await timer(15);
    }
    canbhit = false;
}

function Lerp(a,b,n){
    n = n<0? 0 : n;
    n = n > 1? 1: n;
    return a + (b-a) * n;
}

async function bossPattern(){
    while(bHP > 0 || end == false){
        var patternnum = Math.floor(Math.random()*3);
        var posx = Math.floor(Math.random()*(WIDTH-bwidth));
        var posy = Math.floor(Math.random()*(400-bwidth));
        bossposition(posx, posy, 1000);
        s = 0;
        if(patternnum == 0){
            if(bHP<=0 || end == true) return;
            //가만히 있기
            s = 0;
            zakoMove();
            BossDraw();
        }if(patternnum == 1){
            for(var i =0 ;i<500; i++){
                if(bHP<=0 || end == true) return;
                accel(i/100);
                zakoMove();
                BossDraw();
                await timer(10);
            }
            for(var i =500 ;i>500; i--){
                if(bHP<=0 || end == true) return;
                accel(i/100);
                zakoMove();
                BossDraw();
                await timer(10);
            }
        }if(patternnum == 2){
            maxspeed = 3;
            for(var i =0 ;i<400; i++){
                if(bHP == 0 || end == true) return;
                s = i;
                bossr = Math.floor(Math.sin(i/50) * 200);
                zakoMove();
                BossDraw();
                await timer(14);
            }for(var i =0 ;i<100; i++){
                if(bHP<=0 || end == true) return;
                accel(2);
                if(s >= 0){s=0;}
                zakoMove();
                BossDraw();
                await timer(10);
            }
            bossr = 100;
        }
        if(bHP<=0 || end == true) return;
        //자코 정상 포지션으로 돌아오기
        position(1000);
        //3초 기다리기
        await timer(3000);
    }
}

//보스 피통

//승리조건
function winningCond(){
    for(var i=0; i<blockColumn; i++) {
        for(var j=0; j<blockRow; j++) {
            if(masterBlockStage[i][j].status == 1)
            {
                wincondition ++;
            }
            else if(masterBlockStage[i][j].status == 5)
            {
                wincondition ++;
            }
            else if(masterBlockStage[i][j].status == 6)
            {
                wincondition ++;
            }
            else if(masterBlockStage[i][j].status == 7)
            {
                wincondition ++;
            }
        }
    }
}

//스테이지 정하는 함수
function stageSel(){
    var arr1 = [];
    for(var i=0; i<blockColumn; i++){
        var arr2 = [];
        for(var j=0; j<blockRow; j++){
            var xxxx;
            switch (currentStage){
                case 1:
                    xxxx = blockMap1;
                    break;
                case 2:
                    xxxx = blockMap2;
                    break;
                case 3:
                    xxxx = blockMap3;
                    break;
                case 4:
                    xxxx = blockMap4
                    break;
                case 5:
                    xxxx = blockMap5;
                    break;
                default:
                    break;
            }
            var obj = Object.assign({}, xxxx[i][j]);
            arr2.push(obj);
        }
        arr1.push(arr2);
    }
    return arr1;

}

//
function GeneralRelfect(block, b){
    var bb = block;
    var lBrd = bb.x;
    var rBrd = bb.x + blockWidth;
    var tBrd = bb.y;
    var bBrd = bb.y + blockHeight;
    var rtrue = false;
    if((b.bx>=lBrd-b.br&&b.bx<=rBrd+b.br) && (b.by>=tBrd-b.br&&b.by<=bBrd+b.br)) {
        //기울기 정하기
        var x1 = bb.x + blockWidth/2;
        var y1 = bb.y + blockHeight/2;

        var m = blockHeight/blockWidth;
        var mprime = (b.by-y1)/(b.bx-x1);
        //기울기 비교하기
        console.log(mprime);
        if(isFinite(mprime)){
            if(m < Math.abs(mprime)){
                var b1 = y1 - x1*mprime;
                b.by = b.by-y1 < 0 ? bb.y-b.br-1 : bb.y+blockHeight + b.br+1;
                b.bx = (b.by-b1)/mprime;
                b.dy = -b.dy;
                return true;
            }
            else if(m > Math.abs(mprime)){
                var b1 = y1 - x1*mprime;
                b.bx = b.bx - x1 > 0 ? bb.x+blockWidth+b.br+1:bb.x - b.br-1;
                b.by = b.bx * mprime + b1;
                b.dx = -b.dx;
                return true;
            }
            else if(m == Math.abs(mprime)){
                var b1 = y1 - x1*mprime;
                b.bx = b.bx - x1 > 0 ? bb.x+blockWidth+b.br+1:bb.x - b.br-1;
                b.by = b.bx * mprime + b1;
                b.dx = -b.dx;
                b.dy = -b.dy;
                return true;
            }
        }else{
            b.by = b.by-y1 < 0 ? bb.y-b.br-1 : bb.y+blockHeight + b.br+1;
            b.dy = -b.dy;
            rtrue = true;
        }
        if(b.by>=tBrd&&b.by<=bBrd){
            b.dx = -b.dx;
            rtrue = true;
        }
        if(b.bx>=lBrd&&b.bx<=rBrd){
            b.dx = -b.dx;
            rtrue = true;
        }
        console.log(b.bx);
        console.log(b.by);
    }
    return rtrue;
}

//충돌 감지
function test1(b){
    collisionDetection(masterBlockStage, b);
}

function collisionDetection(blockMap, bb) {   //블록과 공 충돌 감지 함수
    for(var i=0; i<blockColumn; i++) {
        for(var j=0; j<blockRow; j++) {
            var block = blockMap[i][j];
            //일반
            if(block.status == -1) {
                GeneralRelfect(block, bb);
                //calBlockScore();
            }
            if(block.status == 1) {
                var ishit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(ishit == true){
                    block.status=0;
                    blockctx.clearRect(0, 0, WIDTH, limitScreen);
                    drawBlock(blockMap);
                    breakout ++;
                    combocal(1);
                    //계산
                    calcscore(1)
                }
            }
            if(block.status == 2){
                var hit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(hit == true){
                    balls.forEach(function (s){
                        changeVel(s,1.25, 1);
                        combocal(1);
                        calcscore(2);
                    });
                    block.status=0;
                    blockctx.clearRect(0, 0, WIDTH,  limitScreen);
                    drawBlock(blockMap);
                }
            }
            if(block.status == 3){
                var hit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(hit == true){
                    balls.forEach(function (s){
                        changeVel(s,0.75, 1);
                        combocal(1);
                        calcscore(3);
                    });
                    block.status=0;
                    blockctx.clearRect(0, 0, WIDTH, limitScreen);
                    drawBlock(blockMap);
                }
            }
            if(block.status == 4){
                var hit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(hit == true){
                    var newBALL = new BALL(bb.bx, bb.by,-bb.dx, bb.dy, bb.br);
                    balls.push(newBALL);
                    block.status=0;
                    blockctx.clearRect(0, 0, WIDTH, limitScreen);
                    drawBlock(blockMap);
                    combocal(1);
                    calcscore(4);
                }
            }
            if(block.status == 5){
                var hit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(hit == true){
                    block.hp --;
                    if(block.hp <= 0){
                        block.status=0;
                        blockctx.clearRect(0, 0, WIDTH, limitScreen);
                        drawBlock(blockMap);
                        breakout ++;
                    }
                    HPctx.clearRect(0,0, WIDTH, limitScreen);
                    drawHP(blockMap);
                    combocal(1);
                    calcscore(4);
                }
            }
            if(block.status == 6){
                var hit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(hit == true){
                    block.hp --;
                    if(block.hp <= 0){
                        block.status=0;
                        blockctx.clearRect(0, 0, WIDTH, limitScreen);
                        drawBlock(blockMap);
                        breakout ++;
                    }
                    HPctx.clearRect(0,0, WIDTH, limitScreen);
                    drawHP(blockMap);
                    combocal(1);
                    calcscore(4);
                }
            }
            if(block.status == 7){
                var hit = GeneralRelfect(block, bb);
                //calBlockScore();
                if(hit == true){
                    block.hp --;
                    if(block.hp <= 0){
                        block.status=0;
                        blockctx.clearRect(0, 0, WIDTH, 300);
                        drawBlock(blockMap);
                        breakout ++;
                    }
                    HPctx.clearRect(0,0, WIDTH, limitScreen);
                    drawHP(blockMap);
                    combocal(1);
                    calcscore(4);
                }
            }
        }
    }
    if(wincondition!=0 && breakout >= wincondition){
        clearInterval(move);
        iscompleted[currentStage-1] = true;
        levelunlocked[currentStage] = true;
        result("s");
        fadein("complete");
    }
}

//스코어 계산함수
function calcscore(n){
    var scope = combo;
    if(n == 1){
        plusnum = 1000;
    }else if(n == 2 || n==3 || n==4 || n==5){
        plusnum = 5000;
    }
    else if(n== 9){
        plusnum = 100000;
    }else{
        plusnum = 0;
        return;
    }
    score += plusnum * combo;
    //GUI에 반영하기
    document.getElementById("plusnum").innerText="+"+plusnum +"x"+combo;
    document.getElementById("score").innerText = "0".repeat(7 - (score.toString().length)) + score;
}

//속력 변경 (아이템)
function changeVel(b, ch, num){
    if(num==1){
        b.status = num+1;
        b.velocity = ch;
        setTimeout(function(){b.velocity=1;},10000);
    }
    if(num==2){
        b.status = num+1;
        b.velocity = ch;
        setTimeout(function(){b.velocity2=1;},10000);
    }
}

//블록 그리기
var img1 = new Image();
var imgm1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var img5 = new Image();
var img6 = new Image();
var img7 = new Image();
img7.src = "MONSTER/monster3.png";
img6.src = "MONSTER/monster1.png";
img5.src = "MONSTER/monster2.png";
img4.src = "GamePlay/BLOCK/double.png";
img3.src = "GamePlay/BLOCK/Clk_dwn.png";
img2.src = "GamePlay/BLOCK/Clk_up.png";
imgm1.src = "GamePlay/BLOCK/nblock.png";
img1.src = "GamePlay/BLOCK/block.png";

function drawBlock(blockMap) {   //깨야하는 블록 그리는 함수
    for(var i=0; i<blockColumn; i++) {
        for(var j=0; j<blockRow; j++) {
            var blockX = (i*(blockWidth+blockPadding))+blockOffsetLeft;
            var blockY = (j*(blockHeight+blockPadding))+blockOffsetTop;
            if(blockMap[i][j].status == 1)
            {
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img1, blockX, blockY, blockWidth, blockHeight);
            }
            else if(blockMap[i][j].status == -1){
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(imgm1, blockX, blockY, blockWidth, blockHeight);
            }
            else if(blockMap[i][j].status == 2){//spd up
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img2, blockX, blockY, blockWidth, blockHeight);
            }
            else if(blockMap[i][j].status == 3){
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img3, blockX, blockY, blockWidth, blockHeight);
            }else if(blockMap[i][j].status == 4){
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img4, blockX, blockY, blockWidth, blockHeight);
            }else if(blockMap[i][j].status == 5){
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img5, blockX, blockY, blockWidth, blockHeight);
            }else if(blockMap[i][j].status == 6){
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img6, blockX, blockY, blockWidth, blockHeight);
            }
            else if(blockMap[i][j].status == 7){
                blockMap[i][j].x=blockX;
                blockMap[i][j].y=blockY;
                blockctx.drawImage(img7, blockX, blockY, blockWidth, blockHeight);
            }
        }
    }
}
//HP 그리는 함수
function drawHP(blockMap){
    for(var i=0; i<blockColumn; i++) {
        for(var j=0; j<blockRow; j++) {
            var blockX = (i*(blockWidth+blockPadding))+blockOffsetLeft;
            var blockY = (j*(blockHeight+blockPadding))+blockOffsetTop;
            if(blockMap[i][j].status == 5){
                var curHP = blockMap[i][j].hp;
                //프레임 잡기
                HPctx.fillStyle = "black";
                HPctx.fillRect(blockX, blockY+55, blockWidth, 15);
                HPctx.fillStyle = "red";
                HPctx.fillRect(blockX, blockY+55, blockWidth*(curHP/m1HP), 15);
            }
            if(blockMap[i][j].status == 6){
                var curHP = blockMap[i][j].hp;
                //프레임 잡기
                HPctx.fillStyle = "black";
                HPctx.fillRect(blockX, blockY+55, blockWidth, 15);
                HPctx.fillStyle = "red";
                HPctx.fillRect(blockX, blockY+55, blockWidth*(curHP/m2HP), 15);
            }
            if(blockMap[i][j].status == 7){
                var curHP = blockMap[i][j].hp;
                //프레임 잡기
                HPctx.fillStyle = "black";
                HPctx.fillRect(blockX, blockY+55, blockWidth, 15);
                HPctx.fillStyle = "red";
                HPctx.fillRect(blockX, blockY+55, blockWidth*(curHP/m3HP), 15);
            }
        }
    }
}

//콤보
//0 : 페달

var prevhit = 1;
var combo = 0;
function combocal(i){
    if(prevhit == 1 && i == 1){
        combo++
    }else if(i == 0){
        combo = 0;
    }
}