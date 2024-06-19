import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import localforage from 'localforage';
import { makeData } from '../components/Table/utils/makeData';
import { Person } from '../types/tableData';

export const TABLE_DATA_KEY = 'tableData';
export const TABLE_COLUMNS_KEY = 'columnsVisible';

export const usePersistentState = (
    initialState: Person[],
    key: string
): [
    Person[],
    Dispatch<SetStateAction<Person[]>>,
    { [key: string]: boolean },
    Dispatch<SetStateAction<{ [key: string]: boolean }>>,
    boolean,
    () => void
] => {
    const [data, setData] = useState<Person[]>(initialState);
    const [visibleData, setVisibleData] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedData = await localforage.getItem<Person[]>(TABLE_DATA_KEY);
                if (savedData && savedData.length > 0) {
                    setData(savedData);
                } else {
                    const initialData = makeData(2000) as Person[];
                    setData(initialData);
                    await localforage.setItem(TABLE_DATA_KEY, initialData);
                }

                const savedVisibilityData = await localforage.getItem<{ [key: string]: boolean }>(TABLE_COLUMNS_KEY);
                if (savedVisibilityData) {
                    setVisibleData(savedVisibilityData);
                }
            } catch (error) {
                console.error(`Error loading data from localforage with key ${key}:`, error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [key]);

    const updateData: Dispatch<SetStateAction<Person[]>> = (newData: SetStateAction<Person[]>) => {
        setData(prevData => {
            const nextState = typeof newData === 'function' ? (newData as (prevState: Person[]) => Person[])(prevData) : newData;
            localforage.setItem(TABLE_DATA_KEY, nextState).catch(error => {
                console.error(`Error saving updated data to localforage with key ${TABLE_DATA_KEY}:`, error);
            });
            return nextState;
        });
    };

    const updateVisibilityData: Dispatch<SetStateAction<{ [key: string]: boolean }>> = (
        newData: SetStateAction<{ [key: string]: boolean }>
    ) => {
        setVisibleData(prevData => {
            const nextState = typeof newData === 'function'
                ? (newData as (prevState: { [key: string]: boolean }) => { [key: string]: boolean })(prevData)
                : newData;
            localforage.setItem(TABLE_COLUMNS_KEY, nextState).catch(error => {
                console.error(`Error saving updated visibility data to localforage with key ${TABLE_COLUMNS_KEY}:`, error);
            });
            return nextState;
        });
    };

    const resetData = async () => {
        try {
            const initialData = makeData(2000) as Person[];
            const initialVisibilityData: { [key: string]: boolean } = {}; // Set your default visibility data here
            setData(initialData);
            setVisibleData(initialVisibilityData);
            await localforage.setItem(TABLE_DATA_KEY, initialData);
            await localforage.setItem(TABLE_COLUMNS_KEY, initialVisibilityData);
        } catch (error) {
            console.error('Error resetting data:', error);
        }
    };

    return [data, updateData, visibleData, updateVisibilityData, isLoading, resetData];
};
