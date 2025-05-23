import { k } from "../../main";

export function carregarSprites() {
  k.loadSprite("nave", "../../sprites/spaceship.png");
  k.loadSprite("motor", "../public/sprites/engine.png");
  k.loadSprite("inimigo", "../public/sprites/invader-sprites.png", {
    sliceX: 2,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 1,
        loop: true,
        speed: 5,
      },
    },
  });
  k.loadSprite("motor-ligado", "../public/sprites/engine-effects.png", {
    sliceX: 4,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 3,
        loop: true,
        speed: 12,
      },
    },
  });
}
