import router from '../router/routes';

export default function logout() {
    localStorage.clear();
    router.push('/login');
}