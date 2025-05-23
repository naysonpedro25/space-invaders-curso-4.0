import { k } from "../main";
import { DirecaoTiro, VELOCIDADE_INIMIGO } from "../utils/constantes";
import { criarInimigo } from "./inimigo";
import { criarProjetil } from "./projetil";

export function criarGrade() {
  const linhas = Math.round(k.rand(8) + 1);
  const colunas = Math.round(k.rand(8) + 1);

  for (let linha = 0; linha < linhas; linha++) {
    for (let coluna = 0; coluna < colunas; coluna++) {
      const x = 30 + coluna * 50;
      const y = 100 + linha * 50;
      criarInimigo(k.vec2(x, y));
    }
  }
}
export function destruirInimigos() {
  k.get("inimigo").forEach((inimigo) => {
    if (inimigo.exists()) {
      inimigo.destroy();
    }
  });
}
export function configuracaoInimigos(difculdade) {
  let moverParaDireita = true;

  k.onUpdate(() => {
    const inimigos = k.get("inimigo");
    if (inimigos.length === 0) {
      destruirInimigos();
      return;
    }

    let xInimigoMaisADireita = 0;
    let xInimigoMaisADEsquerda = k.width();

    const larguraInimigo = inimigos[0].width;

    inimigos.forEach((inimigo) => {
      if (inimigo.exists()) {
        xInimigoMaisADEsquerda = Math.min(
          inimigo.pos.x,
          xInimigoMaisADEsquerda
        );
        xInimigoMaisADireita = Math.max(inimigo.pos.x, xInimigoMaisADireita);
      }
    });

    if (xInimigoMaisADEsquerda < larguraInimigo / 2) {
      moverParaDireita = true;
    }
    if (xInimigoMaisADireita > k.width() - larguraInimigo / 2) {
      moverParaDireita = false;
    }

    inimigos.forEach((inimigo) => {
      if (inimigo.exists()) {
        if (moverParaDireita) {
          inimigo.move(k.vec2(VELOCIDADE_INIMIGO, 0));
        } else {
          inimigo.move(k.vec2(-VELOCIDADE_INIMIGO, 0));
        }
      }
    });
  });

  // let podeAtirar = true;
  async function atirarInimigoAleatorio() {
    // if (!podeAtirar) return;
    const jogadorExiste = k.get("jogador").length > 0;
    if (!jogadorExiste) return;

    const inimigos = k.get("inimigo").filter((i) => i.exists());
    if (inimigos.length === 0) return;

    const indexInimigoAleatorio = Math.floor(k.rand(0, inimigos.length));
    const inimigoAleatorio = inimigos[indexInimigoAleatorio];
    if (!inimigoAleatorio) return;

    // podeAtirar = false;
    const projetil = criarProjetil(
      k.vec2(
        inimigoAleatorio.pos.x,
        inimigoAleatorio.pos.y + inimigoAleatorio.height / 2
      ),
      DirecaoTiro.BAIXO
    );

    projetil.tag("projetil-inimigo");

    // podeAtirar = true;
  }

  k.loop(difculdade, () => {
    atirarInimigoAleatorio();
  });

  //   function getInimigos() {
  //     return k.get("inimigo");
  //   }
}
