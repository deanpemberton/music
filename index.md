---
layout: default
---
There are a number of Irish Music sessions around New Zealand but the
number of musicians is relatively small - it's a long, long way from
Clare to here.

When musicians from different parts of the country get together at
events like <a href="http://www.irishmusic.org.nz/">Ceol Aneas</a>,
the various folk festivals or simply visiting a session in another
city, there's often a mismatch between the tunes people know.

This site has a number of tunes from various parts of the country. You
can look at them all or you can select by area such as Wellington,
Dunedin etc.

We're happy to add tunes from other parts of NZ.

<fieldset>
    <legend>Select from the Tunes Archive</legend>
    
    <form id="search-query"  method="get">
        <br />
       <span title="Filter the Tunes Archive for tunes by title or by type such as 'reel', 'jig', 'polka'. You can also look for 'location' such as 'Wellington, 'Beginner'">        
        Title:
        <input type="text" id="title-box" name="title" value=''>
        &emsp; 
        Rhythm:
        <select id="rhythm-box" name="rhythm">
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
        </select>
        &emsp;
        Location:
        <select id="location-box" name="location">
            <option value="">All Locations</option>
            <option value="Wellington">Wellington</option>
            <option value="Dunedin">Dunedin</option>
        </select>
        </span>
        
        &emsp;
        <span title="Run the filter with the default settings to see the whole list">
        <input class="button" id="submit" type="submit" name="submit" value="Filter">
        </span>
        
    </form>
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
          "url": "{{ tune.url | xml_escape }}",
          "mp3": "{{ site.mp3_host | append: tune.mp3_file | xml_escape }}",
          {% if tune.mp3_file %}"abc": ""{% else %}"abc": {{ tune.abc | jsonify }}{% endif %}
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}};
</script>

<script type="text/javascript" src="/js/audio_controls.js"></script>
<script type="text/javascript" src="/js/musical-ws.js"></script>
<script type="text/javascript" src="/js/abc_controls.js"></script>
<script type="text/javascript" src="/js/lunr.min.js"></script>
<script type="text/javascript" src="/js/search.js"></script>

<script>
  $(document).ready(function() 
    { 
        // Set initial sort order
        $.tablesorter.defaults.sortList = [[0,0]]; 
        
        $("#search-results").tablesorter({headers: { 3:{sorter: false}, 4: {sorter: false}}});         
    } 
  ); 
</script>
