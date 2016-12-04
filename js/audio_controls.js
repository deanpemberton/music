/*
 * Audio controls for the browser audio player
 * Developed as part of websites for http://session.nz and http://wellington.session.nz
 * by Ted Cizadlo and Andy Linton
 * Code available at:
 * https://github.com/slow-session/session.nz/blob/master/js/audioID_controls.js
 * Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) Licence.
 */

function setPlaySpeed(speed, audioID) {
    audioID.playbackRate = speed;
}

var BeginLoopTime = 0;
var EndLoopTime = 0;
var PreviousAudioID = null;
var PreviousButton1 = null;
var PreviousButton2 = null;

function SetPlayRange(audioID, ButtonEvent, button1, button2) {
    if(audioID.readyState == 0) {
        return;
    }
    if(PreviousAudioID != audioID) {
        BeginLoopTime = 0;
        EndLoopTime = 0;
        if(PreviousButton1 != null) {
            var zero = 0;
            PreviousButton1.value = zero.toFixed(1);
            PreviousButton2.value = PreviousAudioID.duration.toFixed(1);
            // Consider deregistering the function here
        }    
        PreviousAudioID = audioID;
        PreviousButton1 = button1;
        PreviousButton2 = button2;
    }
    if (EndLoopTime == 0) {
        EndLoopTime = audioID.duration - .25; // sampling rate is ~ every 250 ms (overshoot the end)
    }
    switch (ButtonEvent) {
        case 0:
            BeginLoopTime = audioID.currentTime;
            button1.value = BeginLoopTime.toFixed(1);
            button2.value = EndLoopTime.toFixed(1);
            audioID.addEventListener("timeupdate", function() {
                if (audioID.currentTime >= EndLoopTime) {
                    audioID.currentTime = BeginLoopTime;
                }}, false);
            return;
            break;
        case 1:
            EndLoopTime = audioID.currentTime;
            button1.value = BeginLoopTime.toFixed(1);
            button2.value = EndLoopTime.toFixed(1);
            audioID.addEventListener("timeupdate", function() {
                if (audioID.currentTime >= EndLoopTime) {
                    audioID.currentTime = BeginLoopTime;
                }}, false);
            return;
            break;
        case 3:
            BeginLoopTime = 0;
            EndLoopTime = audioID.duration - .25;
            button1.value = BeginLoopTime.toFixed(1);
            button2.value = EndLoopTime.toFixed(1);
            audioID.addEventListener("timeupdate", function() {
                if (audioID.currentTime >= EndLoopTime) {
                    audioID.currentTime = BeginLoopTime;
                }}, false);
            return;
            break;    
    }
}

