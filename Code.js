

(() => {
    let Cow = class Cow {
        constructor() {
            this.spanLife = 7300;
            this.currentLifeTime = 0;
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
    let MilkProductionPricePlayer = 0.45;

    let MilkPriceSellJustRuledPlayer = 0.40;
    let MilkProductionPriceJustRuledPlayer = 0.40;


    let cowCost = 1435;
    let groundCost = 6000;

    let herd = [];

    let herdTemplate = [
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
        {
            possessed: false,
            cows: [],
        },
    ]; // troupeau 
    
    let ground = 0; // number of ground

    let cowforGround = 3;
    let pacsForSingleCow = 125;

    let milkStocked = 0;

    let timeElapsed = 0;
    let LoopSpeed = 66;

    let objectTemp = {};

    function Error(string) {
        let error = document.getElementById('divError');
        error.style.display = "block";
        error.innerText = string;
    }

    let viewDayPassed = 1;
    let viewmonthPassed = 1;
    let viewyearPassed = 0;

    function timeCalculator() {
        viewdate = "";

        let dayPassed = (timeElapsed/4).toFixed(0);

        if(dayPassed % 4 == 0 ){
            viewDayPassed++;
        }

        if(viewDayPassed > 30){
            viewDayPassed = 1;
            viewmonthPassed++
        }
        if(viewmonthPassed > 12){
            viewmonthPassed = 1;
            viewyearPassed++;
        }


        viewdate = viewyearPassed.toFixed(0) + " Y ";
        viewdate += viewmonthPassed.toFixed(0)+ " M ";
        viewdate += viewDayPassed.toFixed(0) + " D";
        
        return viewdate;
    }

    function PlayerHud() { // function qui affichera les information du joueur

        document.getElementById("coins").innerHTML =
            `${baseMoneyPlayer.toFixed(2)}€`;
        document.getElementById('milk').innerHTML =
            `${milkStocked}L`;
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
            Error(`You received ${pacsForSingleCow}€ for each cow. For a total of ${pacs}€`);
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
                <button id="func" type="button" class="btn btn-primary" data-dismiss="modal">Accept</button>
                </div>
            </div>
        </div>
    </div>`;
        document.getElementById('modal-target').innerHTML = modal;

        document.getElementById('func').addEventListener('click', () => { document.getElementById('modal-target').innerHTML = ''; func(moneyToLoan, year); })
        document.getElementById('clear').addEventListener('click', () => { document.getElementById('modal-target').innerHTML = '' })

    }

    function creditAction(moneyToLoan, year) {
        creditPlayer.push(new Loan(moneyToLoan, year * 12));
        baseMoneyPlayer += +moneyToLoan;

        if (moneyToLoan == cowCost) {
            document.getElementById("buyCowButton").click();
        }

        if (moneyToLoan == groundCost) {
            document.getElementById("buyGroundButton").click();
        }

    }

    function ia(action) {
        switch (action) {
            case "cow":
                baseMoneyJustRuledPlayer < cowCost ? creditJustRuledPlayer.push(new Loan(1435, 3 * 12)) : baseMoneyJustRuledPlayer -= cowCost;
                break;
            case "ground":
                baseMoneyJustRuledPlayer < groundCost ? creditJustRuledPlayer.push(new Loan(6000, 10 * 12)) : baseMoneyJustRuledPlayer -= groundCost;
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
                herd.push(new Cow);
                baseMoneyPlayer -= cowCost;
                ia("cow");
                for (let i = 0; i < herdTemplate.length; i++) {
                    const element = herdTemplate[i];
                    if (element.cows.length < 3) {
                        element.cows.push(new Cow)
                        break;
                    }

                }
                checkCows();
            }
        }
    });

    document.getElementById("buyGroundButton").addEventListener("click", () => {
        if (groundCost <= baseMoneyPlayer) {
            ground++;
            baseMoneyPlayer -= groundCost;
            ia("ground")
            for (let i = 0; i < herdTemplate.length; i++) {
                const element = herdTemplate[i];
                if (element.possessed === false) {
                    element.possessed = true;
                    document.getElementById(i + 1).innerHTML = ' <div class="blank"></div>';
                    break;
                }
            }
            checkCows();

        }
        else {
            Error("too poor to buy a ground, make a credit or wait for benefit.");
            modal("too poor to buy a ground,", 6000, 10, creditAction);
        }

    });

    document.getElementById("sellMilk").addEventListener("click", () => {
        baseMoneyPlayer += milkStocked * MilkPriceSellPlayer;
        ia("sell");
        milkStocked = 0;

    });

    function checkCows() {
        herdTemplate.forEach((enclo, i = 0) => {
            i++
            html = document.getElementById(i);
            if (!enclo.possessed) {
                html.innerHTML = '<div class="buy"></div>';
            } else {
                switch (enclo.cows.length) {
                    case 0:
                        html.innerHTML = ' <div class="blank"></div>';
                        break;
                    case 1:
                        html.innerHTML = '<div class="one-cow"></div>'
                        break;
                    case 2:
                        html.innerHTML = '<div class="two-cow"></div>'
                        break;
                    case 3:
                        html.innerHTML = '<div class="three-cow"></div>'
                        break;
                }
            }
        });
    }

    function main(loop) {

        if(baseMoneyPlayer <= 0) {
            baseMoneyPlayer = 0;
            clearInterval(loop);
            Error("No money, No milk... You Lose! Sorry!");
            PlayerHud();

        }
       
        

        PlayerHud();
        production();

        timeElapsed++;

        payTheMan();
        payTheManJustRuled();

        PACS();

        

    }

    let mainLoop = setInterval(() => { main(mainLoop) }, LoopSpeed);

})();

