import React from 'react';
import { Alert, Button, TextInput, Text, View, StyleSheet } from 'react-native';

import { ethers } from "ethers";

interface Props {
  onAddWallet: (mn: string) => void;
}
 
const Mnemonic : React.FC<Props> = ({
  onAddWallet,
}): JSX.Element => {
  const [value, onChangeText] = React.useState('');
  const importM = ()=>{
    const mnemonic = value.trim();
    if (mnemonic !== '') {
      onAddWallet(mnemonic);
      onChangeText('');
  }
    //let wallet = ethers.Wallet.fromMnemonic(value);
    //Alert.alert(wallet.address);
  } 
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    <Button
        title="import"
        onPress={() =>importM()}
    />    
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
  },
  input: {
      flex: 1,
      borderColor: 'lightgray',
      borderRadius: 10,
      padding: 8,
      borderWidth: 1,
      fontSize: 22,
  },
  buttonContainer: {
      marginLeft: 16,
  },
  buttonText: {
      fontSize: 32,
  },
});
export default Mnemonic;