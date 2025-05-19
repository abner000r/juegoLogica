// ================================
// 📁 ESTADO GLOBAL DEL JUEGO
// ================================
const GameState = {
  preguntaActual: 0,
  puntaje: 0,
  tiempoRestante: 15,
  sonidos: {},
  musicaActiva: true,
  musicaYaIniciada: false
};

// ================================
// 📚 PREGUNTAS DEL JUEGO
// ================================
const preguntas = [
  {
    texto: "¿Cuál es una falacia ad hominem?",
    opciones: [
      "Ignorar el argumento y atacar a la persona",
      "Usar estadísticas falsas",
      "Apelar a la emoción"
    ],
    respuesta: 0
  },
  {
    texto: "¿Qué es una falacia de autoridad?",
    opciones: [
      "Rechazar la opinión de un experto",
      "Apoyarse en alguien famoso, aunque no sea experto",
      "Citar muchas fuentes científicas"
    ],
    respuesta: 1
  },
  {
    texto: "¿Cuál es la definición de falacia?",
    opciones: [
      "una mentira.",
      "Una opinión personal con muchos datos verdaderos.",
      "Un error en el razonamiento que parece lógico pero no lo es."
    ],
    respuesta: 2
  },
  {
    texto: "¿Pueden existir falacias aunque la estructura lógica sea válida?",
    opciones: [
      "No, las falacias no usan lógica alguna.",
      "No, si hay falacia entonces la lógica es inválida.",
      "Sí, porque una premisa puede contener una falacia."
    ],
    respuesta: 2
  },
  {
    texto: "¿Cómo se puede identificar una falacia?",
    opciones: [
      "Si el argumento tiene errores lógicos o engaños.",
      "Si el argumento es largo o complicado.",
      "Si usa emociones o experiencias personales."
    ],
    respuesta: 0
  }
];

// ================================
// ✍️ ESTILOS DE TEXTO Y UTILIDADES
// ================================
function estiloTexto(tamano = '18px', color = '#fff') {
  return {
    font: `${tamano} Courier`,
    fill: color,
    backgroundColor: '#0008',
    padding: { x: 10, y: 5 },
    align: 'center',
    wordWrap: { width: 700 }
  };
}

function estiloBoton() {
  return {
    font: '20px Courier',
    fill: '#fff',
    backgroundColor: '#400080',
    padding: { x: 10, y: 8 },
    wordWrap: { width: 600 }
  };
}

function detenerTodosLosSonidos() {
  const sonidos = GameState.sonidos;
  for (const key in sonidos) {
    if (sonidos[key] && sonidos[key].isPlaying) {
      sonidos[key].stop();
    }
  }
}
// ================================
// 🔊 GESTOR GLOBAL DE SONIDO
// ================================
const SoundManager = {
  sonidos: {},

  init(scene) {
    this.scene = scene;
  },

  play(key, config = {}) {
    if (this.sonidos[key]) {
      this.sonidos[key].stop();
    }
    this.sonidos[key] = this.scene.sound.add(key, config);
    this.sonidos[key].play();
    return this.sonidos[key];
  },

  loop(key, volume = 1) {
    if (this.sonidos[key]) {
      this.sonidos[key].stop();
    }
    this.sonidos[key] = this.scene.sound.add(key, { loop: true, volume });
    this.sonidos[key].play();
    return this.sonidos[key];
  },

  stop(key) {
    if (this.sonidos[key]) {
      this.sonidos[key].stop();
      delete this.sonidos[key];
    }
  },

  stopAll() {
    for (let key in this.sonidos) {
      if (this.sonidos[key]) {
        this.sonidos[key].stop();
      }
    }
    this.sonidos = {};
  }
};

// ================================
// 🚀 BOOTSCENE: Carga de todos los assets
// ================================
class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Imágenes
    this.load.image('presentador', 'assets/img/presentador.png');
    this.load.image('fondo', 'assets/img/fondo_inicio.png');
    this.load.image('premio', 'assets/img/premio.png');
    this.load.image('sin_chancho', 'assets/img/sin_chancho.png');
    this.load.image('ladron', 'assets/img/ladron.png');
    this.load.image('presentadorConCerdo', 'assets/img/presentadorConCerdo.png');
    this.load.image('interferencia', 'assets/img/interferencia.png');
    this.load.image('presentadorNooo', 'assets/img/presentadorNooo.png');
    this.load.image('presentadorAcusa', 'assets/img/presentadorAcusa.png');
    this.load.image('sospechosoJoseLuis', 'assets/img/sospechosoJoseLuis.png');
    this.load.image('sospechosoAxel', 'assets/img/sospechosoAxel.png');
    this.load.image('sospechosoEmerson', 'assets/img/sospechosoEmerson.png');
    this.load.image('imagenGrupo', 'assets/img/imagenGrupo.png');
    this.load.image('selloCulpable', 'assets/img/selloCulpable.png');
    this.load.image('fondoExpediente', 'assets/img/fondoExpediente.png');



    

    // Audios
    this.load.audio('fondo', 'assets/audio/fondo.mp3');
    this.load.audio('aplausos', 'assets/audio/aplausos.mp3');
    this.load.audio('publico', 'assets/audio/publico.mp3');
    this.load.audio('abucheos', 'assets/audio/abucheos.mp3');
    this.load.audio('vidrios', 'assets/audio/vidrios.mp3');
    this.load.audio('alarma', 'assets/audio/alarma.mp3');
    this.load.audio('publicoAsustado', 'assets/audio/publico_asustado.mp3');
    this.load.audio('desaparecer', 'assets/audio/desaparecer.mp3');
    this.load.audio('interferenciaSonido', 'assets/audio/interferencia.mp3');
    this.load.audio('registro', 'assets/audio/registro.mp3');
    this.load.audio('ambiente_tenso', 'assets/audio/ambiente_tenso.mp3');
    this.load.audio('foco', 'assets/audio/foco.mp3');
    this.load.audio('musicaFinal', 'assets/audio/musicaf.mp3');


  }

  create() {
    this.scene.start('EscenaInicio');
  }
}
// ================================
// 🧑‍🎤 ESCENA DE INICIO
// ================================
class EscenaInicio extends Phaser.Scene {
  constructor() {
    super('EscenaInicio');
  }

