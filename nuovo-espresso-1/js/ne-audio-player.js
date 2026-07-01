/**
 * NUOVO Espresso - Audio Player
 * Plays from base64 JSON or direct MP3
 */
let ne_currentAudio = null;
const ne_audioCache = {};

function ne_makeKey(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 60) || 'x';
}

function speak(text) {
  if (ne_currentAudio) {
    ne_currentAudio.pause();
    ne_currentAudio.currentTime = 0;
    ne_currentAudio = null;
  }

  var key = ne_makeKey(text);
  
  if (ne_audioCache[key]) {
    ne_audioCache[key].currentTime = 0;
    ne_audioCache[key].play().catch(function(){});
    ne_currentAudio = ne_audioCache[key];
    return;
  }

  // Classify text to find JSON subfolder
  var w = text.trim().split(/\s+/);
  var type = w.length === 1 ? 'word' : (w.length <= 5 ? 'phrase' : 'sentence');
  
  fetch('audio/ne6/' + type + '/' + key + '.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || !data.audio_base64) return;
      // Convert base64 to blob → object URL (most reliable method)
      var binary = atob(data.audio_base64);
      var buf = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) buf[i] = binary.charCodeAt(i);
      var blob = new Blob([buf], {type: 'audio/mpeg'});
      var objUrl = URL.createObjectURL(blob);
      var audio = new Audio(objUrl);
      audio.onended = function() { URL.revokeObjectURL(objUrl); };
      ne_audioCache[key] = audio;
      ne_currentAudio = audio;
      audio.play().catch(function(){});
    })
    .catch(function(){});
}
