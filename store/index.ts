import React from 'react';

import WalletStore from './walletStore';

const wStore = {
    walletStore: WalletStore,
}
const walletStoreContext = React.createContext(wStore);



export const useWalletStore = () => React.useContext(walletStoreContext);

