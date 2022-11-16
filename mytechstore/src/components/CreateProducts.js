import React, { Component } from 'react'
import axios from 'axios'

export default class CreateProducts extends Component {
    
    state = {
        productos:[],
        name:'',
        price:'',
        description:''
    }
    async componentDidMount(){
        this.getProductos();
    }
    getProductos= async () => {
        const rest = await axios.get('http://localhost:3000/productos');
        this.setState({productos: rest.data});
        console.log(rest);
    }
    onChangeName= (e)=>{
        this.setState({name:e.target.value});
    }
    onChangePrice= (e)=>{
        this.setState({_price:e.target.value});
    }
    onChangeDescription= (e)=>{
        this.setState({_description:e.target.value});
    }
    onClean= (e)=>{
        this.setState(
            { name:'', _price:'', _description:''
            }
        )
    }
    onSubmit=async(e) =>{
        e.preventDefault();
        await axios.post('http://localhost:3000/productos',{
            name:this.state.name,
            price:this.state._price,
            description:this.state._description
        })
        this.getProductos();
        this.onClean();
    }
    render(){

        return(
            <div className='row'>
                <div className = 'col-md -4'>
                    <div className='card card-body'>
                        <h3>Crear Nuevo Producto</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <h6>Nombre</h6>
                                <input type='text' className="form-control" value={this.state.name} onChange={this.onChangeName}/>
                                <h6>Precio</h6>
                                <input type='text' className="form-control" value={this.state._price} onChange={this.onChangePrice}/>
                                <h6>Descripcion</h6>
                                <input type='text' className="form-control" value={this.state._description} onChange={this.onChangeDescription}/>
                            </div>
                            <div className='container p-4'>
                                <button type='submit' className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            <div className='col-md-8'>
                <ul className='list-group'>
                    {
                        this.state.productos.map(producto=>(
                            <li
                                className="list-group-item list-group-item-action"
                                key={producto.id}
                            >
                                <div>{producto.name}</div> 
                                <div>{producto.price}</div>
                                <div>{producto.description}</div>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
            
            </div>
        )
    }
}