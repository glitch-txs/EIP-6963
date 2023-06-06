"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import s from './s.module.scss'
import { useSyncProviders } from '../hooks/useSyncProviders';

const EIP6963 = () => {

  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')

  const providers = useSyncProviders()
  
  const handleConnect = async(providerWithInfo: EIP6963ProviderDetail)=> {

    const accounts = await providerWithInfo.provider
    .request({method:'eth_requestAccounts'})
    .catch(console.error)

    if(accounts?.[0]){
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    }
  }
 
  return (
    <div style={{display: 'flex', flexDirection:'column', gap:'14px', justifyContent: 'center', alignItems:'center'}}>
      <section className={s.section} >
      <div className={s.container} >
        {
          providers.length > 0 ? providers?.map((v: any)=>(
          <div key={v.info.uuid} className={s.wallet} onClick={()=>handleConnect(v)} >
            <span>{v.info.icon && <Image src={v.info.icon} width={30} height={30} alt=''/>} {v.info.name}</span>
          </div>
          )) :
          <div>
            there are no Announced Providers
          </div>
        }
      </div>
    </section>
      User Account: {userAccount}
    </div>
  )
}

export default EIP6963