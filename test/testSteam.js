'use strict';

const assert = require('chai').assert;
const Steam = require('../index');

const EntityNews = require('../src/entity/entityNews');
const EntityAchievements = require('../src/entity/entityAchievements');
const EntityPlayers = require('../src/entity/entityPlayers');

const STEAM_KEY = process.env.STEAM_KEY;

describe('Steam', function () {
    const steam = new Steam(STEAM_KEY);

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

    it('getPlayerSummaries', (done) => {
        steam.getPlayerSummaries('76561198030288194')
            .then(res => {
                assert.instanceOf(res, EntityPlayers);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?steamids=76561198030288194&key=' + STEAM_KEY);
                assert.equal(res.method, 'getPlayerSummaries');
                assert.deepEqual(res.players[0], {
                    'id': '76561198030288194',
                    'name': 'Atres Lesne',
                    'realname': 'Vladimir',
                    'url': 'http://steamcommunity.com/id/atres/',
                    'avatar': {
                        'small': 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/25/253e5467ec2594e27d758508cbe6f176a4f6d4c7.jpg',
                        'medium': 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/25/253e5467ec2594e27d758508cbe6f176a4f6d4c7_medium.jpg',
                        'full': 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/25/253e5467ec2594e27d758508cbe6f176a4f6d4c7_full.jpg'
                    },
                    'created': 1284103613,
                    'location': {
                        'country': 'RU',
                        'state': '20',
                        'city': 39928
                    }
                });
                done();
            })
            .catch(err => done(err));
    });
});
