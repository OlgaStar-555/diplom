import {type ReactNode, useCallback, useEffect, useState} from 'react';
import {AllDataContext} from "./AllDataContext";
import type {AllData} from "../types/allData.ts";
import API from "../API.ts";

interface AllDataProviderProps {
    children: ReactNode;
}

const AllDataProvider = ({children}: AllDataProviderProps) => {
    const [allData, setAllData] = useState<AllData | undefined>(undefined);

    const fetchAllData = useCallback(async () => {
        try {
            const result = await API.getAllData();
            if (result) {
                setAllData(result);

                console.log('\n\n\n\n\t\t\t!!!!!!!!!!!!!!!!!\t\tF E E E E\n\n');
                console.log('\n\n\n\n\t\t\t!!!!!!!!!!!!!!!!!\t\tresult\n\n');
                console.log(result);
            }
        } catch (error) {
            console.error("Ошибка при получении данных: ", error);
        }
    }, []);

    const refreshAllData = useCallback(async (newData: AllData | undefined) => {
        console.log('\n\n\nREFRESH\n\n\n')

        console.log(newData)


        console.log({...allData, ...newData})


        try {
            if (newData) {
                const laaa = {...allData, ...newData}

                console.log('laaa')
                console.log(laaa)

                setAllData((prevState) => {
                    const xxx = {...prevState, ...newData}
                    console.log({...prevState, ...newData})
                    console.log(xxx)
                    return xxx
                })
            }
        } catch (error) {
            console.error("Ошибка при получении данных: ", error);
        } finally {
            console.log('\n\n\nEND REFRESH\n\n\n')
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData, refreshAllData]);


    return (
        <AllDataContext.Provider value={{allData, setAllData, fetchAllData, refreshAllData}}>
            {children}
        </AllDataContext.Provider>
    );
};

export default AllDataProvider