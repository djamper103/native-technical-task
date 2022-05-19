import {ButtonContainer} from 'components/common/button';
import {patternEmail} from 'components/common/login';
import {Input} from 'components/input';
import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface ResetPasswordProps {
  containerButton?: ViewStyle;
  stylesContainer?: ViewStyle;
  textStyleButton?: any;
  textError?: any;
  onPressButton: (value: string) => any;
}

export const ResetPassword: FC<ResetPasswordProps> = ({
  stylesContainer,
  containerButton,
  textStyleButton,
  textError,
  onPressButton,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = (data: any) => {
    onPressButton(data.email);
  };
  return (
    <View style={[styles.container, stylesContainer && stylesContainer]}>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: patternEmail,
        }}
        render={({field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            text={value}
            placeholder={'Your email'}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={textError}>Enter email correctly</Text>}
      <ButtonContainer
        onPress={handleSubmit(onSubmit)}
        text={'Reset password'}
        containerStyle={containerButton}
        textStyle={textStyleButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
