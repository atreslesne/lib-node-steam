'use strict';

const http = require('http');
const https = require('https');
const SteamError = require('./error');

const EntityNews = require('./entity/entityNews');
const EntityAchievements = require('./entity/entityAchievements');

class SteamClient {
    static get methods() {
        return {
            'getNewsForApp': {
                'name': 'getNewsForApp',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/ISteamNews/GetNewsForApp/v0002/'
                },
                'args': ['count', 'maxlength', 'appid', 'format'],
                'defaults': {
                    'count': 3,
                    'maxlength': 300,
                    'format': 'json'
                },
                'key': false,
                'entity': (data, method, url) => { return new EntityNews(data, method, url); }
            },
            'getGlobalAchievementPercentagesForApp': {
                'name': 'getGlobalAchievementPercentagesForApp',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/'
                },
                'args': ['gameid', 'format'],
                'defaults': {
                    'format': 'json'
                },
                'key': false,
                'entity': (data, method, url) => { return new EntityAchievements(data, method, url); }
            }
        }
    }

    constructor(key) {
        this.key = key;
    }

    request(method, args) {
        const options = this.prepare(method, args);
        const protocol = (options['protocol'] === 'https:') ? https : http;

        return new Promise((resolve, reject) => {
            const url = options['protocol'] + '//' + options['host'] + options['path'];
            protocol.get(url, res => {
                const { statusCode } = res;

                if (statusCode !== 200) {
                    reject(new SteamError('REQUEST_FAILED', { method: method, status: statusCode }));
                } else {
                    let data = '';
                    res.on('data', (chunk) => { data += chunk });
                    res.on('end', () => {
                        try {
                            data = JSON.parse(data);
                            resolve(SteamClient.methods[method].entity(data, method, options['protocol'] + '//' + options['host'] + options['path']));
                        } catch (e) {
                            reject(new SteamError('INVALID_RESPONSE', { method: method, message: e.message }));
                        }
                    });
                }
            });
        });
    }

    prepare(method, args) {
        if (!(method in SteamClient.methods)) throw new SteamError('UNKNOWN_METHOD', { 'method': method });
        if (typeof args !== 'object') args = {};

        method = SteamClient.methods[method];
        if (method.key && !this.key) throw new SteamError('KEY_REQUIRED', { 'method': method.name });

        for (let arg of method.args) {
            if (!(arg in args)) {
                if (!(arg in method.defaults)) throw new SteamError('MISSING_ARGUMENT', { 'arg': arg });
                args[arg] = method.defaults[arg];
            }
        }

        return {
            protocol: method.url['protocol'] + ':',
            host: method.url['host'],
            method: 'GET',
            path: method.url['path'] + '?' + Object.keys(args).map(value => value + '=' + encodeURIComponent(args[value])).join('&')
        };
    }
}

module.exports = SteamClient;
