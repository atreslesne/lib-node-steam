'use strict';

const assert = require('chai').assert;
const SteamClient = require('../src/client');
const SteamError = require('../src/error');
const EntityNews = require('../src/entity/entityNews');

describe('SteamClient', function () {
    const client = new SteamClient();

    it('prepare.UNKNOWN_METHOD', () => {
        try {
            client.prepare('test');
        } catch (e) {
            assert.instanceOf(e, SteamError);
            assert.deepEqual(e.json, {
                'id': 'UNKNOWN_METHOD',
                'message': 'Неизвестный метод: test'
            });
            assert.isOk(true);
            return;
        }
        assert.isOk(false);
    });

    it('prepare.MISSING_ARGUMENT', () => {
        try {
            client.prepare('getNewsForApp');
        } catch (e) {
            assert.instanceOf(e, SteamError);
            assert.deepEqual(e.json, {
                'id': 'MISSING_ARGUMENT',
                'message': 'Не определён обязательный аргумент: appid'
            });
            assert.isOk(true);
            return;
        }
        assert.isOk(false);
    });

    it('prepare.defaults', () => {
        const options = client.prepare('getNewsForApp', {
            appid: 440
        });
        assert.deepEqual(options, {
            protocol: 'http:',
            host: 'api.steampowered.com',
            method: 'GET',
            path: '/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json'
        });
    });

    it('prepare.arguments', () => {
        const options = client.prepare('getNewsForApp', {
            appid: 440,
            count: 12,
            maxlength: 150
        });
        assert.deepEqual(options, {
            protocol: 'http:',
            host: 'api.steampowered.com',
            method: 'GET',
            path: '/ISteamNews/GetNewsForApp/v0002/?appid=440&count=12&maxlength=150&format=json'
        });
    });

    it('request.withoutKey', (done) => {
        client.request('getNewsForApp', { appid: 440 })
            .then(res => {
                assert.instanceOf(res, EntityNews);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json');
                assert.equal(res.method, 'getNewsForApp');
                done();
            })
            .catch(err => done(err));
    });
});
