---
layout: default
language: en
translations:
  ru: /ru/installation
title: Script installation
---

## Supported browsers

<h3 id="Firefox">Mozilla Firefox</h3>

**Requirements**: version 19 and higher.

1. Install the Greasemonkey add-on for:
>
[Firefox 29 and newer](https://addons.mozilla.org/firefox/addon/greasemonkey/)<br>
[Firefox 28 and older](https://addons.mozilla.org/firefox/addon/greasemonkey/versions/)<br>
[Firefox Nightly](https://arantius.com/misc/gm-nightly/)

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="Chrome">Google Chrome</h3>

**Method 1**:

1. Just install the script as an [extension](https://chrome.google.com/webstore/detail/dollchan-extension-tools/ipnoalfffblkaodfmipjjgkfbgcfadad).

**Method 2**:

1. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension. For Beta, Dev and Canary Chrome releases, install [Tampermonkey BETA](https://chrome.google.com/webstore/detail/tampermonkey-beta/gcalenpjmijncebpfijmoaglllgpjagf)

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

**Method 3**:

1. Create a new directory named `Chrome` on your local drive.

2. Save the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js) file (with `.user.js` extension) to that directory.

3.  Save [manifest.json](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/manifest.json), [16.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/16.png), [32.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/32.png), [48.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/48.png), [128.png](https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/raw/master/Chrome/128.png) files to that directory.

4. Go to the extensions page by typing `chrome://extensions/` in your browser's address bar.

5. Set the `Developer's mode` checkbox, press the `Load unpacked extension` button, set the path to your directory and apply.

**If Сhrome freezes at animation of previews / new posts**

1. Go to `chrome://flags`.

2. Press `Ctrl+F`.

3. Search for the `#ignore-gpu-blacklist` string.

4. Press `Enable` button.
<hr>

<h3 id="Opera">Opera</h3>

**Requirements**: version 12.10 and higher.

**Method 1 &mdash; Opera 33 and higher**:

1. Install the [Tampermonkey Beta](https://addons.opera.com/en/extensions/details/tampermonkey-beta/) extension.

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

**Method 2 &mdash; Opera 12...33**:

1. Install the [Violentmonkey](https://addons.opera.com/en/extensions/details/violent-monkey/) extension.

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

**Method 3 &mdash; Opera 12 only**:

1. Save the script file to your hard disk.

2. Change file extension from `.user.js` to `.js`.

3. If you haven't already set your userscripts folder, go to `(Ctrl+F12)` > `Advanced` > `Content` > set `Enable JavaScript` > `JavaScript Options ` > specify the path to the userscripts folder.

4. Move the script file to that folder.

5. Paste `opera:config#PersistentStorage|UserJSStorageQuota` into the address bar, set `User JavaScript on HTTPS` to `1024000` and save your settings.

6. Paste `opera:config#UserPrefs|UserJavaScriptonHTTPS` into the address bar, enable `User JavaScript on HTTPS` and save your settings.
<hr>

<h3 id="Edge">Microsoft Edge</h3>

**Requirements**: version 14 and higher.

1. Install the [Tampermonkey](https://www.microsoft.com/store/apps/9NBLGGH5162S) extension.

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="Safari">Safari</h3>

1. Install the [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz) extension.

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="Maxthon">Maxthon</h3>

1. Install the [Violentmonkey](http://extension.maxthon.com/detail/index.php?view_id=1680&category_id=#) extension.

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="PaleMoon">Pale Moon</h3>

1. Install the [Greasemonkey](https://addons.mozilla.org/firefox/downloads/file/477129/greasemonkey-3.9beta2-fx.xpi) add-on. Install from this link, not from the official site!

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).
<hr>

<h3 id="TorBrowser">Tor Browser</h3>

**Requirements**: version 7 and higher.

1. Install the [Greasemonkey](https://addons.mozilla.org/ru/firefox/addon/greasemonkey/) add-on.

2. Install the [script](https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.user.js).

3. Go to browser settings by typing `about:config`.

4. Set `browser.privatebrowsing.autostart = false`.
