'use strict';

const Client = require('./src/client');

class Steam {
    constructor(key) {
        this.client = new Client(key);
    }

    getNewsForApp(appId, count, maxLength) {
        return this.client.request('getNewsForApp', {
            'appid': appId,
            'count': count,
            'maxlength': maxLength
        });
    }

    getGlobalAchievementPercentagesForApp(gameId) {
        return this.client.request('getGlobalAchievementPercentagesForApp', {
            'gameid': gameId
        });
    }

    getPlayerSummaries(players) {
        if (!Array.isArray(players)) players = [players];
        return this.client.request('getPlayerSummaries', {
            'steamids': players
        });
    }

    getFriendList(playerId) {
        return this.client.request('getFriendList', {
            'steamid': playerId
        });
    }

    getPlayerAchievements(appId, playerId) {
        return this.client.request('getPlayerAchievements', {
            'appid': appId,
            'steamid': playerId
        });
    }

    getOwnedGames(playerId) {
        return this.client.request('getOwnedGames', {
            'steamid': playerId
        });
    }

    getSchemaForGame(appId, language) {
        if (!language) language = 'english';
        return this.client.request('getSchemaForGame', {
            'appid': appId,
            'l': language
        });
    }
}

module.exports = Steam;
