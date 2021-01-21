import { Game } from "./styles";

const GameC =  ({ img, click, title }) => (
  <Game>
    <img src={img} width="100" height="100" alt="shop game" onClick={click} />
    <h1>{title}</h1>
  </Game>
);

export default GameC; 