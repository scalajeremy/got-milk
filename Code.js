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
            this.TotalCreditCost = (amount/100*121).toFixed(0);
            this.mensuality = this.TotalCreditCost/monthToPay;
            this.remain = this.TotalCreditCost;
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

let cowforGround = 3;
let pacsForSingleCow = 150;

let milkStocked = 0;

let timeElapsed = 0;

function Error(string){
    let error = document.getElementById('divError');
    error.style.display = "block";
    error.innerText = string;
}

function timeCalculator()
{
    let dayPassed = timeElapsed/4;

    return dayPassed.toFixed(0);
}

function PlayerHud(){ // function qui affichera les information du joueur
    document.getElementById("gameInformation").innerHTML = 
    `
    ${baseMoneyPlayer.toFixed(2)} / ${baseMoneyJustRuledPlayer}<br />
    <progress id="ProgressPlayer" max="${baseMoneyJustRuledPlayer}" value="${baseMoneyPlayer}"> ${baseMoneyPlayer} / ${baseMoneyJustRuledPlayer} </progress><br />
    You have ${milkStocked}L of milk stocked.<br />
    You own ${herd.length} cows in your herd.<br />
    You own ${ground} ground. You need a ground for 3 cows.<br />
    ${timeCalculator()} days passed<br />
    `;
}

function production()
{
    milkStocked += herd.length;
    baseMoneyPlayer -= herd.length*MilkProductionPricePlayer/1.2;

}

function payTheMan(){
    if (creditPlayer){
        if(timeElapsed%120 == 0){
            if(creditPlayer.length > 0){
                creditPlayer.forEach((el,id,arr) => {
                    baseMoneyPlayer -= el.mensuality;
                    el.remain -= el.mensuality;
                    if(el.remain <= 0){
                        arr.splice(id,1);
                    }
                });
            }
        }
    }
}

function PACS(){
    if(timeElapsed%1460 == 0){
        pacs = herd.length * pacsForSingleCow;
        baseMoneyPlayer += pacs;
        Error(`You received 200$ for each cow. For a total of pacs ${pacs}`);
    }
}

function modal(title, moneyToLoan, year, func){
    let modal = `
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        
                    </span>
                </button>
                </div>
                <div class="modal-body">
                    You need ${moneyToLoan} to buy this.<br/>
                    Do you want to make a loan for the next ${year} years?      
                </div>
                <div class="modal-footer">
                <button id="func" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;
    document.getElementById('modal-target').innerHTML=modal;

    document.getElementById('func').addEventListener('click', func)
}


document.getElementById("buyCowButton").addEventListener("click",() => {
    if(ground == 0)
    {
        Error("Not enough ground to room your cow. Buy some ground");
    }
    else{

        if(herd.length/cowforGround >= ground)
        {
            Error("Not enough ground to room your cow. Buy some ground");
        }
        else if(cowCost>baseMoneyPlayer)
        {
            Error("too poor to buy a cow, make a credit or wait for benefit.");
            modal("test",'test','test', null)
        } 
        else
        {
            herd.push(new Cow(0));
            baseMoneyPlayer -= cowCost;
            ia("buyCow");
        }
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

// document.getElementById("creditConfirm").addEventListener("click",() => {
//     let amount = document.getElementById("moneyLawn").value;
//     let timeToPay = document.getElementById("paybackTime").value*12;
//     baseMoneyPlayer += +amount;
//     creditPlayer.push(new Loan(amount,timeToPay));

//     Error(`
//     you concrated a credit of ${creditPlayer[creditPlayer.length-1].amount}$, <br /> 
//     for a total of ${creditPlayer[creditPlayer.length-1].TotalCreditCost}$<br />
//     This will be ${creditPlayer[creditPlayer.length-1].monthToPay} month long.
//     `
//     );

// });

function main(){
    PlayerHud();
    production();
    timeElapsed++;
    payTheMan();
    PACS();
    
}

setInterval(main,33);

})();

