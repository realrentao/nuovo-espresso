/**
 * NUOVO Espresso - Audio Player
 * Plays from base64 JSON or direct MP3
 * speak(text)            → 默认女声 (it-IT-IsabellaNeural)
 * speak(text, 'male')    → 男声 (it-IT-DiegoNeural)，音频 key 前缀 m_
 */
let ne_currentAudio = null;
const ne_audioCache = {};

function ne_makeKey(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 60) || 'x';
}

function ne_typeOf(text) {
  var w = text.trim().split(/\s+/);
  return w.length === 1 ? 'word' : (w.length <= 5 ? 'phrase' : 'sentence');
}

function ne_playData(data, key) {
  if (!data || !data.audio_base64) return false;
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
  return true;
}

function speak(text, voice) {
  if (ne_currentAudio) {
    ne_currentAudio.pause();
    ne_currentAudio.currentTime = 0;
    ne_currentAudio = null;
  }

  var baseKey = ne_makeKey(text);
  var key = (voice === 'male') ? ('m_' + baseKey) : baseKey;

  if (ne_audioCache[key]) {
    ne_audioCache[key].currentTime = 0;
    ne_audioCache[key].play().catch(function(){});
    ne_currentAudio = ne_audioCache[key];
    return;
  }

  // Classify text to find JSON subfolder
  var type = ne_typeOf(text);

  fetch('audio/ne6/' + type + '/' + key + '.json')
    .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('404')); })
    .then(function(data) { ne_playData(data, key); })
    .catch(function() {
      // 男声音频缺失时回退到默认（女声）音频
      if (key !== baseKey) {
        fetch('audio/ne6/' + type + '/' + baseKey + '.json')
          .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('404')); })
          .then(function(data) { ne_playData(data, baseKey); })
          .catch(function(){});
      }
    });
}
