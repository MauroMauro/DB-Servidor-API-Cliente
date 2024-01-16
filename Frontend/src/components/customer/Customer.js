import { useState } from "react"
import customerService from '../../services/clientes'



const Customer = ({ customer, setCustomers,  setNotification, setErrorNotification }) => {
    const [pulsed, setPulsed] = useState(false)



    return (
        <li>
            {customer.CustomerID} - {customer.CompanyName} 
            {pulsed ?
                null
                :
                <button onClick={() => setPulsed(!pulsed)}>alter item</button>
            }
            {pulsed ?
                <UpdateBlock 
                    id={customer.CustomerID}
                    setCustomers={setCustomers}
                    setNotification={setNotification}
                    setErrorNotification={setErrorNotification} 
                />
                :
                null
            }
            {pulsed ?
                <RemoveBlock 
                    id={customer.CustomerID}
                    setCustomers={setCustomers}
                    setNotification={setNotification}
                    setErrorNotification={setErrorNotification}
                />
                :
                null
            }
            <br></br>
            {!pulsed ?
                null
                :
                <button onClick={() => setPulsed(!pulsed)}>close</button>
            }

        </li>
    )
}



const UpdateBlock = ({ id, setCustomers, setNotification, setErrorNotification  }) => {

    const [newUpdateNameCustomer, setNewUpdateNameCostumer] = useState('')

    const updateCustomerName = async (event) => {
        event.preventDefault()

        const customerObject = {
            CompanyName: newUpdateNameCustomer,
        }

        if (!window.confirm(`Do you want to update ${newUpdateNameCustomer}?`)) {
            return
        }

        try {
            await customerService.update(id, customerObject)

            setNewUpdateNameCostumer('')

            setNotification(`${customerObject.CompanyName} updated`)
            setTimeout(() => { setNotification(null) }, 3000)

            setCustomers(await customerService.getAll())
        } catch (error) {
            setErrorNotification('Failed to update a item')
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)
        }


    }

    const handleCustomerNameUpdate = (event) => {
        setNewUpdateNameCostumer(event.target.value)
    }

    return (
        <form onSubmit={updateCustomerName} >

            <label >insert new name:</label><br></br>
            <input value={newUpdateNameCustomer} onChange={handleCustomerNameUpdate} />

            <br></br>
            <button type="submit">update item</button>
        </form>
    )

}

const RemoveBlock = ({ id, setCustomers, setNotification, setErrorNotification  }) => {

    const deleteCustomer = async (event) => {
        event.preventDefault();

        if (!window.confirm(`Do you want to remove ${id}?`)) {
            return
        }

        try {
            await customerService.remove(id)

            setNotification(`ID ${id} deleted`)
            setTimeout(() => { setNotification(null) }, 3000)


            setCustomers(await customerService.getAll())

        } catch (error) {
            setErrorNotification('==> Failed to remove a item')
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)
        }


    }

    return <button onClick={deleteCustomer}>remove item from database</button>
}

export default Customer