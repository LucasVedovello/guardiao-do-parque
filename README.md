# Guardião do Parque

Projeto Pé Pedal — Colégio Bentinho — Curso de Informática — Agosto/2026.

## Como executar

1. Abra a pasta `Guardiao-do-Parque` no VS Code.
2. Instale a extensão **Live Server** (Ritwick Dey), se ainda não tiver.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.
5. O navegador abrirá o projeto.
6. Permita o acesso à câmera quando solicitado.

> A webcam normalmente exige um contexto seguro (localhost). Por isso, use o Live Server em vez de abrir o HTML diretamente com duplo clique.

## Recursos implementados

- Nome do visitante com validação mínima de 3 caracteres.
- Webcam com `getUserMedia`.
- Recorte centralizado da foto em canvas 300×300.
- Upload de foto como fallback.
- Dois modelos de diploma.
- Diploma em Canvas 800×600.
- Foto circular com `clip()` e `drawImage()`.
- Data atual em português brasileiro.
- Download em PNG.
- Compartilhamento pelo recurso nativo do dispositivo ou WhatsApp como alternativa.
- Impressão do diploma.
- Animação de confete.
- Responsividade para telas menores.
- Separação em HTML, CSS e JavaScript.

## Estrutura

Guardiao-do-Parque/
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── camera.js
│       ├── diploma.js
│       └── main.js
├── docs/documentacao.md
└── README.md
