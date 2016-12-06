/*
 * Audio controls for the browser audio player
 *
 * Version: 1.0
 * Date: 7 Dec 2016
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

function SetPlayRange(audioID, ButtonEvent, button1ID, button2ID) {
// this only works for the currently selected audio player
    if(audioID.readyState == 0) {
        return;
    }
    if(PreviousAudioID != audioID) { //different player selected
        BeginLoopTime = 0;
        EndLoopTime = 0;
        if(PreviousButton1ID != null) {
            var zero = 0;
            PreviousButton1ID.value = zero.toFixed(1);
            PreviousButton2ID.value = PreviousAudioID.duration.toFixed(1);
            // Consider deregistering the function here
        }    
        PreviousAudioID = audioID;
        PreviousButton1ID = button1ID;
        PreviousButton2ID = button2ID;
    }
    if (EndLoopTime == 0) {
        EndLoopTime = audioID.duration - .25; // sampling rate is ~ every 250 ms (overshoot the end)
    }
    /*
     * Set the start and end of loop markers depending on which button was pressed
     */
    switch (ButtonEvent) {
        // Loop Start button
        case 0:
            BeginLoopTime = audioID.currentTime;
            button1ID.value = BeginLoopTime.toFixed(1);
            button2ID.value = EndLoopTime.toFixed(1);
            break;
        // Loop End button
        case 1:
            EndLoopTime = audioID.currentTime;
            button1ID.value = BeginLoopTime.toFixed(1);
            button2ID.value = EndLoopTime.toFixed(1);
            break;
        // Reset button
        case 2:
            BeginLoopTime = 0;
            EndLoopTime = audioID.duration - .25;// sampling rate is ~ every 250 ms (overshoot the end)
            button1ID.value = BeginLoopTime.toFixed(1);
            button2ID.value = EndLoopTime.toFixed(1);
            break;    
    }

    audioID.addEventListener("timeupdate", function() {
        if (audioID.currentTime >= EndLoopTime) {
            audioID.currentTime = BeginLoopTime;
        }}, false);
    return;
}

function setPlaySpeed(audioID, speed) {
    audioID.playbackRate = speed;
}