  create() {
    SoundManager.init(this);
    this.add.image(400, 300, 'fondo');
    this.add.image(400, 280, 'presentador').setScale(1);

    this.add.text(400, 500,
      "🎤 ¡Bienvenido al Juego de Falacias!\nResponde preguntas y evita caer en errores lógicos.\n¿Estás listo para comenzar?",
      estiloTexto('16px', '#fff')
    ).setOrigin(0.5);

    const boton = this.add.text(400, 570, "🎮 JUGAR", estiloBoton())
      .setOrigin(0.5)
      .setInteractive();

    // 🎵 Iniciar música solo una vez para que se mantenga
    if (!GameState.musicaYaIniciada) {
      GameState.sonidos.fondo = this.sound.add('fondo', { loop: true, volume: 0.3 });
      if (GameState.musicaActiva) GameState.sonidos.fondo.play();
      GameState.musicaYaIniciada = true;
    }

    boton.on("pointerdown", () => {
      GameState.preguntaActual = 0;
      GameState.puntaje = 0;
      this.scene.start('EscenaTrivia');
    });
  }
}

// ================================
// ❓ ESCENA DE TRIVIA
// ================================
class EscenaTrivia extends Phaser.Scene {
  constructor() {
    super('EscenaTrivia');
  }

  create() {
    SoundManager.init(this);
    const sonidos = GameState.sonidos;

    // 🎵 Cargar audios si aún no están cargados
    if (!sonidos.aplausos) {
      sonidos.aplausos = this.sound.add('aplausos', { volume: 0.2 });
      sonidos.abucheos = this.sound.add('abucheos');
      sonidos.publico = this.sound.add('publico', { volume: 0.2 });
      sonidos.vidrios = this.sound.add('vidrios');
      sonidos.alarma = this.sound.add('alarma');
      sonidos.publicoAsustado = this.sound.add('publicoAsustado');
      sonidos.desaparecer = this.sound.add('desaparecer');
      sonidos.interferencia = this.sound.add('interferenciaSonido', { volume: 0.4 });
    }

    this.textoPregunta = this.add.text(400, 100, "", estiloTexto('24px', '#0ff')).setOrigin(0.5);

    this.opcionesTexto = [];
    for (let i = 0; i < 3; i++) {
      const opcion = this.add.text(400, 200 + i * 80, "", estiloBoton())
        .setOrigin(0.5)
        .setInteractive();

      opcion.on("pointerdown", () => this.verificarRespuesta(i));
      this.opcionesTexto.push(opcion);
    }

    this.temporizadorTexto = this.add.text(750, 40, "", estiloTexto('22px', '#ff0')).setOrigin(1, 0);
    this.mostrarPregunta();
    this.iniciarTemporizador();
  }

  mostrarPregunta() {
    detenerTodosLosSonidos(); // Silenciar respuestas anteriores
    const pregunta = preguntas[GameState.preguntaActual];
    this.textoPregunta.setText(pregunta.texto);

    pregunta.opciones.forEach((op, i) => {
      this.opcionesTexto[i].setText(op).setVisible(true).setInteractive();
    });
  }

  verificarRespuesta(indice) {
    this.opcionesTexto.forEach(op => op.disableInteractive());
    detenerTodosLosSonidos();

    const correcta = preguntas[GameState.preguntaActual].respuesta === indice;
    const sonidos = GameState.sonidos;

    if (correcta) {
      sonidos.aplausos.setVolume(0.2).play();
      sonidos.publico.setVolume(0.2).play();
      GameState.puntaje++;
      this.textoPregunta.setText("✅ ¡Correcto!");
    } else {
      sonidos.abucheos.play();
      this.textoPregunta.setText("❌ Incorrecto");
    }

    this.time.delayedCall(1300, () => {
      ['aplausos', 'abucheos', 'publico'].forEach(key => {
        if (sonidos[key]) sonidos[key].stop();
      });
    });

    this.time.delayedCall(1500, () => {
      GameState.preguntaActual++;
      if (GameState.preguntaActual < preguntas.length) {
        this.mostrarPregunta();
        this.opcionesTexto.forEach(op => op.setInteractive());
        GameState.tiempoRestante = 15;
      } else {
        this.scene.start('EscenaPremio');
      }
    });
  }

  iniciarTemporizador() {
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        GameState.tiempoRestante--;
        this.temporizadorTexto.setText(`⏱ ${GameState.tiempoRestante}s`);
        if (GameState.tiempoRestante <= 0) {
          this.verificarRespuesta(-1);
          GameState.tiempoRestante = 15;
        }
      }
    });
  }
}
// ================================
// 💰 ESCENA DEL PREMIO (con imagen integrada)
// ================================
class EscenaPremio extends Phaser.Scene {
  constructor() {
    super('EscenaPremio');
  }

  create() {
    this.add.image(400, 300, 'presentadorConCerdo').setScale(1);

    this.add.text(400, 60, "🎁 ¡Atención concursantes!", estiloTexto('26px', '#fff')).setOrigin(0.5);

    this.add.text(400, 130,
      "Dentro de este cochinito dorado hay\n💵 100,000 dólares en efectivo 💵",
      estiloTexto('20px', '#ff0')).setOrigin(0.5);

    const boton = this.add.text(400, 500, "👉 CONTINUAR", estiloBoton())
      .setOrigin(0.5)
      .setInteractive();

    boton.on("pointerdown", () => {
      this.scene.start('TransicionRobo');
    });
  }
}

// ================================
// 🌘 ESCENA TRANSICIÓN AL ROBO (apagón + interferencia + corte de música)
// ================================
class TransicionRobo extends Phaser.Scene {
  constructor() {
    super('TransicionRobo');
  }

  create() {
    // Mostrar cochinito intacto antes del caos
    const premioVisible = this.add.image(400, 300, 'premio').setScale(0.7);

    // Oscurecer lentamente el escenario
    const capaOscura = this.add.rectangle(400, 300, 800, 600, 0x000000, 0)
      .setDepth(10);

    this.tweens.add({
      targets: capaOscura,
      alpha: 0.6,
      duration: 2000,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        premioVisible.destroy();

        // Mostrar interferencia visual
        const interferencia = this.add.image(400, 300, 'interferencia')
          .setDepth(11)
          .setAlpha(0);

        // 🎵 Detener música justo aquí
        if (GameState.sonidos.fondo && GameState.sonidos.fondo.isPlaying) {
          GameState.sonidos.fondo.stop();
        }

        // Reproducir sonido de interferencia
        if (GameState.sonidos.interferencia) {
          GameState.sonidos.interferencia.play();
        }

        // Interferencia parpadea
        this.tweens.add({
          targets: interferencia,
          alpha: 1,
          duration: 100,
          yoyo: true,
          repeat: 2,
          onComplete: () => {
            interferencia.destroy();
            GameState.sonidos.interferencia.stop();

            // Apagón total por un momento
            capaOscura.setAlpha(1);
            this.time.delayedCall(1000, () => {
              this.iniciarFlashFinal();
            });
          }
        });
      }
    });
  }

  iniciarFlashFinal() {
    const flash = this.add.rectangle(400, 300, 800, 600, 0xffffff)
      .setAlpha(0)
      .setDepth(12);

    this.tweens.add({
      targets: flash,
      alpha: 1,
      duration: 200,
      yoyo: true,
      onComplete: () => {
        this.scene.start('EscenaRobo');
      }
    });
  }
}

