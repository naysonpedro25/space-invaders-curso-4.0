import { k } from "../main";
import {
  DirecaoTiro,
  INCLINACAO_JOGADOR,
  VELOCIDADE_JOGADOR,
} from "../utils/constantes";
import { criarProjetil } from "./projetil";

export function criarJogador() {
  const jogador = k.add([
    k.sprite("nave", { width: 90 }),
    k.rotate(),
    k.pos(k.center().x, k.center().y + 370),
    k.anchor("center"),
    k.timer(),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 50, 55),
    }),
    "jogador",
  ]);

  const motor = jogador.add([
    k.sprite("motor", { width: 80 }),
    k.pos(0, 10),
    k.anchor("center"),
  ]);

  motor.add([
    k.sprite("motor-ligado", {
      width: 80,
      anim: "run",
    }),
    k.anchor("center"),
    k.pos(0, 5),
  ]);
  function configuracaoJogador() {
    jogador.onKeyDown((tecla) => {
      if (tecla === "left") {
        jogador.angle = k.lerp(jogador.angle, -INCLINACAO_JOGADOR, 0.1);
        if (jogador.pos.x > jogador.width / 2) {
          jogador.move(k.vec2(-VELOCIDADE_JOGADOR, 0));
        }
      }

      if (tecla === "right") {
        jogador.angle = k.lerp(jogador.angle, INCLINACAO_JOGADOR, 0.1);
        if (jogador.pos.x < k.width() - jogador.width / 2) {
          jogador.move(k.vec2(VELOCIDADE_JOGADOR, 0));
        }
      }
    });

    jogador.onKeyPress((tecla) => {
      if (tecla === "up") {
        k.play("projetil", {
          volume: 0.3,
        });

        const projetil = criarProjetil(
          k.vec2(jogador.pos.x, jogador.pos.y - jogador.height / 2 + 5),
          DirecaoTiro.CIMA
        );
        projetil.tag("projetil-jogador");
      }
    });
    jogador.onUpdate(() => {
      jogador.angle = k.lerp(jogador.angle, 0, 0.09);
    });
  }

  return {
    jogador,
    configuracaoJogador,
  };
}
