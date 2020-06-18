export class DateHelper {

    constructor() {
        throw new Error('Date Helper cannot be instantiated!');
    }

    static stringToDate(text) {
        if (!/\d{4}-\d{2}-\d{2}/.test(text)) {
            throw new Error('Correct pattern is yyyy-MM-dd!');
        }

        return new Date(text.split('-'));
    }

    static dateToString(date) {
        return `${DateHelper.addZero(date.getDate())}/${DateHelper.addZero(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    static addZero(n) {
        return n < 10 ? '0' + n : n;
    }
}