import React, {useState, FC} from 'react';
import {View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Input} from 'components/input';

interface Registrationrops {
  navigation?: any;
}

export const Registration: FC<Registrationrops> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const onPress = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(e => {
          console.log(e);
        })
        .then(() => {
          navigation.navigate('Login');
        });
    } catch (er: any) {
      setError(er);
    }
  };

  return (
    <View>
      <Input onChangeText={setEmail} text={email} />
      <Input
        secureTextEntry={true}
        onChangeText={setPassword}
        text={password}
      />
      <Input onChangeText={setUserName} text={userName} />
      <Button title="Registration" onPress={onPress} />
    </View>
  );
};
