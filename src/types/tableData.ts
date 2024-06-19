export type Column = {
    id: string;
    ordinalNo: number;
    title: string;
    type: 'string' | 'number' | 'boolean' | 'select';
    width?: number;
};

export type Date = {
    value: string;
    label: string;
};

export type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: 'relationship' | 'complicated' | 'single';
    subRows?: Person[];
    isActive: boolean;
    planning: Date[];
};