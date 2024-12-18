import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = "links-storage";

export type LinkStorage = {
    id: string,
    name: string,
    url: string,
    category: string
}

async function get(): Promise<LinkStorage[]> {
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
}

async function remove(id: string) {
    try {
        const storage = await get();
        const updated = storage.filter(link => link.id !== id);

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));

    } catch (error) {
        throw error;
    }
}

async function save(new_link: LinkStorage) {
    try {
        const storage = await get();
        const updated = JSON.stringify([...storage, new_link]);

        await AsyncStorage.setItem(
            LINKS_STORAGE_KEY,
            updated
        );
    } catch (error) {
        throw error;
    }
}

export const linkStorage = { get, save, remove };