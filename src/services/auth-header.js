export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { Authorization: 'bearer' + user.accessToken };
    } else {
        return {};
    }
}