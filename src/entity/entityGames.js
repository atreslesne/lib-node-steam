'use strict';

const Entity = require('./entity');

class EntityGames extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        let data = [];
        for (let index in rawData['response']['games']) {
            let item = rawData['response']['games'][index];
            data.push({
                'id': item['appid'],
                'name': item['name'],
                'playtime': {
                    'forever': item['playtime_forever'],
                    '2weeks': (item['playtime_2weeks'] ? item['playtime_2weeks'] : 0)
                },
                'icon': `http://media.steampowered.com/steamcommunity/public/images/apps/${item['appid']}/${item['img_icon_url']}.jpg`,
                'logo': `http://media.steampowered.com/steamcommunity/public/images/apps/${item['appid']}/${item['img_logo_url']}.jpg`,
            });
        }

        this.games = data;
    }
}

module.exports = EntityGames;
