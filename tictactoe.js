"use strict";
const options = document.querySelector(".options");
const playerXplayer = document.querySelector(".player_player");
const playerXPc = document.querySelector(".player_pc");
const playAgain = document.querySelector(".play_again");
const voltar = document.querySelector(".voltar_atras");

const turn = document.querySelector(".turn");
const turn_article = document.querySelector(".article");
const turnoAtual = document.querySelector(".turno_atual");

const counter = document.querySelector(".counter");
const result = document.querySelector(".result");
const xContador = document.querySelector(".x_contador");
const oContador = document.querySelector(".o_contador");
const empateContador = document.querySelector(".empate_contador");

const squareTable = document.querySelector(".square_table");
const square = document.querySelectorAll(".square");
const mainImg = document.querySelector(".main_img");


const combGanhadora = [
    ["0","1","2"],
    ["3","4","5"],
    ["6","7","8"],
    ["0","3","6"],
    ["1","4","7"],
    ["2","5","8"],
    ["0","4","8"],
    ["2","4","6"],
];
let tableComplete = ["0","1","2","3","4","5","6","7","8"];

let x = "X";
let o = "O";

let table = [];
let playerOne = [];
let playerTwo = [];

let turnoPlayerOne = 0;
let turnoPlayerTwo = 0;

let xGanhou = "X ganhou";
let oGanhou = "O ganhou";

function twoPlayers(){
    square.forEach((ev)=>{
        ev.addEventListener("click", (e)=>{
            if(turnoPlayerOne == turnoPlayerTwo){
                turnoPlayerOne++;
                e.target.innerHTML = x;
                e.target.style.pointerEvents = "none";
                e.target.classList.add(x)
                playerOne.push(e.target.classList[1]);
                table.push(e.target.classList[1]);
                detectarJogo("Turno Jogador O");
            }else{
                turnoPlayerTwo++;
                e.target.innerHTML = o;
                e.target.style.pointerEvents = "none";
                playerTwo.push(e.target.classList[1]);
                table.push(e.target.classList[1]);
                detectarJogo("Turno Jogador X");
            };
        });
    });
};

function onePlayer(){
    square.forEach((ev)=>{
        ev.addEventListener("click", (e)=>{
            if(turnoPlayerOne == turnoPlayerTwo){
                turnoPlayerOne++;
                e.target.innerHTML = x;
                e.target.style.pointerEvents = "none";
                e.target.classList.add(x)
                playerOne.push(e.target.classList[1]);
                table.push(e.target.classList[1]);
                detectarJogo("Turno Jogador O");
            };
        });
        setInterval(()=>{
            if(turnoAtual.innerHTML == "Turno Jogador O"){
                let num = Math.floor(Math.random() * 9);
                const position = document.querySelector(`.n${num}`);
                if(position.classList[3] != "X" && position.classList[3] != "O"){
                    position.classList.add(o);
                    position.innerHTML = o;
                    turnoPlayerTwo++;
                    position.style.pointerEvents = "none";
                    playerTwo.push(position.classList[1]);
                    table.push(position.classList[1]);
                    detectarJogo("Turno Jogador X");
                };
            };
        }, 100);
    });
};

function detectarJogo(turno){
    combGanhadora.forEach((winCombination)=>{
        const xWins = winCombination.every((state) => playerOne.includes(state));
        const oWins = winCombination.every((state) => playerTwo.includes(state));
        if(xWins){
            result.innerHTML = xGanhou;
            square.forEach(e => e.style.pointerEvents = "none");
            setTimeout(()=>turnoAtual.innerHTML = "",1)
            turnoAtual.style.display = "none";
            result.style.display = "block";
            xContador.innerHTML++;
        }else if(oWins){
            result.innerHTML = oGanhou;
            setTimeout(()=>turnoAtual.innerHTML = "",1)
            turnoAtual.style.display = "none";
            result.style.display = "block";
            square.forEach(e => e.style.pointerEvents = "none");
            oContador.innerHTML++;
        }else{
            turnoAtual.innerHTML = turno;
        };
    });
    const draw = tableComplete.every((state) => table.includes(state));
    if(draw && result.innerHTML == ""){
        turnoAtual.innerHTML = "Empate"
        empateContador.innerHTML++
    };
};

function telaJogo(){
    squareTable.style.display = "block";
    turn.style.display = "block";
    counter.style.display = "block";
    playAgain.style.display = "block";
    voltar.style.display = "block"
    playerXplayer.style.display = "none";
    playerXPc.style.display = "none";
    mainImg.style.display = "none";
    result.style.display = "none"
    options.style.display = "flex"
    options.style.flexDirection = "row"
    options.style.justifyContent = "center"
};

voltar.addEventListener("click", ()=>{
    location.reload();
});

playAgain.addEventListener("click", ()=>{
    console.log(playerXplayer.classList[1])
    console.log(playerXPc.classList[1])
    square.forEach((e)=>{
        e.classList.remove("X")
        e.classList.remove("O")
        e.innerHTML = "";
        e.style.pointerEvents = "auto";
        playerOne = [];
        playerTwo = [];
        table = [];
        turnoPlayerOne = 0;
        turnoPlayerTwo = 0;
        turnoAtual.style.display = "block";
        turnoAtual.innerHTML = "Turno Jogador X";
        result.style.display = "none";
        result.innerHTML = "";
    });
});

playerXplayer.addEventListener("click", ()=>{
    playerXplayer.classList.add("ativoTwoPlayers")
    playerXPc.classList.remove("ativoOnePlayer")
    twoPlayers();
    telaJogo();
});

playerXPc.addEventListener("click", ()=>{
    playerXPc.classList.add("ativoOnePlayer")
    playerXplayer.classList.remove("ativoTwoPlayers")
    onePlayer();
    telaJogo();
});