import { Component } from 'react';
import { PokemonErrorView } from './PokemonErrorView';
import { PokemonDataView } from './PokemonDataView';
import { PokemonPendingView } from './PokemonPendingView';
import { fetchPokemon } from './services/pokemon-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'Status.IDLE',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;
    if (prevName !== nextName) {
      this.setState({
        status: Status.PENDING,
      });

      // setTimeout(() => {
      fetchPokemon(nextName)
        .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
        .catch(error => this.setState({ error, status: Status.REJECTED }));
      // }, 2000);
    }
  }
  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === Status.IDLE) {
      return <div>Введіть ім'я покемона</div>;
    }

    if (status === Status.PENDING) {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === Status.REJECTED) {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === Status.RESOLVED) {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}
