import React, { FC } from 'react'
import { FaAlgolia} from 'react-icons/fa';


const Navigation: FC = ()=> {
    return (
        <div className="header-styles">
          <h1><FaAlgolia />Bitpay - Merchant</h1>
          <div>
            <button className="">Create Account</button>
          </div>
        </div>
    )
}

export default Navigation
