import React from "react";
import styled from "styled-components";
import { toFirstCharUppercase } from "../Const";

const PokemonList = (props) => {
  const { releasePokemon, pokemonList } = props;

  // RENDERING POKEMON CARD
  const renderPokemonCard = (pokemonId) => {
    const { id, name, sprites } = pokemonList[pokemonId];

    // DELETE FUNCTION POKEMON
    const deletePokemon = (e) => {
      releasePokemon(e);
      alert(`${toFirstCharUppercase(name)} Released !!`);
    };

    return (
      <CardImage key={id}>
        <RoundCircle />
        <h3>{`#${id}`}</h3>
        <img src={sprites.other.dream_world.front_default} alt="" />
        <h2>{toFirstCharUppercase(name)}</h2>
        <button onClick={() => deletePokemon(id)}>Release</button>
      </CardImage>
    );
  };
  return (
    <Container>
      {/* MAPING  POKEMON LIST CARD */}
      {Object.keys(pokemonList).map((id) => renderPokemonCard(id))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  margin-top: 1rem;
`;

const CardImage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 250px;
  height: 350px;
  margin: 20px;
  border-radius: 10px;
  background-color: #e3e3e3;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);

  img {
    max-width: 150px;
    height: 200px;
    z-index: 1;
  }

  h2 {
    letter-spacing: 0.05rem;
  }

  button {
    font-weight: bold;
    letter-spacing: 0.05rem;
    padding: 0.7rem;
    background-color: salmon;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const RoundCircle = styled.div`
  position: absolute;
  top: 20%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
`;

export default PokemonList;
