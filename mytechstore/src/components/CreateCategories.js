import React, { Component } from 'react'
import axios from 'axios'

export default class CreateCategories extends Component {
    
    state = {
        productos:[],
        name:'',
        price:'',
        description:'',
        editing: false,
        _id:'',
        Pcarrito:[],
        name1: '',
        price1:"",
        description1:"",
 
    }
    async componentDidMount(){
        this.getProductos();
        this.getProductosC();
    }
    getProductos= async () => {
        const rest = await axios.get('http://localhost:3000/productos');
        this.setState({productos: rest.data});
        console.log('holaaaaaa',rest);
    }
    getProductosC= async () => {
        const rest2 = await axios.get('http://localhost:3000/carrito');
        this.setState({Pcarrito: rest2.data});
        console.log('Holaaaa!!!',rest2);
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
    cargarDatosProducto = async(id, nombre, precio, descripcion)=>{
        this.setState(
            { _id:id ,name:nombre, _price:precio, _description:descripcion
            }
        ) 
    }

    onSubmit=async(e) =>{
        e.preventDefault();
        console.log(this.state.editing);
        console.log(this.state._id);
        const newProd={
            name:this.state.name,
            price:this.state._price,
            description:this.state._description
        };
           await axios.post('http://localhost:3000/carrito',newProd)  
    
        this.getProductosC();
        this.getProductos();
        this.onClean();
    }
    render(){

        return(
            <div className='row'>
                <div className = 'col-md -4'>
                    <div className='card card-body'>
                        <h3>Seleccionar Producto</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <h6>Nombre</h6>
                                <input type='text' className="form-control" value={this.state.name}/>
                                <h6>Precio</h6>
                                <input type='text' className="form-control" value={this.state._price}/>
                                <h6>Descripcion</h6>
                                <input type='text' className="form-control" value={this.state._description}/>
                            </div>
                            <div className='container p-4'>
                                <button type='submit' className="btn btn-primary">Agregar al carrito</button>
                            </div>
                            <div className='container p-4'>
                                <button type='reset' className="btn btn-primary" onClick={()=>this.onClean()}>Limpiar</button>
                            </div>
                        </form>
                    </div>
                </div>
            <div className='col-md-8'>
                <ul className='list-group'>
                <div className='card card-body'>
                <h2>Lista de Productos</h2>
                </div>
                    {
                        this.state.productos.map(producto=>(
                            <li
                                className="list-group-item list-group-item-action"
                                key={producto.id}
                                onDoubleClick={()=>this.deleteUser(producto.id)}
                                onClick={()=>this.cargarDatosProducto(producto.id,producto.name,producto.price,producto.description)}
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
            <div className = 'col-md-8'>
                <ul className='list-group'>
                <div className='card card-body'>   
                <h2>Carrito de compras</h2>
                </div>
                    {
                        this.state.Pcarrito.map(carrito=>(
                            <tab
                                className="list-group-item list-group-item-action"
                                key={carrito.id2}
                                onDoubleClick={()=>this.deleteUser(carrito.id2)}
                               >
                                <div>{carrito.name1}</div> 
                                <div>{carrito.price1}</div>
                            </tab>
                        )
                        )

                    }

                </ul>
            </div>
                
        </div>
           
        )
    }
}