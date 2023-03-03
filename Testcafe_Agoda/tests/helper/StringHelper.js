class StringHelper {

    getRandomNumber(length) {
        const rand = Math.random().toString().substring(2, length);
        return rand;
    }

    getRandomStringAndNumber() {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    getRandomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    random_item(items) {
        return items[Math.floor(Math.random() * items.length)];

    }
}


export default new StringHelper();