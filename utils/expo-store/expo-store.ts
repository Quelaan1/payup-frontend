import * as SecureStore from 'expo-secure-store';

export async function saveValueToSecureStore(key: any, value: any) {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		throw 'Error saving value to SecureStore.';
	}
}

export async function getValueFromSecureStoreAsync(key: any) {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		throw 'No values stored under that key.';
	}
}

export function getValueFromSecureStore(key: any) {
	const result = SecureStore.getItem(key);

	if (result) {
		return result;
	} else {
		console.error('No values stored under that key.');
	}
}
