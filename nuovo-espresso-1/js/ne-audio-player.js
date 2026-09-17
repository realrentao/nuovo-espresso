/**
 * NUOVO Espresso - Audio Player
 * Plays from base64 JSON or direct MP3
 * speak(text)              → 女声1 (it-IT-IsabellaNeural)，默认
 * speak(text, 'female2')   → 女声2 (it-IT-ElsaNeural)，key 前缀 f2_
 * speak(text, 'male')      → 男声1 (it-IT-DiegoNeural)，key 前缀 m_
 * speak(text, 'male2')     → 男声2 (it-IT-GiuseppeNeural)，key 前缀 m2_
 * 音频缺失时按 NE_VOICE_FALLBACK 逐级回退，最终落到默认女声
 */
let ne_currentAudio = null;
const ne_audioCache = {};

// voice 名 → 音频 key 前缀
const NE_VOICE_PREFIX = {
  'male': 'm_',
  'male1': 'm_',
  'male2': 'm2_',
  'female': '',
  'female1': '',
  'female2': 'f2_'
};

// 前缀 → 回退前缀链（同性别优先，最后才回退默认女声）
const NE_VOICE_FALLBACK = {
  'm2_': ['m_', ''],
  'm_': [''],
  'f2_': ['']
};

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
  var prefix = NE_VOICE_PREFIX[voice] !== undefined ? NE_VOICE_PREFIX[voice] : '';
  var key = prefix + baseKey;

  if (ne_audioCache[key]) {
    ne_audioCache[key].currentTime = 0;
    ne_audioCache[key].play().catch(function(){});
    ne_currentAudio = ne_audioCache[key];
    return;
  }

  // Classify text to find JSON subfolder
  var type = ne_typeOf(text);

  // 候选音频：指定音色 → 同性别回退 → 默认女声
  var candidates = [prefix].concat(NE_VOICE_FALLBACK[prefix] || [])
    .map(function(p) { return p + baseKey; });

  (function tryNext(i) {
    if (i >= candidates.length) return;
    var k = candidates[i];
    fetch('audio/ne6/' + type + '/' + k + '.json')
      .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('404')); })
      .then(function(data) {
        if (!ne_playData(data, k)) tryNext(i + 1);
      })
      .catch(function() { tryNext(i + 1); });
  })(0);
}