// ================================
// 🧨 ESCENA DEL ROBO (sin ladrón, solo luces y sonidos)
// ================================
class EscenaRobo extends Phaser.Scene {
  constructor() {
    super('EscenaRobo');
  }

  create() {
    SoundManager.init(this);
    // 🚨 Sonidos del robo
    detenerTodosLosSonidos();
    const s = GameState.sonidos;
    s.vidrios.play();
    s.alarma.play();
    s.publicoAsustado.play();

    // 🎬 Fondo con el chancho desaparecido
    this.add.image(400, 300, 'sin_chancho').setScale(0.7);

    // 🟥 Texto de alerta
    this.add.text(400, 80, "¡La alcancía ha desaparecido!", estiloTexto('28px', '#ff0000')).setOrigin(0.5);

    // 🔴 Luces rojas animadas
    const luzIzq = this.add.rectangle(200, 100, 150, 300, 0xff0000, 0.3).setBlendMode('ADD');
    const luzDer = this.add.rectangle(600, 100, 150, 300, 0xff0000, 0.3).setBlendMode('ADD');

    this.tweens.add({
      targets: [luzIzq, luzDer],
      alpha: { from: 0.2, to: 0.7 },
      duration: 300,
      yoyo: true,
      repeat: -1
    });

    // 🎭 ANIMACIÓN FINAL CON PRESENTADOR Y TRANSICIÓN AL DETECTIVE
this.time.delayedCall(3000, () => {
  // Imagen 1: Presentador gritando "NOOOO"
  const presentadorNooo = this.add.image(400, 300, 'presentadorNooo')
    .setScale(0.85)
    .setOrigin(0.5)
    .setDepth(10);

  this.time.delayedCall(1500, () => {
    // Reemplazar por la imagen acusadora
    presentadorNooo.destroy();

    const presentadorAcusa = this.add.image(400, 300, 'presentadorAcusa')
      .setScale(0.85)
      .setOrigin(0.5)
      .setDepth(10);

    const textoDrama = this.add.text(400, 120,
      "¡Alguien se chanchó el chancho!\n¡Esto es un crimen... y tú lo vas a resolver!",
      estiloTexto('20px', '#fff')).setOrigin(0.5).setDepth(11);

    // Esperar y hacer apagado de TV
    this.time.delayedCall(3000, () => {
      this.apagarPantallaComoTV();
    });
  });
});

  }

  // 📺 Efecto tipo apagar la TV antes de cambiar de escena
  apagarPantallaComoTV() {
    // Línea blanca como cierre vertical
    const linea = this.add.rectangle(400, 300, 800, 2, 0xffffff).setDepth(20);

    this.tweens.add({
      targets: linea,
      scaleX: 0,
      scaleY: 10,
      duration: 600,
      ease: 'Sine.easeIn',
      onComplete: () => {
        // Fondo negro
        const negro = this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(21);
        this.time.delayedCall(500, () => {
          this.scene.start('EscenaDetective'); // ← esta escena vendrá luego
        });
      }
    });
  }
}
// ================================
// 🕵️‍♂️ ESCENA DETECTIVE - INTRO
// ================================
class EscenaDetective extends Phaser.Scene {
  constructor() {
    super('EscenaDetective');

    this.lineasHistoria = [
      "Archivo confidencial - Acceso nivel 4",
      "",
      "20:42 — La transmisión en vivo del juego sufrió una interrupción inesperada.",
      "El premio mayor, un chancho dorado con $100,000 en efectivo, desapareció frente a millones de espectadores.",
      "Nadie vio al responsable... pero todos escucharon la alarma.",
      "",
      "Tres personas estaban cerca del escenario cuando ocurrió el apagón:",
      "1. El productor del programa.",
      "2. Un concursante eliminado.",
      "3. El técnico encargado del sonido.",
      "",
      "Cada uno ha dado su versión… pero algo no cuadra.",
      "Tu misión es encontrar al culpable.",
      "Y para lograrlo... tendrás que detectar sus falacias."
    ];

    this.textoFinal = [];
    this.lineaVisible = "";
    this.lineaIndex = 0;
    this.letraIndex = 0;
    this.scrollY = 500;
  }

  preload() {
    this.load.audio('registro', 'assets/audio/registro.mp3');
  }

