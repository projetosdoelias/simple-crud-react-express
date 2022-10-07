export async function getAllTeachers() {

    try {
        const response = await fetch('http://localhost:3002/api/v1/teachers');
        return await response.json();
    } catch (error) {
        return [];
    }

}

export async function deleteTeacher(id) {

    try {
        await fetch(`http://localhost:3002/api/v1/teachers/${id}`, {
            method: "DELETE"
        });
        return true;

    } catch (error) {
        return false;
    }

}

export async function createTeacher(data) {
    const response = await fetch('http://localhost:3002/api/v1/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function updateTeacher(id, data) {

    try {
        await fetch(`http://localhost:3002/api/v1/teachers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return true;
    } catch (error) {
        return false;
    }
}

