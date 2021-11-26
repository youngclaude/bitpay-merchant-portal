import React,{useEffect, useRef, useState} from 'react'
import '../styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from '../redux/notificationsSlice';

import { FaEdit,  FaTrashAlt} from 'react-icons/fa';
import CountUp from 'react-countup';
import { fetchLatestPrices } from '../redux/cryptoPriceDataSlice';
import { CryptoTableHeader } from './CryptoTableHeader';
import { UpdateInvoiceForm } from './UpdateInvoiceForm';

function CryptoDataTable() {
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
      setActiveInvoice({
        id: generateInvoiceId(),
        merchantName: 'GimmeGold',
        itemName: '',
        amountCharged: 0,
        purchaseCurrency: 'ETH',
        defiValueToFiat: 0,
        amountOwed: 0
      })
    } else {
      const tempIndexToEdit =  tempMerchantInvoiceData.findIndex(invoiceData => invoiceData.id === activeInvoice.id)
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

    if (tempActiveInvoice.id === null){
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


  useEffect(() => {
    setMerchantInvoiceData(merchantInvoiceDataConst)    
    setActiveInvoice({
      id: generateInvoiceId(),
      merchantName: 'GimmeGold',
      itemName: 'Gold bullion',
      amountCharged: 8.453,
      purchaseCurrency: 'ETH',
      defiValueToFiat: 0,
      amountOwed: 0
    })
    // dispatch(showMessage('hello world'))

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
  

  // const clearTimer = () => {
  //     clearInterval(timerId.current);
  //     console.log('cleared!', timerId.current);
  // }


  const findCurrentPrice = (symbol)=> {
    let result = 0;
    if (fetchedCurrenciesInBtc.length > 2){
      const currencyObj =  fetchedCurrenciesInBtc.find(currencies => currencies.code === symbol);
      result = currencyObj.rate;
    }
    return result;
  }

  const handleCreateInvoiceClick = () => {
    if (formMode !== 'create'){
      setFormMode('create')
    }
  }

  const handleFormClose = () => {
      setFormMode('default')
    
  }


  return (
    <div>
        <div >
            <div className="table-wrapper">
                <CryptoTableHeader handleCreateInvoiceClick={handleCreateInvoiceClick} />
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
                    })}
                    </tbody>

                </table>
                
            {formMode === 'default' ? <></> :
            <UpdateInvoiceForm 
                handleFormClose={handleFormClose}
                handleUpdateActiveForm={handleUpdateActiveForm}
                handleSubmitActiveForm={handleSubmitActiveForm}
                fetchedCurrenciesInBtc={fetchedCurrenciesInBtc}
                activeInvoice={activeInvoice}
                formMode={formMode}
            />
            }
            </div>
        
      </div>


      <footer >
                Link to project repo <a href="https://github.com/youngclaude/bitpay-merchant-portal">HERE.</a>
      </footer>
    </div>
  );
}

export default CryptoDataTable;
