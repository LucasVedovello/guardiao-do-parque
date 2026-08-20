function generateDiploma(name, template) {
  const canvas = document.getElementById('diplomaCanvas');
  const ctx = canvas.getContext('2d');
  const W = 800, H = 600;

  ctx.clearRect(0, 0, W, H);

  const gradient = ctx.createLinearGradient(0, 0, W, H);
  gradient.addColorStop(0, '#fdfcf0');
  gradient.addColorStop(.5, '#f9f3d5');
  gradient.addColorStop(1, '#fdfcf0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#1b5e30';
  ctx.lineWidth = 8;
  ctx.strokeRect(15, 15, 770, 570);
  ctx.strokeStyle = '#43a047';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, 740, 540);

  ctx.fillStyle = '#1b5e30';
  ctx.font = 'bold 28px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌿', 65, 72);
  ctx.fillText('🌿', 735, 72);

  const isNature = template === 'natureza';
  const title = isNature ? 'CERTIFICADO DE' : 'CERTIFICADO DE';
  const subtitle = isNature ? 'AMIGO DA NATUREZA' : 'GUARDIÃO DO PARQUE';

  ctx.fillStyle = '#1b5e30';
  ctx.font = 'bold 36px Georgia, serif';
  ctx.fillText(title, 400, 112);
  ctx.font = 'bold 42px Georgia, serif';
  ctx.fillText(subtitle, 400, 160);

  ctx.strokeStyle = '#ff9800';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(190, 183);
  ctx.lineTo(610, 183);
  ctx.stroke();

  ctx.fillStyle = '#3b463f';
  ctx.font = '19px Georgia, serif';
  const lines = isNature
    ? ['Certificamos que', 'demonstrou respeito, carinho e compromisso', 'com a natureza e com a preservação', 'dos espaços verdes do nosso parque.']
    : ['Certificamos que', 'participou do Projeto Pé Pedal e demonstrou', 'respeito, cuidado e compromisso', 'com a preservação do nosso parque.'];

  lines.forEach((line, i) => ctx.fillText(line, 400, 225 + i * 28));

  let displayName = name.trim();
  if (displayName.length > 25) displayName = displayName.slice(0, 25) + '…';

  ctx.fillStyle = '#2d8a4e';
  ctx.font = 'bold 34px Georgia, serif';
  ctx.fillText(displayName, 400, 355);

  ctx.strokeStyle = '#ff9800';
  ctx.beginPath();
  ctx.moveTo(260, 368);
  ctx.lineTo(540, 368);
  ctx.stroke();

  const date = new Date().toLocaleDateString('pt-BR');
  ctx.fillStyle = '#555';
  ctx.font = '16px Georgia, serif';
  ctx.fillText(`Campinas/SP · ${date}`, 400, 405);

  if (photoData) {
    const img = new Image();
    img.onload = () => drawCircularPhoto(ctx, img);
    img.src = photoData;
  } else {
    drawSeal(ctx);
  }

  ctx.fillStyle = '#555';
  ctx.font = 'italic 14px Georgia, serif';
  ctx.fillText('Projeto Pé Pedal · Colégio Bentinho · Curso de Informática · Agosto/2026', 400, 565);

  return canvas;
}

function drawCircularPhoto(ctx, img) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(400, 490, 48, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, 352, 442, 96, 96);
  ctx.restore();

  ctx.strokeStyle = '#2d8a4e';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(400, 490, 48, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSeal(ctx) {
  ctx.fillStyle = '#2d8a4e';
  ctx.beginPath();
  ctx.arc(400, 490, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '28px Arial';
  ctx.fillText('🌿', 400, 500);
}

function downloadDiploma() {
  const canvas = document.getElementById('diplomaCanvas');
  const link = document.createElement('a');
  link.download = 'Diploma_Guardiao_do_Parque.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function printDiploma() {
  const canvas = document.getElementById('diplomaCanvas');
  const data = canvas.toDataURL('image/png');
  const win = window.open('', '_blank');
  if (!win) {
    showToast('Permita a abertura de pop-ups para imprimir.');
    return;
  }
  win.document.write(`<html><head><title>Diploma Guardião do Parque</title>
    <style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh}
    img{max-width:95vw;max-height:95vh}</style></head>
    <body><img src="${data}" onload="window.print()"></body></html>`);
  win.document.close();
}

async function shareDiploma() {
  const canvas = document.getElementById('diplomaCanvas');
  canvas.toBlob(async blob => {
    const file = new File([blob], 'Diploma_Guardiao_do_Parque.png', {type:'image/png'});
    if (navigator.share && navigator.canShare && navigator.canShare({files:[file]})) {
      try {
        await navigator.share({title:'Meu Diploma - Guardião do Parque', text:'Eu sou um Guardião do Parque! 🌿', files:[file]});
      } catch (_) {}
    } else {
      const text = encodeURIComponent('Eu sou um Guardião do Parque! 🌿');
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  }, 'image/png');
}
