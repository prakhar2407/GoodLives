import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncDataStorage {
  storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      throw Error(`Store Data Error: ${e}`);
    }
  };

  getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      throw Error(`Get Data Error: ${e}`);
    }
  };

  async removeData(storageKey: string) {
    try {
      AsyncStorage.removeItem(storageKey);
    } catch (e) {
      throw Error(`Remove Data Error: ${e}`);
    }
  }
}

export const asyncStorageObject = new AsyncDataStorage();
