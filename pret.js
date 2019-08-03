let Loan = class Loan{
    constructor(amount, monthToPay){
        this.amount=amount;
        this.monthToPay = monthToPay;
        let mensuality = amount/100*121;
    }
}