'use strict';

const http = require('http');
const https = require('https');
const SteamError = require('./error');

const EntityNews = require('./entity/entityNews');
const EntityAchievements = require('./entity/entityAchievements');
const EntityPlayers = require('./entity/entityPlayers');
const EntityFriends = require('./entity/entityFriends');
const EntityPlayerAchievements = require('./entity/entityPlayerAchievements');
const EntityGames = require('./entity/entityGames');
const EntityGame = require('./entity/entityGame');

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
            },
            'getPlayerSummaries': {
                'name': 'getPlayerSummaries',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/ISteamUser/GetPlayerSummaries/v0002/'
                },
                'args': ['steamids'],
                'defaults': {},
                'key': true,
                'entity': (data, method, url) => { return new EntityPlayers(data, method, url); }
            },
            'getFriendList': {
                'name': 'getFriendList',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/ISteamUser/GetFriendList/v0001/'
                },
                'args': ['steamid', 'relationship'],
                'defaults': {
                    'relationship': 'friend'
                },
                'key': true,
                'entity': (data, method, url) => { return new EntityFriends(data, method, url); }
            },
            'getPlayerAchievements': {
                'name': 'getPlayerAchievements',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/ISteamUserStats/GetPlayerAchievements/v0001/'
                },
                'args': ['appid', 'steamid'],
                'defaults': {},
                'key': true,
                'entity': (data, method, url) => { return new EntityPlayerAchievements(data, method, url); }
            },
            'getOwnedGames': {
                'name': 'getOwnedGames',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/IPlayerService/GetOwnedGames/v0001/'
                },
                'args': ['steamid', 'format', 'include_appinfo'],
                'defaults': {
                    'format': 'json',
                    'include_appinfo': '1'
                },
                'key': true,
                'entity': (data, method, url) => { return new EntityGames(data, method, url); }
            },
            'getSchemaForGame': {
                'name': 'getSchemaForGame',
                'url': {
                    'protocol': 'http',
                    'host': 'api.steampowered.com',
                    'path': '/ISteamUserStats/GetSchemaForGame/v2/'
                },
                'args': ['appid', 'l'],
                'defaults': {
                    'l': 'english'
                },
                'key': true,
                'entity': (data, method, url) => { return new EntityGame(data, method, url); }
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
        if (method.key) args['key'] = this.key;

        for (let arg of method.args) {
            if (!(arg in args)) {
                if (!(arg in method.defaults)) throw new SteamError('MISSING_ARGUMENT', { 'arg': arg });
                if (Array.isArray(arg)) arg = arg.join(',');
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
