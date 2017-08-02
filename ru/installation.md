---
layout: default
language: ru
translations:
  en: /en/installation
title: Установка скрипта
---

## Поддерживаемые браузеры

<h3 id="Firefox">Mozilla Firefox</h3>

**Требования**: версия 19 и выше.

1. Установите дополнение Greasemonkey для:
>
[Firefox 29 и выше](https://addons.mozilla.org/ru/firefox/addon/greasemonkey/)<br>
[Firefox 28 и ниже](https://addons.mozilla.org/ru/firefox/addon/greasemonkey/versions/)<br>
[Firefox Nightly](https://arantius.com/misc/gm-nightly/)

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="Chrome">Google Chrome</h3>

**Способ 1**:

1. Установите [скрипт в виде расширения](https://chrome.google.com/webstore/detail/dollchan-extension-tools/ipnoalfffblkaodfmipjjgkfbgcfadad).

**Способ 2**:

1. Установите расширение [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo). Для Beta, Dev и Canary версий Хрома установите [Tampermonkey BETA](https://chrome.google.com/webstore/detail/tampermonkey-beta/gcalenpjmijncebpfijmoaglllgpjagf).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

**Способ 3**:

1. Создайте папку `Chrome`.

2. Сохраните туда ваш файл [скрипта](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) (расширение должно быть `.user.js`).

3. Сохраните туда файлы [manifest.json](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/manifest.json), [16.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/16.png), [32.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/32.png), [48.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/48.png), [128.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/128.png).

4. Зайдите в браузере на страницу ваших расширений, набрав в адресной строке `chrome://extensions/`.

5. Установите галочку `Режим разработчика`, нажмите кнопку `Загрузить распакованной расширение`, укажите путь к папке, подтвердите.

**Если в хроме тормоза при анимации превью / новых постов**

1. Зайдите в `chrome://flags`.

2. Нажмите `Ctrl+F`.

3. Введите в поиск `#ignore-gpu-blacklist`.

4. Нажмите `Enable/Включить`.
<hr>

<h3 id="Opera">Opera</h3>

**Требования**: версия 12.10 и выше.

**Способ 1 &mdash; Opera 33 и выше**:

1. Установите расширение [Tampermonkey Beta](https://addons.opera.com/ru/extensions/details/tampermonkey-beta/)

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

**Способ 2 &mdash; Opera 12...33**:

1. Установите расширение [Violentmonkey](https://addons.opera.com/ru/extensions/details/violent-monkey/).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

**Способ 3 &mdash; только Opera 12**:

1. Сохраните файл скрипта на жесткий диск.

2. Измените расширение скрипта с `.user.js` на `.js`.

3. Если вы еще не настроили папку с юзерскриптами: зайдите в настройки `(Ctrl+F12)` > `Расширенные` > `Содержимое` > выберите `Включить JavaScript` > `Настроить JavaScript`, укажите путь к папке.

4. Переместите файл со скриптом в эту папку.

5. Введите в адресной строке `opera:config#PersistentStorage|UserJSStorageQuota`, установите `User JS Storage Quota` равным `102400` и сохраните изменения.

6. Введите в адресной строке `opera:config#UserPrefs|UserJavaScriptonHTTPS`, включите `User JavaScript on HTTPS` и сохраните изменения.
<hr>

<h3 id="Edge">Microsoft Edge</h3>

**Требования**: версия 14 и выше.

1. Установите расширение [Tampermonkey](https://www.microsoft.com/store/apps/9NBLGGH5162S).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="Safari">Safari</h3>

1. Установите расширение [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="Maxthon">Maxthon</h3>

1. Установите расширение [Violentmonkey](http://extension.maxthon.com/detail/index.php?view_id=1680&category_id=#).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="PaleMoon">Pale Moon</h3>

1. Установите дополнение [Greasemonkey](https://addons.mozilla.org/firefox/downloads/file/477129/greasemonkey-3.9beta2-fx.xpi) (ставьте по этой ссылке, а не с официальной страницы).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="TorBrowser">Tor Browser</h3>

**Требования**: версия 7 и выше.

1. Установите дополнение [Greasemonkey](https://addons.mozilla.org/ru/firefox/addon/greasemonkey/).

2. Установите [скрипт](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

3. Зайдите в настройки, набрав в адресной строке `about:config`.

4. Задайте `browser.privatebrowsing.autostart = false`.
