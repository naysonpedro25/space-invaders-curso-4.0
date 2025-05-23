import kaplay from "kaplay";
import { carregarSons } from "./utils/funcoes/carregarSons";
import { carregarSprites } from "./utils/funcoes/carregarSprites";
import { criarJogador } from "./entidades/jogador";
import {
  configuracaoInimigos,
  criarGrade,
  destruirInimigos,
} from "./entidades/grade";
import { Dificuldade } from "./utils/constantes";
import { criarExplosaoParticulas } from "./entidades/particula";

const botoesPlay = document.querySelectorAll(".botao-play");
const botaoResetar = document.querySelector(".botao-resetar");
const telaInicio = document.querySelector(".tela-inicio");
const canvas = document.querySelector("canvas");

const dificuldadeTexto = document.querySelector(".dificuldade");
const nivelTexto = document.querySelector(".nivel");
let nivel = 1;

const pontosTexto = document.querySelector(".pontos");
const maiorPontuacaoTexto = document.querySelector(".maiorPontuacao");
let pontos = 0;
let maiorPontuacao = Number(localStorage.getItem("maiorPontuacao")) || 0;
maiorPontuacaoTexto.innerText = maiorPontuacao;

const fimJogoTela = document.querySelector(".fim-jogo");
fimJogoTela.remove();

botaoResetar.addEventListener("click", () => {
  resetarJogo();
});

export let k;
let difculdade = Dificuldade.MEDIO;
function configuracaoBotoesInicio() {
  botoesPlay.forEach((botao) => {
    dificuldadeTexto.innerText = "Médio";
    botao.addEventListener("click", () => {
      if (botao.classList.contains("facil")) {
        difculdade = Dificuldade.FACIL;
        dificuldadeTexto.innerText = "Fácil";
      }
      if (botao.classList.contains("dificil")) {
        difculdade = Dificuldade.DIFICIL;
        dificuldadeTexto.innerText = "Difícil";
      }
      k = kaplay({
        background: "#121212",
        canvas: document.querySelector("canvas"),
      });

      k.loadRoot("./");
      k.loadSound("projetil", "/sounds/shoot.mp3");
      k.loadSound("acerto", "/sounds/hit.mp3");
      k.loadSound("explosao", "/sounds/explosion.mp3");
      k.loadSound("proximo-nivel", "/sounds/next_level.mp3");
      k.loadSprite("nave", "/sprites/spaceship.png");
      k.loadSprite("motor", "/sprites/engine.png");
      k.loadSprite("inimigo", "/sprites/invader-sprites.png", {
        sliceX: 2,
        anims: {
          run: {
            from: 0,
            to: 1,
            loop: true,
            speed: 5,
          },
        },
      });
      k.loadSprite("motor-ligado", "/sprites/engine-effects.png", {
        sliceX: 4,
        anims: {
          run: {
            from: 0,
            to: 3,
            loop: true,
            speed: 12,
          },
        },
      });
      canvas.focus();
      comecarJogo();
    });
  });
}
configuracaoBotoesInicio();

function comecarJogo() {
  telaInicio.remove();

  const { configuracaoJogador, jogador } = criarJogador();
  configuracaoJogador();
  criarGrade();
  configuracaoInimigos(difculdade);
  k.onUpdate(() => {
    if (k.get("inimigo").length === 0) {
      nivel++;
      k.play("proximo-nivel", {
        volume: 0.1,
      });
      nivelTexto.innerText = nivel;
      criarGrade();
    }
  });
  configurColisoes();
}

function resetarJogo() {
  fimJogoTela.remove();
  canvas.focus();
  pontos = 0;
  nivel = 1;
  pontosTexto.innerText = pontos;
  nivelTexto.innerText = nivel;
  destruirInimigos();
  const { configuracaoJogador } = criarJogador();
  configuracaoJogador();
  criarGrade();
}

export function configurColisoes() {
  k.onCollide("inimigo", "projetil", (inimigo, projetil) => {
    if (projetil.is("projetil-jogador") && k.get("jogador").length !== 0) {
      k.play("acerto", {
        volume: 0.1,
      });

      criarExplosaoParticulas(inimigo, "#9927ff");
      inimigo.destroy();
      projetil.destroy();
      pontos += 10;
      pontosTexto.innerText = pontos;
     if (pontos > maiorPontuacao) {
        maiorPontuacao = pontos;
        localStorage.setItem("maiorPontuacao", maiorPontuacao);
        maiorPontuacaoTexto.innerText = maiorPontuacao;
      }
    }
  });

  k.onCollide("jogador", "projetil", (jogador, projetil) => {
    if (projetil.is("projetil-inimigo") && k.get("jogador").length !== 0) {
      k.play("explosao", {
        volume: 0.1,
      });
      criarExplosaoParticulas(jogador, "#FFFFFF");
      jogador.destroy();
      projetil.destroy();
      document.body.append(fimJogoTela);
    }
  });
}
