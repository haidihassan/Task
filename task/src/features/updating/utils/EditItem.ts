export async function EditItem(id: any, updateData: any) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error('API URL is not defined in the environment variables.');
    }

    const response = await fetch(`${apiUrl}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to edit item.');
    }
    return response.json();
}
