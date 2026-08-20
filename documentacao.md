# Documentação — Guardião do Parque

## Objetivo
Criar uma experiência interativa para visitantes do evento Pé Pedal, permitindo informar o nome, tirar uma foto e gerar uma lembrança digital personalizada.

## Tecnologias
- HTML5
- CSS3
- JavaScript
- Canvas API
- MediaDevices / getUserMedia

## Fluxo
1. Visitante informa o nome.
2. Sistema solicita acesso à webcam.
3. Visitante captura uma foto ou escolhe uma imagem do computador.
4. Usuário escolhe um dos dois modelos.
5. JavaScript desenha o diploma no Canvas.
6. O diploma aparece na tela.
7. Usuário pode salvar em PNG, compartilhar, imprimir ou fazer outro.

## Organização
- `index.html`: estrutura da aplicação.
- `assets/css/style.css`: aparência, responsividade e animações.
- `assets/js/camera.js`: webcam, captura e upload.
- `assets/js/diploma.js`: desenho e exportação do diploma.
- `assets/js/main.js`: eventos e integração das telas.

## Observação
A câmera é acessada pelo navegador. Em ambiente local, o projeto deve ser executado pelo Live Server para que o navegador forneça o contexto adequado para a API de câmera.
