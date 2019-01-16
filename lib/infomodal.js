function modalWrite(_app){
  let desc;
  if(_app == "audio"){
    desc = "<p>Application permettant de visualiser des ondes sonores et de réaliser des analyses spectrales (Analyses de Fourier)</p>" +
    "<p>Les données peuvent être obtenues de deux manière :<ul><li>A l'aide d'un micro, en temps réel, ou en choisissant une durée d'acquisition;</li><li>A l'aide d'un fichier audio. (La plupart des codecs sont supportés)</li></ul></p>" +
    "<p>Les enregistrements sont limités à 20 s pour des raisons de performance.</p>";
  }
  if(_app == "rmn"){
    desc = "<p>Application permettant de générer des spectres RMN (simplistes) suffisamment lisibles pour être intégrés dans des activités, exercices, DS...</p>" +
    "<p>Le site <a href='http://www.nmrdb.org/new_predictor'>nmrdb</a> permet d'obtenir le spectre qui vous interesse juste en tracant la molécule.</p>";
  }
  if(_app == "addition"){
    desc = "<p>Application permettant de visualiser l'addition de deux ondes périodiques sinusoidales et de réaliser une analyse spectrale (Analyse de Fourier).</p>";
  }
  if(_app == "ecg"){
    desc = "<p>Application permettant de visualiser les électrocardiogrammes de 5 sportifs différents, au repos, après l’effort (1 minute de flexions) et après une minute de récupération.</p>" +
    "<p>Ces électrocardiogrammes permettent de mesurer l’adaptation à l’effort de ces sportifs.</p>" +
    "<p>Deux des sportifs ont une maladie cardiaque visible à l’électrocardiogramme.</p>";
  }
  if(_app == "index"){
    desc = "<p>Applications pédagogiques de physique et chimie.</p>";
  }
document.write('<div id="infoModal" class="w3-modal">');
document.write('<div class="w3-modal-content w3-animate-top w3-card-4">');
document.write('  <header class="w3-container w3-theme2"> ');
document.write('    <span id="closeInfoButton" class="w3-button w3-xlarge w3-display-topright"><i class="fas fa-times"></i></span>');
document.write('    <h2>À propos</h2>');
document.write('  </header>');
document.write('  <div class="w3-container">');
document.write('    <div class="w3-container w3-cell"><p><i class="fas fa-info-circle fa-2x"></i></p></div>');
document.write('    <div class="w3-container w3-cell">' + desc);
document.write('    </div>');
document.write('  </div>');
document.write('  <div class="w3-container">');
document.write('    <div class="w3-container w3-cell"><p><i class="fab fa-chrome fa-2x"></i></p></div>');
document.write('    <div class="w3-container w3-cell"><p>Les applications utilisent des technologies modernes pour fonctionner (HTLM5, CSS et JS). Il est indispensable d\'utiliser un navigateur internet récent pour les faire fonctionner. Les performances sont optimales avec Google Chrome mais les applications ont aussi été testées avec Mozilla Firefox.</p></div>');
document.write('  </div>');
document.write('  <div class="w3-container">');
document.write('    <div class="w3-container w3-cell"><p><i class="fas fa-envelope fa-2x"></i></p></div>');
document.write('   <div class="w3-container w3-cell"><p>pro.wal@protonmail.com</p></div>');
document.write(' </div>');
document.write('  <div class="w3-light-grey w3-section">');
document.write('    <button onclick="accordion(\'licenceAccordion\')" class="w3-button w3-block">');
document.write('      <div class="w3-container w3-cell"><p><i class="fas fa-copyright fa-2x"></i></p></div>');
document.write('     <div class="w3-container w3-cell"><p>MIT Licence</p></div>');
document.write('    </button>');
document.write('    <div id="licenceAccordion" class="w3-hide w3-container">');
document.write('      <p>La Belle Physique</p>');
document.write('      <p>Copyright (c) 2019 Gaétan Walter</p>');
document.write('      <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>');
document.write('      <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>');
document.write('      <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>');
document.write('    </div>');
document.write('  </div>');
document.write('</div>');
document.write('</div>');
}
