import * as React from 'react';
import { StyleSheet, FlatList, Button} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Mnemonic from '../components/Mnemonic';
import { useWalletStore } from '../store';
import Network from '../components/Network';
import { useObserver } from 'mobx-react';
import { Wallet } from 'ethers';

let wallets:any = [];
interface Props { }

const TabOneScreen = ({
   
}): JSX.Element =>{
  const { walletStore } = useWalletStore();
  const listRef = React.useRef<FlatList<any>>(null);
  const [data, setData] = React.useState(0);

  walletStore.getWallets().then(result =>{
    setData(result);
  })
  const refresh = ()=>{
    walletStore.getWallets().then(result =>{
      setData(result);
    })
  }
  return useObserver(()=>
    <View style={styles.container}>
       <FlatList
                    ref={listRef}
                    //onContentSizeChange={listScrollToBottom}
                    //onLayout={listScrollToBottom}
                    data={walletStore.wallets.slice()}
                    keyExtractor={(item) => item.title }
                    renderItem={({ item }) =>
                    <Network
                    name={item.publicKey}
                    sold={item.balance}
                    textSize={12}
                    />
                        
                    }
                    />
                     <Button
        title="import"
        onPress={() =>refresh()}
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
export default TabOneScreen;