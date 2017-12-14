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
}

module.exports = Steam;
