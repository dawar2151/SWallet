import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Mnemonic from '../components/Mnemonic';
import { useWalletStore } from '../store';
import { ethers } from "ethers";
import { useObserver } from 'mobx-react';

export default function WalletImport() {
  const { walletStore } = useWalletStore();
  const onAddWalletPressed = (mn: string) =>{
        let wallet = ethers.Wallet.fromMnemonic(mn);
        console.log(wallet.address);
        walletStore.receiveState({mnemonic: mn, publicKey:wallet.address});
  }
  return useObserver(()=>
    <View style={styles.container}>
      <Mnemonic onAddWallet={onAddWalletPressed}></Mnemonic>
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
