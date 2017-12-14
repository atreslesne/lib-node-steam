'use strict';

const Entity = require('./entity');

class EntityFriends extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        let data = [];
        for (let index in rawData['friendslist']['friends']) {
            let item = rawData['friendslist']['friends'][index];
            data.push({
                'id': item['steamid'],
                'since': item['friend_since']
            });
        }

        this.friends = data;
    }
}

module.exports = EntityFriends;
