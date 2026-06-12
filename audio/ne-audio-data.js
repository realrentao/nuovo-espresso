// Audio Manifest - maps words to their base64 JS files
const AUDIO_KEYS = {
  'Come si scrive?': 'come_si_scrive',
  'Lei è italiana?': 'lei_italiana',
  'No, sono austriaco. E tu?': 'no_sono_austriaco_e_tu',
  'No, sono irlandese. Sono di Dublino. E Lei?': 'no_sono_irlandese_sono_di_dublino_e_lei',
  'Sei tedesco?': 'sei_tedesco',
  'Sì. E Lei? È inglese?': 's_e_lei_inglese',
  'a': 'a',
  'a domani': 'a_domani',
  'a presto': 'a_presto',
  'acca': 'acca',
  'arrivederci': 'arrivederci',
  'austria': 'austria',
  'bi': 'bi',
  'buona sera signor muti': 'buona_sera_signor_muti',
  'buonanotte': 'buonanotte',
  'buonasera': 'buonasera',
  'buongiorno': 'buongiorno',
  'buongiorno signora': 'buongiorno_signora',
  'caffe': 'caffe',
  'cena': 'cena',
  'ci': 'ci',
  'ciao': 'ciao',
  'ciao paolo': 'ciao_paolo',
  'cina': 'cina',
  'cinema': 'cinema',
  'cinque': 'cinque',
  'come': 'come',
  'come ti chiami': 'come_ti_chiami',
  'cura': 'cura',
  'di': 'di',
  'di dove sei': 'di_dove_sei',
  'diciannove': 'diciannove',
  'diciassette': 'diciassette',
  'diciotto': 'diciotto',
  'dieci': 'dieci',
  'dodici': 'dodici',
  'due': 'due',
  'e': 'e',
  'effe': 'effe',
  'elle': 'elle',
  'emme': 'emme',
  'enne': 'enne',
  'erre': 'erre',
  'esse': 'esse',
  'francia': 'francia',
  'germania': 'germania',
  'gi': 'gi',
  'i': 'i',
  'inghilterra': 'inghilterra',
  'irlanda': 'irlanda',
  'italia': 'italia',
  'ku': 'ku',
  'nove': 'nove',
  'o': 'o',
  'otto': 'otto',
  'pi': 'pi',
  'piacere': 'piacere',
  'portogallo': 'portogallo',
  'quattordici': 'quattordici',
  'quattro': 'quattro',
  'quindici': 'quindici',
  'russia': 'russia',
  'sedici': 'sedici',
  'sei': 'sei',
  'sette': 'sette',
  'spagna': 'spagna',
  'stati uniti': 'stati_uniti',
  'svizzera': 'svizzera',
  'ti': 'ti',
  'tre': 'tre',
  'tredici': 'tredici',
  'u': 'u',
  'undici': 'undici',
  'uno': 'uno',
  'venti': 'venti',
  'vu': 'vu',
  'zero': 'zero',
  'zeta': 'zeta',
};

// Audio Loader - dynamically loads individual base64 audio files
const audioCache = {};

function speak(text) {
  const key = AUDIO_KEYS[text] || AUDIO_KEYS[text.toLowerCase()];
  if (!key) {
    // Fallback to Web Speech API
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'it-IT'; u.rate = 0.85;
      speechSynthesis.speak(u);
    }
    return;
  }
  
  // Check if already loaded
  if (audioCache[key]) {
    audioCache[key].currentTime = 0;
    audioCache[key].play().catch(() => {});
    return;
  }
  
  // Try global variable (already loaded via script tag)
  const varName = 'AD_' + key;
  if (window[varName]) {
    playAudio(key, window[varName]);
    return;
  }
  
  // Dynamically load the JS file
  const script = document.createElement('script');
  script.src = 'audio/d/' + key + '.js';
  script.onload = function() {
    if (window[varName]) {
      playAudio(key, window[varName]);
    }
  };
  script.onerror = function() {
    // Fallback
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'it-IT'; u.rate = 0.85;
      speechSynthesis.speak(u);
    }
  };
  document.head.appendChild(script);
}

function playAudio(key, dataUri) {
  const audio = new Audio(dataUri);
  audioCache[key] = audio;
  audio.play().catch(() => {});
}
