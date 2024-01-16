import { useState, useEffect } from 'react'
import Togglable from '../Togglable'
import CustomersFiltered from '../customer/CustomersFiltered'

import customerService from '../../services/clientes'

const CustomersBlock = ({ setNotification, setErrorNotification }) => {

    const [filter, setFilter] = useState('')
    const [customers, setCustomers] = useState([])
    const [newIdCustomer, setNewIdCustomer] = useState('')
    const [newNameCustomer, setNewNameCustomer] = useState('')
    // const [newUpdateNameCustomer, setNewUpdateNameCostumer] = useState('')
    // const [newUpdateIdCustomer, setNewUpdateIdCustomer] = useState('')
    // const [newDeleteIdCustomer, setNewDeleteIdCustomer] = useState('')

    useEffect(() => {
        customerService
            .getAll()
            .then(initialCustomers => {
                setCustomers(initialCustomers)
                console.log('==> customers: ', customers )
                console.log('==> initialCustomers: ', initialCustomers )
            })
    }, [])


    const addCustomer = async (event) => {
        event.preventDefault()

        if (!window.confirm(`Do you want to add ${newNameCustomer}?`)) {
            return
        }

        const customerObject = {
            CustomerID: newIdCustomer,
            CompanyName: newNameCustomer,
        }

        try {
            await customerService.create(customerObject)

            setNewIdCustomer('')
            setNewNameCustomer('')


            setNotification(`${customerObject.CompanyName} added`)
            setTimeout(() => { setNotification(null) }, 3000)


            const initialCustomers = await customerService.getAll()
            setCustomers(initialCustomers)

        } catch (e) {
            setErrorNotification('Error creating a customer, check inserted data')
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)
        }


    }

    // const updateCustomerName = async (event) => {
    //     event.preventDefault();

    //     if (!window.confirm(`Do you want to update ${newUpdateNameCustomer}?`)) {
    //         return
    //     }

    //     const customerObject = {
    //         CompanyName: newUpdateNameCustomer,
    //     }

    //     try {
    //         await customerService.update(newUpdateIdCustomer, customerObject)
    //         setNewUpdateIdCustomer('')
    //         setNewUpdateNameCostumer('')

    //         setNotification(`${customerObject.CompanyName} updated`)
    //         setTimeout(() => { setNotification(null) }, 3000)

    //         setCustomers(await customerService.getAll())

    //     } catch (error) {
    //         setErrorNotification('Failed to update a item')
    //         setTimeout(() => {
    //             setErrorNotification(null)
    //         }, 5000)

    //     }



    // }

    // const deleteCustomer = async (event) => {
    //     event.preventDefault();

    //     if (!window.confirm(`Do you want to remove ${newDeleteIdCustomer}?`)) {
    //         return
    //     }

    //     try {
    //         await customerService.remove(newDeleteIdCustomer)

    //         setNotification(`ID ${newDeleteIdCustomer} deleted`)
    //         setTimeout(() => { setNotification(null) }, 3000)

    //         setNewDeleteIdCustomer('')

    //         setCustomers(await customerService.getAll())

    //     } catch (error) {
    //         setErrorNotification('==> Failed to remove a item')
    //         setTimeout(() => {
    //             setErrorNotification(null)
    //         }, 5000)
    //     }


    // }

    const handleCustomerIdChange = (event) => {
        setNewIdCustomer(event.target.value)
    }

    const handleCustomerNameChange = (event) => {
        setNewNameCustomer(event.target.value)
    }

    // const handleCustomerIdUpdate = (event) => {
    //     setNewUpdateIdCustomer(event.target.value)
    // }

    // const handleCustomerNameUpdate = (event) => {
    //     setNewUpdateNameCostumer(event.target.value)
    // }

    // const handleCustomerIdDelete = (event) => {
    //     setNewDeleteIdCustomer(event.target.value)
    // }

    const filtered = customers.filter(c => c.CustomerID.toLowerCase().includes(filter.toLowerCase()) || c.CompanyName.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>View Customer</h2>
            <div>
                <label>Enter customer ID or customer name </label>
                <input
                    type="text"
                    value={filter}
                    onChange={({ target }) => setFilter(target.value)}
                />
            </div>
            <CustomersFiltered 
                customers={filtered} 
                setFilter={setFilter} 
                setCustomers={setCustomers} 
                setNotification={setNotification}
                setErrorNotification={setErrorNotification} 
            />

            <hr/>

            <h2>Add Customer</h2>
            <Togglable buttonLabel="Add customer">
                <form onSubmit={addCustomer}>
                    <label >ID:</label><br></br>
                    <input value={newIdCustomer} onChange={handleCustomerIdChange} />
                    <br></br>
                    <label >Name:</label><br></br>
                    <input value={newNameCustomer} onChange={handleCustomerNameChange} />
                    <br></br>
                    <button type="submit">save</button>
                </form>
            </Togglable>

            {/* <h2>Update Customer</h2>
            <Togglable buttonLabel="Update customer">
                <form onSubmit={updateCustomerName}>
                    <label >ID:</label><br></br>
                    <input value={newUpdateIdCustomer} onChange={handleCustomerIdUpdate} />
                    <br></br>
                    <label >Name:</label><br></br>
                    <input value={newUpdateNameCustomer} onChange={handleCustomerNameUpdate} />
                    <br></br>
                    <button type="submit">update</button>
                </form>
            </Togglable>

            <h2>Delete Customer</h2>
            <Togglable buttonLabel="Delete customer">
                <form onSubmit={deleteCustomer}>
                    <label >ID:</label><br></br>
                    <input value={newDeleteIdCustomer} onChange={handleCustomerIdDelete} />
                    <br></br>
                    <button type="submit">delete</button>
                </form>
            </Togglable> */}
        </div>
    )
}

export default CustomersBlock