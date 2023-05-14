"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import s from './s.module.scss'
import useMock from '../hooks/useMock';

interface EIP6963AnnouncedProvider {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

interface EIP6963ProviderInfo {
  walletId: string;
  uuid: string;
  name: string;
  icon: string;
}

/* Type EIP1193Provider is documented at EIP-1193 */
interface EIP1193Provider {
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  request: (request: { method: string, params?: Array<any> }) => Promise<any>
}

const EIP6963 = () => {

  const [announcedProvider, setAnnouncedProvider] = useState<EIP6963AnnouncedProvider[]>([])
  const [selectedWallet, setSelectedWallet] = useState<EIP6963AnnouncedProvider>()
  const [userAccount, setUserAccount] = useState<string>('')

  useEffect(()=>{
    function onPageLoad() {
      window.addEventListener(
        "message",
        (event: MessageEvent) => {
          if (event.data.eventName === "eip6963:announceProvider") {
            const newProviderUUID = event.data.announcedProvider.info.uuid
            setAnnouncedProvider(p => [...p.filter(p => p.info.uuid !== newProviderUUID), event.data.announcedProvider])
          }
        }
      );
      window.postMessage({ eventName: "eip6963:requestProvider" });
    }

    onPageLoad()
  },[])

  const handleConnect = async(providerWithInfo: EIP6963AnnouncedProvider)=> {
    const accounts = await providerWithInfo.provider.request({method:'eth_requestAccounts'}).catch(console.error)
    if(accounts?.[0]){
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    }
  }

  // const { testProviders } = useMock()

  return (
    <div style={{display: 'flex', flexDirection:'column', gap:'14px'}}>
      <section className={s.section} >
      <div className={s.container} >
        {
          announcedProvider.length > 1 ? announcedProvider?.map((v)=>(
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