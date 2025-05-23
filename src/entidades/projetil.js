import { k } from "../main";
import { VELOCIDADE_PROJETIL } from "../utils/constantes";

export function criarProjetil(pos, direcao) {
  const projetil = k.add([
    k.rect(2, 25),
    k.color("#FFFFFF"),
    k.anchor("center"),
    k.pos(pos),
    k.area(),
    k.timer(),
    "projetil",
  ]);


  projetil.onUpdate(() => {
    projetil.move(k.vec2(0, direcao * VELOCIDADE_PROJETIL));
    if (projetil.pos.x < 0 || projetil.pos.y > k.height()) {
      projetil.destroy();
    }
  });

  return projetil;
}
