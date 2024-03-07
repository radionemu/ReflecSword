var ballColor = "red";
var lineColor = "black";
var bgm = true;
//브금
var audio = new Audio("BGM/MainMenu.mp3");  //현재 재생되고 있는 음악 변수
var audioCutscene = 'BGM/CUTSCENE.mp3';
var audioMap = 'BGM/MAP.mp3';
var audioBattle = 'BGM/BATTLE_Normal.mp3';
//효과음
var DrawSE = "SE/Draw.wav";
var CursorSE = "SE/Menu Cursor.wav";
var MSelectSE = "SE/Menu Select.wav";
var StartGameSE = "SE/StartGame.wav";


var bgmvol = 100;
var sevol = 100;

var levelunlocked = [true, false, false, false, false];
var iscompleted = [false, false, false, false, false];
var HIscore = [0, 0, 0, 0, 0];

//현재 스테이지!!!!!
var currentStage = 0;

//화면 모음집
var Title = document.getElementById("Title");
var MainMenu = document.getElementById("MainMenu");

//스킵되었는가 확인
var isskipped = false;

//총합 스코어
var allcom;

var keycodes = "";
window.addEventListener('keydown', function (e){
    keycodes += e.keyCode+"";
    console.log(keycodes);
    if(keycodes.indexOf("38384040373937396566") != -1){
        console.log("Dev mod activated!");
        levelunlocked = [true, true, true, true, true];
        iscompleted = [true, true, true, true, true];
        HIscore = [100000, 10000, 1000, 100, 10];
        window.removeEventListener('keydown', arguments.callee);
    }

})

function fdout2fdin(a, b){
    var x = document.getElementById(a);
    var y = document.getElementById(b);
    x.classList.add('fadeout');
    x.addEventListener("animationend", function(){
        x.style.display="none";
        y.style.display="block";
        y.classList.add('fadein');
        y.addEventListener("animationend", function (){
            y.classList.remove('fadein');
            this.removeEventListener("animationend", arguments.callee);
        });
        x.classList.remove('fadeout');
        this.removeEventListener("animationend", arguments.callee);
    }, false);
}

function SEPlay(n){
    var se = new Audio(n);
    se.volume = sevol/100;
    se.play();
}

//오디오 플레이
function playaudio(n){
    n.volume = bgmvol/100;
    n.loop = true;
    n.load();
    n.play();
}
//페이드아웃 후 재생
async function fadeoutnplay(b, n){
    while (audio.volume> 0){
        audio.volume = audio.volume - 0.1 > 0 ? audio.volume-0.1 : 0;
        await timer(100);
    }
    audio.pause();
    await timer(n);
    audio.src=b;
    audio.volume = bgmvol/100;
    audio.load();
    audio.play();
}

//타이틀 화면
function onGame(){
    fdout2fdin("Title", "MainMenu");
    playaudio(audio);
}

//메인메뉴 백그라운드 돌리기
var menuanim = setInterval(menubackground, 500);
var isforward = true;
var index = 1;
function menubackground(){
    var img = document.getElementById("backimg");
    img.src = "Main_Menu/BackGround/menu"+index+".png";
    img.width = '900px';
    img.height = '600px';
    if(isforward){
        if(index == 3){
            isforward = false;
            index++;
        }else{index++;}
    }else{
        if(index == 2){
            isforward = true;
            index --;
        }
        else{index --;}
    }
}

//메인메뉴
var selected = false;
var selectnum = 0;

//메뉴리셋
function MenuReset(){
    for(var i = 1; i<=4; i++)
      document.getElementById("biimg"+i).src = "Main_Menu/Button/Button_0.png";
}

