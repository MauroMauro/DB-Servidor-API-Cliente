import Cliente from '../clientes/Cliente'

const ClientesListados = ({ clientes, setFilter, setClientes,  setNotification, setErrorNotification}) => {
    if (clientes.length > 20) {
        return <div>Too many results, specify another character</div>
    }

    if (clientes.length === 0) {
        return <div>No results found, check the name entered</div>
    }

    if (clientes.length > 1) {
        return (
            <div>
                {clientes.map((c) =>
                    <div key={c.CustomerID}>
                        <span>
                            <button onClick={() => setFilter(c.CustomerID)}>{c.CustomerID}</button> {c.CompanyName} 
                            
                        </span>
                    </div>
                )}

            </div>
        )
    }

    return <Cliente 
                cliente={clientes[0]} 
                setClientes={setClientes}
                setNotification={setNotification}
                setErrorNotification={setErrorNotification} 
            />
}

export default ClientesListados