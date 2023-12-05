import displayTime from '/utils/DisplayTime';

describe('Should display time in format 00:00', () => {
    test('Input 0', async () => {
        expect(displayTime(0)).toBe('00:00');
    });
    test('Input 24', async () => {
        expect(displayTime(24)).toBe('00:24');
    });
    test('Input 60', async () => {
        expect(displayTime(60)).toBe('01:00');
    });
    test('Input 255', async () => {
        expect(displayTime(255)).toBe('04:15');
    });
    test('Input 100000', async () => {
        expect(displayTime(100000)).toBe('1666:40');
    });
    test('Input -60', async () => {
        expect(displayTime(-60)).toBe('-01:00');
    });
    test('Input -100000', async () => {
        expect(displayTime(-100000)).toBe('-1666:40');
    });
});

describe('Should display time in format 00:00:00', () => {
    test('Input 0', async () => {
        expect(displayTime(0, true)).toBe('00:00:00');
    });
    test('Input 24', async () => {
        expect(displayTime(24, true)).toBe('00:00:24');
    });
    test('Input 60', async () => {
        expect(displayTime(60, true)).toBe('00:01:00');
    });
    test('Input 255', async () => {
        expect(displayTime(255, true)).toBe('00:04:15');
    });
    test('Input 100000', async () => {
        expect(displayTime(100000, true)).toBe('27:46:40');
    });
    test('Input -60', async () => {
        expect(displayTime(-60, true)).toBe('-00:01:00');
    });
    test('Input -100000', async () => {
        expect(displayTime(-100000, true)).toBe('-27:46:40');
    });
});
