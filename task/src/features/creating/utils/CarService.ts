export const CarService = async (formData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit');
        }

        return { success: true };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error submitting form:', error.message);
            return { success: false, error: error.message };
        } else {
            console.error('Unexpected error:', error);
            return { success: false, error: 'An unexpected error occurred' };
        }
    }
};
