---
layout: null
---

Session tunes
=============

A collection of tunes for the New Zealand Irish sessions.

A static website
----------------

This is a static website that use Jekyll to process files and generate the
website. Each tune is included as a markdown file in the `_tunes` collection.
Tunes are organised into folders, according to the source of the audio, and
default licensing may be set for each folder in the `_config.yml` file.

An example of the front-matter for the Connachtman's Rambles, in the file
`comhaltas/connachtmans-rambles.md`, is given below. Supply similar information
to add new tunes to the collection. Put an MP3 file whose name is the same
as the title (including capitalisation) in the `mp3` folder in order for the 
audio to play.
```
title: "Connachtman's Rambles"
key: D
rhythm: jig
mode: major
date: 2015-11-1
location: Wellington
tags: 2015-16 wellington
mp3_file: /mp3/connachtmans-rambles.mp3
mp3_url: https://comhaltas.ie/music/detail/connactmans_rambles/
abc_source: The Session
abc_url: https://thesession.org/tunes/19
abc: |
    X: 1
    T: The Connachtman's Rambles
    R: jig
    M: 6/8
    L: 1/8
    K: D
    K: Bm
    AG|"D":FA(A d)AA|({B2d}"G"BAB) dA(G|"D"F)A(A d)fe|"G"ed(B{c}) BAG|
    "D"FA(A d)AA|"G"BA(B "D"d)ef|"Em"gfe "D"(f2e)|1"G"dB(B{c} B)AG:|2 "G"dBB B3||
    |:"Bm"fbb fa(a|f)ef "G"de(g|"Bm"f)bb fa(a|f)ed
    "A7"(e2g| "Bm"f)bb fa(a|"D"f)ef "Bm"de(f|"Em"g)fe "D"dfe
    |1 "G"dBB B2g:|2 "G"dBB ({c}B)AG|| "G"D"Tune end"BB{c}B3||
---
```

## Open source

This code open source (released under an [MIT licence](https://github.com/wellington-session/wellington-session.github.io/blob/master/LICENSE)). You are very welcome to copy the code and customise it for your own purposes. Get in touch with Edward Abraham ([edward@dragonfly.co.nz](mailto:edward@dragonfly.co.nz)) if you need a hand getting it set up.


## Developing

This site is based on the code base at
https://github.com/slow-session/wellingtonsession.org

See that site for more detail.
