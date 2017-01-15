
/*
 * Audio controls for the browser audio player
 *
 * Version: 2.0
 * Date: 11 Jan 2017
 *
 * Developed as part of websites for http://session.nz and http://wellington.session.nz
 * by Ted Cizadlo and Andy Linton
 * Code available at:
 * https://github.com/slow-session/session.nz/blob/master/js/audioID_controls.js
 * Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) Licence.
 */

var BeginLoopTime = 0;
var EndLoopTime = 0;
var PreviousAudioID = null;
var PreviousButton1ID = null;
var PreviousButton2ID = null;
//var Previoustimeline=null;
//var Previousplayhead=null;
var PreviouspButton=null;
//var playheadRadius=5; // diam. of playhead = 10
var audioSlider=null;
var AudioPosition;


function playAudio(audioplayer, pButton, positionSlider, audioSource, audioposition) {

    if (pButton.className == "playButton") {
      if(PreviousAudioID != audioplayer){ //only load if necessary
        if(PreviousAudioID!=null){ //reset previous audio player
          audioSlider.value=0;
          if(PreviouspButton != null) PreviouspButton.className = "playButton";
          OneAudioPlayer.removeEventListener("timeupdate", positionUpdate);
          OneAudioPlayer.removeEventListener("timeupdate", setAudioLoops);
          AudioPosition.innerHTML="0.0";
          if (PreviousButton1ID != null){
            PreviousButton1ID.value = "Loop Start";
            PreviousButton2ID.value = " Loop End ";
          }
          //alert(audioplayer.id+"::"+PreviousAudioID.id+"\n"+timeline.id+"::"+Previoustimeline.id+"\n"+Eventhandler);
        }
        OneAudioPlayer.src=audioSource;
          PreviousAudioID = audioplayer;
          Previoustimeline=positionSlider;
          //Previousplayhead=playhead;
          PreviouspButton=pButton;
          AudioPosition=audioposition;
      }

        audioSlider=positionSlider;
        OneAudioPlayer.play();
        pButton.className = "";
        pButton.className = "pauseButton";
        OneAudioPlayer.addEventListener("timeupdate", positionUpdate);
    } else {
        OneAudioPlayer.pause();
        pButton.className = "";
        pButton.className = "playButton";
    }
}

function setAudioPosition(value, button1ID, button2ID){
  var sliderVal=value*OneAudioPlayer.duration;
  OneAudioPlayer.currentTime=sliderVal;
  positionUpdate();
  AudioPosition.innerHTML=OneAudioPlayer.currentTime.toFixed(1);
  if (EndLoopTime==0) return;  // if loops haven't been set don't nudge them
  if(sliderVal>EndLoopTime){ //nudging loop
      EndLoopTime=sliderVal;
      button2ID.value = EndLoopTime.toFixed(1);
  }
  if(sliderVal<BeginLoopTime){
      BeginLoopTime=sliderVal;
      button1ID.value = BeginLoopTime.toFixed(1);
  }
}
function adjustAudioPosition(value){
  var sliderVal=value*OneAudioPlayer.duration;
  AudioPosition.innerHTML=sliderVal.toFixed(1);
}

function positionUpdate() {
    var duration = OneAudioPlayer.duration;
    audioSlider.value=(OneAudioPlayer.currentTime / duration)*400;
    if (OneAudioPlayer.currentTime >= duration - .25) {
        OneAudioPlayer.currentTime = 0;
    }
    AudioPosition.innerHTML=OneAudioPlayer.currentTime.toFixed(1);
}

function SetPlayRange(audioID, ButtonEvent, button1ID, button2ID) {
    // this only works for the currently selected audio player
    if (PreviousAudioID != audioID) { //different player controls selected
        return;
    }
    if (PreviousAudioID != audioID) { //different player controls selected
        return;
        BeginLoopTime = 0;
        EndLoopTime = 0;
        if (PreviousButton1ID != null) {
            PreviousButton1ID.value = "Loop Start";
            PreviousButton2ID.value = " Loop End ";
            // Consider deregistering the function here
        }
        /*
        PreviousButton1ID.value = "Loop Start";
        PreviousButton2ID.value = " Loop End ";
        */

    }
    //if (EndLoopTime == 0) {
        EndLoopTime = OneAudioPlayer.duration - .25; // sampling rate is ~ every 250 ms (overshoot the end)
    //}
    /*
     * Set the start and end of loop markers depending on which button was pressed
     */
    switch (ButtonEvent) {
        // Loop Start button
        case 0:
            BeginLoopTime = OneAudioPlayer.currentTime;
            button1ID.value = BeginLoopTime.toFixed(1);
            button2ID.value = EndLoopTime.toFixed(1);
            break;
            // Loop End button
        case 1:
            EndLoopTime = OneAudioPlayer.currentTime;
            button1ID.value = BeginLoopTime.toFixed(1);
            button2ID.value = EndLoopTime.toFixed(1);
            break;
            // Reset button
        case 2:
            BeginLoopTime = 0;
            EndLoopTime = OneAudioPlayer.duration - .25; // sampling rate is ~ every 250 ms (overshoot the end)
            button1ID.value = BeginLoopTime.toFixed(1);
            button2ID.value = EndLoopTime.toFixed(1);
            break;
    }
    PreviousAudioID = audioID;
    PreviousButton1ID = button1ID;
    PreviousButton2ID = button2ID;

    OneAudioPlayer.addEventListener("timeupdate", setAudioLoops);
    return;
}
function setAudioLoops(){
  if (OneAudioPlayer.currentTime >= EndLoopTime) {
      OneAudioPlayer.currentTime = BeginLoopTime;
  }
}

function setPlaySpeed(audioID, speed) {
    OneAudioPlayer.playbackRate = speed;
}
