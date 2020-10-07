import * as React from 'react';
import { StyleSheet, FlatList} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Mnemonic from '../components/Mnemonic';
import { useWalletStore, useCryptoStore, useBalanceStore } from '../store';
import Network from '../components/Network';
import { useObserver } from 'mobx-react';
import { Divider, List, ListItem } from '@ui-kitten/components';

interface Props { }

const Home = ({
   
}): JSX.Element =>{
  const { balanceStore } = useBalanceStore();
  const { cryptoStore } = useCryptoStore();
  const { walletStore } = useWalletStore();
  const listRef = React.useRef<FlatList<any>>(null);
  balanceStore.getBalances(cryptoStore.cryptos, walletStore.wallet).then(result =>{
      balanceStore.receiveState(result);
    })
  return useObserver(()=>
    <View>
       <List
                    ref={listRef}
                    data={balanceStore.balances.slice()}
                    keyExtractor={(item) => item.title }
                    renderItem={({ item }) =>
                    <Network
                      name={item.crypto.name}
                      sold={item.balance}
                      icon={'av-timer'}
                      textSize={12}
                    />
                        
                    }
                    />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
export default Home;