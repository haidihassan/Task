export async function EditItem(id:any) {
    const response = await fetch(`https://ca48822661acffed5578.free.beeceptor.com/api/users/${id}`, {
        method: 'PUT',
    });

    if (!response.ok) {
        throw new Error('Failed to delete item.');
    }

    return response.json();
}
