import { atom } from 'recoil';

const authenticatedUser = atom({
    key: 'authenticatedUser',
    default: {
        user: [],
        check: false,
    },
});

const userCartCount = atom({
    key: 'userCartCount',
    default: [],
});

export { authenticatedUser, userCartCount };
