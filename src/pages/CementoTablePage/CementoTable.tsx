import React from 'react';
import {TABLE_DATA_KEY, usePersistentState} from "../../hooks/usePersistentState";
import Table from "../../components/Table/Table";



export const CementoTable = () => {

    const [
        tableData,
        setTableData,
        visibleData,
        updateVisibilityData,
        isLoading,
        resetData,
    ] = usePersistentState([]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table data={tableData}
                   setData={setTableData}
                   columnVisibilityData={visibleData}
                   setColumnVisibilityData={updateVisibilityData}
                   resetData={resetData}

            />
        </div>
    );
};
