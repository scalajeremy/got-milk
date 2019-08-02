let Cow = class Cow {
    constructor(){
        let spanLife= 7300;
        let currentLifeTime=0;
    }

}

let baseMoney = 9500;

let cowCost = 1435;
let groundCost = 6000;

let herd = []; // troupeau 


function Error(string){
    document.getElementById('divError').innerHTML= string;
}


document.getElementById("buyCowButton").addEventListener("click",() => {

    // si on a assez d'argent on ajoute une vache et on enleve le prix de la vache
    // sinon, on affiche un message d'erreur du style = "too poor to buy a cow, make a credit or wait for benefit."
    cowCost<baseMoney? herd.push(new Cow(0)) : error("too poor to buy a cow, make a credit or wait for benefit.");
});

document.getElementById("buyGroundButton").addEventListener("click",() => {

    // si on a assez d'argent on ajoute une vache et on enleve le prix de la vache
    // sinon, on affiche un message d'erreur du style = "too poor to buy a cow, make a credit or wait for benefit."
    cowCost<baseMoney? herd.push(new Cow(0)) : error("too poor to buy a ground, make a credit or wait for benefit.");
});



