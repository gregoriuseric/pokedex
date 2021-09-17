import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toFirstCharUppercase } from "../Const";

const PokemonDetails = (props) => {
  const { match, catchPokemon } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState();

  // FETCHING POKEMON API TO GET THE ID
  useEffect(() => {
    const getPokemon = () => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then((response) => {
          const { data } = response;
          setPokemon(data);
        })
        .catch((error) => {
          setPokemon(false);
        });
    };
    return getPokemon();
  }, [pokemonId]);

  console.log(pokemonId);

  // RENDERING POKEMON DETAIL CARD
  const generatePokemon = (pokemon) => {
    const { name, id, stats, types, sprites } = pokemon;

    // ADD FUNCTION POKEMON
    const addPokemon = (e) => {
      e.preventDefault();
      const i = Math.floor(Math.random() * 100);
      if (i > 50) {
        catchPokemon(pokemon);
        alert(`You Catch The ${toFirstCharUppercase(name)} !!`);
      } else {
        alert(`${toFirstCharUppercase(name)} has Run Away !!`);
      }
    };

    return (
      <Card>
        <Link to="/">
          <BackButton>X</BackButton>
        </Link>
        <CardImage>
          <h2>#{id}</h2>
          <img src={sprites.other.dream_world.front_default} alt="" />
          <h1>{toFirstCharUppercase(name)}</h1>
          <h3>Types</h3>
          <h4>{types[0].type.name}</h4>
        </CardImage>

        <CardRight>
          <CardDetail>
            <h1>Stats</h1>
            <Grid>
              <h3>HP :{stats[0].base_stat}</h3>
              <h3>Atk :{stats[1].base_stat}</h3>
              <h3>Def :{stats[2].base_stat}</h3>
              <h3>Sp. Atk :{stats[3].base_stat}</h3>
              <h3>Sp. Def :{stats[4].base_stat}</h3>
              <h3>Speed :{stats[5].base_stat}</h3>
            </Grid>
          </CardDetail>
          <CatchButton onClick={addPokemon}>Catch Pokemon</CatchButton>
        </CardRight>
      </Card>
    );
  };

  return (
    <>
      {pokemon === undefined && (
        <div>
          <h1>LOADING ...</h1>
        </div>
      )}
      {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
      {pokemon === false && (
        <div>
          <h1>Pokemon Not Found</h1>
        </div>
      )}
    </>
  );
};

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 90vh;

  a {
    text-decoration: none;
    color: black;
  }
`;

const BackButton = styled.h2`
  position: absolute;
  top: 10%;
  right: 10%;
  cursor: pointer;
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;

const CatchButton = styled.h1`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: salmon;
  height: 180px;
  width: 180px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  margin-top: -100px;
  cursor: pointer;
  transition: ease-in-out 0.3s;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 450px;
  height: auto;
  text-align: center;
  border-radius: 10px;
  background-color: #e3e3e3;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);

  h2 {
    padding: 1.5rem 0;
    letter-spacing: 0.05rem;
  }

  img {
    height: 400px;
    width: 350px;
    z-index: 1;
  }
  h1 {
    letter-spacing: 0.05rem;
    padding-top: 1rem;
  }

  h3 {
    letter-spacing: 0.05rem;
    padding-top: 1rem;
    font-size: 1.3rem;
  }
  h4 {
    letter-spacing: 0.05rem;
    padding-bottom: 2rem;
    font-size: 1.1rem;
  }
`;
const CardDetail = styled.div`
  width: 450px;
  height: auto;
  text-align: center;
  border-radius: 10px;
  background-color: #e3e3e3;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);

  h1 {
    padding-bottom: 2rem;
    text-align: center;
  }
  h3 {
    padding-bottom: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default PokemonDetails;
