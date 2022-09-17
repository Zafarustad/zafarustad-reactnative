import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {axiosInstance} from '../services/api';
import {Category, Product, ProductState} from './types';
import {useId} from 'react';

const initialState: ProductState = {
  products: null,
  filteredProducts: null,
  categories: null,
  loading: false,
  error: null,
  detailError: null,
  details: null,
  selectedFilter: '',
  selectedCategory: '',
};

export const productslice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    filterProduct: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') {
        state.selectedFilter = '';
      } else {
        const filteredArr = state.products?.filter(
          item => item.category === action.payload,
        );
        state.filteredProducts = filteredArr;
        state.selectedFilter = action.payload;
      }
    },
    setCategoryState: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setDetailsError: (state, action: PayloadAction<string>) => {
      state.detailError = action.payload;
    },
    emptyDetails: (state, action: PayloadAction<null>) => {
      state.details = action.payload;
    },
    addProduct: (state, action: PayloadAction<object>) => {
      let newObj = {
        avatar: action.payload.Avatar,
        category: action.payload.Category,
        description: action.payload.Description,
        name: action.payload.Name,
        price: action.payload.Price,
      };

      const newArr = [newObj, ...(<[]>state.products)];
      console.log(newArr);
      state.selectedFilter = '';
      state.products = newArr;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductsDispatch.fulfilled, (state, {payload}) => {
      state.products = payload;
    });
    builder.addCase(getCategoriesDispatch.fulfilled, (state, {payload}) => {
      const newArr = [{_id: '123#abc', name: 'All'}, ...payload];
      state.categories = newArr;
    });
    builder.addCase(getProductDetails.fulfilled, (state, {payload}) => {
      state.details = payload;
    });
  },
});

export default productslice.reducer;

export const {
  setError,
  setDetailsError,
  filterProduct,
  addProduct,
  setCategoryState,
  emptyDetails,
} = productslice.actions;

export const getProductsDispatch = createAsyncThunk<Product[]>(
  'product/fetchProducts',
  async (_, {dispatch}) => {
    try {
      const res = await axiosInstance.get('/products');
      return res.data.products;
    } catch (err: any) {
      dispatch(setError('Something went wrong'));
    }
  },
);

export const getCategoriesDispatch = createAsyncThunk<Category[]>(
  'product/fetchCategories',
  async (_, {dispatch}) => {
    try {
      const res = await axiosInstance.get('/categories');
      return res.data.categories;
    } catch (err: any) {
      dispatch(setError('Something went wrong'));
    }
  },
);

export const getProductDetails = createAsyncThunk(
  'product/fetchDetails',
  async (productId: string | undefined, {dispatch}) => {
    try {
      const res = await axiosInstance.get(`/products/${productId}`);
      return res.data.product;
    } catch (err: any) {
      dispatch(setDetailsError('Something went wrong'));
    }
  },
);

export const addProductDispatch = createAsyncThunk(
  'product/addProduct',
  async (data: object, {dispatch}) => {
    try {
      const res = await axiosInstance.post('/products', data);
      console.log('add-product', res.data);
      dispatch(addProduct(data));
    } catch (err: any) {
      console.log(err.response.data);
    }
  },
);
