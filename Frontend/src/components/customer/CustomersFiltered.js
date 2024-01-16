import Customer from '../customer/Customer'

const CustomersFiltered = ({ customers, setFilter, setCustomers,  setNotification, setErrorNotification}) => {
    if (customers.length > 10) {
        return <div>Too many results, specify another character</div>
    }

    if (customers.length === 0) {
        return <div>No results found, check the name entered</div>
    }

    if (customers.length > 1) {
        return (
            <div>
                {customers.map((c) =>
                    <div key={c.CustomerID}>
                        <span>
                            <button onClick={() => setFilter(c.CustomerID)}>{c.CustomerID}</button> {c.CompanyName} 
                            
                        </span>
                    </div>
                )}

            </div>
        )
    }

    return <Customer 
                customer={customers[0]} 
                setCustomers={setCustomers}
                setNotification={setNotification}
                setErrorNotification={setErrorNotification} 
            />
}

export default CustomersFiltered