//스타트
function Menu2Cutscene(){
    if(selected == false){
        selected = true;
        selectnum = 1;
        document.getElementById("biimg1").src = "Main_Menu/Button/Button_1.png";
        SEPlay(CursorSE);
        return;
    }
    if(selected == true){
        if(selectnum == 1){
            selected = false;
            selectnum = 0;
            SEPlay(StartGameSE);
            fdout2fdin("MainMenu", "ics_master");
            clearInterval(menuanim);
            CutScene();
            fadeoutnplay(audioCutscene, 1000);
            MenuReset();
        }else{
            MenuReset();
            selectnum = 1;
            document.getElementById("biimg1").src = "Main_Menu/Button/Button_1.png";
            SEPlay(CursorSE);
        }
    }
}
//설정
function Menu2Setting(){
    if(selected == false){
        selected = true;
        selectnum = 2;
        document.getElementById("biimg2").src = "Main_Menu/Button/Button_1.png";
        SEPlay(CursorSE);
        return;
    }
    if(selected == true){
        if(selectnum == 2){
            selected = false;
            selectnum = 0;
            ball_color_setting();
            line_color_setting();
            SEPlay(MSelectSE);
            fdout2fdin("menui", "setting");
            MenuReset();
        }else{
            MenuReset();
            selectnum = 2;
            document.getElementById("biimg2").src = "Main_Menu/Button/Button_1.png";
            SEPlay(CursorSE);
        }
    }
}

function Setting2Menu(){
    fdout2fdin("setting", "menui");
    SEPlay(MSelectSE);
}

function Menu2Tutorial(){
    if(selected == false){
        selected = true;
        selectnum = 3;
        document.getElementById("biimg3").src = "Main_Menu/Button/Button_1.png";
        SEPlay(CursorSE);
        return;
    }
    if(selected == true){
        if(selectnum == 3){
            selected = false;
            selectnum = 0;
            fdout2fdin("menui", "tutorial");
            MenuReset();
            SEPlay(MSelectSE);
        }else{
            MenuReset();
            selectnum = 3;
            document.getElementById("biimg3").src = "Main_Menu/Button/Button_1.png";
            SEPlay(CursorSE);
        }
    }
}

function Tutorial2Menu(){
    fdout2fdin("tutorial", "menui");
    SEPlay(MSelectSE);
}

function Menu2Credit(){
    if(selected == false){
        selected = true;
        selectnum = 4;
        document.getElementById("biimg4").src = "Main_Menu/Button/Button_1.png";
        SEPlay(CursorSE);
        return;
    }
    if(selected == true){
        if(selectnum == 4){
            selected = false;
            selectnum = 0;
            fdout2fdin("menui", "credit");
            SEPlay(MSelectSE);
            MenuReset();
        }else{
            MenuReset();
            selectnum = 4;
            document.getElementById("biimg4").src = "Main_Menu/Button/Button_1.png";
            SEPlay(CursorSE);
        }
    }
}

function Credit2Menu(){
    fdout2fdin("credit", "menui");
    SEPlay(MSelectSE);
}

//컷씬용 함수
function fadein(a){
    var x = document.getElementById(a);
    x.style.display="block";
    x.classList.add('fadein');
    x.addEventListener("animationend", function (){
        x.classList.remove('fadein');
        this.removeEventListener("animationend", arguments.callee);
    });

}
function fadeout(a){
    var x = document.getElementById(a);
    x.classList.add('fadeout')
    x.addEventListener("animationend", function (){
        x.classList.remove('fadeout');
        x.style.display="none";
        this.removeEventListener("animationend", arguments.callee);
    });
}

//컷씬
var max = 5;
const timer=ms=>new Promise(res=>setTimeout(res,ms));
async function CutScene(){
    //있다가 구현
    document.addEventListener("keydown", skip, false);
    //5개 순차적으로 실행
    //이후 넘어가기
    for(var i=1; i<=5; i++){
        if(isskipped){
            return;
        }else{
            fadein("ics_"+i);
            await timer(5000);
            document.getElementById("ics_master").style.backgroundColor="black";
            fadeout("ics_"+i);
            if(i == 5){
                document.getElementById("ics_master").style.backgroundColor="white";
            }
            await timer(2000);
        }
    }
    if(isskipped){
        return;
    }else{
        await timer(1000);
        document.removeEventListener("keydown",skip,false);
        cutscene2StageSelect();
    }

}

