document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const btnGenerate = document.getElementById('btnGenerate');
  const btnCapture = document.getElementById('btnCapture');
  const btnRetake = document.getElementById('btnRetake');
  const photoInput = document.getElementById('photoInput');
  const formArea = document.getElementById('formArea');
  const diplomaArea = document.getElementById('diplomaArea');
  const templateSelect = document.getElementById('templateSelect');

  window.addEventListener('beforeunload', stopCamera);
  startCamera();

  nameInput.addEventListener('input', updateGenerateButton);
  btnCapture.addEventListener('click', capturePhoto);
  btnRetake.addEventListener('click', retakePhoto);
  photoInput.addEventListener('change', e => loadPhotoFromFile(e.target.files[0]));

  btnGenerate.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name.length < 3) return;

    generateDiploma(name, templateSelect.value);
    formArea.classList.add('hidden');
    diplomaArea.classList.remove('hidden');
    stopCamera();
    window.scrollTo({top: 0, behavior: 'smooth'});
    launchConfetti();
  });

  document.getElementById('btnDownload').addEventListener('click', downloadDiploma);
  document.getElementById('btnPrint').addEventListener('click', printDiploma);
  document.getElementById('btnShare').addEventListener('click', shareDiploma);

  document.getElementById('btnAnother').addEventListener('click', () => {
    diplomaArea.classList.add('hidden');
    formArea.classList.remove('hidden');
    nameInput.value = '';
    templateSelect.value = 'guardiao';
    retakePhoto();
    updateGenerateButton();
    startCamera();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  updateGenerateButton();
});

function updateGenerateButton() {
  const name = document.getElementById('nameInput').value.trim();
  document.getElementById('btnGenerate').disabled = name.length < 3;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function launchConfetti() {
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = Math.random() * .35 + 's';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1900);
  }
}
