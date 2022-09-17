import React, {SetStateAction, Dispatch, useId} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {filterProduct} from '../redux/appSlice';

type Props = {
  setCategory?: (val: string) => void;
  selected?: string;
  custom?: boolean;
};

const Categories: React.FC<Props> = ({setCategory, selected, custom}) => {
  const {categories} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  const newArr = categories?.filter(item => item.name !== 'All');

  console.log('categories', selected)

  return (
    <View>
      <FlatList
        data={!custom ? categories : newArr}
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 20}}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.category,
              {
                backgroundColor:
                  selected === item.name ? '#5956E9' : 'transparent',
              },
            ]}
            onPress={() =>
              !setCategory
                ? dispatch(filterProduct(item.name))
                : setCategory(item.name)
            }>
            <Text
              style={{
                fontSize: 15,
                color: selected === item.name ? '#FFF' : '#5956E9',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  category: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 10,
    borderColor: '#5956E9',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
