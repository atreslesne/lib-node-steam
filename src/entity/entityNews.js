'use strict';

const Entity = require('./entity');

class EntityNews extends Entity {
    constructor(rawData, method, url) {
        super(rawData, method, url);

        let data = {
            'appid': rawData['appnews']['appid'],
            'count': rawData['appnews']['count'],
            'news': []
        };

        for (let item in rawData['appnews']['newsitems']) {
            let i = rawData['appnews']['newsitems'][item];
            data['news'].push({
                'id': i['gid'],
                'title': i['title'],
                'url': i['url'],
                'contents': i['contents'],
                'date': i['date']
            });
        }

        this.data = data;
    }

    get news() {
        return this.data['news'];
    }
}

module.exports = EntityNews;
