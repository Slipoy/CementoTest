import {FilterFn} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";

interface Row {
    getValue: (columnId: string) => any;
}
export const fuzzyFilter: FilterFn<Row> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({
        itemRank,
    });

    return itemRank.passed;
};