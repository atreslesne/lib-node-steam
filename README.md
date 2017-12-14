# lib-node-steam

[![Build Status](https://travis-ci.org/atreslesne/lib-node-morpher-ru.svg?branch=master)](https://travis-ci.org/atreslesne/lib-node-steam)
[![Coverage Status](https://coveralls.io/repos/github/atreslesne/lib-node-steam/badge.svg?branch=master)](https://coveralls.io/github/atreslesne/lib-node-steam?branch=master)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/atreslesne/lib-node-steam/master/LICENSE)

Библиотека для работы со Steam Web API. Официальная документация:

* https://developer.valvesoftware.com/wiki/Steam_Web_API

## Установка библиотеки

```bash
$ npm install steam-web-api
```

или

```
$ yarn add steam-web-api
```

## Инициализация библиотеки

Для подключения библиотеки необходимо создать объект `Steam`. 
В качестве необязательного аргумента конструктор принимает ключ, необходимый
для работы с некоторыми методами.

```js
const Steam = require('steam-web-api');
const steam = new Steam('optional key');
```

## API

Ниже будут рассмотрены реализованные на данный момент методы API.
Все методы возвращают объекты, производные от класса `Entity` с двумя 
общими для всех объектов свойствами:

* `method` - название метода;
* `url` - использованный для запроса адрес.

### getNewsForApp

Метод возвращает последние новости для указанного приложения.

`getNewsForApp(appId[, count, maxLength])`

* `appId` - идентификатор приложения;
* `count` - количество новостей (по-умолчанию 3);
* `maxLength` - максимальная длина текста новости (по-умолчанию 300).

```js
const Steam = require('steam-web-api');
const steam = new Steam();

steam.getNewsForApp(440, 5, 200)
    .then(result => {
        console.dir(result.news);
    })
    .catch(err => console.error(err.message));
```
Результат:

```js
[{
    id: "2442505391470441728",
    title: "Team Fortress 2 Update Released",
    url: "http://store.steampowered.com/news/35528/",
    contents: "An update to Team Fortress 2 has been released. The update will be applied automatically when you restart Team Fortress 2. The major changes include: * Fixed a client crash related to viewing notifications; * Fixed being able to interrupt taunts using the ConTracker commands; * Fixed a bug with the ...",
    date: 1513213200
}]
```

### getGlobalAchievementPercentagesForApp

Метод возвращает информацию о достижениях для указанной игры.

`getGlobalAchievementPercentagesForApp(gameId)`

* `gameId` - идентификатор игры.

```js
const Steam = require('steam-web-api');
const steam = new Steam();

steam.getGlobalAchievementPercentagesForApp(440)
    .then(result => {
        console.dir(result.achievements);
    })
    .catch(err => console.error(err.message));
```

Результат:

```js
[{
    name: 'TF_SCOUT_LONG_DISTANCE_RUNNER',
    percent: 53.728801727294922
}]
```

### getPlayerSummaries

Метод возвращает информацию о профиле пользователя по указанному идентификатору/идентификаторам.

`getPlayerSummaries([players])`

* `players` - идентификатор или массив идентификаторов пользователей.

```js
const Steam = require('steam-web-api');
const steam = new Steam();

steam.getPlayerSummaries('76561198030288194')
    .then(result => {
        console.dir(result.players);
    })
    .catch(err => console.error(err.message))
```

Результат:

```js
[{
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
}]
```
