class DateHelper {

    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static stringToDate(text) {
        if (!/\d{4}-\d{2}-\d{2}/.test(text)) {
            throw new Error('Correct pattern is yyyy-MM-dd!');
        }

        return new Date(text.split('-'));
    }

    static dateToString(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}