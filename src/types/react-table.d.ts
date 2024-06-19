import {FilterFn, RowData} from "@tanstack/react-table";
import {RankingInfo} from "@tanstack/match-sorter-utils";

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    getColumnType: (columnId: string) => string;
  }

  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }

  interface FilterMeta {
    itemRank: RankingInfo;
  }

  // @ts-ignore
  interface ColumnMeta<TData extends RowData> {
    type?: 'string' | 'number' | 'boolean' | 'select';
  }
}