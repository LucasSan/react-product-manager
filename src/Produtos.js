import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria';
import axios from 'axios';
import Api from './Api';

class Produtos extends Component {
    // usaremos o construtor pra setar o estado
    // iniciar do component.
    constructor(props) {
        super(props);
        this.state = {
            categorias: []
        };
        this.handleNewCategoria = this.handleNewCategoria.bind(this);
        this.loadCategorias = this.loadCategorias.bind(this);
        this.renderCategoria = this.renderCategoria.bind(this);
    }

    loadCategorias() {
        // buscar categorias.
        Api.loadCategorias()
            .then(res => {
                this.setState({
                    categorias: res.data
                })
            });
    }
    
    componentDidMount() {
        this.loadCategorias();
    }

    removeCategoria(categoria) {
        Api.deleteCategoria(categoria.id)
            .then(() => {
                this.loadCategorias();
            });
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                <button className="btn" onClick={() => this.removeCategoria(cat)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
                <Link to={'/produtos/categoria/' + cat.id}>{cat.categoria}</Link>
            </li>
        )
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            axios
                .post('http://localhost:3001/categorias', {
                    categoria: this.refs.categoria.value
                })
                .then(res => {
                    this.refs.categoria.value = '';
                    this.loadCategorias();
                })
        }
    }

    render() {
        const { match } = this.props;
        const { categorias } = this.state;
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>
                    {
                        categorias.map(this.renderCategoria)
                    }
                    </ul>
                    <div className='well well-sm'>
                        <input 
                            onKeyUp={this.handleNewCategoria}
                            type='text'
                            ref='categoria'
                            className='form-control'
                            placeholder='Nova categoria' />
                    </div>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route path={match.url+'/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}

export default Produtos;
