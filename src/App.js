import React,{useEffect, useRef, useState} from 'react'
import logo from './logo.svg';
import './styles/App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/counterSlice'
import { showMessage } from './redux/notificationsSlice';

import { FaEdit,  FaTrashAlt, FaWindowClose, FaPlusSquare} from 'react-icons/fa';
import CountUp from 'react-countup';
import { fetchLatestPrices } from './redux/cryptoPriceDataSlice';

function App() {
  const dispatch = useDispatch()
  const reduxValue = useSelector((state) => state.crypto.fetchedCurrenciesInBtc)
  const [merchantInvoiceData, setMerchantInvoiceData] = useState([])

  const generateInvoiceId = () => {
    const usedIds = merchantInvoiceData.map(invoice => invoice.id);

    let newId = Math.floor(Math.random() * 500)
    while( usedIds.includes(newId) ){
      console.log('ID already used: ', newId);
      newId = Math.floor(Math.random() * 500)
    }

    return newId;
  // think about populating these fields on the form submission side
  }
  // think about populating these fields on the form submission side
  const [activeInvoice, setActiveInvoice] = useState({});
  const [fetchedCurrenciesInBtc, setFetchedCurrenciesInBtc] = useState([])
  const [formMode, setFormMode] = useState('default')
  const timerId = useRef(null)

  const merchantInvoiceDataConst = [
    {
      id: 214,
      merchantName: 'ShirtTown',
      itemName: 'T-shirt',
      amountCharged: 1.43219876,
      purchaseCurrency: 'BTC',
      defiValueToFiat: 9285.93,
      amountOwed: 13299.30
    },
    {
      id: 204,
      merchantName: 'CrazyCups',
      itemName: 'Cups',
      amountCharged: 2.76236751,
      purchaseCurrency: 'BCH',
      defiValueToFiat: 6483.69,
      amountOwed: 17910.33
    },
    {
      id: 244,
      merchantName: 'GimmeGold',
      itemName: 'Gold bullion',
      amountCharged: 10.78654328,
      purchaseCurrency: 'ETH',
      defiValueToFiat: 442.08,
      amountOwed: 4768.52
    }
  ] 

  const handleUpdateActiveForm = (e) =>{
    const {name, value} = e.target;
    console.log(name, value);

    const tempActiveInvoice = {...activeInvoice}
    tempActiveInvoice[name] = value;
    setActiveInvoice(tempActiveInvoice)
  } 

  // update the merchant invoice data table with the activeInvoice fields
  const handleSubmitActiveForm = (e) =>{
    e.preventDefault()
    const {name, value} = e.target;
    console.log('e.target: ', e.target)
    console.log('e: ', e)
    console.log(name, value);

    const tempMerchantInvoiceData = [...merchantInvoiceData]

    if (formMode === 'create'){
      const tempActiveInvoice = {...activeInvoice}

      tempActiveInvoice.amountCharged =  (activeInvoice.amountCharged * 1).toFixed(8)
      tempMerchantInvoiceData.push(tempActiveInvoice);
      dispatch(showMessage("Added New Invoice!"))

    } else {
      const tempIndexToEdit =  tempMerchantInvoiceData.findIndex(invoiceData => invoiceData.id == activeInvoice.id)
      console.log({tempIndexToEdit});
      tempMerchantInvoiceData[tempIndexToEdit] = activeInvoice;
      setFormMode('create')
      dispatch(showMessage("Edit successful!"))
    }

    setMerchantInvoiceData(tempMerchantInvoiceData)
  } 

  const handleEditClick = index => {
    console.log('edit clicked for index: ', index);

    const tempActiveInvoice = {...merchantInvoiceData[index]}

    if (tempActiveInvoice.id == null){
      tempActiveInvoice.id = generateInvoiceId();
    }

    setActiveInvoice(tempActiveInvoice)
    setFormMode('edit')
    dispatch(showMessage("Invoice loaded.."))
  }

  const handleDeleteClick = index => {
    console.log('delete clicked for index: ', index);

    const tempMerchantInvoiceData = [...merchantInvoiceData]

    tempMerchantInvoiceData.splice(index, 1)
    setMerchantInvoiceData(tempMerchantInvoiceData)
    dispatch(showMessage("Delete successful.."))
  }



  // modes: 'create', 'edit', 'default'
  const getLivePricesForAllCurrencies = () => {
    fetch('https://bitpay.com/api/rates/BTC')
      .then(response => response.json())
      .then(data => {
        setFetchedCurrenciesInBtc(data);
        dispatch(showMessage("PRICES UPDATE"));
      } )
      .catch(error => console.log({error}));
  }

  useEffect(() => {
    setMerchantInvoiceData(merchantInvoiceDataConst)    
    setActiveInvoice({
      id: generateInvoiceId(),
      merchantName: 'GimmeGold',
      itemName: 'Gold bullion',
      amountCharged: 10.78654328,
      purchaseCurrency: 'ETH',
      defiValueToFiat: 0,
      amountOwed: 0
    })
    dispatch(showMessage('hello world'))

    dispatch(fetchLatestPrices())

    console.log({reduxValue});
    console.log('- first call -');
    
    // getLivePricesForAllCurrencies()
    

    timerId.current = setInterval(()=>{
        console.log('updating all coin prices!', new Date());
        dispatch(fetchLatestPrices())
    }, 30000)

    return () => {
      // timerId.current = null;
      clearInterval(timerId.current);

    }
  }, [])

  useEffect(() => {
    console.log({reduxValue});
    setFetchedCurrenciesInBtc(reduxValue);

  }, [reduxValue])
  

  const clearTimer = () => {
      // timerId.current = null;
      clearInterval(timerId.current);
      console.log('cleared!', timerId.current);
  }


  const findCurrentPrice = (symbol)=> {
    let result = 0;
    if (fetchedCurrenciesInBtc.length > 2){
      const currencyObj =  fetchedCurrenciesInBtc.find(currencies => currencies.code == symbol);
      result = currencyObj.rate;
    }
    return result;
  }

  const handleCreateInvoiceClick = () => {
    if (formMode != 'create'){
      setFormMode('create')
    }
  }

  const handleFormClose = () => {
      setFormMode('default')
    
  }


  return (
    <div>
        <div className="header-styles">
          <h1>BitpayMerchant</h1>
          <div>
            <span>Login</span>
            <button className="">Create Account</button>
          </div>
        </div>

        <div className="hero-banner" style={{}}>
          
          <div>
            <h1><span>Finaly! </span><br /> A way to track your crypto payments <br />all in one place</h1>
            <p>Think intuit for crypto</p>
            {/* <button>Start</button> */}
          </div>
          <div>
            <img src="/surr-465.png" alt="" height="" width="500"/>
          </div>
        </div>
        
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
  {/*
          <div>
            <button onClick={()=>dispatch(showMessage("Wow wow wow!"))}>Notify!</button>
            <span><button onClick={clearTimer}>Clear timer</button></span>
          </div>
       
       */}


        <div>
          <div className="table-heading-section">
            <h2>Global Invoice Table</h2>
            <div><button onClick={handleCreateInvoiceClick}><FaPlusSquare /> Create Invoice</button></div>
          </div>
          <table className="content">
            <thead>
              <tr>
                <th>#</th>
                <th>Merchant</th>
                <th>Item Name</th>
                <th>Amount Charged</th>
                <th>Purchase Currency</th>

                <th>Coin Price (USD)</th>
                <th>Amount Owed (USD)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            
        {merchantInvoiceData.map((invoiceData, index) => {
          const calculatedCoinPrice = (findCurrentPrice('USD') / findCurrentPrice(invoiceData.purchaseCurrency)).toFixed(2)
          const amountOwed = (calculatedCoinPrice * invoiceData.amountCharged).toFixed(2)
          
          return (
            <tr>
              <td>{index +1}</td>
                <td>{invoiceData.merchantName}</td>
                <td>{invoiceData.itemName}</td>
                <td>{invoiceData.amountCharged}</td>
                <td>{invoiceData.purchaseCurrency}</td>
                {/* <td>${invoiceData.defiValueToFiat}</td> */}
                <td>${<CountUp start={calculatedCoinPrice / 2} end={calculatedCoinPrice} duration={1}/> }</td>
                
                <td>${amountOwed}</td>
                <td style={{display: 'flex', justifyContent: 'space-around'}}> 
                  <span onClick={() => handleDeleteClick(index)}> <FaTrashAlt /> </span>  
                  <span onClick={() => handleEditClick(index)}> <FaEdit /> </span> 
                </td>
              </tr>
          )
        }
        )}
          </tbody>

          </table>
        </div>
        
        {formMode === 'default' ? <></> :
        <div className="form-entry">
          <span className="close-btn" onClick={handleFormClose}><FaWindowClose /></span>

          <h3> {formMode === 'create' ? <span>Add new</span> : <span>Edit</span> } Invoice</h3>



          <form onSubmit={e => handleSubmitActiveForm(e)}>
            {/* <input type="number" name="id" hidden value={activeInvoice.id > 0 ? activeInvoice.id : generateInvoiceId()}   onChange={e => handleUpdateActiveForm(e)}/> */}
            <select name="merchantName" id="" value={activeInvoice.merchantName} onChange={e => handleUpdateActiveForm(e)}>
              <option value="ShirtTown">ShirtTown</option>
              <option value="CrazyCups">CrazyCups</option>
              <option value="GimmeGold">GimmeGold</option>
            </select>
<br />
            <input type="text" name="itemName" value={activeInvoice.itemName} onChange={e => handleUpdateActiveForm(e)}/>
            <input type="text" name="amountCharged" placeholder="amountCharged" value={activeInvoice.amountCharged} onChange={e => handleUpdateActiveForm(e)}/>
            <br />

            {/* <label htmlFor="crto">Boom</label> */}
            <select name="purchaseCurrency" id="crto" value={activeInvoice.purchaseCurrency} onChange={e => handleUpdateActiveForm(e)}>
              { fetchedCurrenciesInBtc.map(currency => 
                <option value={currency.code}>{currency.name}</option>
                )}
            </select>
            <br />

            {/* <input type="number" name="defiValueToFiat" placeholder="defiValueToFiat" disabled value={activeInvoice.defiValueToFiat} onChange={e => handleUpdateActiveForm(e)}/> */}
            {/* <input type="number" name="amountOwed" placeholder="" disabled value={activeInvoice.amountOwed} onChange={e => handleUpdateActiveForm(e)}/> */}

            <br />
            <div style={{textAlign:'center'}}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        }
      </div>


      <footer style={{height: 300, backgroundColor: 'orange', marginTop: '50px'}}>

      </footer>
    </div>
  );
}

export default App;
