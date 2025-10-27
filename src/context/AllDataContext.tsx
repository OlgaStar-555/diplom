import {createContext, useContext} from "react";
import type { Dispatch, SetStateAction } from 'react';
import type {AllData} from "../types/allData.ts";

export interface AllDataContextType {
    allData: AllData | undefined;
    setAllData: Dispatch<SetStateAction<AllData | undefined>>;
    fetchAllData: () => Promise<void>;
    refreshAllData: (newData: AllData | undefined) => Promise<void>;
}

export const AllDataContext = createContext<AllDataContextType | undefined>(undefined);

const useAllData = () => {
    const context = useContext(AllDataContext);
    if (context === undefined) {
        throw new Error('useAllData must be used within a AllDataProvider');
    }
    console.log('context')

    console.log(context)

    console.log(context.allData)



    return context;
};

export default  useAllData

