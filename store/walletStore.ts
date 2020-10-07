import { types, flow, applySnapshot, onSnapshot } from 'mobx-state-tree';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash/debounce';

const storageID = 'walletStore';
import Web3 from 'web3';

let web3 = new Web3("https://rinkeby.infura.io/v3/57299d9b36d646778097ce7758c02deb");

const Wallet = types
    .model('Wallet', {
        network: types.string,
        balance:types.number,
        mnemonic: types.string,
        publicKey: types.string,
        active: types.boolean
    }).actions((self) => {
        const setBalance = (balance:number) => {
            self.balance = balance;
        };
        return {
            setBalance
        };
    });
const WalletsPosts = types
    .model('walletsPosts', {
        walletId: types.identifier,
        isFetching: types.boolean,
        error: types.maybeNull(types.string),
        wallets: types.array(types.frozen()),
    })
    .actions((self) => {
        const fetchState = () => {
            self.error = null;
            self.isFetching = true;
        };

        const errorState = (e: string) => {
            self.error = e;
            self.isFetching = false;
        };

        const receiveState = (items: any) => {
            self.error = null;
            self.isFetching = false;
            self.wallets = items;
        };

        return {
            fetchState,
            errorState,
            receiveState,
        };
    });

const WalletStore = types
    .model('WalletStore', {
        selectedWallet: types.string,
        wallets: types.array(Wallet),
        postsBySubr: types.map(WalletsPosts),
    })
    .actions((self) => {
        const selectWallet = (wallet: string) => {
            self.selectedWallet = wallet;
        };

        const addWallet = (mnemonic: string) => {
            console.log(mnemonic+' '+self.wallets.length);
            // check on duplicates
            if (!self.wallets.find((sr) => sr.mnemonic === mnemonic)) {
                self.wallets.push({  network: 'mainnet',
                balance:0,
                    mnemonic: 'dumb name bunker more evil verify rally follow addict flavor produce benefit',
                    publicKey: '0xebA77334af32eA44b53E1b494Ee918c07878DAcE',
                    active: false });
            }
        };
        const deleteWallet = (mnemonic: string) => {
            const filtered = self.wallets.filter((sr) => sr.mnemonic !== mnemonic);
            self.wallets = filtered as any;
        };
        
        const getWallets = async() => {
            for(let item of self.wallets){
                let solde = await web3.eth.getBalance(item.publicKey);
                item.setBalance(parseInt(solde));
              }
            console.log(self.wallets);                
            return self.wallets;  
        };
        
        return {
            selectWallet,
            addWallet,
            deleteWallet,
            getWallets,
        };
    })
    .create({
        selectedWallet: '',
        wallets: [{network: 'mainnet',
        balance:0,
        mnemonic: 'dumb name bunker more evil verify rally follow addict flavor produce benefit',
        publicKey: '0xebA77334af32eA44b53E1b494Ee918c07878DAcE',
        active: false}],
        postsBySubr: {},
    });

// persisting the stores
onSnapshot(WalletStore, debounce(
    (snapshot) => AsyncStorage.setItem(storageID, JSON.stringify(snapshot)),
    1000,
));

export default WalletStore;
