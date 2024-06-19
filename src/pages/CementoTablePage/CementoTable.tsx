import React from 'react';
import {Container} from './CementoTable.styles';
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
    ] = usePersistentState([], TABLE_DATA_KEY);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Table data={tableData}
                   setData={setTableData}
                   columnVisibilityData={visibleData}
                   setColumnVisibilityData={updateVisibilityData}
                   resetData={resetData}

            />
        </Container>
    );
};
