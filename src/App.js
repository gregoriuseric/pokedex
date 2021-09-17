import styled from "styled-components";
import { useState } from "react/cjs/react.development";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./components/PokemonList";

function App(props) {
  const [pokemonList, setPokemonList] = useState([]);

  // CALLBACK FUNCTION CATCH POKEMON
  const catchPokemon = (e) => {
    setPokemonList([...pokemonList, e]);
  };

  // CALLBACK FUNCTION RELEASE POKEMON
  const releasePokemon = (id) => {
    const newPokemonList = pokemonList.filter((pokemon) => {
      return pokemon.id !== id;
    });
    setPokemonList(newPokemonList);
  };

  return (
    <Router>
      <Navbar>
        <Link to="/">
          <Title>PokeDex</Title>
        </Link>

        <Link to="/pokemonlist">
          <List>Pokemon List</List>
        </Link>
      </Navbar>

      <Switch>
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
        <Route exact path="/pokemon/:pokemonId" render={(props) => <PokemonDetails {...props} catchPokemon={catchPokemon} />} />
        <Route exact path="/pokemonlist" render={(props) => <PokemonList {...props} releasePokemon={releasePokemon} pokemonList={pokemonList} setPokemonList={setPokemonList} />} />
      </Switch>
    </Router>
  );
}

const Navbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  letter-spacing: 0.05rem;
  text-align: center;
  margin: 1rem 0;
`;

const List = styled.h2`
  letter-spacing: 0.05rem;
  text-align: center;
  padding: 1rem 0;
  background-color: salmon;
  width: 200px;
  border-radius: 5px;
`;
export default App;
