import React,{ChangeEvent, FC} from 'react'
import { FaWindowClose} from 'react-icons/fa';
import { IMerchantInvoice, IBitPayCurencyObj } from '../interfaces';


interface Props {
  handleFormClose() : void
  handleUpdateActiveForm(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) : void
  handleSubmitActiveForm(e: any) : void
  activeInvoice : IMerchantInvoice
  fetchedCurrenciesInBtc: IBitPayCurencyObj[]
  formMode: string
}

export const UpdateInvoiceForm: FC<Props> = (props : Props) => {
    return (
        <div className="form-entry">
          <span className="close-btn" onClick={props.handleFormClose}><FaWindowClose /></span>

          <h3> {props.formMode === 'create' ? <span>Add new</span> : <span>Edit</span> } Invoice</h3>
          <hr />

          <p className="form-label">Merchant Name</p>
          <form onSubmit={props.handleSubmitActiveForm}>
            {/* <input type="number" name="id" hidden value={props.activeInvoice.id > 0 ? props.activeInvoice.id : generateInvoiceId()}   onChange={props.handleUpdateActiveForm}/> */}
            <select name="merchantName" id="" value={props.activeInvoice.merchantName} onChange={props.handleUpdateActiveForm}>
              <option value="ShirtTown">ShirtTown</option>
              <option value="CrazyCups">CrazyCups</option>
              <option value="GimmeGold">GimmeGold</option>
            </select>

            <p className="form-label">Item Name</p>
            <input type="text" name="itemName" value={props.activeInvoice.itemName} onChange={props.handleUpdateActiveForm}/>
            <p className="form-label">Amount Charged</p>
            <input type="text" name="amountCharged" placeholder="amountCharged" value={props.activeInvoice.amountCharged} onChange={props.handleUpdateActiveForm}/>
           

            {/* <label htmlFor="crto">Boom</label> */}
            <p className="form-label">Purchase Currency</p>
            <select name="purchaseCurrency" id="crto" value={props.activeInvoice.purchaseCurrency} onChange={props.handleUpdateActiveForm}>
              { props.fetchedCurrenciesInBtc.map(currency => 
                <option value={currency.code}>{currency.name}</option>
                )}
            </select>

            {/* <input type="number" name="defiValueToFiat" placeholder="defiValueToFiat" disabled value={props.activeInvoice.defiValueToFiat} onChange={props.handleUpdateActiveForm}/> */}
            {/* <input type="number" name="amountOwed" placeholder="" disabled value={props.activeInvoice.amountOwed} onChange={props.handleUpdateActiveForm}/> */}

            <br />
            <div style={{textAlign:'center'}}>
              <button type="submit">
                <h3> {props.formMode === 'create' ? <span>Submit</span> : <span>Update</span> } </h3>
              </button>
            </div>
          </form>
        </div>
    )
}
