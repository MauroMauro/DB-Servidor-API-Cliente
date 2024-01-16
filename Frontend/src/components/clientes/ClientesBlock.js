import { useState, useEffect } from 'react'
import Togglable from '../Togglable'
import ClientesListados from './ClientesListados'

import clienteServicio from '../../services/clientes'

const ClientesBlock = ({ setNotification, setErrorNotification }) => {

    const [filter, setFilter] = useState('')
    const [clientes, setClientes] = useState([])
    const [newIdCliente, setNewIdCliente] = useState('')
    const [newNameCliente, setNewNameCliente] = useState('')
    // const [newUpdateNameCliente, setNewUpdateNameCostumer] = useState('')
    // const [newUpdateIdCliente, setNewUpdateIdCliente] = useState('')
    // const [newDeleteIdCliente, setNewDeleteIdCliente] = useState('')

    useEffect(() => {
        clienteServicio
            .getAll()
            .then(initialClientes => {
                setClientes(initialClientes)
                console.log('==> clientes: ', clientes )
                console.log('==> initialClientes: ', initialClientes )
            })
    }, [])


    const handleClienteIdChange = (event) => {
        setNewIdCliente(event.target.value)
    }

    const handleClienteNameChange = (event) => {
        setNewNameCliente(event.target.value)
    }


    const filtered = clientes.filter(c => c.ClienteID.toLowerCase().includes(filter.toLowerCase()) || c.CompanyName.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>View Cliente</h2>
            <div>
                <label>Enter cliente ID or cliente name </label>
                <input
                    type="text"
                    value={filter}
                    onChange={({ target }) => setFilter(target.value)}
                />
            </div>
            <ClientesListados
                clientes={filtered} 
                setFilter={setFilter} 
                setClientes={setClientes} 
                setNotification={setNotification}
                setErrorNotification={setErrorNotification} 
            />

            <hr/>

            
        </div>
    )
}

export default ClientesBlock