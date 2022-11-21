import * as SecureStore from 'expo-secure-store';

export async function getToken() {
  const value = await SecureStore.getItemAsync('token');
  return value ? JSON.parse(value) : null;
}
export async function saveToken(value) {
  return SecureStore.setItemAsync('token', JSON.stringify(value));
}
export async function removeToken() {
  return SecureStore.deleteItemAsync('token');
}
