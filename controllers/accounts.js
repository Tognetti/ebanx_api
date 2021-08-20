const Account = require('../models/account')

exports.postEvent = (req, res) => {
    const type = req.body.type;
    const amount = req.body.amount;
    let destinationAccount;
    let originAccount;

    switch (type) {
        case 'deposit':
            destinationAccount = Account.fetchAll().find(a => a.id === req.body.destination);

            if (destinationAccount) {
                destinationAccount.deposit(amount);

                res.status(201).json({
                    'destination': { 'id': destinationAccount.id, 'balance': destinationAccount.balance }
                });
            } else {
                const newAccount = new Account(req.body.destination, amount);
                newAccount.save();

                res.status(201).json({
                    'destination': { 'id': newAccount.id, 'balance': newAccount.balance }
                });
            }

            break;

        case 'withdraw':
            originAccount = Account.fetchAll().find(a => a.id === req.body.origin);

            if (originAccount) {
                originAccount.withdraw(amount);

                res.status(201).json({
                    'origin': { 'id': originAccount.id, 'balance': originAccount.balance }
                });
            } else {
                res.status(404).send('0');
            }

            break;

        case 'transfer':
            originAccount = Account.fetchAll().find(a => a.id === req.body.origin);
            destinationAccount = Account.fetchAll().find(a => a.id === req.body.destination);

            if (originAccount) {
                if(!destinationAccount) {
                    destinationAccount = new Account(req.body.destination, amount);
                    destinationAccount.save();
                } else {
                    destinationAccount.deposit(amount);
                }
                originAccount.withdraw(amount);

                res.status(201).json({
                    'origin': { 'id': originAccount.id, 'balance': originAccount.balance },
                    'destination': { 'id': destinationAccount.id, 'balance': destinationAccount.balance }
                });
            } else {
                res.status(404).send('0');
            }

            break;
    }
};

exports.getBalance = (req, res) => {
    const account = Account.fetchAll().find(a => a.id === req.query.account_id);

    if (account) {
        res.status(200).send(account.balance.toString());
    } else {
        res.status(404).send('0');
    }
};

exports.postReset = (req, res) => {
    Account.deleteAccounts();
    res.status(200).send('OK');
};