const cutscenenum = 5;
var r2sure = 0;
var cutimg = [];
function skip(e){
    if (e.keyCode == 32){
        if(r2sure == 0){
            console.log("press spacebar one more to skip");
            r2sure ++;
        }else if(r2sure == 1){
            r2sure = 0;
            console.log("skipped!");
            //함수 실행
            document.removeEventListener("keydown",skip,false);
            cutscene2StageSelect();
            isskipped = true;
        }
    }
}

//스테이지 선택
function cutscene2StageSelect(){
    fdout2fdin("ics_master", "Stage");
    //스테이지 해금 여부
    stageUnlocked();
    fadeoutnplay(audioMap, 1000);
    topuichange(1);
}

function stageUnlocked(){
    for (var i =0; i<5; i++){
        if(levelunlocked[i] == true){
            if(iscompleted[i] == true){
                document.getElementById("stg"+(i+1)).src = "StageSelect/STAGE/stg"+(i+1)+"_com.png";
            }else{
                document.getElementById("stg"+(i+1)).src = "StageSelect/STAGE/stg"+(i+1)+"_uncom.png";
            }
        }else{
            document.getElementById("stg"+(i+1)).src = "StageSelect/STAGE/locked.png";
        }
    }
}

var stagenum = 1;
var newstage = 0;
function leftleftRevolution(){
    if(stagenum -1 == 0){
        newstage = 3;
    }else newstage = stagenum-1;
    turn();
    SEPlay(CursorSE);
}
function rightrightRevolution(){
    if(stagenum + 1 == 4){
        newstage = 1;
    }else{newstage = stagenum+1;}
    turn();
    SEPlay(CursorSE);
}
async function turn(){
    var xx = document.getElementById("whiteout");
    fadein("whiteout");
    await timer(1500);
    var img = document.getElementById("stgback");
    img.src = "StageSelect/BACK/Back"+newstage+".png";
    document.getElementById("phase"+stagenum).style.display="none";
    document.getElementById("phase"+newstage).style.display="block";
    fadeout("whiteout");
    stagenum = newstage;
    checkPage();
}
//플레이어 이동
var playerstage
function playerMove(n){
    var player = document.getElementById("stgplayer");
    if(n==1){
        player.style.top = "50%";
        player.style.left = "20%";
        playerstage = 1;
    }else if(n==2){
        player.style.top = "66%";
        player.style.left = "60%";
        playerstage = 1;
    }else if(n==3){
        player.style.top = "66%";
        player.style.left = "32%";
        playerstage = 2;
    }else if(n==4){
        player.style.top = "43%";
        player.style.left = "65%";
        playerstage = 2;
    }else if(n==5){
        player.style.top = "20%";
        player.style.left = "60%";
        playerstage = 3;
    }
    player.style.display = "block";
    player.style.transform = "translateX(50%) translateY(-50%)";
}

function checkPage(){
    if(stagenum == playerstage){
        document.getElementById("stgplayer").style.display = "block";
    }else{
        document.getElementById("stgplayer").style.display = "none";
    }
}

//흔들기 효과

//스테이지1 진입
var topui = 0;
var issure = false;

var selectlock = false;
async function stagesn(n){
    if(selectlock == false){
        if(levelunlocked[n-1] == true){
            if(issure == false){
                topui = n;
                issure = true;
                //셰이크와 함께 UI 표시

                //짜잔 플레이어 등장!
                playerMove(n);
                SEPlay(CursorSE);
            }else{
                if(topui != n){
                    topui = n;
                    playerMove(n);
                    SEPlay(CursorSE);
                }
                else{
                    selectlock = true;
                    currentStage = n;
                    //게임화면의 배경화면 변경
                    if(currentStage <= 2){
                        document.getElementById("gameback").src="GamePlay/BACK/map1.png";
                    }
                    else if(currentStage<=4){
                        document.getElementById("gameback").src="GamePlay/BACK/map2.png";
                    }
                    else{
                        document.getElementById("gameback").src="GamePlay/BACK/map3.png";
                    }
                    //캔버스 초기화
                    if(typeof ballctx != "undefined")
                        ballctx.clearRect(0,0, 450, 600);
                    if(typeof context != "undefined")
                        context.clearRect(0,0,450,600);
                    if(typeof blockctx != "undefined")
                       blockctx.clearRect(0,0,450,600);
                    stX = 0;
                    stY = 0;
                    nowX = 0;
                    nowY = 0;

                    //스테이지 진입
                    SEPlay(StartGameSE);
                    fdout2fdin("Stage", "GAMEPLAY");
                    if(currentStage == 5){
                        audioBattle = "BGM/BATTLE_Final.mp3";
                    }else{
                        audioBattle = "BGM/BATTLE_Normal.mp3";
                    }
                    fadeoutnplay(audioBattle, 1000);
                    life = 3;
                    await timer(2000);
                    start();
                }
            }
            topuichange(n);
        }
    }
}

