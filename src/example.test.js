import {sum} from './example';

describe('Simple test for example.js', () => {
    it('return sum of params', function () {
        expect(sum(1, 2)).toBe(3);
    });
})