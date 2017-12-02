
var sessionStart = false;
var shuffleBtn, puzzlePiece, puzzleArea;
var ptop = 0, pleft = 0, counter = 0, min = 0, sec = 0, move = 0, timer;
"use strict"
window.onload = function(){
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var timeKeeper = document.createElement("P");
    var moves = document.createElement("P");
    var gameSession = document.createElement("P");
    
    puzzleArea = document.getElementById("puzzlearea");
    
    timeKeeper.id = "timeKeeper";
    timeKeeper.appendChild(document.createTextNode("Timer: 00:00"));
    document.getElementById("overall").insertBefore(timeKeeper,puzzleArea);
    timeKeeper.style.position = "fixed";
    timeKeeper.style.top = "13%";
    timeKeeper.style.left = "1%";
    
    moves.id = "moves";
    moves.appendChild(document.createTextNode("Moves: "));
    document.getElementById("overall").insertBefore(moves,puzzleArea);
    moves.style.position = "fixed";
    moves.style.top = "15%";
    moves.style.left = "1%";
    
    gameSession.id = "gameSession";
    document.getElementById("overall").insertBefore(gameSession,puzzleArea);
    gameSession.style.position = "fixed";
    gameSession.style.top = "20%";
    gameSession.style.left = "1%";
    
	puzzlePiece = puzzleArea.getElementsByTagName("div");
	shuffleBtn = document.getElementById("shufflebutton");
	shuffleBtn.onclick = shuffle;
    var imgs =["BG.jpg", "BG2.jpg", "BG2.jpg"];
    allignGrid(imgs[counter]);
    moves.style.padding = "10px";
    btn();
}
function allignGrid(imgFile){
    var i;
    for (i = 0; i < puzzlePiece.length; i++){
        puzzlePiece[i].className = "puzzlepiece";
        puzzlePiece[i].style.top = ptop + "px";
        puzzlePiece[i].style.left = pleft + "px";
        puzzlePiece[i].webkitTransition = "all 1000ms ease";
        puzzlePiece[i].mozTransition = "all 1000ms ease";
        puzzlePiece[i].msTransition = "all 1000ms ease";
        puzzlePiece[i].oTransition = "all 1000ms ease";
        puzzlePiece[i].style.transition = "all 1000ms ease";
        puzzlePiece[i].style.backgroundImage =  "url('./img/"+imgFile+"')";
        pleft = pleft + 100;
        if(pleft > 300){
            ptop = ptop + 100;
            pleft = 0;
        }
        puzzlePiece[i].style.backgroundPosition = "-" + puzzlePiece[i].style.left + " " + "-" + puzzlePiece[i].style.top;
        puzzlePiece[i].onmouseover = function(){
            if(validMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
        puzzlePiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
            this.style.cursor = "context-menu";
        }
        puzzlePiece[i].onmousedown = function(){
            if(validMove(this.style.left, this.style.top)){
                movesCounter();
                var lst = swap(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
            }
        }
    }
    ptop = 300;
    pleft = 300;
}
function validMove(leftPx,topPx){
    var valid = false;
    var x = parseInt(leftPx);
    var y = parseInt(topPx);
    if(x + 100 === pleft  && y === ptop){
        valid = true;   
    }
    else if(x - 100 === pleft && y === ptop){
        valid = true;
    }
    else if(y + 100 === ptop && x === pleft){
        valid = true;
    }
    else if (y - 100 === ptop && x === pleft){
        valid = true;
    }
    else {
        valid = false;
    }
    return valid;
}
function swap(leftPx, topPx){
    var temp = leftPx;
    leftPx = pleft + "px";
    pleft = parseInt(temp);
    temp = topPx;
    topPx = ptop +"px";
    ptop = parseInt(temp);
    return [leftPx, topPx];
}
function shuffle(){
    if(!sessionStart){
        timer = setInterval(timeKeeper,1000);
        var a, b;
        var lst2 = [];
        for(a = 0; a < 100; a++){
            for(b = 0; b < puzzlePiece.length; b++){
                if(validMove(puzzlePiece[b].style.left, puzzlePiece[b].style.top)){
                    lst2.push([puzzlePiece[b],b]);
                }
            }
            if(lst2.length != 0){
                var rNum = Math.floor(Math.random() * lst2.length);
                var lst = swap(lst2[rNum][0].style.left, lst2[rNum][0].style.top);
                lst2[rNum][0].style.left = lst[0];
                lst2[rNum][0].style.top = lst[1];
            }
            else{
                a--;
            }
            lst2 = [];
        }
        sessionStart = true;
    }
    else{
        
    }
}

function btn() {
    var controls = document.getElementById("controls");
    var nextImg = document.createElement("BUTTON");
    var resetBtn = document.createElement("BUTTON");
    nxtBtn.id = "nxtImage";
    resetBtn.id = "reset";
    nxtBtn.appendChild(document.createTextNode("Next Img"));
    resetBtn.appendChild(document.createTextNode("Reset Game"));
    var btnList = [nextImg, resetBtn,shuffleBtn];
    for(var c = 0; c < btnList.length; c++){
        btnList[c].style.fontFamily = "Times New Roman";
        btnList[c].style.color = "#ffffff";
        btnList[c].style.fontSize = "16px";
        btnList[c].style.background = "#ff0073";
        btnList[c].style.padding = "10px 20px 10px 20px";
        btnList[c].style.textDecoration = "none";
        btnList[c].style.border = "none";
        btnList[c].style.margin = "3px";
        btnList[c].style.cursor = "pointer";
        if(c != 2 ){
            controls.appendChild(btnList[i]);
        }
    }
    nxtBtn.addEventListener("click", nextImg);
    resetBtn.addEventListener("click", resetGame);
}

function resetGame(){
    var session = document.getElementById("gameSession");
    ptop = 0;
    pleft = 0;
	var imgs =["BG.jpg", "BG2.jpg", "BG2.jpg"];
    allignGrid(imgs[counter]);
    sessionStart = false;
    clearInterval(timer);
    document.getElementById("timeKeeper").innerHTML = "Timer: 00:00";
    document.getElementById("moves").innerHTML = "Moves:";
    min = 0;
    sec = 0;
	move = 0;
}
function nextImg(){
    if(!sessionStart){
        ptop = 0;
        pleft = 0;
        var imgs =["BG.jpg", "BG2.jpg", "BG2.jpg"];
        if(counter == 3){
            counter = 0;
        }
        else{
			counter++;
            
        }
		allignGrid(imgs[counter]);
    }
}

function modalClick(){
    var modal = document.createElement("DIV");
    var modalContent = document.createElement("DIV");
    var gameBar = document.createElement("DIV");
    var close = document.createElement("SPAN");
    gameBar.id = "gameBar";
    modal.id = "myModal";
    close.id = "close";
    modalContent.id = "modalContent";
    
    modal.style.display = "block";
    modal.style.position = "fixed"; 
    modal.style.zIndex = "1"; 
    modal.style.paddingTop = "100px";
    modal.style.left = "0px";
    modal.style.top = "0px";
    modal.style.width = "100%"; 
    modal.style.height = "100%";
    modal.style.overflow = "auto"; 
    modal.style.backgroundColor = "rgb(0,0,0)"; 
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";

    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    
    close.style.color = "#aaaaaa";
    close.style.float = "right";
    close.style.fontSize = "28px";
    close.style.fonteWight = "bold";
    close.style.cursor = "pointer";
    close.style.position = "fixed";
    close.style.top = "100px";
    close.style.right = "130px";
    close.appendChild(document.createTextNode("x"));
    close.addEventListener("click",closeModal);
    
    var paragraph = document.createElement("P");
    var header = document.createElement("H1");
    header.appendChild(document.createTextNode("Game Instructions"));
    header.style.margin = "0px";
    
   
    
    modalContent.appendChild(header);
    modalContent.appendChild(close);
    modalContent.appendChild(paragraph);
    modal.appendChild(modalContent);
    
    document.getElementById("overall").insertBefore(modal, puzzleArea);
}

function closeModal(){
    document.getElementById("myModal").style.display = "none";
}

function movesCounter(){
    move++;
    document.getElementById("moves").innerHTML = "Moves: " + move;
}

function timeKeeper(){
    var time;
    if(sec < 59){
        sec++;
    }
    else{
        sec = 0;
        min++;
    }
    if(min < 10){
       time = "Timer: 0"+min+":"; 
    }
    else{
        time = "Timer: "+min+":"; 
    }
    if(sec < 10){
        time += "0"+sec;
    }
    else{
        time += sec;
    }
    document.getElementById("timeKeeper").innerHTML = time;
}
