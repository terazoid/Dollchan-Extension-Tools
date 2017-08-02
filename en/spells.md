---
layout: default
language: en
translations:
  ru: /ru/spells
title: Spells guide
---

## Magic spells

The script has a lot of features for the content management on a page, including post hiding by various conditions and content replacement with regular expressions.
Due to a fact that the script is in a state of permanent development, a set of control words can be changed and updated.

## Hiding spells

Each hiding spell returns `true` or `false`. A post is hidden when one of the spells evaluates to `true`. If that post is an op-post, the whole thread would be hidden.

Here is the full syntax of hiding spells:

`#spell[board,thread](argument)`

where `spell` is the spell's name, `board` and `thread` are the scope of a spell, `argument` is the condition evaluated by a spell.

All spells can have the following syntax variations:

* `#spell(argument)` &mdash; a spell works in all boards and threads.
* `#spell[board](argument)` &mdash; a spell works on a certain board and in all of its threads. On other boards, it would always return `false`.
* `#spell[board,](argument)` &mdash; a spell works only on a certain board but not in a thread. In threads on this board and on other boards, it would always return `false`.
* `#spell[board,thread](argument)` &mdash; a spell works in a certain thread on a certain board. Outside of this thread, it would always return `false`.

<center><table class="table table-bordered table-striped">
  <thead>
      <th>
      </th>
      <th>/b/ board</th>
      <th>/b/32767 thread</th>
      <th>/c/ board</th>
      <th>/c/4095 thread</th>
  </thead>
  <tbody>
  <tr>
      <td>#spell(argument)</td>
      <td>true/false</td>
      <td>true/false</td>
      <td>true/false</td>
      <td>true/false</td>
  </tr>
  <tr>
      <td>#spell[b\](argument)</td>
      <td>true/false</td>
      <td>true/false</td>
      <td>false</td>
      <td>false</td>
  </tr>
  <tr>
      <td>#spell[b,\](argument)</td>
      <td>true/false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
  </tr>
  <tr>
      <td>#spell[b,32767\](argument)</td>
      <td>false</td>
      <td>true/false</td>
      <td>false</td>
      <td>false</td>
  </tr>
</tbody></table></center>

In case of several spells, they must be combined into a logical expression that also returns `true` or `false`. You can do this with the following logical operations:

* `&` &mdash; logical "AND", `#spell_1 & #spell_2`
* `|` &mdash; logical "OR", `#spell_1 | #spell_2`
* `!` &mdash; logical "NOT", `!#spell_1`
* `)` and `(` &mdash; parentheses for combining expressions, `(#spell_1 & #spell_2) | #spell_3`

**Important!** Each closing parenthesis `)` and the character `\` in an argument of the spells `#words`, `#name` and `#trip`, as well as in a replacement string of the spells `#rep` and `#outrep`, must be escaped like this: `\)`, `\\`.

**Important!** All hiding spells must be joined by logical operators. Replace spells must be written separately, without logical operators. Here is an example of the proper notation:

