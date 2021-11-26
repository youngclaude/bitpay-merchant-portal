import React from 'react'
import { FaWindowClose} from 'react-icons/fa';

export const UpdateInvoiceForm = props => {
    return (
        <div className="form-entry">
          <span className="close-btn" onClick={props.handleFormClose}><FaWindowClose /></span>

          <h3> {props.formMode === 'create' ? <span>Add new</span> : <span>Edit</span> } Invoice</h3>



          <form onSubmit={e => props.handleSubmitActiveForm(e)}>
            {/* <input type="number" name="id" hidden value={props.activeInvoice.id > 0 ? props.activeInvoice.id : generateInvoiceId()}   onChange={e => props.handleUpdateActiveForm(e)}/> */}
            <select name="merchantName" id="" value={props.activeInvoice.merchantName} onChange={e => props.handleUpdateActiveForm(e)}>
              <option value="ShirtTown">ShirtTown</option>
              <option value="CrazyCups">CrazyCups</option>
              <option value="GimmeGold">GimmeGold</option>
            </select>
<br />
            <input type="text" name="itemName" value={props.activeInvoice.itemName} onChange={e => props.handleUpdateActiveForm(e)}/>
            <input type="text" name="amountCharged" placeholder="amountCharged" value={props.activeInvoice.amountCharged} onChange={e => props.handleUpdateActiveForm(e)}/>
            <br />

            {/* <label htmlFor="crto">Boom</label> */}
            <select name="purchaseCurrency" id="crto" value={props.activeInvoice.purchaseCurrency} onChange={e => props.handleUpdateActiveForm(e)}>
              { props.fetchedCurrenciesInBtc.map(currency => 
                <option value={currency.code}>{currency.name}</option>
                )}
            </select>
            <br />

            {/* <input type="number" name="defiValueToFiat" placeholder="defiValueToFiat" disabled value={props.activeInvoice.defiValueToFiat} onChange={e => props.handleUpdateActiveForm(e)}/> */}
            {/* <input type="number" name="amountOwed" placeholder="" disabled value={props.activeInvoice.amountOwed} onChange={e => props.handleUpdateActiveForm(e)}/> */}

            <br />
            <div style={{textAlign:'center'}}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
    )
}
