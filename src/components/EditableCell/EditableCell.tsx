import React, {useEffect, useState} from 'react';
import {Table} from '@tanstack/react-table';
import {StyledEditableCell} from "./EditableCell.styles";
import {Person} from "../../types/tableData";

interface EditableCellProps {
  value: any;
  rowIndex: number;
  columnId: string;
  updateData: any;
  table: Table<Person>;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  rowIndex,
  columnId,
  updateData,
  table,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);


  const onBlur = () => {
    if (value !== initialValue) {
      updateData?.updateData(rowIndex, columnId, value);
    }
    setIsEditing(false);
  };

  const renderEditCell = () => {
    const columnType = table.options.meta?.getColumnType(columnId);
    switch (columnType) {
      case 'string':
        return (
          <input
            value={value}
            onBlur={onBlur}
            onChange={e => setValue(e.target.value)}
            autoFocus
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onBlur={onBlur}
            onChange={e => setValue(e.target.value)}
            autoFocus
          />
        );
      case 'boolean':
        return (
          <input
            style={{width: 20, height: 20}}
            type="checkbox"
            checked={value}
            onBlur={onBlur}
            onChange={e => {
              setValue(!value);
            }}
            autoFocus
          />
        );
      default: break
    }
  };

  const renderDefaultCell = () => {
    const columnType = table.options.meta?.getColumnType(columnId);
    switch (columnType) {
      case 'boolean':
        return <input type="checkbox" checked={value} readOnly />;
      case 'select':
        return (
          <select>
            {value.map((option: any) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return <p>{value}</p>;
    }
  };

  return (
    <StyledEditableCell onDoubleClick={() => setIsEditing(true)}>
      {isEditing ? renderEditCell() : renderDefaultCell()}
    </StyledEditableCell>
  );
};

export default EditableCell;