<pre>
#wipe(samelines,samewords,longwords,numbers) |
#exp(/^(?:bump|up|fgsfds)$/i) |
(#all[b,32767] & !#img) |
(#name(Sage-kun) & #trip(!!SAGEy+453)) |
(#op & #subj(/rozen maiden|pony/i)) |
(#op[s] & #words(newfags)) |
(#op[b] & (
    #words(roll thread) |
    #words(oldfags) |
    #words(porn)
)) |
#video(/rickroll/i)

#rep(/fag/ig,friend)
#outrep(/\.{3}/g,…)
</pre>

**Important!** Please note, all spells with the `&` operator are enclosed in parentheses to perform logical operations in a correct order. Omitting them would cause an incorrect handling of your expression by the spells compiler.

***

### #words

`#words[board,thread](string)`

Returns `true` if the subject or body of a post contains the string specified in the argument. Text case and markup are ignored. The argument is required. Examples:

* `#words(herp derp)` &mdash; hide any post that contains "herp derp" (e.g. "Ololo hErP DeRp!11", "HURR DURR HERP DERP HUUUURRRR", etc).
* `#words[b](fag)` &mdash; hide any post on `/b/` and its threads containing "fag" (e.g. "Faggot! Sage!", "OP IS A FAG", "I'm oldfag, and you're dick", etc.).
* `#words[b,32767](fag)` &mdash; hide any post in the thread `№32767` on `/b/` containing "fag". Posts are hidden only if you are in this thread.
* `#words[b,](fag)` &mdash; similar to above, but posts are hidden only when you are viewing a thread list on the `/b/` board.
* `#words(123\)\)\))` &mdash; hide any post that contains "123)))". Note that all closing parentheses `\)` are escaped.
* `#words(X\\Y)` &mdash; hide any post that contains "X\Y". Note that the character `\` is escaped.

***

### Examples of logical operations:

* Hide any post `[with the word "fag"] [OR] [the word "derp"]`:

`#words(fag) | #words(derp)` &mdash; hides posts like "You are fag!", "Hurr durr derp.", "You are fag, derp!", etc.

* Hide any post `[with the word "fag"] [AND] [the word "derp"]`:

`#words(fag) & #words(derp)` &mdash; hides "You are fag, derp!" because it contains both words.

* Hide any post that `[NOT] [contains "nya"]`:

`!#words(nya)` &mdash; in this case, the post "You are fag, derp!" would be hidden because it doesn't contain "nya". But the post "You are fag, nya!" would not be hidden.

* Hide any post that `( [contains "fag"] [OR] [contains "lol"] ) [AND] [NOT] [contains "nya"]`:

`((#words(fag) | #words(lol)) & !#words(nya))` &mdash; would hide posts "Newfag detected!", "LOL HERP DERP" because they contain first two words. But the post "Lol nya!" would not be hidden because it contains "nya".

***

### #all

`#all[board,thread]()`

Always returns `true`. The argument is ignored.
This is a very important auxiliary spell used for limiting the scope of other spells.

Let's take a closer look:

* `!#words[b,32767](nya)` &mdash; this expression would hide any post in the thread `№32767` on `/b/` not containing "nya".

**But!!** Outside of the thread `№32767`, the spell `#words[b,32767](nya)` always returns `false`. And `!false` equals `true`. Which means that outside of this thread all posts would be hidden. 

To solve this problem, use `#all`:

* `(#all[b,32767] & !#words(nya))` &mdash; which means find and hide `[any post in b/32767] [AND] [NOT] [contains "nya"]`.

This expression would work correctly and never return `true` outside of a certain thread because we used `#all[b,32767]` to limit the scope to the thread `№32767` on `/b/`.

Other applications:

* `(#all[b] & !#words(nya))` &mdash; hide any post on `/b/` that doesn't contain "nya".
* `(!#all[a] & #words(anime))` &mdash; hide any post on all boards except `/a/` that contains "anime".
* `(!#all[a,4095] & #words(touhou))` &mdash; hide any post that contains "touhou" anywhere except the thread `№4095` on `/a/`.

<pre>
(#all[b,32767] & (
    #words(butthurt) |
    #words(herp derp) |
    #words(ololo)
))
</pre>

&mdash; expression similar to 

<pre>
#words[b,32767](butthurt) |
#words[b,32767](herp derp) |
#words[b,32767](ololo)
</pre>

but runs faster. You should always use `#all[board]` or `#all[board,thread]` to group spells with the same scope. It is not only faster &mdash; it also helps to grasp your expressions more easily, especially when you have many.

***

### #op

`#op[board,thread]()`

Returns `true` if a post is an op-post. The argument is ignored. Hides only threads while not affecting regular posts, or vice versa. Examples:

* `(#op & #words(roll))` &mdash; hide any thread that contains "roll" in op-post. For example, a thread with the "Roll thread go!" subject. Doesn't affect posts inside a thread.
* `(!#op & #words(bump))` &mdash; hide any regular post that contains "bump". Doesn't affect op-posts (i.e. threads).
* `(#op[a] & !#words(nya))` &mdash; hide any thread on `/a/` that doesn't contain "nya".
* `(!#op & #words[b](herp derp))` &mdash; hide any regular post on `/b/` containing "herp derp" without affecting op-posts (i.e. threads).

**Important!** `#op` is only an indicator of op-posts (i.e. threads) and doesn't accept arguments:

* `#op(fool)` &mdash; this is incorrect! It is equivalent to `#op()` which would just hide all of your threads.
* `#op & #words(fool)` &mdash; the right way!

***

### Anti-wipe detector #wipe

The script implements some algorithms to distinguish regular posts from posts that can fit into a definition of wipe. Such posts usually have a high percentage of repeating words and lines, suspicious average word size, or contain specific characters.

The spell of anti-wipe detector has the following syntax:

`#wipe[board,thread](list)`

The `list` parameter can contain following comma-separated values:

* `samelines` &mdash; detect a high percentage of duplicate lines,
* `samewords` &mdash; detect a high percentage of repeating words,
* `longwords` &mdash; detect long words not common for a regular text,
* `symbols` &mdash; detect a high percentage of non-letter characters,
* `capslock` &mdash; detect a high percentage of uppercase letters,
* `numbers` &mdash; detect a high percentage of numeric characters,
* `whitespase` &mdash; detect "empty" posts with lots of white space.

Examples of use:

* `#wipe(samelines,samewords,longwords,numbers)` &mdash; enable listed detectors on all boards.
* `#wipe[b,32767](capslock,symbols,numbers)` &mdash; enable listed detectors in the thread `№32767` on `/b/`.
* `(!#op & #wipe[b](capslock))` &mdash; enable the "capslock" detecor on `/b/` while not affecting threads.
* `(#op[a] & #wipe(samelines))` &mdash; enable the "same line" detecor on `/a/` to hide only threads.

***

### #subj

`#subj[board,thread](regex)`

Returns `true` if the post subject matches [regex](http://en.wikipedia.org/wiki/Regexp) specified in the argument. If there is no argument, returns `true` when a post contains any subject. Examples:

* `#subj(/sage/i)` &mdash; hide any post or thread that contains the word "sage" in a subject.
* `#subj[b,32767]` &mdash; hide any post with a subject in the thread `№32767` on `/b/`.
* `(#all[b,32767] & !#subj)` &mdash; hide any post without a subject in the thread `№32767` on `/b/`.
* `(#op[b] & !#subj)` &mdash; hide any thread without a subject on /b/.
* `(#op[b] & #subj(/newfags|triforce/i))` &mdash; hide any thread on `/b/` with the words "newfags" or "triforce" in a subject (for example, "Newfags vs oldfags", "You can't triforce").

### #name

`#name[board,thread](string)`

Returns `true` if the user name in a post contains the string specified in the argument. Case sensitive. If there is no argument, returns `true` when a post contains any user name. Examples:

* `#name[a](Bob)` &mdash; hide any post or thread on `/a/` with the word "Bob" in a user name.
* `#name[b,32767](Sage)` &mdash; hide any post in the thread `№32767` on `/b/` containing "Sage" in a user name (e.g. posts of "Sage-kun" namefag).

***

### #trip

`#trip[board,thread](string)`

Returns `true` if the user tripcode in a post contains the string specified in the argument. If there is no argument, returns `true` when a post contains any tripcode. Examples:

* `#trip` &mdash; hide any post or thread with a tripcode.
* `#trip(TRiF0RCE9)` &mdash; hide any post or thread with "!TRiF0RCE9" or "!!TRiF0RCE9" tripcodes.
* `#trip[s,32767](!!Canc3RL0L4)` &mdash; hide any post with "!!Canc3RL0L4" tripcode in the thread `№32767` on `/s/`.
* `(#name(Oldfag) & #trip(!O.L.D.w79+!!2GE305Qc4))` &mdash; hide "Oldfag!O.L.D.w79+!!2GE305Qc4" namefag everywhere.
* `!#trip` &mdash; hide any post or thread without a tripcode.
* `(#all[a,4095] & !#trip)` &mdash; hide posts without a tripcode in the thread `№4095` on `/a/`.
* `(#all[a,4095] & !#trip(!nyanCaT+73))` &mdash; hide posts without "!nyanCaT+73" tripcode in the thread `№4095` on `/a/`.

***

### #sage

`#sage[board,thread]()`

Returns `true` if a post contains SAGE. The argument is ignored. Examples:

* `#sage` &mdash; hide any post or thread with sage on any board.
* `(#sage[b,32767] & #name(Sage-kun))` &mdash; hide posts with sage from "Sage-kun" namefag in the thread `№32767` on `/b/`.

This spell is added automatically when you click the sage icon in a post header.

***

### #tlen

`#tlen[board,thread](argument)`

Returns `true` if the text length of a post corresponds to the argument. May contain exact values, ranges, or lists. If there is no argument, returns `true` when a post contains any text. Examples:

* `#tlen(22)` &mdash; hide any post with 22 characters in its text.
* `#tlen(500-10000)` &mdash; hide any post with more than 500 characters in its text.
* `#tlen[ph](0-100,225,500-1000)` &mdash; hide any post on `/ph/` with the text size specified in the argument list.
* `(!#op & #tlen)` &mdash; hide regular posts that contain any text. Op-posts and threads are ignored.
* `(#sage & !#tlen)` &mdash; hide any post with sage and without any text.
* `#tlen[b,32767](0-20)` &mdash; hide any post in the thread `№32767` on `/b/` with the text less than 20 characters.
* `(#all[b,32767] & !#tlen(50-100))` &mdash; hide any post in the thread `№32767` on `/b/` with the text less than 50 characters or more than 100 characters.

If you select the `"Hide without text"` menu item in a post hiding button, and this post doesn't contain any text, the `!#tlen` spell would be automatically added to the spells list.

***

### #num

`#num[board,thread](argument)`

Returns `true` if the post index number in a thread corresponds to the argument. The argument is required and, similar to the `#tlen` spell, may contain exact values, ranges, or lists. Use this spell to hide posts by their indexes, or to exclude posts from other spells' scope. Examples:

* `#num[b,32767](100-200)` &mdash; hide any post in the thread `№32767` on `/b/` with the index number between 100 and 200.
* `#num[m,65535](100-200,255,300-500)` &mdash; hide any post in the thread `№65535` on `/m/` with the index number specified in the list.

This spell has a useful feature of excluding posts from any filter. To do this, add `!#num[board,thread](argument) &` to the top of the spells list. Example:

<pre>
!#num[b,32767](50-150) &
!#num[m,65535](100-200) &
#wipe(samelines,samewords,longwords,numbers)
</pre>

This expression would protect any post specified in the list from the anti-wipe detector in threads `№32767` on `/b/` and `№65535` on `/m/`.

***

### #img

`#img[board,thread](argument)`

Returns `true` if the parameters of the post's attached image correspond to conditions specified in the argument.
The argument has the following syntax:

`[><=][filesize_1[-filesize_2]][@{width_1[-width_2]}x{height_1[-height_2]}]`

If there is no argument, it returns `true` when a post contains any image.

This spell allows you to hide posts based on the <u>numeric</u> data of attached images, such as their file size, height and width. The script uses a unified notation of file sizes in kilobytes across all imageboards. It is calculated by multiplying the <i>Mb number</i> by 1000 or by dividing the <i>bytes number</i> by 1000 and rounding the result to 2 digits after the decimal point. For example, the 100KB size as shown in a post header must be entered as 100. Similarly, `100.85KB = 100.85`, `1.84MB = 1840`, `150955B = 150.96`, `760B = 0.76`.

Here are some examples using exact values without ranges:

* `#img[b,32767]` &mdash; hide any post with an image in the thread `№32767` on `/b/`.
* `!#img` &mdash; hide any post or thread without an image.
* `(#all[b,32767] & !#img)` &mdash; hide any post without an image in the thread `№32767` on `/b/`.
* `#img(<35@640x480)` &mdash; hide any post with the image's file size less than 35Kb and dimensions less than 640x480.
* `#img(>@640x480)` &mdash; hide any post with the image size more than 640x480.
* `#img(<@300x100)` &mdash; hide any post with the image size less than 300x100.
* `(#op & #img(=@900x700))` &mdash; hide any op-post (i.e. thread) with the image size exactly 900x700.
* `(#op & #img[b](>1500))` &mdash; hide any thread on /b/ with the image's file size more than 1.5 Mb.
* `#img[a,65535](=180.50)` &mdash; hide any post in the thread `№65535` on `/a/` with the image's file size exactly 180.5 Kb.
* `(!#img | #img(<1))` &mdash; hide any post with the image's file size less than 1 Kb and any post without an image.
* `(#sage & #img & !#tlen)` &mdash; hide any post with sage, image, and without any text.
* `(#img(=61@745x559) | #img(=7@215x250)) & (#all[vg] | #all[moba])` &mdash; hide any post with either of two images with given parameters on `/vg/` and `/moba/`.

Below are examples of specifying the range as a parameter. Please note that `>` and `<` literals are sensitive only to the first value of a range:

* `#img(=30-60@640x480)` &mdash; hide any post with the image's file size from 30 to 60 Kb and dimensions exactly 640x480.
* `#img(=29.80-30.20)` &mdash; hide any post with the image's file size from 29.8 to 30.2 Kb.
* `#img(=@300-500x500-700)` &mdash; hide any post with the image size from 300x500 to 500x700.
* `#img(=75@700-900x200)` &mdash; hide any post with the image's file size exactly 75 Kb and dimensions from 700x200 to 900x200.
* `#img(<200-300)` &mdash; equal to `#img(<200)`.
* `#img(>@800-1000x600)` &mdash; equal to `#img(>@800x600)`.

If you don't want to enter image parameters and calculate file sizes, you can select the menu item `"Hide by image size"` in a post hiding button, and the corresponding `#img` spell would be added to the spells list automatically. Then you would just need to adjust conditions. If a post doesn't have images and you select the menu item `"Hide without images"`, the spell `!#img` would be added.

***

### #imgn

`#imgn[board,thread](regex)`

Returns `true` if the <u>text</u> data of an attached image matches [regex](http://en.wikipedia.org/wiki/Regexp) specified in the argument. The argument is required. For example, for the text data string `(1040 KB, 900x700, Trollface.gif)`, the usage of this spell might look like this:

* `#imgn(/\.gif/i)` &mdash; hide any post with a .gif file.
* `#imgn(/trollface/i)` &mdash; hide any post containing "trollface", "TROLLface", etc. in a file name.
* `#imgn[b,32767](/Trollface\.gif/)` &mdash; hide any post in the thread `№32767` on `/b/` containing "Trollface.gif" in a file name.
* `#imgn(/1040 KB/)` &mdash; equal to `#img(=1040)`. It executes faster but depends on the specific imageboard markup and therefore is not universal.
* `#imgn(/900x700/)` &mdash; equal to `#img(=@900x700)`. The same as above applies.

***

### #ihash

`#ihash[board,thread](hash)`

Returns `true` if an attached image corresponds to [hash](http://en.wikipedia.org/wiki/Hash_function) specified in the argument. The argument is required.

This spell allows you to intellectually hide posts with <u>similar</u> images by comparing their hashes obtained by filtering and checksum calculation. You can select the menu item `"Hide by similar images"` in a post hiding button, and the `#ihash` spell with a generated hash would be automatically added to the spells list. Examples:

* `#ihash(603323568)` &mdash; hide any post with the specified image hash.
* `#ihash[b,32767](267050447) & !#tlen` &mdash; hide any post in the thread `№32767` on `/b/` with the specified image hash and without any text.

***

### #exp

`#exp[board,thread](regex)`

Returns `true` if the text of a post matches [regex](http://en.wikipedia.org/wiki/Regexp) specified in the argument. The argument is required.

This spell allows you to use regular expressions to hide posts by their <u>text content</u> excluding markup. Examples:

* `#exp(/^[^A-Z\.]+$/)` &mdash; hide any post without capital letters and dots.
* `#exp[b](/\u25b2\s\u25b2/)` &mdash; hide a triforce on `/b/`.
* `#exp[b,32767](/(?:>>\d+\s*){8}/)` &mdash; hide >>link wipe in the thread `№32767` on `/b/`.
* `#exp(/[fs]uck|fag|dick/i)` &mdash; "fuck", "Suck", "FAG", "dick", etc.
* `(#op & #exp(/[hd]urr/i))` &mdash; "hurr", "HURR", "durr", "DuRr", etc. in op-posts.
* `#exp(/[^a-z](?:re)?roll/)` &mdash; "roll", "reroll".

***

### #exph

`#exph[board,thread](regex)`

Returns `true` if the html source of a post matches [regex](http://en.wikipedia.org/wiki/Regexp) specified in the argument. The argument is required.

This spell allows you to use regular expressions to hide posts by their <u>html source</u> with markup and post structure. Note that this spell is slower than `#exp` but covers all of the post's content, whereas `#exp` checks only the rendered text of a post. Examples of use:

* `#exph(/(?:<strong>|<b>)[A-Z]{3}/)` &mdash; hide any post with a bold capslock text.
* `(#op & #exph(/\/sticky\.png/i))` &mdash; hide sticky threads.
* `#exph(/(?:<br>\s*){4}/i)` &mdash; hide a wipe with blank lines (line breaks).
* `#exph(/mailto:sage/i)` &mdash; equal to `#sage`.
* `#exph(/<span[^>]+postertrip/i)` &mdash; equal to `#trip`.
* `(#op & #exph[b](/(?:new|old)fags can.*t/i))` &mdash; hide "Newfags can't triforce" threads on `/b/`.
* `#exph[int](/src="\/images\/balls\/fi.png"/)` &mdash; hide any post from Finland on krautchan.net/int/.

***

### #video

`#video[board,thread](regex)`

Returns `true` if the video title in a post matches [regex](http://en.wikipedia.org/wiki/Regexp) specified in the argument. If there is no argument, it returns `true` when a post contains any video. If the option `Links` > `Load titles for YouTube links*` is disabled, this spell always returns `false`.

This spell allows using regular expressions to hide posts by loaded YouTube videos' titles:

* `#video[b](/rickroll/i)` &mdash; hide any post with RickRoll on `/b/`.
* `#video(/vocaloid|miku|iosys|nya|neko|japan|touhou|anime/i)` &mdash; hide by corresponding matches.
* `#video(/rick|skrillex|bieber/i)`

**Important!** To use this spell, enable the option `Links` > `Load titles for YouTube links*`.

***

### #vauthor

`#vauthor[board,thread](string)`

Returns `true` if the author of a video in a post matches a string specified in the argument. If the option `Links` > `Load titles for YouTube links*` is disabled, this spell always returns `false`.

This spell allows you to hide posts by loaded YouTube videos' authors:

* `#vauthor(Sthephan Shi)`
* `#vauthor[mu](RickAstleyVEVO)`

**Important!** To use this spell, enable the option `Links` > `Load titles for YouTube links*`.

***

## Replacing spells

### #rep

`#rep[board,thread](regex,string)`

This spell allows you to replace the thread's html code matched by [regex](http://en.wikipedia.org/wiki/Regexp) with the user-defined string specified in the argument. All changes will be in effect only after adding a spell to the list and refreshing a page. The flag `/g` is required if you want to replace all found matches. Examples of use:

* `#rep(/fag/ig,friend)` &mdash; simple word replacing.
* `#rep(/chrome/ig,pseudo-browser)`.
* `#rep(/\(123\)/g,(321\))` &mdash; replace `(123)` with `(321)`. Please note that `)` is escaped with `\`.
* `#rep(/http:\/\/2ch.hk[^<> ]*/ig,)` &mdash; remove links to 2ch.hk.
* `#rep(/-red-(.*?)-red-/ig,<font color="red"></font>)` &mdash; write in red color: "-red-<i>your red text</i>-red-".
* `#rep[b](/([^a-z])(fuck|[hd]erp|[hd]urr|faggot|gay)([^a-z])/ig,$1 I suck cocks! $3)`.

This spell must be separated from all hiding spells.

***

### #outrep

`#outrep[board,thread](regex,string)`

This spell allows you to replace the text in your reply matched by [regex](http://en.wikipedia.org/wiki/Regexp) before submitting it to a server. It can be of value for blacklist or spam filter evasion. Examples of use:

* `#outrep(/\.{3}/g,…)` &mdash; replace three dots with an ellipsis.
* `#outrep(/ - /g, — )` &mdash; replace a hyphen with a dash.
* `#outrep(/nigger/ig,n*i*gger)`
* `#outrep(/nigger/ig,nig[b][/b]ger)`

This spell must be separated from all hiding spells.

