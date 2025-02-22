export const RegisterAPI = async (email, username, password) => {
    const response = await fetch(`${import.meta.env.VITE_BE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error);
    }
    
    return response.json();
}

export const LoginAPI = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_BE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error);
    }        

    return response.json();
}