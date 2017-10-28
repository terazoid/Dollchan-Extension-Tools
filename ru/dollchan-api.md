---
layout: default
language: ru
translations:
  en: /en/dollchan-api
title: Dollchan API
---

Скрипт имеет API для работы с внешними скриптами и приложениями.

Для регистрации API необходимо добавить в Ваш скрипт следующий код:

```js
function getDollchanAPI() {
  return new Promise((resolve, reject) => {
    const dw = document.defaultView;
    const onmessage = ({ data, ports }) => {
      if(ports && ports.length === 1 && data === 'de-answer-api-message') {
        clearTimeout(to);
        dw.removeEventListener('message', onmessage);
        resolve(ports[0]);
      }
    };
    dw.addEventListener('message', onmessage);
    dw.postMessage('de-request-api-message', '*');
    const to = setTimeout(() => {
      dw.removeEventListener('message', onmessage);
      reject();
    }, 5e3);
  });
}

function runAPI() {
  getDollchanAPI().then(port => {
    port.onmessage = ({ data }) => {
      const result = data.data;
      switch(data.name) {
      case 'registerapi':
        for(let key in result) {
          console.log(`API ${ key } ${
            result[key] ? 'зарегистрирован' : 'недоступен' }.`);
        }
        break;
      case 'newpost':
        console.log('Новые посты: ', result);
        break;
      /* case '...': */
      }
    };
    port.postMessage({ name: 'registerapi', data: ['newpost'] });
    /* port.postMessage({ name: 'registerapi', data: ['...'] }); */
  }).catch(() => console.log('Dollchan API не обнаружен!'));
}

setTimeout(runAPI, 0);
```

Событие `onmessage` в функции `runAPI` будет возвращать объект `data` со следующими полями:

* `data.name` &mdash; имя события,
* `data.data` &mdash; данные, переданные событием.

Если у вас стоит куклоскрипт, то при запуске вы увидите в консоли список поддерживаемых API. Например,

```
API newpost зарегистрирован.
```

Если у вас стоит куклоскрипт старой версии, либо он отключен, то в консоли вы увидите:

```
Dollchan API не обнаружен!
```

Вы можете ознакомиться с работой API, скачав и установив тестовый скрипт:
[DollchanAPI_Test.user.js](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/blob/master/DollchanAPI_Test.user.js)

## Список API

### 1. `newpost` &mdash; новые посты

Событие с этим именем позволит вашему приложению отслеживать появление новых постов, которые добавляет на страницу куклоскрипт. API возвратит поле `data` с массивом номеров новых постов. Пример:

```js
  const result = data.data;
  switch(data.name) {
  case 'newpost':
    console.log('Новые посты: ', result);
    /* ваш код */
    break;
```

При появлении новых постов в консоли будет выводиться сообщение вида:

```
Новые посты:  Array [ 18649619, 18649619 ]
```

Вместо `console.log` добавьте Ваш код, который будет обрабатывать массив `data.data`.

### 2. `expandmedia` &mdash; раскрытие картинок/webm

Это событие отслеживает момент разворачивания jpg/png/gif/webm/mp4 по центру или в посте. API возвратит поле `data` с атрибутом `src` картинки/видео. Пример:

```js
  const result = data.data;
  switch(data.name) {
  case 'expandmedia':
    const src = data.data;
    const ext = src.split('.').pop();
    console.log(ext + ' открыт:', src);
    /* ваш код */
    break;
```

При раскрытии картинок/webm'ок в консоли будет выводиться сообщение вида:

```
jpg открыт: /b/src/146459420/14869184607150.jpg
png открыт: /b/src/146574543/14869060587720.png
webm открыт: /b/src/146584803/14869150047100.webm
```

Ваш код может обрабатывать только определенный контент, анализируя расширение файла, например:

```js
  if(ext === 'webm') {
    const webmEl = document.querySelector(`video[src="${ src }"]`);
    /* обработка webm-файла */
  }
```

### 3. `submitform` &mdash; попытка отправить пост или создать тред

Это событие отслеживает результат отправки поста или попытки создания треда. API возвратит поле `data` с объектом, содержащим результат отправки. Объект может содержать поля:

* `success` &mdash; `true` в случае успешной отправки или `false` в случае неудачи,
* `num` &mdash; номер поста при успешной отправке, если имиджборд поддерживает идентификацию своих постов,
* `error` &mdash; текст ошибки при неудачной попытке отправить пост.

Пример:

```js
  const result = data.data;
  switch(data.name) {
  case 'submitform':
    console.log(result);
    /* ваш код */
    break;
```

Возможные варианты результатов:

```
Object { success: true, num: 22098360 }
Object { success: true, num: null }
Object { success: false, error: "Ошибка: Капча невалидна." }
Object { success: false, error: "Ошибка: Пустое поле сообщения." }
```

### 4. `filechange` &mdash; добавление/изменение файлов, прикрепленных к форме отправки

Событие отслеживает момент, когда пользователь прикрепляет файл к форме создания поста или треда, либо очищает его, либо прикрепляет другой файл. API возвратит поле `data` с массивом всех объектов `File`. Пример:

```js
  const result = data.data;
  switch(data.name) {
  case 'filechange':
    console.log('Files changed:', result);
    /* ваш код */
    break;
```
Варианты результатов:

```
Files changed: Array [ File ]
Files changed: Array [ File, File ]
Files changed: Array [ File, File, File ]
Files changed: Array [ File, <1 пустой элемент>, File ]
```

В данном случае к форме было добавлено три файла, потом удалён второй по счёту.
