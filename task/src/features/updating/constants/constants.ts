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

export const TABLE_DATA = [
    {
        brand: 'Toyota',
        type: 'SUV',
        model: 'RAV4',
        year: 2023,
        src: 'https://example.com/images/toyota-rav4.jpg',
        engine: '2.5L Hybrid',
        price: '$35,000',
    },
    {
        brand: 'Tesla',
        type: 'Sedan',
        model: 'Model S',
        year: 2023,
        src: 'https://example.com/images/tesla-model-s.jpg',
        engine: 'Electric',
        price: '$79,999',
    },
];
