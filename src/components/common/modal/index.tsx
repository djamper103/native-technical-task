import React, {FC} from 'react';
import {Modal, StyleSheet} from 'react-native';

interface ModalContainerProps {
  children?: any;
  isModal?: boolean;
  onPress: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  isModal,
  onPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModal}
      onRequestClose={onPress}
      style={styles.container}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
