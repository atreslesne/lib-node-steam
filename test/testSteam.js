'use strict';

const assert = require('chai').assert;
const Steam = require('../index');

const EntityNews = require('../src/entity/entityNews');
const EntityAchievements = require('../src/entity/entityAchievements');

describe('Steam', function () {
    const steam = new Steam();

    it('getNewsForApp', (done) => {
        steam.getNewsForApp(440, 2, 100)
            .then(res => {
                assert.instanceOf(res, EntityNews);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=2&maxlength=100&format=json');
                assert.equal(res.method, 'getNewsForApp');
                assert.equal(res.news.length, 2);
                done();
            })
            .catch(err => done(err));
    });

    it('getGlobalAchievementPercentagesForApp', (done) => {
        steam.getGlobalAchievementPercentagesForApp(440)
            .then(res => {
                assert.instanceOf(res, EntityAchievements);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=440&format=json');
                assert.equal(res.method, 'getGlobalAchievementPercentagesForApp');
                assert.equal(res.achievements.length, 522);
                done();
            })
            .catch(err => done(err));
    });
});
