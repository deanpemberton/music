---
layout: page
title: NZ Archive
permalink: /archive/
navigation_weight: 5
---
This site has a number of tunes from various parts of the country. You
can look at them all or you can select by area such as Hamilton, Wellington, Arrowtown,
Dunedin etc.

**We're happy to add tunes from other parts of NZ.**

<div id="audioPlayer"></div>

<fieldset>
    <legend>Select from the NZ Tunes Archive</legend>

    <form id="search-query"  method="get">
        <br />
       <span title="Filter the Tunes Archive for tunes by title or by type such as 'reel', 'jig', 'polka'. You can also look for 'location' such as 'Wellington', 'Dunedin'">        
        Title:
        <input type="text" id="title-box" name="title" value='' onkeydown="enable_button()">
        &emsp;
        Rhythm:
        <select id="rhythm-box" name="rhythm" onchange="enable_button()">
            <option value="">Any</option>
            <option value="reel">Reel</option>
            <option value="jig">Jig</option>
            <option value="slip jig">Slip Jig</option>
            <option value="polka">Polka</option>
            <option value="hornpipe">Hornpipe</option>
            <option value="slide">Slide</option>
            <option value="waltz">Waltz</option>
            <option value="barndance">Barndance</option>
            <option value="planxty">Planxty</option>
            <option value="mazurka">Mazurka</option>
        </select>
        &emsp;
        Location:
        <select id="location-box" name="location" onchange="enable_button()">
            <option value="">All Locations</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Wellington">Wellington</option>
            <option value="Arrowtown">Arrowtown</option>
            <option value="Dunedin">Dunedin</option>
        </select>
        </span>

        &emsp;
        <span title="Run the filter with the default settings to see the whole list">
        <input class="filter_button filter_disabled" id="submit_button" type="submit" name="submit" value="Select" disabled >
        </span>
    </form>
    <p></p>
    <div id="tunes-count"></div>
</fieldset>

<br />

<div id="tunes-table"></div>
<div id="abc-textareas"></div>

<script>
  window.store = {
      {% assign tuneID = 4000 %}
      {% assign tunes =  site.tunes | sort: 'title' %}
      {% for tune in tunes %}    
          {% assign tuneID = tuneID | plus: 1 %}
          "{{ tuneID  }}": {
          "title": "{{ tune.title | xml_escape }}",
          "tuneID": "{{ tuneID }}",
          "key": "{{ tune.key | xml_escape }}",
          "mode": "{{ tune.mode | xml_escape }}",
          "rhythm": "{{ tune.rhythm | xml_escape }}",
          "location": "{{ tune.location | xml_escape }}",
          "tags": "{{ tune.tags | array_to_sentence_string }}",
          "url": "{{ tune.url | xml_escape }}",
          "mp3": "{{ site.mp3_host | append: tune.mp3_file | xml_escape }}",
          {% if tune.mp3_file %}"abc": ""{% else %}"abc": {{ tune.abc | jsonify }}{% endif %}
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}};
</script>

<script type="text/javascript" src="/js/audioplayer.js"></script>
<script type="text/javascript" src="/js/musical-ws.js"></script>
<script type="text/javascript" src="/js/abc_controls.js"></script>
<script type="text/javascript" src="/js/lunr.min.js"></script>
<script type="text/javascript" src="/js/search.js"></script>

<script>
  $(document).ready(function()
    {
        audioPlayer.innerHTML = createAudioPlayer();

        // Set initial sort order
        $.tablesorter.defaults.sortList = [[0,0]];

        $("#search-results").tablesorter({headers: { 3:{sorter: false}, 4: {sorter: false}}});         
    }
  );
</script>
<script>
function enable_button(){
submit_button.disabled = false;
submit_button.style.opacity=1.0;
submit_button.style.cursor='pointer';
}
</script>
