'use strict';

const Entity = require('./entity');

class EntityPlayerAchievements extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        let data = [];
        for (let index in rawData['playerstats']['achievements']) {
            let item = rawData['playerstats']['achievements'][index];
            data.push({
                'name': item['apiname'],
                'achieved': !!item['achieved'],
                'date': item['unlocktime']
            });
        }

        this.achievements = data;
        this.gameName = rawData['playerstats']['gameName'];
    }
}

module.exports = EntityPlayerAchievements;
