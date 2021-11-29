import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react'
import '../styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { fireNotif } from '../redux/notificationsSlice';

import { FaEdit,  FaTrashAlt} from 'react-icons/fa';
import CountUp from 'react-countup';
import { fetchLatestPrices } from '../redux/cryptoPriceDataSlice';
import { CryptoTableHeader } from './CryptoTableHeader';
import { UpdateInvoiceForm } from './UpdateInvoiceForm';
import { IMerchantInvoice, IBitPayCurencyObj } from '../interfaces'

interface IReduxState {
  crypto: any;
}

const initialActiveInvoice : IMerchantInvoice = {
  id: '2',
  merchantName: 'tes',
  itemName: 'test',
  amountCharged: '0',
  purchaseCurrency: 'ETH',
  defiValueToFiat: '0',
  amountOwed: '0'
}

const CryptoDataTable:FC = () => {
  const dispatch = useDispatch()
  const receivedCurrencyData = useSelector((state: IReduxState) => state.crypto.fetchedCurrenciesInBtc)
  const [merchantInvoiceData, setMerchantInvoiceData] = useState<IMerchantInvoice[]>([])

  const generateInvoiceId = (): number => {
    const usedIds = merchantInvoiceData.map(invoice => invoice.id);

    let newId = Math.floor(Math.random() * 500)
    while( usedIds.includes(newId) ){
      console.log('ID already used: ', newId);
      newId = Math.floor(Math.random() * 500)
    }

    return newId;
  }
  // think about populating these fields on the form submission side
  const [activeInvoice, setActiveInvoice] = useState<IMerchantInvoice>(initialActiveInvoice);
  const [fetchedCurrenciesInBtc, setFetchedCurrenciesInBtc] = useState<IBitPayCurencyObj[]>([])
  const [formMode, setFormMode] = useState('default')
  const timerId = useRef<number>()
  const [requestInterval, setRequestInterval] = useState(30000)

  const merchantInvoiceDataConst : IMerchantInvoice[] = [
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

  const handleUpdateActiveForm = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void =>{
    const {name , value} = e?.target;
    console.log(name, value);

    let tempActiveInvoice: IMerchantInvoice;

    tempActiveInvoice = {...activeInvoice}
    tempActiveInvoice[name as keyof IMerchantInvoice] = value ;
    setActiveInvoice(tempActiveInvoice)
  } 

  // update the merchant invoice data table with the activeInvoice fields
  const handleSubmitActiveForm = (e: any) =>{
    e.preventDefault()
    const {name, value} = e.target;
    console.log('e.target: ', e.target)
    console.log('e: ', e)
    console.log(name, value);

    const tempMerchantInvoiceData = [...merchantInvoiceData]

    if (formMode === 'create'){
      const tempActiveInvoice = {...activeInvoice}

      tempActiveInvoice.amountCharged =  (Number(activeInvoice.amountCharged)).toFixed(8)
      tempMerchantInvoiceData.push(tempActiveInvoice);
      dispatch(fireNotif("Added New Invoice!"))
      setActiveInvoice({
        id: generateInvoiceId(),
        merchantName: 'GimmeGold',
        itemName: '',
        amountCharged: '0',
        purchaseCurrency: 'ETH',
        defiValueToFiat: '0',
        amountOwed: '0'
      })
    } else {
      const indexToUpdate =  tempMerchantInvoiceData.findIndex(invoiceData => invoiceData.id === activeInvoice.id)
      console.log({indexToUpdate});

      const tempActiveInvoice = {...activeInvoice}
      tempActiveInvoice.amountCharged =  (Number(tempActiveInvoice.amountCharged)).toFixed(8)

      tempMerchantInvoiceData[indexToUpdate] = tempActiveInvoice;
      dispatch(fireNotif("Edit successful!"))
    }
    
    handleFormClose()
    setMerchantInvoiceData(tempMerchantInvoiceData)
  } 

  const handleEditClick = (index: number) => {
    console.log('edit clicked for index: ', index);

    const tempActiveInvoice = {...merchantInvoiceData[index]}

    if (tempActiveInvoice.id === null){
      tempActiveInvoice.id = generateInvoiceId();
    }

    setActiveInvoice(tempActiveInvoice)
    setFormMode('edit')
    dispatch(fireNotif("Invoice loaded.."))
  }

  const handleDeleteClick = (index: number) => {
    console.log('delete clicked for index: ', index);

    const tempMerchantInvoiceData = [...merchantInvoiceData]

    tempMerchantInvoiceData.splice(index, 1)
    setMerchantInvoiceData(tempMerchantInvoiceData)
    dispatch(fireNotif("Delete successful.."))
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
    // dispatch(fireNotif('hello world'))

    dispatch(fetchLatestPrices())

    console.log({receivedCurrencyData: receivedCurrencyData});
    console.log('- first call -');
    
    // getLivePricesForAllCurrencies()
    

    timerId.current = window.setInterval(()=>{
        console.log('updating all coin prices!', new Date());
        dispatch(fetchLatestPrices())
    }, requestInterval)

    return () => {
      // timerId.current = null;
      clearInterval(timerId.current);

    }
  }, [])

  // Update the UI when new data is received
  useEffect(() => {
    setFetchedCurrenciesInBtc(receivedCurrencyData);
  }, [receivedCurrencyData])

  const handleIntervalUpdate =  (e: ChangeEvent<HTMLSelectElement>): void => {
    const newInterval = Number(e?.target.value)
    setRequestInterval(newInterval)
    dispatch(fireNotif("Request interval updated..."))

    clearInterval(timerId.current);
    timerId.current = window.setInterval(()=>{
        console.log('updating all coin prices!', new Date());
        dispatch(fetchLatestPrices())
    }, newInterval)

  }
  

  // const clearTimer = (): void=> {
  //     clearInterval(timerId.current);
  //     console.log('cleared!', timerId.current);
  // }

  const findCurrentPrice = (symbol: string): number=> {
    let result: any = 0;
    if (fetchedCurrenciesInBtc.length > 2){
      const currencyObj =  fetchedCurrenciesInBtc.find( (currencies: IBitPayCurencyObj) => currencies.code === symbol);
      result = currencyObj?.rate;
    }
    return result;
  }

  const handleCreateInvoiceClick = (): void => {
    if (formMode !== 'create'){
      setFormMode('create')
    }
  }

  const handleFormClose = (): void=> {
      setFormMode('default')
  }


  return (
    <div>
        <div >
            <div className="table-wrapper">
                <CryptoTableHeader 
                  handleCreateInvoiceClick={handleCreateInvoiceClick}
                  handleIntervalUpdate={handleIntervalUpdate} 
                  requestInterval={requestInterval}/>
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
                    const amountOwed = (Number(calculatedCoinPrice) * Number(invoiceData.amountCharged)).toFixed(2)
            
                    return (
                        <tr>
                        <td>{index +1}</td>
                            <td>{invoiceData.merchantName}</td>
                            <td>{invoiceData.itemName}</td>
                            <td>{invoiceData.amountCharged}</td>
                            <td>{invoiceData.purchaseCurrency}</td>
                            {/* <td>${invoiceData.defiValueToFiat}</td> */}
                            <td>${<CountUp start={Number(calculatedCoinPrice) / 2} end={Number(calculatedCoinPrice)} duration={1}/> }</td>
                            
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
