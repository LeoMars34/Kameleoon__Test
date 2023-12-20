export async function getSites() {
    try {
        let response = await fetch('http://localhost:3100/sites', {
            headers: {
                AUTHORIZATION: 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return alert(error.message);
    }
}
export async function getTests() {
    try {
        let response = await fetch('http://localhost:3100/tests', {
            headers: {
                AUTHORIZATION: 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return alert(error.message);
    }
}
export async function getCurrentTests(id) {
    try {
        let response = await fetch(`http://localhost:3100/tests/${id}`, {
            headers: {
                AUTHORIZATION: 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return alert(error.message);
    }
}
