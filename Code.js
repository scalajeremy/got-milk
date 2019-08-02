let Cow = class Cow {
    constructor(){
        let spanLife= 7300;
        let currentLifeTime=0;
    }

}

let Loan = class Loan{
    constructor(amount, monthToPay){
        this.amount=amount;
        this.monthToPay = monthToPay;
        let mensuality = amount/100*121;
    }

}

// player = le joueur
// JustRuledPlayer = joueur avec regle juste de production

let baseMoneyPlayer = 9500;
let baseMoneyJustRuledPlayer = 9500;

let creditPlayer = [];
let creditJustRuledPlayer = [];

let cowCost = 1435;
let groundCost = 6000;

let herd = []; // troupeau 

function Error(string){
    document.getElementById('divError').innerHTML= string;
}

function PlayerHud(){ // function qui affichera les information du joueur
    document.getElementById("gameInformation").innerHTML = `<progress id="Argent joueur sur argent joueur possible" max="${baseMoneyJustRuledPlayer}" value="${baseMoneyPlayer}"> ${baseMoneyPlayer} / ${baseMoneyJustRuledPlayer}" </progress>`;
}

document.getElementById("buyCowButton").addEventListener("click",() => {
    cowCost<=baseMoneyPlayer? herd.push(new Cow(0)) : error("too poor to buy a cow, make a credit or wait for benefit.");
});

document.getElementById("buyGroundButton").addEventListener("click",() => {
    groundCost<=baseMoneyPlayer? herd.push(new Cow(0)) : error("too poor to buy a ground, make a credit or wait for benefit.");
});



