import { Component } from 'react';

export class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;
    if (prevName !== nextName) {
      this.setState({
        status: 'pending',
      });

      fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Покемона з ім'ям ${nextName} не існує`)
          );
        })
        .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    const { pokemon, error, status } = this.state;

    if (status === 'idle') {
      return <div>Введіть ім'я покемона</div>;
    }

    if (status === 'pending') {
      return <div>Завантажуємо...</div>;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <p>{pokemon.name}</p>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width="240"
          />
        </div>
      );
    }
  }
}
