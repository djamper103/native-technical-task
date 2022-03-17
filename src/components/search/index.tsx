import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SEARCH_ICON} from '../../constants/images';
import {Input} from '../input';

interface SearchProps {
  onSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({onSearch}) => {
  const [text, onChangeText] = useState('');

  const searchItem = () => {
    onSearch(text);
  };

  return (
    <Input
      placeholder="Search"
      text={text}
      rightIcon={SEARCH_ICON}
      onChangeText={onChangeText}
      onPressRightIcon={searchItem}
      containerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
