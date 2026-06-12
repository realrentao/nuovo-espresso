// Audio Manifest - maps words to their base64 JS files
const AUDIO_KEYS = {
  '055 1234567. Però ho anche il cellulare: 349 2547577.': 'telefono_055_1234567',
  '349 2547577.': 'cellulare_349_2547577',
  'Buon pomeriggio! (meno usato)': 'buon_pomeriggio_meno_usato',
  'Buonanotte!': 'buonanotte',
  'Buonasera!': 'buonasera',
  'Buongiorno!': 'buongiorno',
  'Buongiorno, sono Giovanni Muti.': 'buongiorno_sono_giovanni_muti',
  'Ciao, sono Valeria, e tu come ti chiami?': 'ciao_sono_valeria_e_tu_come_ti_chiami',
  'Come si scrive?': 'come_si_scrive',
  'Come, scusi?': 'come_scusi',
  'E il Suo numero di telefono?': 'e_il_suo_numero_di_telefono',
  'Franca Cucci. E Lei?': 'franca_cucci_e_lei',
  'J (i lunga) · K (kappa) · W (doppia vu) · X (ics) · Y (ipsilon)': 'lettere_straniere',
  'La signora Genovesi?': 'la_signora_genovesi',
  'Lei è italiana?': 'lei_italiana',
  'No, sono austriaco. E tu?': 'no_sono_austriaco_e_tu',
  'No, sono irlandese. Sono di Dublino. E Lei?': 'no_sono_irlandese_sono_di_dublino_e_lei',
  'Qual è il Suo indirizzo?': 'qual_il_suo_indirizzo',
  'Scusi, Lei come si chiama?': 'scusi_lei_come_si_chiama',
  'Sei tedesco?': 'sei_tedesco',
  'Sono': 'sono',
  'Sì, sono io.': 'si_sono_io',
  'Sì. E Lei? È inglese?': 's_e_lei_inglese',
  'Via Garibaldi, 12.': 'via_garibaldi_12',
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

// Audio Loader - fetch-based, more reliable than <script> injection
let currentAudio = null;
const audioCache = {};

function speak(text) {
  stopAllAudio();

  var key = AUDIO_KEYS[text] || AUDIO_KEYS[text.toLowerCase()];
  if (!key) {
    if ('speechSynthesis' in window) {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'it-IT'; u.rate = 0.85;
      speechSynthesis.speak(u);
    }
    return;
  }

  if (audioCache[key]) {
    audioCache[key].currentTime = 0;
    audioCache[key].play().catch(function(){});
    currentAudio = audioCache[key];
    return;
  }

  fetch('audio/d/' + key + '.js')
    .then(function(r) { return r.text(); })
    .then(function(jsText) {
      var m = jsText.match(/"(data:audio[^"]+)"/);
      if (m) {
        var audio = new Audio(m[1]);
        audioCache[key] = audio;
        currentAudio = audio;
        audio.play().catch(function(){});
      }
    })
    .catch(function() {
      if ('speechSynthesis' in window) {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = 'it-IT'; u.rate = 0.85;
        speechSynthesis.speak(u);
      }
    });
}

function stopAllAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}