import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getProductDetails} from '../redux/appSlice';
import {emptyDetails} from '../redux/appSlice';

const {width} = Dimensions.get('window');

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const Details: React.FC = () => {
  const {details} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  const {
    params: {productId},
  } = useRoute<DetailsScreenRouteProp>();

  useEffect(() => {
    dispatch(getProductDetails(productId));

    return () => {
      dispatch(emptyDetails(null));
    };
  }, []);

  return details ? (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image source={{uri: details.avatar}} style={styles.img} />
      </View>
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <Text style={styles.proName}>{details.name}</Text>
          <Text style={styles.proDesc}>{details.description}</Text>
          <View style={styles.proPrice}>
            <Text style={styles.priceTxt}>Price:</Text>
            <Text style={styles.price}>${details.price}</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.loader}>
      <ActivityIndicator size={35} color={'#000'} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  imgWrapper: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: width * 0.7,
    height: 400,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  detailsWrapper: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: 50,
    elevation: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  details: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  proName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  proDesc: {
    color: '#AAA',
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 17,
    textAlign: 'center',
  },
  proPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  priceTxt: {
    color: '#000',
    fontSize: 25,
    textAlign: 'right',
    marginRight: 30,
    marginTop: 20,
  },
  price: {
    color: '#5956E9',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'right',
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
