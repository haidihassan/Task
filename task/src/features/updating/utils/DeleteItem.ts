export async function DeleteItem(id: any) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error('API URL is not defined in the environment variables.');
    }

    const response = await fetch(`${apiUrl}${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete item.');
    }

    return response.json();
}
