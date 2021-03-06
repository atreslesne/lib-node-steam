'use strict';

const assert = require('chai').assert;
const Steam = require('../index');

const EntityNews = require('../src/entity/entityNews');
const EntityAchievements = require('../src/entity/entityAchievements');
const EntityPlayers = require('../src/entity/entityPlayers');
const EntityFriends = require('../src/entity/entityFriends');
const EntityPlayerAchievements = require('../src/entity/entityPlayerAchievements');
const EntityGames = require('../src/entity/entityGames');
const EntityGame = require('../src/entity/entityGame');

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

    it('getFriendList', (done) => {
        steam.getFriendList('76561198030288194')
            .then(res => {
                assert.instanceOf(res, EntityFriends);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?steamid=76561198030288194&key=' + STEAM_KEY + '&relationship=friend');
                assert.equal(res.method, 'getFriendList');
                assert.isTrue(res.friends.length > 0);
                done();
            })
            .catch(err => done(err));
    });

    it('getPlayerAchievements', (done) => {
        steam.getPlayerAchievements(440, '76561198030288194')
            .then(res => {
                assert.instanceOf(res, EntityPlayerAchievements);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&steamid=76561198030288194&key=' + STEAM_KEY);
                assert.equal(res.method, 'getPlayerAchievements');
                assert.equal(res.gameName, 'Team Fortress 2');
                assert.isTrue(res.achievements.length > 0);
                done();
            })
            .catch(err => done(err));
    });

    it('getOwnedGames', (done) => {
        steam.getOwnedGames('76561198030288194')
            .then(res => {
                assert.instanceOf(res, EntityGames);
                assert.equal(res.url, 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?steamid=76561198030288194&key=' + STEAM_KEY + '&format=json&include_appinfo=1');
                assert.equal(res.method, 'getOwnedGames');
                assert.isTrue(res.games.length > 0);
                done();
            })
            .catch(err => done(err));
    });

    it('getSchemaForGame', (done) => {
        steam.getSchemaForGame('305620', 'russian')
            .then(res => {
                assert.instanceOf(res, EntityGame);
                assert.equal(res.url, 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?appid=305620&l=russian&key=' + STEAM_KEY);
                assert.equal(res.method, 'getSchemaForGame');
                assert.isTrue(res.stats.length > 0);
                assert.isTrue(res.achievements.length > 0);
                assert.equal(res.gameName, 'The Long Dark -- Sandbox Alpha v.077');
                assert.equal(res.gameVersion, '21');
                done();
            })
            .catch(err => done(err));
    });
});
