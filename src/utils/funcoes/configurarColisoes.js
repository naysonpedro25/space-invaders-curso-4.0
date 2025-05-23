import { criarExplosaoParticulas } from "../../entidades/particula";
import { k } from "../../main";

const fimJogoTela = document.querySelector(".fim-jogo");

fimJogoTela.remove();
const pontosTexto = document.querySelector(".pontos");
const maiorPontuacaoTexto = document.querySelector(".maiorPontuacao");
let pontos = 0;
let maiorPontuacao = 0;
function configurColisoes() {
  k.onCollide("inimigo", "projetil", (inimigo, projetil) => {
    if (projetil.is("projetil-jogador") && k.get("jogador").length !== 0) {
      k.play("acerto", {
        volume: 0.1,
      });

      criarExplosaoParticulas(inimigo, "#9927ff");
      inimigo.destroy();
      projetil.destroy();
      pontos += 10;
      maiorPontuacao = Math.max(maiorPontuacao, pontos);
      pontosTexto.innerText = pontos;
      maiorPontuacaoTexto.innerText = maiorPontuacao;
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
