import { useState, useEffect, useCallback } from 'react';

const useFetchData = <T>(): { data: T | null; loading: boolean; error: string; refetch: () => void } => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = useCallback(async () => {
        try {
            if (!url) {
                throw new Error('API URL is not defined in the environment variables.');
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error: any) {
            setError('Error fetching data');
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        setLoading(true);
        setError('');
        fetchData();
    };

    return { data, loading, error, refetch };
};

export default useFetchData;
