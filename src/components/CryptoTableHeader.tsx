import React, { ChangeEvent, FC } from 'react'
import { FaPlusSquare} from 'react-icons/fa';

interface Props {
    handleCreateInvoiceClick() : void;
    handleIntervalUpdate(e: ChangeEvent<HTMLSelectElement>): void;
    requestInterval: string | number;
}

export const CryptoTableHeader: FC<Props> = (props : Props) => {
    return (
        <div className="table-heading-section">
            <div>
                <h2>Global Invoice Table</h2>
                <span> Price Update Frequency </span>
                <select name="requestInterval" onChange={props.handleIntervalUpdate} value={props.requestInterval}>
                    <option value="5000">5 Seconds</option>
                    <option value="30000">30 Seconds</option>
                    <option value="60000">1 Minutes</option>
                    <option value="1200000">2 Minutes</option>
                    <option value="300000">5 Minutes</option>
                </select>
            </div>
            <div><button onClick={props.handleCreateInvoiceClick}><FaPlusSquare /> Create Invoice</button></div>
        </div>
    )
}
