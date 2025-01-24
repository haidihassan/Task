interface Tablehead {
    key: string;
    label: string;
    align?: string;
}
export const Tableheads: Tablehead[] = [
    { key: 'brand', label: 'Brand' },
    { key: 'type', label: 'Type' },
    { key: 'model', label: 'Model' },
    { key: 'year', label: 'Year', align: 'center' },
    { key: 'img', label: 'Image' },
    { key: 'engine', label: 'Engine' },
    { key: 'price', label: 'Price', align: 'right' },
    { key: 'Actions', label: 'Actions', align: 'right' },
];

