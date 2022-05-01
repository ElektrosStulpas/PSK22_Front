export default function authHeader() {
    const user = localStorage.getItem('user');
    if (user) {
        return { Authorization: 'bearer' + user };
    } else {
        return {};
    }
}