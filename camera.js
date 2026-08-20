let photoData = null;
let cameraStream = null;

async function startCamera() {
  const video = document.getElementById('video');
  const btnCapture = document.getElementById('btnCapture');
  const status = document.getElementById('cameraStatus');
  const message = document.getElementById('cameraMessage');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    status.textContent = 'Indisponível';
    message.textContent = 'A câmera não está disponível neste navegador. Você pode usar uma foto do computador.';
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false
    });
    video.srcObject = cameraStream;
    status.textContent = 'Câmera ativa ✓';
    message.textContent = 'Câmera pronta! Olhe para a tela e clique em "Tirar Foto".';
    btnCapture.disabled = false;
  } catch (err) {
    status.textContent = 'Sem permissão';
    message.textContent = 'Não foi possível acessar a câmera. Permita o acesso ou use "Usar Foto do Computador".';
  }
}

function capturePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  if (!video.videoWidth) return;

  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  const size = Math.min(video.videoWidth, video.videoHeight);
  const sx = (video.videoWidth - size) / 2;
  const sy = (video.videoHeight - size) / 2;

  ctx.save();
  ctx.translate(300, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, sx, sy, size, size, 0, 0, 300, 300);
  ctx.restore();

  photoData = canvas.toDataURL('image/jpeg', 0.9);
  showPhotoPreview();
}

function loadPhotoFromFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    photoData = e.target.result;
    showPhotoPreview();
    showToast('Foto carregada com sucesso!');
  };
  reader.readAsDataURL(file);
}

function showPhotoPreview() {
  const img = document.getElementById('photoPreview');
  const wrap = document.getElementById('photoPreviewWrap');
  const video = document.getElementById('video');
  const btnRetake = document.getElementById('btnRetake');
  img.src = photoData;
  wrap.classList.remove('hidden');
  video.classList.add('hidden');
  btnRetake.classList.remove('hidden');
  document.getElementById('cameraMessage').textContent = 'Foto pronta! Você pode gerar o diploma.';
  updateGenerateButton();
}

function retakePhoto() {
  photoData = null;
  document.getElementById('photoInput').value = '';
  document.getElementById('photoPreviewWrap').classList.add('hidden');
  document.getElementById('btnRetake').classList.add('hidden');
  document.getElementById('video').classList.remove('hidden');
  document.getElementById('cameraMessage').textContent = 'Escolha outra foto ou tire uma nova pela webcam.';
  updateGenerateButton();
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}
