import React from 'react'
import { FaPlusSquare} from 'react-icons/fa';

export const CryptoTableHeader = props => {
    return (
        <div className="table-heading-section">
            <h2>Global Invoice Table</h2>
            <div><button onClick={props.handleCreateInvoiceClick}><FaPlusSquare /> Create Invoice</button></div>
        </div>
    )
}
