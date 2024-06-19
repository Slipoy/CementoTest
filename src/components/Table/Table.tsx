import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {useVirtualizer} from '@tanstack/react-virtual';
import {
    ControlBar,
    StaledTable,
    StyledButton,
    StyledTbody,
    StyledThead,
    TableContainer,
} from './Table.styles';
import EditableCell from "../EditableCell/EditableCell";
import DebouncedInput from "../DebounceInput/DebounceInput";
import {fuzzyFilter} from "./utils/utils";
import {columnsData} from "./utils/makeData";
import {Person} from "../../types/tableData";


interface TableProps {
    data: Person[];
    setData: React.Dispatch<React.SetStateAction<Person[]>>;
    columnVisibilityData: { [key: string]: boolean }
    setColumnVisibilityData: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    resetData: () => void;
}

const Table: React.FC<TableProps> = ({
    data,
    setData,
    columnVisibilityData: columnVisibility,
    setColumnVisibilityData: setColumnVisibility,
    resetData:rerender
    }) => {
    const [globalFilter, setGlobalFilter] = useState('');


    const columns = useMemo<ColumnDef<Person>[]>(() => {
        return columnsData.map(col => ({
            id: col.id,
            order: col.ordinalNo,
            accessorKey: col.id,
            header: col.title,
            meta: {type: col.type},
            cell: ({getValue, row: {index}, column: {id}, table}) => (
                <EditableCell
                    value={getValue()}
                    rowIndex={index}
                    columnId={id}
                    updateData={table.options.meta}
                    table={table}
                />
            ),
        }));
    }, []);

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnVisibility,
            globalFilter,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'fuzzy',
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: {
            updateData: (rowIndex, columnId, value) => {
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            };
                        }
                        return row;
                    }),
                );
            },
            getColumnType: (columnId: string) => {
                const column = columns.find(col => {
                    return col.id === columnId;
                });

                return column?.meta?.type ?? 'string';
            },
        },
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const {rows} = table.getRowModel();
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 50,
        getScrollElement: () => tableContainerRef.current,
        overscan: 5,
    });
    useEffect(() => {
        rowVirtualizer.scrollToOffset(0);
    }, [globalFilter]);



    const renderHeaderColumns = () => {
        return (
            <StyledThead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} style={{width: '100%'}}>
                                    <div
                                        {...{
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </StyledThead>
        );
    };

    const renderTableBody = () => {
        return (
            <StyledTbody
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                }}>
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const row = rows[virtualRow.index];
                    return (
                        <tr
                            data-index={virtualRow.index}
                            ref={node => rowVirtualizer.measureElement(node)}
                            key={row.id}
                            style={{
                                transform: `translateY(${virtualRow.start}px)`,
                            }}>
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </StyledTbody>
        );
    };

    const renderControlBar = useCallback(() => {
        return (
            <ControlBar>
                <div className="section">
                    <p className="section-title">Visible columns</p>
                    {table.getAllLeafColumns().map(column => (
                        <div key={column.id} className="column-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={column.getIsVisible()}
                                    onChange={column.getToggleVisibilityHandler()}
                                />
                                <span>{column.id}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="section">
                    <p className="section-title">Search table</p>
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        placeholder="Search all columns..."
                    />
                </div>
                <div className="section">
                    <p className="section-title">
                        Get new data
                    </p>
                    <StyledButton onClick={() => rerender()} >
                        Regenerate
                    </StyledButton>
                </div>
            </ControlBar>
        );
    }, [table, globalFilter, setGlobalFilter]);


    return (
        <TableContainer ref={tableContainerRef}>
            <StaledTable>
                {renderHeaderColumns()}
                {renderTableBody()}
            </StaledTable>
            {
                renderControlBar()
            }
        </TableContainer>
    );
}

export default Table;
