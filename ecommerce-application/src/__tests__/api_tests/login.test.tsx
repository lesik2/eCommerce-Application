/* eslint-disable max-len */
import { describe, test, expect } from 'vitest';
import login from '../../services/login';

describe('login function', () => {
    test('with valid email & password login function should return truthy result', async () => {
        const res = await login('johndoe123@example.com', 'secret123');
        expect(res).toBeTruthy();
    });

    test('with invalid email or password login function should return falsy result', async () => {
        expect(login('johndoe123@example.co', 'secret123')).rejects.toThrow(/Customer account with the given/);
    });
});
