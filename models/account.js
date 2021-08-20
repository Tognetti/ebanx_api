let accounts = [];

module.exports = class Account {
    constructor(id, amount) {
        this.id = id;
        this.balance = amount;
    }

    save() {
        accounts.push(this);
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        this.balance -= amount;
    }

    static fetchAll() {
        return accounts;
    }

    static deleteAccounts() {
        accounts = [];
    }
}