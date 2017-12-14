'use strict';

const Entity = require('./entity');

class EntityGame extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        this.stats = [];
        this.achievements = [];
        this.gameName= rawData['game']['gameName'];
        this.gameVersion = rawData['game']['gameVersion'];

        for (let index in rawData['game']['availableGameStats']['stats']) {
            let item = rawData['game']['availableGameStats']['stats'][index];
            this.stats.push({
                'name': item['name'],
                'defaultValue': item['defaultvalue'],
                'displayName': item['displayName']
            });
        }

        for (let index in rawData['game']['availableGameStats']['achievements']) {
            let item = rawData['game']['availableGameStats']['achievements'][index];
            this.achievements.push({
                'name': item['name'],
                'title': item['displayName'],
                'defaultValue': item['defaultvalue'],
                'hidden': item['hidden'],
                'icon': item['icon'],
                'iconGray': item['icongray']
            });
        }
    }
}

module.exports = EntityGame;
