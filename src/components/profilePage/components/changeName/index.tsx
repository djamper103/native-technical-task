import {ButtonContainer} from 'components/common/button';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {dw} from 'utils/dimensions';

interface ChangeNameContainerProps {
  onPress: (value: string) => void;
}

export const ChangeNameContainer: FC<ChangeNameContainerProps> = ({
  onPress,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const onSubmit = (data: any) => {
    onPress(data.name);
  };
  return (
    <View>
      <View>
        <Controller
          control={control}
          rules={{
            maxLength: 15,
            minLength: 3,
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <Input
              onChangeText={onChange}
              text={value}
              placeholder={'Your name'}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.text}>
            Enter your name, minimum length is 2 letters
          </Text>
        )}
      </View>
      <ButtonContainer
        text="Change name"
        onPress={handleSubmit(onSubmit)}
        containerStyle={styles.containerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    marginVertical: dw(20),
  },
  text: {
    color: COLORS.RED,
    fontSize: 16,
    textAlign: 'center',
  },
});
