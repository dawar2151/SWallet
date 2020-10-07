import React from 'react';

import store from './store';

const WStore = {
    walletStore: store.WalletStore,
}
const walletStoreContext = React.createContext(WStore);

const CStore = {
    cryptoStore: store.CryptoStore,
}
const cryptoStoreContext = React.createContext(CStore);

const BStore = {
    balanceStore: store.BalanceStore,
}
const balanceStoreContext = React.createContext(BStore);



export const useWalletStore = () => React.useContext(walletStoreContext);
export const useCryptoStore = () => React.useContext(cryptoStoreContext);
export const useBalanceStore = () => React.useContext(balanceStoreContext);

