---
layout: default
language: en
translations:
  ru: /ru/dollchan-api
title: Dollchan API
---

This script provides several APIs for external scripts and applications.<br>
To register an API consumer, you need to add the following code to your script:

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
      switch(data.name) {
        case 'registerapi':
          for(let key in data.data) {
            console.log(`API ${ key } ${
              data.data[key] ? 'registered' : 'unavailable' }.`);
          }
          break;
        case 'newpost':
          console.log('New posts: ', data.data);
          break;
       /* case '...': */
      }
    };
    port.postMessage({ name: 'registerapi', data: ['newpost'] });
   /* port.postMessage({ name: 'registerapi', data: ['...'] }); */
  }).catch(() => console.log('Old version of dollscript without API support.'));
}

setTimeout(runAPI, 0);
```

An `onmessage` event in the `runAPI` function will return a `data` object with the following properties:

* `data.name` &mdash; event name,
* `data.data` &mdash; data passed by an event.

If the dollscript is installed, you would see a list of supported APIs in the console after an execution. For example,

```
API newpost registered.
```

If you had an old version of the dollscript or it is disabled, you would see:

```
Old version of dollscript without API support.
```

## List of APIs

### 1. `newpost` &mdash; new posts

This event allows your application to monitor new posts fetched by the dollscript. The API returns a `data` property with an Array of new posts' numbers. Example:

```js
  case 'newpost':
    console.log('New posts: ', data.data);
    /* your code */
    break;
```

When new posts have arrived, you would see something like this in the console:

```
New posts:  Array [ 18649619, 18649619 ]
```

In place of `console.log` add your own code to process `data.data` array.

### 2. `expandmedia` &mdash; image/webm expansion

This event monitors jpg/png/gif/webm/mp4 expansion in post or by center. The API returns a `data` property with a `src` attribute of the expanded picture/video. Example:

```js
  case 'expandmedia':
    const src = data.data;
    const ext = src.split('.').pop();
    console.log(ext + ' expanded:', src);
    /* your code */
    break;
```

When an image/webm was expanded, you would see something like this in the console:

```
jpg expanded: /b/src/146459420/14869184607150.jpg
png expanded: /b/src/146574543/14869060587720.png
webm expanded: /b/src/146584803/14869150047100.webm
```

You can process selected content only by analyzing file extensions, for example:

```js
  if(ext === 'webm') {
    const webmEl = document.querySelector(`video[src="${ src }"]`);
    /* process webm file */
  }
```

### 3. `submitform` &mdash; an attempt to post a reply or create a thread

This event reports the result of attempting to post a reply or create a thread. The API returns a `data` property with an Object containing the result. It may contain the following:

* `success` &mdash; `true` on successful sending or `false` otherwise,
* `num` &mdash; post number (only on success and only if an imageboard engine supports tracking your posts),
* `error` &mdash; error response string upon a failure.

Example:

```js
  const result = data.data;
  switch(data.name) {
  case 'submitform':
    console.log(result);
    /* your code */
    break;
```

Possible results:

```
Object { success: true, num: 22098360 }
Object { success: true, num: null }
Object { success: false, error: "Error: Wrong CAPTCHA." }
Object { success: false, error: "Error: You must type a message or attach a file." }
```

### 4. `filechange` &mdash; file(s) added\removed to the post form

This API triggers when the user adds, removes or replaces one or more of the files in the list of attachments in the post form. The API will return a `data` field with an array of all `File` objects. In example: 

```js
  const result = data.data;
  switch(data.name) {
  case 'filechange':
    console.log('Files changed:', result);
    /* your code here */
    break;
```
Possible results:

```
Files changed: Array [ File ]
Files changed: Array [ File, File ]
Files changed: Array [ File, File, File ]
Files changed: Array [ File, <1 empty element>, File ]
```

In the above example the user added three files one by one, then removed the second one.
