import { k } from "../../main";

export function carregarSons() {
  k.loadSound("projetil", "../public/sounds/shoot.mp3");
  k.loadSound("acerto", "../public/sounds/hit.mp3");
  k.loadSound("explosao", "../public/sounds/explosion.mp3");
  k.loadSound("proximo-nivel", "../public/sounds/next_level.mp3");
}
