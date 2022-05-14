import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SEARCH_ICON} from '../../constants/images';
import {useAppSelector} from '../../hooks/redux';
import {Input} from '../input';

interface SearchProps {
  onSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({onSearch}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const [text, onChangeText] = useState('');

  const searchItem = () => {
    onSearch(text);
    onChangeText('');
  };

  return (
    <Input
      placeholder="Search"
      text={text}
      rightIcon={SEARCH_ICON}
      containerStyle={styles.container}
      isTheme={isTheme}
      onChangeText={onChangeText}
      onPressRightIcon={searchItem}
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
