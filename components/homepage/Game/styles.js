import styled from "styled-components";
import {animated} from 'react-spring'; 


export const Game = styled.div`
  margin: 1rem;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 0px solid #cecece;
  width: 50%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  img {
    cursor: pointer;
    transition: 0.2s all;
    transform: scale(1);
    width: 80%;
    height: 80%;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
    @media screen and (max-width: 320px) {
      width: 25px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
`;