  create() {
    SoundManager.init(this);
    detenerTodosLosSonidos(); // Detenemos alarmas o música previas

    this.cameras.main.setBackgroundColor('#000000');

    // Texto base con scroll dinámico
    this.textoPantalla = this.add.text(40, this.scrollY, "", {
      font: "18px Courier",
      fill: "#00ff00",
      lineSpacing: 4,
      wordWrap: { width: 720 }
    });

    // Cursor tipo terminal
    this.cursor = this.add.text(40, this.scrollY + 20, "|", {
      font: "18px Courier",
      fill: "#00ff00"
    }).setAlpha(0.7);

    this.tweens.add({
      targets: this.cursor,
      alpha: { from: 0.7, to: 0 },
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    // Sonido
    this.sonidoRegistro = SoundManager.play('registro', { volume: 0.2 });
this.sonidoRegistro.pause(); // Para luego usar .play() más adelante


    // Escritura
    this.tiempo = this.time.addEvent({
      delay: 35,
      callback: this.escribirTexto,
      callbackScope: this,
      loop: true
    });

    // Permitir saltar intro con clic o espacio
    this.input.keyboard.on('keydown-SPACE', () => this.saltarIntro());
    this.input.on('pointerdown', () => this.saltarIntro());
  }
  escribirTexto() {
    if (this.lineaIndex < this.lineasHistoria.length) {
      const lineaActual = this.lineasHistoria[this.lineaIndex];

      if (this.letraIndex < lineaActual.length) {
        const letra = lineaActual.charAt(this.letraIndex);
        this.lineaVisible += letra;
        this.letraIndex++;

        // Sonido cada 2 letras, excepto en espacios
        if (this.letraIndex % 2 === 0 && letra !== " " && letra !== "\n") {
          this.sonidoRegistro.play({ volume: 0.2 });
        }

        // Mostrar texto acumulado
        const textoCompleto = this.textoFinal.concat([this.lineaVisible]).join("\n");
        this.textoPantalla.setText(textoCompleto);

        // Mover cursor al final del texto
        const lineCount = this.textoFinal.length;
        this.cursor.y = this.scrollY + lineCount * 22 + 5;
        this.cursor.x = 40 + (this.lineaVisible.length * 10);
      } else {
        // Línea completa: guardar y avanzar
        this.textoFinal.push(this.lineaVisible);
        this.lineaVisible = "";
        this.lineaIndex++;
        this.letraIndex = 0;

        // Scroll hacia arriba
        this.scrollY -= 22;
        this.tweens.add({
          targets: [this.textoPantalla, this.cursor],
          y: this.scrollY,
          duration: 150,
          ease: 'Sine.easeOut'
        });
      }
    } else {
      // Fin del texto
      this.tiempo.remove(false);
      this.cursor.destroy();

      this.time.delayedCall(1000, () => {
        this.scene.start('EscenaInterrogatorio1');
      });
    }
  }
  saltarIntro() {
    // Detener escritura y sonidos
    if (this.tiempo) this.tiempo.remove(false);
    if (this.cursor) this.cursor.destroy();
    detenerTodosLosSonidos();

    // Ir directamente al interrogatorio
    this.scene.start('EscenaInterrogatorio1');
  }
}
// ================================
// 🕵️‍♂️ ESCENA INTERROGATORIO 1 — JOSÉ LUIS
// ================================
class EscenaInterrogatorio1 extends Phaser.Scene {
  constructor() {
    super('EscenaInterrogatorio1');

    this.dialogosJoseLuis = [
      "¡Yo no tengo nada que ver! Después de todo lo que sufrí en este juego… ¡merecía ese premio más que nadie!",
      "¿Y qué si grité un poco cuando perdí? ¡Eso no significa que rompí nada! Además, ¿quién no se enoja cuando le quitan un premio tan valioso… como un cochinito dorado?"
    ];

    this.dialogoActual = 0;
    this.textoVisible = "";
    this.indiceLetra = 0;
    this.libretaAbierta = false;
    this.lineasLibreta = [];
    this.cursorTexto = "|";
  }

  preload() {
    this.load.image('sospechosoJoseLuis', 'assets/img/sospechosoJoseLuis.png');
    this.load.audio('foco', 'assets/audio/foco.mp3');
    this.load.audio('ambiente_tenso', 'assets/audio/ambiente_tenso.mp3');
  }

  create() {
  SoundManager.init(this);
  SoundManager.stopAll(); // Detener todo lo anterior

  this.cameras.main.setBackgroundColor('#000000');

  this.ambiente = SoundManager.loop('ambiente_tenso', 0.3); // Audio ambiente

  this.foco = this.add.rectangle(400, 300, 800, 600, 0xffffff).setAlpha(0).setDepth(5);
  SoundManager.play('foco'); // Sonido del foco

  this.tweens.add({
    targets: this.foco,
    alpha: { from: 0, to: 1 },
    duration: 100,
    yoyo: true,
    repeat: 2,
    onComplete: () => {
      this.iniciarPresentacion();
    }
  });
}


  iniciarPresentacion() {
    this.joseLuis = this.add.image(400, 300, 'sospechosoJoseLuis')
      .setScale(0.7)
      .setAlpha(0)
      .setDepth(10);

    this.nombre = this.add.text(400, 40, "👤 José Luis — Exconcursante Eliminado", {
      font: "20px Courier",
      fill: "#ffffcc",
      backgroundColor: "#000000aa",
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setDepth(11);

    this.panelTexto = this.add.rectangle(400, 500, 740, 100, 0x000000, 0.6)
      .setDepth(12).setOrigin(0.5);

    this.textoDialogo = this.add.text(70, 460, "", {
      font: "18px Courier",
      fill: "#ffffff",
      wordWrap: { width: 660 }
    }).setDepth(13);

    this.crearLibreta();

    this.tweens.add({
      targets: this.joseLuis,
      alpha: 1,
      duration: 800,
      onComplete: () => {
        this.cameras.main.zoomTo(1.4, 2000, 'Sine.easeInOut', false, (_cam, progress) => {
          if (progress === 1) {
            this.time.delayedCall(800, () => {
              this.cameras.main.zoomTo(1, 2000, 'Sine.easeInOut');
              this.iniciarDialogoLetraPorLetra();
            });
          }
        });
      }
    });
  }

  crearLibreta() {
    this.botonAnotaciones = this.add.text(690, 20, "📝 Anotaciones", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#222222",
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(30).setInteractive();

    this.panelAnotaciones = this.add.rectangle(650, 150, 260, 220, 0xffffff, 0.95)
      .setScrollFactor(0).setDepth(29).setVisible(false);

    this.textoAnotaciones = this.add.text(530, 60, "", {
      font: "14px Courier",
      fill: "#000000",
      wordWrap: { width: 220 }
    }).setScrollFactor(0).setDepth(30).setVisible(false);

    this.botonAnotaciones.on("pointerdown", () => {
      this.libretaAbierta = !this.libretaAbierta;
      this.panelAnotaciones.setVisible(this.libretaAbierta);
      this.textoAnotaciones.setVisible(this.libretaAbierta);
    });
  }

  iniciarDialogoLetraPorLetra() {
    this.dialogoActualTexto = this.dialogosJoseLuis[this.dialogoActual];
    this.textoVisible = "";
    this.indiceLetra = 0;

    this.timerTexto = this.time.addEvent({
      delay: 35,
      callback: () => {
        if (this.indiceLetra < this.dialogoActualTexto.length) {
          const letra = this.dialogoActualTexto.charAt(this.indiceLetra);
          this.textoVisible += letra;
          this.textoDialogo.setText(this.textoVisible + this.cursorTexto);
          this.indiceLetra++;
        } else {
          this.timerTexto.remove();
          this.textoDialogo.setText(this.textoVisible);
          this.time.delayedCall(600, () => this.mostrarOpciones());
        }
      },
      loop: true
    });
  }

  mostrarOpciones() {
    this.botonFalacia = this.add.text(220, 560, "💔 Esto es una falacia", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#990000",
      padding: { x: 12, y: 6 }
    }).setInteractive().setDepth(20);

    this.botonNoFalacia = this.add.text(450, 560, "✅ No es una falacia", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#006600",
      padding: { x: 12, y: 6 }
    }).setInteractive().setDepth(20);

    this.botonFalacia.on("pointerdown", () => this.elegirTipoFalacia());
    this.botonNoFalacia.on("pointerdown", () => this.mostrarFeedback(false));
  }

  elegirTipoFalacia() {
    this.botonFalacia.destroy();
    this.botonNoFalacia.destroy();

    const opciones = ["Ad hominem", "Apelación a la emoción", "Falsa disyuntiva"];
    this.botonesFalacia = [];

    opciones.forEach((tipo, i) => {
      const btn = this.add.text(180 + i * 200, 560, tipo, {
        font: "16px Courier",
        fill: "#fff",
        backgroundColor: "#333333",
        padding: { x: 8, y: 6 }
      }).setInteractive().setDepth(20);

      btn.on("pointerdown", () => {
        const esCorrecta = tipo === "Apelación a la emoción";
        this.botonesFalacia.forEach(b => b.destroy());
        this.mostrarFeedback(esCorrecta);
      });

      this.botonesFalacia.push(btn);
    });
  }

  mostrarFeedback(esCorrecta) {
    const mensaje = esCorrecta
      ? "🎉 Buen ojo, detective. Las emociones no limpian huellas."
      : "💢 ¡Ups! Eso fue una falacia tan grande como su ego.";

    this.feedback = this.add.text(400, 440, mensaje, {
      font: "16px Courier",
      fill: "#ffff00",
      backgroundColor: "#000000",
      padding: { x: 12, y: 6 },
      align: "center",
      wordWrap: { width: 700 }
    }).setOrigin(0.5).setDepth(25);

    const entrada = esCorrecta
      ? "🔍 José Luis usó una apelación a la emoción. Está dolido, pero no es culpable."
      : "🤔 El detective dejó pasar una apelación emocional sin notarla.";

    this.lineasLibreta.push(entrada);
    if (this.libretaAbierta) this.animarLineaEnLibreta();

    this.time.delayedCall(3500, () => {
  if (this.dialogoActual === 0) {
    this.dialogoActual = 1;
    this.textoDialogo.setText("");
    this.feedback.destroy();
    this.iniciarDialogoLetraPorLetra();
  } else {
    this.feedback.destroy();
    this.time.delayedCall(500, () => {
      SoundManager.stopAll();
      this.scene.start('EscenaInterrogatorio2');
    });
  }
});

  }

  animarLineaEnLibreta() {
    if (this.lineasLibreta.length === 0) return;

    const siguienteLinea = this.lineasLibreta.shift();
    let i = 0;
    let lineaActual = "";

    this.time.addEvent({
      delay: 30,
      callback: () => {
        if (i < siguienteLinea.length) {
          lineaActual += siguienteLinea.charAt(i);
          this.textoAnotaciones.setText(this.textoAnotaciones.text + siguienteLinea.charAt(i));
          i++;
        } else {
          this.textoAnotaciones.setText(this.textoAnotaciones.text + "\n");
          if (this.lineasLibreta.length > 0) {
            this.time.delayedCall(400, () => this.animarLineaEnLibreta());
          }
        }
      },
      loop: true
    });
  }
}

class EscenaInterrogatorio2 extends Phaser.Scene {
  constructor() {
    super('EscenaInterrogatorio2');

    this.dialogosAxel = [
      "¿Yo? Si hubiera querido robar algo, lo habría hecho antes. Pero no lo hice, así que no hay nada que decir.",
      "¿Y quién va a robarse un cochinito con luces frente a todo el mundo? Solo un loco. Y yo no soy loco, ¿ok?"
    ];

    this.dialogoActual = 0;
    this.textoVisible = "";
    this.indiceLetra = 0;
    this.libretaAbierta = false;
    this.lineasLibreta = [];
    this.cursorTexto = "|";
    this.botonesFalacia = [];
  }

  preload() {
    this.load.image('sospechosoAxel', 'assets/img/sospechosoAxel.png');
    this.load.audio('foco', 'assets/audio/foco.mp3');
    this.load.audio('ambiente_tenso', 'assets/audio/ambiente_tenso.mp3');
  }

  create() {
  SoundManager.init(this);
  SoundManager.stopAll(); // Detener todo lo anterior

  this.cameras.main.setBackgroundColor('#000000');

  this.ambiente = SoundManager.loop('ambiente_tenso', 0.3); // Audio ambiente

  this.foco = this.add.rectangle(400, 300, 800, 600, 0xffffff).setAlpha(0).setDepth(5);
  SoundManager.play('foco'); // Sonido del foco

  this.tweens.add({
    targets: this.foco,
    alpha: { from: 0, to: 1 },
    duration: 100,
    yoyo: true,
    repeat: 2,
    onComplete: () => {
      this.iniciarPresentacion();
    }
  });
}


  iniciarPresentacion() {
    this.axel = this.add.image(400, 300, 'sospechosoAxel')
      .setScale(0.7)
      .setAlpha(0)
      .setDepth(10);

    this.nombre = this.add.text(400, 40, "👤 Axel — Técnico de sonido", {
      font: "20px Courier",
      fill: "#ffffcc",
      backgroundColor: "#000000aa",
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setDepth(11);

    this.panelTexto = this.add.rectangle(400, 500, 740, 100, 0x000000, 0.6)
      .setDepth(12).setOrigin(0.5);

    this.textoDialogo = this.add.text(70, 460, "", {
      font: "18px Courier",
      fill: "#ffffff",
      wordWrap: { width: 660 }
    }).setDepth(13);

    this.crearLibreta();

    this.tweens.add({
      targets: this.axel,
      alpha: 1,
      duration: 800,
      onComplete: () => {
        this.cameras.main.zoomTo(1.4, 2000, 'Sine.easeInOut', false, (_cam, progress) => {
          if (progress === 1) {
            this.time.delayedCall(800, () => {
              this.cameras.main.zoomTo(1, 2000, 'Sine.easeInOut', false, (_cam2, progress2) => {
                if (progress2 === 1) {
                  this.iniciarDialogoLetraPorLetra();
                }
              });
            });
          }
        });
      }
    });
  }
  crearLibreta() {
    this.botonAnotaciones = this.add.text(690, 20, "📝 Anotaciones", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#222222",
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(30).setInteractive();

    this.panelAnotaciones = this.add.rectangle(650, 150, 260, 220, 0xffffff, 0.95)
      .setScrollFactor(0).setDepth(29).setVisible(false);

    this.textoAnotaciones = this.add.text(530, 60, "", {
      font: "14px Courier",
      fill: "#000000",
      wordWrap: { width: 220 }
    }).setScrollFactor(0).setDepth(30).setVisible(false);

    this.botonAnotaciones.on("pointerdown", () => {
      this.libretaAbierta = !this.libretaAbierta;
      this.panelAnotaciones.setVisible(this.libretaAbierta);
      this.textoAnotaciones.setVisible(this.libretaAbierta);
    });
  }

  iniciarDialogoLetraPorLetra() {
    this.dialogoActualTexto = this.dialogosAxel[this.dialogoActual];
    this.textoVisible = "";
    this.indiceLetra = 0;

    this.timerTexto = this.time.addEvent({
      delay: 35,
      callback: () => {
        if (this.indiceLetra < this.dialogoActualTexto.length) {
          const letra = this.dialogoActualTexto.charAt(this.indiceLetra);
          this.textoVisible += letra;
          this.textoDialogo.setText(this.textoVisible + this.cursorTexto);
          this.indiceLetra++;
        } else {
          this.timerTexto.remove();
          this.textoDialogo.setText(this.textoVisible);
          this.time.delayedCall(600, () => this.mostrarOpciones());
        }
      },
      loop: true
    });
  }

  mostrarOpciones() {
    this.botonFalacia = this.add.text(220, 560, "💔 Esto es una falacia", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#990000",
      padding: { x: 12, y: 6 }
    }).setInteractive().setDepth(20);

    this.botonNoFalacia = this.add.text(450, 560, "✅ No es una falacia", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#006600",
      padding: { x: 12, y: 6 }
    }).setInteractive().setDepth(20);

    this.botonFalacia.on("pointerdown", () => this.elegirTipoFalacia());
    this.botonNoFalacia.on("pointerdown", () => this.mostrarFeedback(false));
  }
  elegirTipoFalacia() {
    this.botonFalacia.destroy();
    this.botonNoFalacia.destroy();

    const opciones = ["Ad hominem", "Apelación a la emoción", "Falsa disyuntiva"];
    this.botonesFalacia = [];

    opciones.forEach((tipo, i) => {
  const btn = this.add.text(120 + i * 240, 560, tipo, {
    font: "16px Courier",
    fill: "#fff",
    backgroundColor: "#333333",
    padding: { x: 8, y: 6 }
  }).setInteractive().setDepth(20);

  btn.on("pointerdown", () => {
    const seleccion = btn.text.trim();
    const esCorrecta = seleccion === "Falsa disyuntiva";
    this.mostrarFeedback(esCorrecta);
    this.botonesFalacia.forEach(b => b.destroy());
  });

  this.botonesFalacia.push(btn);
});

  }

  mostrarFeedback(esCorrecta) {
    const mensaje = esCorrecta
      ? "Buen trabajo, bro... digo, detective. Me salió del corazón, perdón."
      : "¿Le creíste eso? Te voy a recomendar un libro de Sampieri para que despabiles.";

    this.feedback = this.add.text(400, 440, mensaje, {
      font: "16px Courier",
      fill: "#ffff00",
      backgroundColor: "#000000",
      padding: { x: 12, y: 6 },
      align: "center",
      wordWrap: { width: 700 }
    }).setOrigin(0.5).setDepth(25);

    const entrada = esCorrecta
      ? "🕵️ Axel intentó despistar con una falsa disyuntiva. Pero no cuela."
      : "🧐 El detective ignoró una falsa disyuntiva lanzada con sarcasmo.";

    this.lineasLibreta.push(entrada);
    if (this.libretaAbierta) this.animarLineaEnLibreta();

    this.time.delayedCall(3500, () => {
      if (this.dialogoActual === 0) {
        this.dialogoActual = 1;
        this.textoDialogo.setText("");
        this.feedback.destroy();
        this.iniciarDialogoLetraPorLetra();
      } else {
        this.feedback.destroy();
        if (this.libretaAbierta && this.lineasLibreta.length > 0) {
          this.animarLineaEnLibreta();
        }
        this.time.delayedCall(500, () => {
          SoundManager.stopAll();
          this.scene.start('EscenaInterrogatorio3');
        });
      }
    });
  }
  animarLineaEnLibreta() {
    if (this.lineasLibreta.length === 0) return;

    const siguienteLinea = this.lineasLibreta.shift();
    let i = 0;
    let lineaActual = "";

    this.time.addEvent({
      delay: 30,
      callback: () => {
        if (i < siguienteLinea.length) {
          lineaActual += siguienteLinea.charAt(i);
          this.textoAnotaciones.setText(this.textoAnotaciones.text + siguienteLinea.charAt(i));
          i++;
        } else {
          this.textoAnotaciones.setText(this.textoAnotaciones.text + "\n");
          if (this.lineasLibreta.length > 0) {
            this.time.delayedCall(400, () => this.animarLineaEnLibreta());
          }
        }
      },
      loop: true
    });
  }
}
//Interrogatorio 3
class EscenaInterrogatorio3 extends Phaser.Scene {
  constructor() {
    super('EscenaInterrogatorio3');

    this.dialogosEmerson = [
      "¿Yo? Soy el productor del programa. ¿De verdad pensás que arriesgaría mi reputación por una alcancía?",
      "No tengo tiempo para estas tonterías. Tengo un equipo a cargo, miles de dólares en juego y una reputación impecable."
    ];

    this.dialogoActual = 0;
    this.textoVisible = "";
    this.indiceLetra = 0;
    this.libretaAbierta = false;
    this.lineasLibreta = [];
    this.libretaPendiente = false;
    this.cursorTexto = "|";
    this.botonesFalacia = [];
    this.intentoExtraUsado = false;
    this.animando = false;
  }

  preload() {
    this.load.image('sospechosoEmerson', 'assets/img/sospechosoEmerson.png');
    this.load.audio('foco', 'assets/audio/foco.mp3');
    this.load.audio('ambiente_tenso', 'assets/audio/ambiente_tenso.mp3');
  }

  create() {
    // Inicializamos el gestor de sonido para esta escena
  SoundManager.init(this);
  SoundManager.stopAll(); // Detenemos todos los sonidos anteriores

  this.cameras.main.setBackgroundColor('#000000');

  // Reproducir ambiente tenso en loop
  this.ambiente = SoundManager.loop('ambiente_tenso', 0.3);

  // Efecto de foco con parpadeo
  this.foco = this.add.rectangle(400, 300, 800, 600, 0xffffff).setAlpha(0).setDepth(5);
  SoundManager.play('foco');

  this.tweens.add({
    targets: this.foco,
    alpha: { from: 0, to: 1 },
    duration: 100,
    yoyo: true,
    repeat: 2,
    onComplete: () => {
      this.iniciarPresentacion();
    }
  });
}

  iniciarPresentacion() {
    this.emerson = this.add.image(400, 300, 'sospechosoEmerson')
      .setScale(0.7)
      .setAlpha(0)
      .setDepth(10);

    this.nombre = this.add.text(400, 40, "🧍 Emerson — Productor del programa", {
      font: "20px Courier",
      fill: "#ffffcc",
      backgroundColor: "#000000aa",
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setDepth(11);

    this.panelTexto = this.add.rectangle(400, 500, 740, 100, 0x000000, 0.6)
      .setDepth(12).setOrigin(0.5);

    this.textoDialogo = this.add.text(70, 460, "", {
      font: "18px Courier",
      fill: "#ffffff",
      wordWrap: { width: 660 }
    }).setDepth(13);

    this.crearLibreta();

    this.tweens.add({
      targets: this.emerson,
      alpha: 1,
      duration: 800,
      onComplete: () => {
        this.cameras.main.zoomTo(1.4, 2000, 'Sine.easeInOut', false, (_cam, progress) => {
          if (progress === 1) {
            this.time.delayedCall(800, () => {
              this.cameras.main.zoomTo(1, 2000, 'Sine.easeInOut');
              this.iniciarDialogoLetraPorLetra();
            });
          }
        });
      }
    });
  }

  crearLibreta() {
    this.botonAnotaciones = this.add.text(690, 20, "📝 Anotaciones", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#222222",
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(30).setInteractive();

    this.panelAnotaciones = this.add.rectangle(650, 150, 260, 220, 0xffffff, 0.95)
      .setScrollFactor(0).setDepth(29).setVisible(false);

    this.textoAnotaciones = this.add.text(530, 60, "", {
      font: "14px Courier",
      fill: "#000000",
      wordWrap: { width: 220 },
      maxLines: 12
    }).setScrollFactor(0).setDepth(30).setVisible(false);

    this.botonAnotaciones.on("pointerdown", () => {
      this.libretaAbierta = !this.libretaAbierta;
      this.panelAnotaciones.setVisible(this.libretaAbierta);
      this.textoAnotaciones.setVisible(this.libretaAbierta);

      if (this.libretaAbierta && this.lineasLibreta.length > 0 && !this.animando) {
        this.animarLineaEnLibreta();
      }
    });
  }

  animarLineaEnLibreta() {
    if (this.lineasLibreta.length === 0 || !this.libretaAbierta) return;

    const siguienteLinea = this.lineasLibreta.shift();
    let i = 0;
    this.animando = true;

    this.time.addEvent({
      delay: 30,
      callback: () => {
        if (i < siguienteLinea.length) {
          this.textoAnotaciones.setText(this.textoAnotaciones.text + siguienteLinea.charAt(i));
          i++;
        } else {
          this.textoAnotaciones.setText(this.textoAnotaciones.text + "\n");
          this.animando = false;
          if (this.lineasLibreta.length > 0) {
            this.time.delayedCall(400, () => this.animarLineaEnLibreta());
          }
        }
      },
      loop: true
    });
  }

  iniciarDialogoLetraPorLetra() {
    this.textoVisible = "";
    this.indiceLetra = 0;
    const texto = this.dialogosEmerson[this.dialogoActual];

    this.timerTexto = this.time.addEvent({
      delay: 35,
      callback: () => {
        if (this.indiceLetra < texto.length) {
          const letra = texto.charAt(this.indiceLetra);
          this.textoVisible += letra;
          this.textoDialogo.setText(this.textoVisible + this.cursorTexto);
          this.indiceLetra++;
        } else {
          this.timerTexto.remove();
          this.textoDialogo.setText(this.textoVisible);
          this.time.delayedCall(400, () => this.mostrarBotonesFalacia());
        }
      },
      loop: true
    });
  }

  mostrarBotonesFalacia() {
    this.botonFalacia = this.add.text(200, 550, "📛 Esto es una falacia", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#660000",
      padding: { x: 10, y: 5 }
    }).setInteractive().setDepth(20);

    this.botonNoFalacia = this.add.text(460, 550, "✅ No es una falacia", {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#006600",
      padding: { x: 10, y: 5 }
    }).setInteractive().setDepth(20);

    this.botonFalacia.on("pointerdown", () => this.elegirTipoFalacia());
    this.botonNoFalacia.on("pointerdown", () => this.mostrarFeedback(false));
  }

  elegirTipoFalacia() {
    this.botonFalacia.destroy();
    this.botonNoFalacia.destroy();

    const opciones = ["Ad verecundiam", "Apelación a la emoción", "Falsa disyuntiva"];
    this.botonesFalacia = [];

    opciones.forEach((tipo, i) => {
      const btn = this.add.text(150 + i * 200, 560, tipo, {
        font: "16px Courier",
        fill: "#fff",
        backgroundColor: "#333333",
        padding: { x: 8, y: 6 }
      }).setInteractive().setDepth(20);

      btn.on("pointerdown", () => {
        const seleccion = btn.text.trim();
        const falaciaCorrecta = "Ad verecundiam";
        const esCorrecta = seleccion === falaciaCorrecta;

        this.botonesFalacia.forEach(b => b.destroy());
        this.mostrarFeedback(esCorrecta);
      });

      this.botonesFalacia.push(btn);
    });
  }

  mostrarFeedback(esCorrecta) {
    if (this.feedback) this.feedback.destroy();

    const mensajes = esCorrecta
      ? "BIEN, BIEN, BIEN... YA CASI."
      : "vas con nada bro, haber estudiado...";

    this.feedback = this.add.text(400, 440, mensajes, {
      font: "16px Courier",
      fill: "#ffff00",
      backgroundColor: "#000000",
      padding: { x: 12, y: 6 },
      align: "center",
      wordWrap: { width: 700 }
    }).setOrigin(0.5).setDepth(25);

    const entrada = esCorrecta
      ? `🔍 Detectaste una falacia en el diálogo ${this.dialogoActual + 1}.`
      : `🧐 No detectaste la falacia en el diálogo ${this.dialogoActual + 1}.`;

    this.lineasLibreta.push(entrada);
    if (this.libretaAbierta && !this.animando) {
      this.animarLineaEnLibreta();
    }

    this.time.delayedCall(3500, () => {
      this.feedback.destroy();

      if (this.dialogoActual === 0) {
        this.dialogoActual = 1;
        this.textoDialogo.setText("");
        this.iniciarDialogoLetraPorLetra();
      } else {
        this.iniciarFaseFinal();
      }
    });
  }

  iniciarFaseFinal() {
    this.textoDialogo.setText("Ya casi lo tenemos, detective...\nTal vez tengamos que jugar un poco sucio también.");
    this.time.delayedCall(5000, () => {
      this.mostrarOpcionesFinales();
    });
  }

  mostrarOpcionesFinales() {
  this.textoDialogo.setText("");

  const opciones = [
    {
      texto: "Si fueras inocente, no estarías tan a la defensiva.",
      esCorrecta: true,
      falacia: "Falsa causa"
    },
    {
      texto: "Un productor real no se dejaría interrogar por un estudiante.",
      esCorrecta: false
    },
    {
      texto: "No tenemos pruebas, pero tus ojos dicen todo.",
      esCorrecta: false
    }
  ];

  this.opcionesFinales = [];

  opciones.forEach((op, i) => {
    const btn = this.add.text(60, 420 + i * 50, op.texto, {
      font: "16px Courier",
      fill: "#ffffff",
      backgroundColor: "#222222",
      padding: { x: 8, y: 6 },
      wordWrap: { width: 700 }
    }).setInteractive().setDepth(25);

    btn.on("pointerdown", () => {
      this.opcionesFinales.forEach(b => b.destroy());

      if (op.esCorrecta) {
        this.lineasLibreta.push("🎯 Usaste una falsa causa para provocar la confesión.");
        if (this.libretaAbierta && !this.animando) {
          this.animarLineaEnLibreta();
        }
        this.confesionFinal();
      } else {
        if (!this.intentoExtraUsado) {
          this.intentoExtraUsado = true;
          this.lineasLibreta.push("❌ Fallaste el primer intento de presión.");
          this.textoDialogo.setText("¿En serio? Eso ni siquiera es lógico... Sos peor que el programador de este juego.");
          this.time.delayedCall(3000, () => this.mostrarOpcionesFinales());
        } else {
          this.textoDialogo.setText("Ya no estoy para juegos. Terminemos con esto.");

          this.time.delayedCall(2500, () => {
            // 🔇 Detener todos los sonidos aquí también
            SoundManager.stopAll();
            this.input.enabled = false;
            this.scene.start('EscenaFinal');
          });
        }
      }
    });

    this.opcionesFinales.push(btn);
  });
}


  confesionFinal() {
  this.textoDialogo.setText("");

  const lineas = [
    "¿¡Con que así te gusta jugar eh!? Me lanzás una falacia en la cara…",
    "Y encima te funciona, rata sucia...",
    "(pausa dramática)",
    "Tu ganas... FUI YO."
  ];

  let index = 0;

  const mostrarLinea = () => {
    if (index < lineas.length) {
      this.textoDialogo.setText(lineas[index]);
      const delay = index >= 2 ? 4000 : 2500;
      index++;
      this.time.delayedCall(delay, mostrarLinea);
    } else {
      this.lineasLibreta.push("✅ Emerson confesó. Caso cerrado.");

      if (this.libretaAbierta && !this.animando) {
        this.animarLineaEnLibreta();
      }

      // 🔇 Fade-out del ambiente
      this.tweens.add({
        targets: this.ambiente,
        volume: 0,
        duration: 1500,
        onComplete: () => {
          SoundManager.stopAll(); // Esto garantiza que TODO sonido se detiene
          this.input.enabled = false;
          this.scene.start('EscenaFinal');
        }
      });
    }
  };

  mostrarLinea();
}
}

//-------------------------------
//Escena final
//-------------------------------
class EscenaFinal extends Phaser.Scene {
  constructor() {
    super({ key: 'EscenaFinal' });
  }

  preload() {
    this.load.image('fondoExpediente', 'assets/img/fondoExpediente.png');
    this.load.image('sospechosoEmerson', 'assets/img/sospechosoEmerson.png');
    this.load.image('selloCulpable', 'assets/img/selloCulpable.png');
    this.load.image('imagenGrupo', 'assets/img/imagenGrupo.png');
    this.load.audio('musicaFinal', 'assets/audio/musicaf.mp3');
  }

  create() {
    SoundManager.init(this);
    detenerTodosLosSonidos();
    this.cameras.main.setBackgroundColor('#000000');

    this.add.image(400, 300, 'fondoExpediente')
      .setDepth(0)
      .setDisplaySize(800, 600);

    SoundManager.play('musicaFinal', { volume: 0.3 });


    // Emerson en la esquina superior derecha
    const emerson = this.add.image(700, 130, 'sospechosoEmerson')
      .setScale(0.25)
      .setAlpha(0)
      .setDepth(1);

    this.tweens.add({
      targets: emerson,
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    });

    // Sello "CULPABLE" sobre Emerson
    this.time.delayedCall(1500, () => {
      const sello = this.add.image(700, 130, 'selloCulpable')
        .setScale(0.4)
        .setAlpha(0)
        .setDepth(2);

      this.tweens.add({
        targets: sello,
        alpha: 1,
        duration: 600,
        ease: 'Bounce.easeOut'
      });

      this.time.delayedCall(1500, () => {
        this.mostrarTextoFinal();
      });
    });
  }

  mostrarTextoFinal() {
    const lineas = [
      "📂 Caso cerrado.",
      "",
      "Las falacias no engañan a quien piensa con lógica...",
      "y a veces, con un poco de cinismo también.",
      "",
      "🕵️‍♂️ Detectives a cargo del caso:",
      "• Jose Barrios",
      "• Josué Muy",
      "• Abner Muñoz",
      "• Eduardo Hernández",
      "",
      "Entrega especial para nuestro Ing. Florian,",
      "nuestro Ingeniero de lógica...",
      "y posible final boss si no ganamos este curso."
    ];

    const estiloTexto = {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#000000', // Letra negra
      align: 'left',
      wordWrap: { width: 400 }
    };

    let textoActual = "";
    let indexLinea = 0;
    let indexCaracter = 0;

    const texto = this.add.text(80, 80, "", estiloTexto).setDepth(3); // Alineado a la hoja izquierda

    const escribir = () => {
      if (indexLinea < lineas.length) {
        if (indexCaracter < lineas[indexLinea].length) {
          textoActual += lineas[indexLinea].charAt(indexCaracter);
          texto.setText(textoActual);
          indexCaracter++;
          this.time.delayedCall(40, escribir);
        } else {
          textoActual += "\n";
          indexLinea++;
          indexCaracter = 0;
          this.time.delayedCall(300, escribir);
        }
      } else {
  // Espera 3 segundos antes de mostrar la imagen del grupo
  this.time.delayedCall(3000, () => {
    this.mostrarImagenGrupo();
  });
}

    };

    escribir();
  }

  mostrarImagenGrupo() {
    const grupo = this.add.image(400, 330, 'imagenGrupo')
      .setAlpha(0)
      .setScale(0.85)
      .setDepth(4);

    this.tweens.add({
      targets: grupo,
      alpha: 1,
      duration: 1500,
      ease: 'Power2',
      onComplete: () => {
        this.mostrarBoton();
      }
    });
  }

  mostrarBoton() {
    const boton = this.add.text(400, 560, 'Volver al menú', {
      fontSize: '22px',
      fontFamily: 'Courier',
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: { x: 20, y: 10 },
      borderRadius: 5
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setDepth(5);

    boton.on('pointerdown', () => {
  SoundManager.stopAll();
  this.scene.start('EscenaInicio');
});

    boton.on('pointerover', () => {
      boton.setStyle({ backgroundColor: '#dddddd' });
    });

    boton.on('pointerout', () => {
      boton.setStyle({ backgroundColor: '#ffffff' });
    });
  }
}



// ================================
// 🎮 CONFIGURACIÓN DEL JUEGO Y ARRANQUE
// ================================
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#0f0c29',
  scene: [
    BootScene,        // Precarga todos los assets
    EscenaInicio,     // Pantalla inicial con presentador
    EscenaTrivia,     // Preguntas y respuestas
    EscenaPremio,     // Presentador muestra el cerdito
    TransicionRobo,   // Apagón, interferencia, transición
    EscenaRobo,        // Robo del premio 
    EscenaDetective,
    EscenaInterrogatorio1, // sospechosos
    EscenaInterrogatorio2,
    EscenaInterrogatorio3,
    EscenaFinal
    
  ]
};


// 🟢 Lanzar el juego
const game = new Phaser.Game(config);

























