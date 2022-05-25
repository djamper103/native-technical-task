import axios from 'axios';

export const fetchFunc = async (url: string, thunkAPI?: any) => {
  if (thunkAPI) {
    try {
      const {data} = await axios.get<Object>(url);
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  } else {
    const {data} = await axios.get<Object>(url);
    return data;
  }
};
