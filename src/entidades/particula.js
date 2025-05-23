import { k } from "../main";
import { QUANTIDADE_PARTICULAS } from "../utils/constantes";
function criarParticula(pos, color) {
  return k.add([
    k.circle(3),
    k.pos(pos),
    k.move(k.vec2(Math.random() - 0.5, Math.random() - 0.5), 100),
    k.opacity(1),
    k.animate(),
    k.color(color),
    "particula",
  ]);
}

export function criarExplosaoParticulas(objeto, color) {
  for (let index = 0; index < QUANTIDADE_PARTICULAS; index++) {
    const particle = criarParticula(objeto.pos, color);
    particle.onUpdate(() => {
      particle.opacity -= 0.03;
      if (particle.opacity <= 0) {
        particle.destroy();
      }
    });
  }
  return k.get("particula");
}
