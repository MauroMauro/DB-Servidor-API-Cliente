



const Cliente = ({ cliente, setClientes,  setNotification, setErrorNotification }) => {



    return (
        <li>
            {cliente.ClienteID} - {cliente.CompanyName} 
           

        </li>
    )
}

export default Cliente