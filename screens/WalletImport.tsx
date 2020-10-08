import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import Mnemonic from '../components/Mnemonic';
import { useWalletStore } from '../store';
import { ethers } from "ethers";
import { useObserver } from 'mobx-react';
import { Avatar, Button, Divider, Text } from '@ui-kitten/components';


export default function WalletImport() {
  const { walletStore } = useWalletStore();
  const onAddWalletPressed = (mn: string) =>{
        let wallet = ethers.Wallet.fromMnemonic(mn);
        console.log(wallet.address);
        walletStore.receiveState({mnemonic: mn, publicKey:wallet.address});
  }
  return useObserver(()=>
  <React.Fragment>
  <View>
    <Mnemonic onImportMnemonic={onAddWalletPressed} onImportPrivateKey={onAddWalletPressed}></Mnemonic>
  </View>
  <Divider/>
</React.Fragment>
      
  );
}
const styles = StyleSheet.create({
 
});
