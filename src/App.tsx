import React, {FC} from 'react'
import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';

import CryptoDataTable from './components/CryptoDataTable';
import Navigation from './components/Navigation';
import HeroBannerSection from './components/HeroBannerSection';

const App: FC = ()=> {

  return  (
    <>
      <Navigation />
      <HeroBannerSection />
      
      <CryptoDataTable />
    </>
  )
}

export default App;
