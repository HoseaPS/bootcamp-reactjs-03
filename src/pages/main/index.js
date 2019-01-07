import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FavoriteACtions from '../../store/actions/favorites';

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  state = {
    repositoryInput: '',
  };

  handleAddRepository = (event) => {
    event.preventDefault();
    this.props.addFavoriteRequest(this.state.repositoryInput);
    this.setState({ repositoryInput: '' });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input
            placeholder="usuário/repositório"
            value={this.state.repositoyInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>

          {this.props.favorites.loading && <span>Carregando</span>}

          {!!this.props.favorites.error && (
            <span style={{ color: 'red' }}>{this.props.favorites.error}</span>
          )}
        </form>

        <ul>
          {this.props.favorites.data.map((favorite, index) => (
            <li key={index}>
              <p>
                <strong>{favorite.name}</strong>
                {favorite.description}
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteACtions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
