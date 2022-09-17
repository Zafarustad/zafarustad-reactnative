import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getProductsDispatch, getCategoriesDispatch} from '../redux/appSlice';
import Categories from '../Components/Categories';
import AddButton from '../Components/AddButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {products, categories, error, selectedFilter, filteredProducts} =
    useAppSelector(state => state.app);

  useEffect(() => {
    dispatch(getProductsDispatch());
    dispatch(getCategoriesDispatch());
  }, []);

  const productCard = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Details', {productId: item._id})}
      style={styles.productCard}>
      <Image
        style={styles.img}
        resizeMode="contain"
        source={{uri: item.avatar}}
      />
      <View style={styles.info}>
        <Text style={styles.infoText} numberOfLines={1}>
          Name: {item.name}
        </Text>
        <Text style={styles.infoText} numberOfLines={3}>
          Desc: {item.description}
        </Text>
        <Text style={styles.infoText}>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upayments Store</Text>
      {products && categories ? (
        <>
          <Categories selected={selectedFilter} />
          <View style={{flex: 1}}>
            <FlatList
              data={!selectedFilter ? products : filteredProducts}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productCont}
              numColumns={2}
              renderItem={productCard}
            />
          </View>
          <AddButton />
        </>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#5956E9'}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2'
  },
  title: {
    color: '#5956E9',
    fontSize: 22,
  },
  productCont: {
    marginTop: 20,
    flexDirection: 'row',
    paddingBottom: 140,
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  productCard: {
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: 230,
    backgroundColor: '#FFF',
    elevation: 6,
    marginVertical: 60
  },
  img: {
    width: '75%',
    height: '50%',
    position: 'absolute',
    alignSelf: 'center',
    top: -70,
    zIndex: 1,
    borderRadius: 100,
    elevation: 6,
    backgroundColor: '#FFF',
    resizeMode: 'contain'
  },
  info: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  infoText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    marginTop: 15,
    lineHeight: 20
  },
});
