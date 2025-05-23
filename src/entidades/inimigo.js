import { k } from "../main";
import { VELOCIDADE_INIMIGO } from "../utils/constantes";

export function criarInimigo(pos) {
  const inimigo = k.add([
    k.sprite("inimigo", {
      width: 40,
      anim: "run",
    }),
    k.anchor("center"),
    k.pos(pos),
    k.timer(),
    k.area(),
    "inimigo",
  ]);
  return inimigo;
}
