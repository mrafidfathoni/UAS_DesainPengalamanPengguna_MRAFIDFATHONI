// Node 18+ has native fetch
// Actually, let's use the local controller directly to skip network issues first? 
// No, we want to test the server running state.
// We'll use fetch (Node 18+ supports it directly).

const API_URL = 'http://localhost:8080/api/auth';

async function testAuth() {
    const timestamp = Date.now();
    const testUser = {
        name: `Test User ${timestamp}`,
        email: `test${timestamp}@example.com`,
        password: 'password123',
        phone: '08123456789'
    };

    console.log('1. Registering user:', testUser.email);
    try {
        const regRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        console.log('Register Response:', regRes.status, regData);

        if (regRes.status !== 201) return;

        console.log('2. Logging in...');
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });
        const loginData = await loginRes.json();
        console.log('Login Response:', loginRes.status, loginData);

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testAuth();
