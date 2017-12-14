'use strict';

class SteamError extends Error {
    static get error() {
        return {
            'UNKNOWN_ERROR': 'Неизвестная ошибка',
            'UNKNOWN_METHOD': 'Неизвестный метод: :method:',
            'MISSING_ARGUMENT': 'Не определён обязательный аргумент: :arg:',
            'REQUEST_FAILED': 'Ошибка при выполнении запроса :method:: :status:',
            'INVALID_RESPONSE': 'Ошибка при обрабоке ответа метода :method:: :message:',
            'KEY_REQUIRED': 'Для запроса :method: необходимо указать ключ'
        };
    }

    constructor(id, args) {
        let message = SteamError.error[id];
        if (typeof args === 'object') {
            for (let k in args) {
                message = message.replace(`:${k}:`, args[k]);
            }
        }

        super(message);
        this.id = id;
    }

    get json() {
        return {
            id: this.id,
            message: this.message
        }
    }
}

module.exports = SteamError;
