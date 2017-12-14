'use strict';

const Entity = require('./entity');

class EntityAchievements extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        let data = [];
        for (let index in rawData['achievementpercentages']['achievements']) {
            let item = rawData['achievementpercentages']['achievements'][index];
            data.push({
                'name': item['name'],
                'percent': item['percent']
            })
        }

        this.achievements = data;
    }
}

module.exports = EntityAchievements;
