// import {coins} from './assets/coins.svg'; 
(() => {
    let Cow = class Cow {
        constructor() {
            let spanLife = 7300;
            let currentLifeTime = 0;
        }

    }

    let Loan = class Loan {
        constructor(amount, monthToPay) {
            this.amount = amount;
            this.monthToPay = monthToPay;
            this.TotalCreditCost = (amount / 100 * 121).toFixed(0);
            this.mensuality = this.TotalCreditCost / monthToPay;
            this.remain = this.TotalCreditCost;
        }

    }

    // player = le joueur
    // JustRuledPlayer = joueur avec regle juste de production

    let baseMoneyPlayer = 9500;
    let baseMoneyJustRuledPlayer = 9500;

    let creditPlayer = [];
    let creditJustRuledPlayer = [];

    let MilkPriceSellPlayer = 0.27;
    let MilkProductionPricePlayer = 0.40;

    let MilkPriceSellJustRuledPlayer = 0.40;
    let MilkProductionPriceJustRuledPlayer = 0.40;


    let cowCost = 1435;
    let groundCost = 6000;

    let herd = []; // troupeau 
    let ground = 0; // number of ground

    let cowforGround = 3;
    let pacsForSingleCow = 150;

    let milkStocked = 0;

    let timeElapsed = 0;
    let LoopSpeed = 1;

    function Error(string) {
        let error = document.getElementById('divError');
        error.style.display = "block";
        error.innerText = string;
    }

    function timeCalculator() {
        let dayPassed = timeElapsed / 4;

        return dayPassed.toFixed(0);
    }

    function PlayerHud(){ // function qui affichera les information du joueur
    
        document.getElementById("coins").innerHTML = 
            `${baseMoneyPlayer.toFixed(2)}`;
        document.getElementById('milk').innerHTML =
            `${milkStocked}`;
        document.getElementById("time").innerHTML =
            ` ${timeCalculator()}`;
    }
    

    function production() {
        milkStocked += herd.length;
        baseMoneyPlayer -= herd.length * MilkProductionPricePlayer;
        ia("production");

    }

    function payTheMan() {
        if (creditPlayer) {
            if (timeElapsed % 120 == 0) {
                if (creditPlayer.length > 0) {
                    creditPlayer.forEach((el, id, arr) => {
                        baseMoneyPlayer -= el.mensuality;
                        el.remain -= el.mensuality;
                        if (el.remain <= 0) {
                            arr.splice(id, 1);
                        }
                    });
                }
            }
        }
    }

    function payTheManJustRuled() {
        if (creditJustRuledPlayer) {
            if (timeElapsed % 120 == 0) {
                if (creditJustRuledPlayer.length > 0) {
                    creditJustRuledPlayer.forEach((el, id, arr) => {
                        baseMoneyJustRuledPlayer -= el.mensuality;
                        el.remain -= el.mensuality;
                        if (el.remain <= 0) {
                            arr.splice(id, 1);
                        }
                    });
                }

            }
        }
    }

    function PACS() {
        if (timeElapsed % 1460 == 0) {
            pacs = herd.length * pacsForSingleCow;
            baseMoneyPlayer += pacs;
            Error(`You received ${pacsForSingleCow}$ for each cow. For a total of pacs ${pacs}`);
        }
    }

    function modal(title, moneyToLoan, year, func) {
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
                <button type="button" id ="clear" class="btn btn-secondary" data-dismiss="modal">Refuse</button>
                <button id="func" id='clear' type="button" class="btn btn-primary" data-dismiss="modal">Accept</button>
                </div>
            </div>
        </div>
    </div>`;
        document.getElementById('modal-target').innerHTML = modal;

        document.getElementById('func').addEventListener('click', () => func(moneyToLoan, year))
        document.getElementById('clear').addEventListener('click', () => document.getElementById('modal-target').innerHTML = '');
    }

    function creditAction(moneyToLoan, year) {
        creditPlayer.push(new Loan(moneyToLoan, year * 12));
        baseMoneyPlayer += +moneyToLoan;
    }

    function ia(action) {
        switch (action) {
            case "cow":
                baseMoneyJustRuledPlayer < cowCost ? creditJustRuledPlayer.push(new Loan(1435, 3 * 12)) : baseMoneyJustRuledPlayer-= cowCost ;
                break;
            case "ground":
                baseMoneyJustRuledPlayer < groundCost ? creditJustRuledPlayer.push(new Loan(6000, 10 * 12)) : baseMoneyJustRuledPlayer-= groundCost;
                break;
            case "sell":
                baseMoneyJustRuledPlayer += milkStocked * MilkPriceSellJustRuledPlayer;
                break;
            case "production":
                milkStocked += herd.length;
                baseMoneyJustRuledPlayer -= herd.length * MilkProductionPriceJustRuledPlayer;
                break;
            default:
                console.log("gne?");
                break;
        }
    }


    document.getElementById("buyCowButton").addEventListener("click", () => {
        if (ground == 0) {
            Error("Not enough ground to room your cow. Buy some ground");
        }
        else {

            if (herd.length / cowforGround >= ground) {
                Error("Not enough ground to room your cow. Buy some ground");
            }
            else if (cowCost > baseMoneyPlayer) {
                Error("too poor to buy a cow, make a credit or wait for benefit.");
                modal("too poor to buy a cow,", 1435, 3, creditAction);
            }
            else {
                herd.push(new Cow(0));
                baseMoneyPlayer -= cowCost;
                ia("cow");
            }
        }
    });


    document.getElementById("buyGroundButton").addEventListener("click", () => {
        if (groundCost <= baseMoneyPlayer) {
            ground++;
            baseMoneyPlayer -= groundCost;
            ia("ground")

        }
        else {
            Error("too poor to buy a ground, make a credit or wait for benefit.");
            modal("too poor to buy a cow,", 6000, 10, creditAction);
        }
    });

    document.getElementById("sellMilk").addEventListener("click", () => {
        baseMoneyPlayer += milkStocked * MilkPriceSellPlayer;
        ia("sell");
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

    function main() {
        PlayerHud();
        production();

        timeElapsed++;

        payTheMan();
        payTheManJustRuled();

        PACS();

        if(baseMoneyPlayer <= 0 && milkStocked > 0){
            document.getElementById("sellMilk").click();
            Error("you ran out of money, automaticaly sell all the milk.");
        }
        else if(baseMoneyPlayer <= 0 && milkStocked <= 0){
            clearInterval(mainLoop);
            Error("No money, No milk... You Lose! Sorry!");
        }

    }

    let mainLoop = setInterval(main, LoopSpeed);

})();

