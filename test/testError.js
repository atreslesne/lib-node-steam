'use strict';

const assert = require('chai').assert;
const SteamError = require('../src/error');

describe('SteamError', function () {
    it('UNKNOWN_ERROR', () => {
        const e = new SteamError('UNKNOWN_ERROR');
        assert.deepEqual(e.json, {
            'id': 'UNKNOWN_ERROR',
            'message': 'Неизвестная ошибка'
        });
    });

    it('UNKNOWN_METHOD', () => {
        const e = new SteamError('UNKNOWN_METHOD', { method: 'test' });
        assert.deepEqual(e.json, {
            'id': 'UNKNOWN_METHOD',
            'message': 'Неизвестный метод: test'
        });
    });

    it('MISSING_ARGUMENT', () => {
        const e = new SteamError('MISSING_ARGUMENT', { arg: 'test' });
        assert.deepEqual(e.json, {
            'id': 'MISSING_ARGUMENT',
            'message': 'Не определён обязательный аргумент: test'
        });
    });

    it('REQUEST_FAILED', () => {
        const e = new SteamError('REQUEST_FAILED', { method: 'test', status: 404 });
        assert.deepEqual(e.json, {
            'id': 'REQUEST_FAILED',
            'message': 'Ошибка при выполнении запроса test: 404'
        });
    });

    it('INVALID_RESPONSE', () => {
        const e = new SteamError('INVALID_RESPONSE', { method: 'test', message: 'parse error' });
        assert.deepEqual(e.json, {
            'id': 'INVALID_RESPONSE',
            'message': 'Ошибка при обрабоке ответа метода test: parse error'
        });
    });

    it('KEY_REQUIRED', () => {
        const e = new SteamError('KEY_REQUIRED', { method: 'test' });
        assert.deepEqual(e.json, {
            'id': 'KEY_REQUIRED',
            'message': 'Для запроса test необходимо указать ключ'
        });
    });
});
