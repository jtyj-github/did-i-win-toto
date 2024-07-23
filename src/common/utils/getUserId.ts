function generateUuid() {
    // Consider replacing with uuid package in the future
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
        (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    );
}

function getUserId(){
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUuid();
        localStorage.setItem('userId', userId);
    }
    return userId;
}

export default getUserId;