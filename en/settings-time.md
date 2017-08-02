---
layout: default
language: en
translations:
  ru: /ru/settings-time
title: Time correction guide
---

## Time correction

Allows adjusting the imageboard's time to your local time zone. These settings are located in the `Posts` tab.

### `Time correction in posts*` checkbox

Enables/disables the time correction. Changes are applied after a page refresh.

### `time offset (h)` field

Contains the difference in hours between your local time and posts' timestamps on an imageboard. Examples:
* `+2` &mdash; adds two hours to posts' timestamps.
* `-1` &mdash; subtracts one hour from posts' timestamps.

### `Find pattern` field

Contains an expression to detect a time pattern on an imageboard. Elements of a pattern:

* `s` &mdash; second (one digit);
* `i` &mdash; minute (one digit);
* `h` &mdash; hour (one digit);
* `d` &mdash; day (one digit);
* `w` &mdash; day of week (string);
* `n` &mdash; month (one digit);
* `m` &mdash; month (string);
* `y` &mdash; year (one digit);
* `-` &mdash; any symbol;
* `+` &mdash; any symbol except digits;
* `?` &mdash; previous char may be absent.

Find pattern examples:

* If posts have the date and time in a `Fri 31 May 2013 11:22:26` format, then the corresponding expression should be `w+dd+m+yyyy+hh+ii+ss` to match the `day of week` `space` `2 digits for date` `space` `month name` `space` `4 digits for year` `space` `2 digits for hours` `colon` `2 digits for minutes` `colon` `2 digits for seconds` pattern.

* `05/31/13(Fri)03:41:35` corresponds to `nn+dd+yy+w+hh+ii+ss`. If seconds are omitted on some, but not all, boards, then the expression should be `nn+dd+yy+w+hh+ii+?s?s?`.

* `2013-05-31 06:15:27` corresponds to `yyyy+nn+dd+hh+ii+ss`. If some boards also have microseconds value (which is not needed), e.g. `2013-05-31 06:15:27.295345`, the expression should be adjusted as follows: `yyyy+nn+dd+hh+ii+ss+?-?-?-?-?-?-?`.

Examples for some imageboards:

* `0chan.hk` &mdash; `w+yyyy+m+dd+hh+ii+ss`
* `iichan.hk`, `2ch.hk` &mdash; `w+dd+m+yyyy+hh+ii+ss`
* `dobrochan.ru` &mdash; `dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?`
* `410chan.org` &mdash; `dd+nn+yyyy++w++hh+ii+ss`
* `4chan.org` &mdash; `nn+dd+yy+w+hh+ii-?s?s?`
* `4chon.net` &mdash; `nn+dd+yy++w++hh+ii+ss`
* `krautchan.net` &mdash; `yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?`

### `Replace pattern` field

This field is optional. It defines your preferred format for displaying the date and time. May contain any set of symbols and pattern elements, which would be replaced by corresponding values:

* `_s` &mdash; seconds;
* `_i` &mdash; minutes;
* `_h` &mdash; hour;
* `_d` &mdash; day;
* `_w` &mdash; day of week;
* `_n` &mdash; month (number);
* `_m` &mdash; month (abbreviated string);
* `_M` &mdash; month (full string);
* `_y` &mdash; year (2 digits);
* `_Y` &mdash; year (4 digits);
* `_o` &mdash; time difference.

Replace pattern examples:

* `_w _d _M _Y _h:_i:_s` displays the date and time as `Mon 08 July 2013 09:52:50`

* `_Y-_n-_d _h:_i:_s` displays the date and time as `2013-07-08 09:52:50`

* `_n/_d/_y(_w)_h:_i:_s` displays the date and time as `07/08/13(Mon)09:52:50`

Examples of the date and time display for some imageboards:

* `0chan.hk` &mdash; `_w _Y _m _d _h:_i:_s`
* `2ch.hk` &mdash; `_w _d _m _Y _h:_i:_s`
* `iichan.hk` &mdash; `_w _d _M _Y _h:_i:_s`
* `dobrochan.ru` &mdash; `_d _M _Y (_w) _h:_i:_s`
* `410chan.org` &mdash; `_d._n._Y (_w) _h:_i:_s`
* `4chan.org` &mdash; `_n/_d/_y(_w)_h:_i:_s`
* `4chon.net` &mdash; `_n/_d/_y (_w) _h:_i:_s`
* `krautchan.net` &mdash; `_Y-_n-_d _h:_i:_s`