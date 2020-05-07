const config = require('config.json');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

const Cards = db.Cards;

module.exports = {
    registerCard,
    authenticate,
    deposit,
    withdraw
};

async function authenticate({ cardno, pin }) {
    const card = await Cards.findOne({ cardno });
    if (card && bcrypt.compareSync(pin, card.pin)) {
        const { pin, ...userWithoutHash } = card.toObject();
        return {
            ...userWithoutHash
        };
    }
}

var notes = {
    "Two_Thousand": 10,
    "Five_Hundered": 15
}

async function registerCard(cardParam) {
    if (await Cards.findOne({ cardno: cardParam.cardno })) {
        throw 'Card No: "' + cardParam.cardno + '" is already present';
    }

    if(cardParam.pin.trim().length != 4)
         throw 'PIN length should not be greater than or less than 4';

    const card = new Cards(cardParam);

    if (cardParam.pin) {
        card.pin = bcrypt.hashSync(cardParam.pin, 10);
    }

    // save user
    await card.save();
}

async function deposit(params) {
    const card = await Cards.findOne({ cardno: params.cardno });
    
    if (isNaN(params.amount)) throw 'Invalid Amount Provided';
    if (!card) throw 'Card not found';
    
    card.amount += parseFloat(params.amount);

    await card.save();
    return {message: "Amount deposited successfully."}
}

async function withdraw(params) {
    const card = await Cards.findOne({ cardno: params.cardno });
    
    if (isNaN(params.amount)) throw 'Invalid Amount Provided';
    if (!card) throw 'Card not found';
    if (params.amount > 20000) throw 'Transaction Limit Exceeded - 20,000/-';

    card.amount -= parseFloat(params.amount);
    if(card.amount < 0) throw 'Infufficient Balance';

    var amount = params.amount;
    var two,five;

    two = parseInt(amount/2000);
    if(notes.Two_Thousand < two)
        two = 0
    else
        amount = amount%2000;

    if(amount%500 != 0) throw 'Please enter amount in multiples of 500';
    five = amount/500;

    if(notes.Five_Hundered < five)
        throw 'Cannot Dispense Cash due to insufficient cash in machine';

    await card.save();
    return {
        message: "Amount Withdrawn successfully.",
        notes: {
            "Two_Thousand": two,
            "Five_Hundered": five
        }
    };
}