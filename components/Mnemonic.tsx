import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { Divider, Input, Button, Icon, Radio, RadioGroup, Text } from '@ui-kitten/components';

interface Props {
  onImportMnemonic: (mn: string) => void;
  onImportPrivateKey: (mn: string) => void;
}
 
const Mnemonic : React.FC<Props> = ({
  onImportMnemonic,
  onImportPrivateKey
}): JSX.Element => {
  const [mnemonic, onChangeMnemonic] = React.useState('');
  const [privateKey, onChangePrivateKey] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const importMnemonic = ()=>{
    if (mnemonic.trim() !== '') {
      onImportMnemonic(mnemonic.trim());
      onChangeMnemonic('');
    }
  } 
  const importPrivateKey = ()=>{
    if (privateKey.trim() !== '') {
      onImportPrivateKey(mnemonic.trim());
      onChangePrivateKey('');
    }
  }  
  const StarIcon = (props:any) => (
    <Icon {...props} name='star'/>
  );
  let view;
    if (selectedIndex == 0) {
      view = <View style={styles.bottom}>
      <Input 
        onChangeText={text => onChangePrivateKey(text)}
        placeholder='Private key'
        value={privateKey}
      />
      <Divider/>
      <Button status='primary' onPress={() =>importPrivateKey()}>
          Import Private Key
      </Button> 
    </View>;
    } else {
      view =  <View style={styles.middle}>
      <Input 
        onChangeText={text => onChangeMnemonic(text)}
        placeholder='Menemonic'
        value={mnemonic}
      />
      <Divider/>
      <Button status='primary' onPress={() =>importMnemonic()}>
          Import Mnemonic
      </Button> 
    </View>;
    }
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
      <Text  category='p1'>Import wallet using mnemonic or private key</Text>
      <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          <Radio>Mnemonic </Radio>
          <Radio>Private Key</Radio>
        </RadioGroup>
      </View>
      {view}
  </View>
  );
} 
const styles = StyleSheet.create({
  container: {
   margin:20
  },
  top: {
    
  },
  middle: {
  },
  bottom: {
    
  },
});
export default Mnemonic;