function topuichange(n){
    //초기화
    for(var i = 1; i<=5; i++){
        document.getElementById("top"+i).style.display = "none";
        document.getElementById("HI-SCORE").style.display = "none";
    }
    document.getElementById("top"+n).style.display = "block";
    document.getElementById("HI-SCORE").style.display= "block";
    document.getElementById("HI-SCORE").innerText = "HI-SCORE : "+ "0".repeat(7 - (HIscore[n-1].toString().length)) + HIscore[n-1];
}

//인게임

//실패 시
function game2stg(a){
    //캔버스 초기화


    selectlock = false;
    fadeout(a);
    if(HIscore[currentStage-1] < score){
        HIscore[currentStage-1] = score;
    }
    fdout2fdin("GAMEPLAY", "Stage");
    fadeoutnplay(audioMap, 1000);
    stageUnlocked();
    issure = false;
    document.getElementById("HI-SCORE").innerText = "HI-SCORE : "+ "0".repeat(7 - (HIscore[currentStage-1].toString().length)) + HIscore[currentStage-1];
    if(allcom == true){
        var total = 0;
        for(var i=0; i<HIscore.length; i++){
            total += HIscore[i];
        }
        document.getElementById("alls-hiscrn").innerText = "0".repeat(7 - (total.toString().length)) + total;
        fadein("allcomplete");
    }
}

async function again2022(a){
    fadeout(a);
    if(HIscore[currentStage-1] < score){
        HIscore[currentStage-1] = score;
    }
    await timer(3000);
    life = 3;
    if(currentStage == 5){
        end = false;
    }
    start();
}

//공 색깔 슬라이더 이용해 캔버스에 색 구현
//setInterval(ball_color_setting, 100);
function ball_color_setting(){
	var bred = document.getElementById("bred").value;
	var bgreen = document.getElementById("bgreen").value;
	var bblue = document.getElementById("bblue").value;
	ballColor = "RGB("+bred+","+ bgreen+","+ bblue+")";
	var canvas = document.getElementById("ballCanvas");
    var context = canvas.getContext('2d');
	context.beginPath();
   	context.fillStyle = ballColor;
   	context.fillRect(0, 0, 1000, 1000);
   	context.closePath();
}

//setInterval(line_color_setting, 100);
function line_color_setting(){
    var lred = document.getElementById("lred").value;
    var lgreen = document.getElementById("lgreen").value;
    var lblue = document.getElementById("lblue").value;
    lineColor = "RGB("+lred+","+ lgreen+","+ lblue+")";
    var canvas = document.getElementById("lineCanvas");
    var context = canvas.getContext('2d');
    context.beginPath();
    context.fillStyle = lineColor;
    context.fillRect(0, 0, 1000, 1000);
    context.closePath();
}

//배경음악 볼륨 슬라이더의 숫자 구현
$(document).ready(function(){
    var volumeslider = $("#volume");
    var volumeNum = $("#volume_out");
    volumeslider.on('input', function(){
        volumeNum.html($(this).val());
        //console.log(volumeslider.val());
        audio.volume = (volumeslider.val()/100);
    });
})

function bgm_setting(){
    bgmvol = document.getElementById("music").value;
    audio.volume = bgmvol/100;
}
function se_setting(){
    sevol = document.getElementById("se").value;
}

function sampleSE(){
    SEPlay(CursorSE);
}