'use strict';

const Entity = require('./entity');

class EntityPlayers extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        let data = [];
        for (let index in rawData['response']['players']) {
            let item = rawData['response']['players'][index];
            data.push({
                'id': item['steamid'],
                'name': item['personaname'],
                'realname': item['realname'],
                'url': item['profileurl'],
                'avatar': {
                    'small': item['avatar'],
                    'medium': item['avatarmedium'],
                    'full': item['avatarfull']
                },
                'created': item['timecreated'],
                'location': {
                    'country': item['loccountrycode'],
                    'state': item['locstatecode'],
                    'city': item['loccityid']
                }
            });
        }

        this.players = data;
    }
}

module.exports = EntityPlayers;
