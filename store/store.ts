import { types, flow, applySnapshot, onSnapshot } from 'mobx-state-tree';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash/debounce';
const storageID = 'walletStore';
import Web3 from 'web3';

let web3 = new Web3('https://rinkeby.infura.io/v3/57299d9b36d646778097ce7758c02deb');

const Wallet = types
    .model('Wallet', {
        mnemonic: types.maybeNull(types.string),
        publicKey: types.string,
        privateKey: types.maybeNull(types.string),
        active: types.maybeNull(types.boolean)
    }).actions((self) => {
        const setPublicKey = (publicKey:string) => {
            self.publicKey = publicKey;
        };
        const setPrivateKey = (privateKey:string) => {
            self.privateKey = privateKey;
        };
        const setMnemonic = (mnemonic:string) => {
            self.mnemonic = mnemonic;
        };
        const setActive = (active:boolean) => {
            self.active = active;
        };
        return {
            setPublicKey,
            setPrivateKey,
            setMnemonic,
            setActive
        };
    });
    const Crypto = types
    .model('Crypto', {
        name: types.maybeNull(types.string),
        symbol: types.string,
        icon: types.maybeNull(types.string),
        active: types.maybeNull(types.boolean),
        type:types.maybeNull(types.string)
    }).actions((self) => {
        const setName = (name:string) => {
            self.name = name;
        };
        const setSymbol = (symbol:string) => {
            self.symbol = symbol;
        };
        const setIcon = (icon:string) => {
            self.icon = icon;
        };
        const setActive = (active:boolean) => {
            self.active = active;
        };
        const setType = (type:string) => {
            self.type = type;
        };
        return {
            setName,
            setSymbol,
            setIcon,
            setActive
        };
    });    
const CryptoStore = types
    .model('walletsPosts', {
        selectedCrypto: types.string,
        cryptoId: types.identifier,
        isFetching: types.boolean,
        error: types.maybeNull(types.string),
        cryptos: types.array(types.frozen()),
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
            self.cryptos = items;
        };

        return {
            fetchState,
            errorState,
            receiveState,
        };
    }).create({
        selectedCrypto: '',
        cryptoId: '2',
        isFetching: false,
        error: 'null',
        cryptos: [
            {name: 'Ethereum', symbol:'ETC', icon: 'ethereum', type:'main'},
            {name: 'Litcoin', symbol:'LTC', icon: 'litcoin', type:'token'},
            {name: 'Chainlink', symbol:'LINK', icon: 'chainlink', type:'token'},
            {name: 'Rinkeby', symbol:'RKB', icon: 'rinkeby', type:'test'},
            {name: 'Robsten', symbol:'RBS', icon: 'robsten', type:'test'},
        ],
    });
const WalletStore = types
    .model('WalletStore', {
        walletId: types.identifier,
        isFetching: types.boolean,
        error: types.maybeNull(types.string),
        wallet: Wallet
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
    
            const receiveState = (wallet: any) => {
                self.error = null;
                self.isFetching = false;
                self.wallet = wallet;
            };
    
            return {
                fetchState,
                errorState,
                receiveState,
            };
        }).create({
            walletId:'2',
            isFetching: false,
            error: 'null',
            wallet: {mnemonic: 'dumb name bunker more evil verify rally follow addict flavor produce benefit', privateKey:'', publicKey: '0xebA77334af32eA44b53E1b494Ee918c07878DAcE', active:false},
        });
    const Blance = types
        .model('Blance', {
            wallet: types.maybeNull(Wallet),
            crypto: types.maybeNull(Crypto),
            balance: types.number
        });
    const BalanceStore = types
        .model('BalanceStore', {
            selectedCrypto: types.string,
            cryptoId: types.identifier,
            isFetching: types.boolean,
            error: types.maybeNull(types.string),
            balances: types.array(types.frozen()),
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
                self.balances = items;
            };
            const getBalances = async(cryptos:any[],wallet:any) => {
                if(wallet.publicKey !== ''){
                    let bc = [];
                    for(let crypto of cryptos){
                        let solde = await web3.eth.getBalance(wallet.publicKey);
                        bc.push({wallet:wallet, crypto: crypto, balance: solde});
                        
                    }
                    console.log(bc); 
                    return bc;
                }  
            };
            return {
                fetchState,
                errorState,
                receiveState,
                getBalances
            };
        }).create({
            selectedCrypto: '',
            cryptoId: '2',
            isFetching: false,
            error: 'null',
            balances:[],
        });            
// persisting the stores
onSnapshot(CryptoStore, debounce(
    (snapshot) => AsyncStorage.setItem(storageID, JSON.stringify(snapshot)),
    1000,
));

export default {CryptoStore, WalletStore, BalanceStore};
