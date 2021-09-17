import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toFirstCharUppercase } from "../Const";

const HomePage = (props) => {
  const { history } = props;
  const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=50";
  const [pokemonData, setPokemonData] = useState({});

  // FETCHING POKEMON API
  useEffect(() => {
    axios.get(initialUrl).then(function (response) {
      const { data } = response;
      const { results } = data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        };
      });
      setPokemonData(newPokemonData);
    });
  }, []);

  // RENDERING POKEMON CARD
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Card key={pokemonId} onClick={() => history.push(`/pokemon/${id}`)}>
        <RoundCircle />
        <h3>{`#${id}`}</h3>
        <img src={sprite} alt="" />
        <h2>{toFirstCharUppercase(name)}</h2>
      </Card>
    );
  };

  return (
    <>
      <Container>
        {/* MAPING POKEMON LIST FROM POKEMON DATA */}
        {Object.keys(pokemonData).map((id) => getPokemonCard(id))};
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-grow: 1;
  cursor: pointer;
  width: 250px;
  height: 350px;
  margin: 20px;
  border-radius: 10px;
  background-color: #e3e3e3;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);
  transition: ease-in-out 0.3s;

  img {
    max-width: 150px;
    height: 200px;
    z-index: 1;
  }

  h2 {
    letter-spacing: 0.05rem;
  }

  &:hover {
    transform: scale(1.05);
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

export default HomePage;
