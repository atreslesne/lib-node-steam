'use strict';

class Entity {
    constructor(rawData, method, url) {
        this.data = rawData;
        this.method = method;
        this.url = url;
    }
}

module.exports = Entity;
