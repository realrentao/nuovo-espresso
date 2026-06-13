// Audio Manifest - words to file mapping
const AUDIO_KEYS = {
  '055 1234567. Però ho anche il cellulare: 349 2547577.': '055_1234567_per_ho_anche_il_cellulare_349_2547577',
  '349 2547577.': '349_2547577',
  'Bene, grazie.': 'bene_grazie',
  'Bene, grazie. E tu?': 'bene_grazie_e_tu',
  'Benissimo!': 'benissimo',
  'Benissimo, grazie. E Lei?': 'benissimo_grazie_e_lei',
  'Buon pomeriggio! (meno usato)': 'buon_pomeriggio_meno_usato',
  'Buonanotte!': 'buonanotte',
  'Buonasera!': 'buonasera',
  'Buonasera, vorrei prenotare un tavolo per due.': 'buonasera_vorrei_prenotare_un_tavolo_per_due',
  'Buongiorno!': 'buongiorno',
  'Buongiorno! — Buona sera, dottore!': 'buongiorno_buona_sera_dottore',
  'Buongiorno, avete una camera libera?': 'buongiorno_avete_una_camera_libera',
  'Buongiorno, come sta?': 'buongiorno_come_sta',
  'Buongiorno, cosa desidera?': 'buongiorno_cosa_desidera',
  'Buongiorno, sono Giovanni Muti.': 'buongiorno_sono_giovanni_muti',
  'Che cosa fai nel tempo libero?': 'che_cosa_fai_nel_tempo_libero',
  'Ciao Giuliana. Come stai?': 'ciao_giuliana_come_stai',
  'Ciao, Giorgio! — Oh, ciao Francesca! Come stai?': 'ciao_giorgio_oh_ciao_francesca_come_stai',
  'Ciao, come va?': 'ciao_come_va',
  'Ciao, sono Valeria, e tu come ti chiami?': 'ciao_sono_valeria_e_tu_come_ti_chiami',
  'Come si scrive?': 'come_si_scrive',
  'Come, scusi?': 'come_scusi',
  'Cosa hai fatto nelle vacanze?': 'cosa_hai_fatto_nelle_vacanze',
  'Così così.': 'cos_cos',
  'Di solito faccio sport. E tu?': 'di_solito_faccio_sport_e_tu',
  'E il Suo numero di telefono?': 'e_il_suo_numero_di_telefono',
  'Ecco a Lei.': 'ecco_a_lei',
  'Franca Cucci. E Lei?': 'franca_cucci_e_lei',
  'Grazie. Quanto viene?': 'grazie_quanto_viene',
  'Ho visitato Firenze. É stato bellissimo!': 'ho_visitato_firenze_stato_bellissimo',
  'Io Cecilia.': 'io_cecilia',
  'Io sto benissimo. E tu?': 'io_sto_benissimo_e_tu',
  'J (i lunga) · K (kappa) · W (doppia vu) · X (ics) · Y (ipsilon)': 'j_i_lunga_k_kappa_w_doppia_vu_x_ics_y_ipsilon',
  'La signora Genovesi?': 'la_signora_genovesi',
  'Lei è italiana?': 'lei_italiana',
  'Male.': 'male',
  'Marcello Ragazzi.': 'marcello_ragazzi',
  'Molto male.': 'molto_male',
  'No, sono austriaco. E tu?': 'no_sono_austriaco_e_tu',
  'No, sono irlandese. Sono di Dublino. E Lei?': 'no_sono_irlandese_sono_di_dublino_e_lei',
  'Per che ora?': 'per_che_ora',
  'Per due notti. Quanto viene?': 'per_due_notti_quanto_viene',
  'Per le 20:00.': 'per_le_20_00',
  'Piacere, Carlo De Giuli.': 'piacere_carlo_de_giuli',
  'Qual è il Suo indirizzo?': 'qual_il_suo_indirizzo',
  'Scusi, Lei come si chiama?': 'scusi_lei_come_si_chiama',
  'Sei tedesco?': 'sei_tedesco',
  'Sempre dritto, poi a destra.': 'sempre_dritto_poi_a_destra',
  'Sono': 'sono',
  'Sono tedesco.': 'sono_tedesco',
  'Sì, per quante notti?': 's_per_quante_notti',
  'Sì, sono io.': 's_sono_io',
  'Sì. E Lei? È inglese?': 's_e_lei_inglese',
  'Via Garibaldi, 12.': 'via_garibaldi_12',
  'Vorrei un caffè, per favore.': 'vorrei_un_caff_per_favore',
  'a': 'a',
  'a domani': 'a_domani',
  'a presto': 'a_presto',
  'acca': 'acca',
  'acqua': 'acqua',
  'albergo': 'albergo',
  'alzarsi': 'alzarsi',
  'antipasto': 'antipasto',
  'aperitivo': 'aperitivo',
  'aranciata': 'aranciata',
  'arrivederci': 'arrivederci',
  'austria': 'austria',
  'bagno': 'bagno',
  'ballare': 'ballare',
  'basilico': 'basilico',
  'bi': 'bi',
  'birra': 'birra',
  'bravo': 'bravo',
  'buona sera signor muti': 'buona_sera_signor_muti',
  'buonanotte': 'buonanotte',
  'buonasera': 'buonasera',
  'buongiorno': 'buongiorno',
  'buongiorno signora': 'buongiorno_signora',
  'caffe': 'caffe',
  'camera': 'camera',
  'cappuccino': 'cappuccino',
  'cena': 'cena',
  'ci': 'ci',
  'ciao': 'ciao',
  'ciao paolo': 'ciao_paolo',
  'cina': 'cina',
  'cinema': 'cinema',
  'cinque': 'cinque',
  'citta': 'citta',
  'colazione': 'colazione',
  'come': 'come',
  'come ti chiami': 'come_ti_chiami',
  'complimenti': 'complimenti',
  'conto': 'conto',
  'cucinare': 'cucinare',
  'cugino': 'cugino',
  'cura': 'cura',
  'di': 'di',
  'di dove sei': 'di_dove_sei',
  'di solito': 'di_solito',
  'diciannove': 'diciannove',
  'diciassette': 'diciassette',
  'diciotto': 'diciotto',
  'dieci': 'dieci',
  'dodici': 'dodici',
  'dolce': 'dolce',
  'doppia': 'doppia',
  'dormire': 'dormire',
  'dove abiti': 'dove_abiti',
  'due': 'due',
  'e': 'e',
  'effe': 'effe',
  'elle': 'elle',
  'emme': 'emme',
  'enne': 'enne',
  'erre': 'erre',
  'esse': 'esse',
  'figlio': 'figlio',
  'firenze': 'firenze',
  'formaggio': 'formaggio',
  'francia': 'francia',
  'fratello': 'fratello',
  'funghi': 'funghi',
  'genitori': 'genitori',
  'germania': 'germania',
  'gi': 'gi',
  'giocare': 'giocare',
  'i': 'i',
  'inghilterra': 'inghilterra',
  'insegnante': 'insegnante',
  'irlanda': 'irlanda',
  'isola': 'isola',
  'italia': 'italia',
  'ku': 'ku',
  'lavarsi': 'lavarsi',
  'lavoro': 'lavoro',
  'leggere': 'leggere',
  'madre': 'madre',
  'mai': 'mai',
  'mare': 'mare',
  'marito': 'marito',
  'milano': 'milano',
  'montagna': 'montagna',
  'mozzarella': 'mozzarella',
  'napoli': 'napoli',
  'nonna': 'nonna',
  'nonno': 'nonno',
  'nove': 'nove',
  'o': 'o',
  'olio': 'olio',
  'ottimo': 'ottimo',
  'otto': 'otto',
  'padre': 'padre',
  'pane': 'pane',
  'pi': 'pi',
  'piacere': 'piacere',
  'piazza': 'piazza',
  'pomodoro': 'pomodoro',
  'portogallo': 'portogallo',
  'pranzo': 'pranzo',
  'primo': 'primo',
  'prosciutto': 'prosciutto',
  'qualche volta': 'qualche_volta',
  'quanti anni hai': 'quanti_anni_hai',
  'quattordici': 'quattordici',
  'quattro': 'quattro',
  'quindici': 'quindici',
  'roma': 'roma',
  'russia': 'russia',
  'secondo': 'secondo',
  'sedici': 'sedici',
  'sei': 'sei',
  'sempre': 'sempre',
  'sette': 'sette',
  'singola': 'singola',
  'sorella': 'sorella',
  'spagna': 'spagna',
  'spesso': 'spesso',
  'spiaggia': 'spiaggia',
  'sport': 'sport',
  'spumante': 'spumante',
  'stati uniti': 'stati_uniti',
  'studente': 'studente',
  'svegliarsi': 'svegliarsi',
  'svizzera': 'svizzera',
  'ti': 'ti',
  'torino': 'torino',
  'tre': 'tre',
  'tredici': 'tredici',
  'u': 'u',
  'undici': 'undici',
  'uno': 'uno',
  'venezia': 'venezia',
  'venti': 'venti',
  'vestirsi': 'vestirsi',
  'vino': 'vino',
  'vu': 'vu',
  'zero': 'zero',
  'zeta': 'zeta',
  'zia': 'zia',
  'zio': 'zio',
};
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