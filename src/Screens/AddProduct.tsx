import React, {useState} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
  TouchableOpacity,
} from 'react-native';
import Categories from '../Components/Categories';
import {addProductDispatch, setCategoryState} from '../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const {width} = Dimensions.get('window');

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useAppDispatch();
  const {selectedCategory} = useAppSelector(state => state.app);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      !title.trim() ||
      !price.trim() ||
      !desc.trim() ||
      !imgLink.trim() ||
      !category.trim()
    ) {
      Snackbar.show({
        text: 'Please Fill All Details!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#fd5a48',
        textColor: '#FFFFFF',
      });
    } else {
      let payload = {
        Name: title,
        Price: parseInt(price),
        Category: category,
        Description: desc,
        Avatar: imgLink,
        DeveloperEmail: 'zafarustad530@gmail.com',
      };
      dispatch(addProductDispatch(payload));
      setCategory('');
      navigation.goBack();
    }
  };

  const onSelectCategory = (val: string) => {
    setCategory(val);
    dispatch(setCategoryState(val));
  };

  return (
    <View style={styles.container}>
      <View
        style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Product Title"
          placeholderTextColor="#AAA"
          value={title}
          onChange={({
            nativeEvent: {text},
          }: NativeSyntheticEvent<TextInputChangeEventData>) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          placeholderTextColor="#AAA"
          keyboardType="number-pad"
          value={price}
          onChange={({
            nativeEvent: {text},
          }: NativeSyntheticEvent<TextInputChangeEventData>) => setPrice(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#AAA"
          textAlignVertical="top"
          value={desc}
          numberOfLines={5}
          onChange={({
            nativeEvent: {text},
          }: NativeSyntheticEvent<TextInputChangeEventData>) => setDesc(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Image Link"
          placeholderTextColor="#AAA"
          value={imgLink}
          onChange={({
            nativeEvent: {text},
          }: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setImgLink(text)
          }
          style={styles.input}
        />
      </View>
      <View style={{marginHorizontal: 10, padding: 10}}>
        <Text style={{color: '#5956E9', fontSize: 17}}>
          Selected Category: {category}
        </Text>
      </View>
      <Categories
        setCategory={onSelectCategory}
        selected={selectedCategory}
        custom={true}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.addBtn}
        onPress={onSubmit}>
        <Text style={{color: '#FFF', fontSize: 15}}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  input: {
    padding: 20,
    width: width * 0.9,
    margin: 10,
    fontSize: 17,
    borderColor: '#AAA',
    borderWidth: 1,
    color: '#000',
    borderRadius: 10,
  },
  addBtn: {
    padding: 10,
    backgroundColor: '#5956E9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 25,
    zIndex: 999,
  },
});
