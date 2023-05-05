import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

const styles = { form: { marginBootom: 20 } };

export class PokemonForm extends Component {
  state = {
    pokemonName: '',
  };

  handleNameChange = event => {
    this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.pokemonName.trim() === '') {
      toast.error("Введіть ім'я покемона");
      return;
    }

    this.props.onSubmit(this.state.pokemonName);
    this.setState({ pokemonName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <input
          type="text"
          name="pokemonName"
          value={this.state.pokemonName}
          onChange={this.handleNameChange}
        />
        <button type="submit">
          <ImSearch style={{ marginRight: 8 }} />
          Знайти
        </button>
      </form>
    );
  }
}
