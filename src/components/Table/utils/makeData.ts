import {faker} from '@faker-js/faker';
import {Column, Person} from "../../../types/tableData";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
    isActive: faker.datatype.boolean(),
    planning: [
      {value: '2024-06-01', label: 'June 1, 2023'},
      {value: '2024-06-15', label: 'June 15, 2023'},
      {value: '2024-07-01', label: 'July 1, 2024'},
      {value: '2024-07-15', label: 'July 15, 2024'},
    ],
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export const columnsData: Column[] = [
  {id: 'firstName', ordinalNo: 10, title: 'FirstName', type: 'string'},
  {id: 'lastName', ordinalNo: 2, title: 'LastName', type: 'string'},
  {id: 'age', ordinalNo: 3, title: 'Age', type: 'string', width: 100},
  {id: 'visits', ordinalNo: 4, title: 'Visits', type: 'number', width: 150},
  {id: 'status', ordinalNo: 5, title: 'Status', type: 'string', width: 100},
  {id: 'progress', ordinalNo: 6, title: 'Progress', type: 'number', width: 100},
  {id: 'isActive', ordinalNo: 7, title: 'isActive', type: 'boolean'},
  {id: 'planning', ordinalNo: 1, title: 'Planning', type: 'select'},
];
