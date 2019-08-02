(() => {
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

let MilkPricePlayer = 0.40;
let MilkProductionPricePlayer = 0.27;


let cowCost = 1435;
let groundCost = 6000;

let herd = []; // troupeau 
let ground = 0; // number of ground

let milkStocked = 0;

function Error(string){
    document.getElementById('divError').innerHTML= string;
}

function PlayerHud(){ // function qui affichera les information du joueur
    document.getElementById("gameInformation").innerHTML = 
    `
    ${baseMoneyPlayer} / ${baseMoneyJustRuledPlayer}
    <progress id="ProgressPlayer" max="${baseMoneyJustRuledPlayer}" value="${baseMoneyPlayer}"> ${baseMoneyPlayer} / ${baseMoneyJustRuledPlayer} </progress>
    Milk in stock ${milkStocked}
    `;
}

function production()
{
    milkStocked += herd.length;
    baseMoneyPlayer -= herd.length*MilkProductionPricePlayer;

}

document.getElementById("buyCowButton").addEventListener("click",() => {
    if(cowCost<=baseMoneyPlayer)
    {
        herd.push(new Cow(0));
        baseMoneyPlayer -= cowCost;
    } 
    else
    {
        Error("too poor to buy a cow, make a credit or wait for benefit.");
    }
});

document.getElementById("buyGroundButton").addEventListener("click",() => {
    if(groundCost<=baseMoneyPlayer)
    {
        ground++;
        baseMoneyPlayer -= groundCost;
    } 
    else
    {
        Error("too poor to buy a ground, make a credit or wait for benefit.");
    }
});

document.getElementById("sellMilk").addEventListener("click",() => {
    baseMoneyPlayer+= milkStocked*MilkProductionPricePlayer;
    milkStocked = 0;
});

function main(){
    PlayerHud();
    production();
    
}

setInterval(main,60);

})();

