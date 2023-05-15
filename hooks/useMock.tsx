import { useEffect, useState } from 'react'

declare global{
  interface Window {
    ethereum?:any;
  }
}

interface EIP6963ProviderDetail {
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

const base64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjAvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQiPg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgdmVyc2lvbj0iMS4wIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDY0IDY0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjMzk0MjQwIiBkPSJNNTIsNjMuOTk5Yy0xLjAzOSwwLTIuMDYyLTAuNDA2LTIuODI4LTEuMTcyTDMyLDQ1LjY1NUwxNC44MjgsNjIuODI3DQoJCWMtMS4xNDgsMS4xNDUtMi44NjMsMS40ODgtNC4zNTksMC44NjdDOC45NzMsNjMuMDc3LDgsNjEuNjE2LDgsNTkuOTk5di01NmMwLTIuMjExLDEuNzg5LTQsNC00aDQwYzIuMjExLDAsNCwxLjc4OSw0LDR2NTYNCgkJYzAsMS42MTctMC45NzMsMy4wNzgtMi40NjksMy42OTVDNTMuMDM1LDYzLjkwMSw1Mi41MTYsNjMuOTk5LDUyLDYzLjk5OXogTTMyLDM1Ljk5OWMxLjAyMywwLDIuMDQ3LDAuMzkxLDIuODI4LDEuMTcyTDQ4LDUwLjM0Mw0KCQlWNy45OTlIMTZ2NDIuMzQ0bDEzLjE3Mi0xMy4xNzJDMjkuOTUzLDM2LjM5LDMwLjk3NywzNS45OTksMzIsMzUuOTk5eiIvPg0KCTxwYXRoIGZpbGw9IiNGNzZENTciIGQ9Ik0zMiwzNS45OTljMS4wMjMsMCwyLjA0NywwLjM5MSwyLjgyOCwxLjE3Mkw0OCw1MC4zNDNWNy45OTlIMTZ2NDIuMzQ0bDEzLjE3Mi0xMy4xNzINCgkJQzI5Ljk1MywzNi4zOSwzMC45NzcsMzUuOTk5LDMyLDM1Ljk5OXoiLz4NCjwvZz4NCjwvc3ZnPg=='

const useMock = () => {

  const [testProviders, setTestProviders] = useState<EIP6963ProviderDetail[]>([])

  useEffect(()=>{
    if(!window?.ethereum) return

    setTestProviders([{
      info:{
        uuid:'1',
        name:'MetaMask',
        walletId: '',
        icon:base64
      },
      provider: window.ethereum 
    },
    {
      info:{
        uuid:'2',
        name:'Coinbase',
        walletId: '',
        icon:base64
      },
      provider: window.ethereum 
    },
    {
      info:{
        uuid:'3',
        name:'Trust Wallet',
        walletId: '',
        icon:base64
      },
      provider: window.ethereum
    },
    {
      info:{
        uuid:'4',
        name:'Phantom',
        walletId: '',
        icon:base64
      },
      provider: window.ethereum
    }
    ])
  },[])
  
  return {testProviders}
}

export default useMock