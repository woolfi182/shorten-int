import SI from '../src/main';

describe('Constructor:', () => {
  describe('Default config: ', () => {
    describe('Work with numbers:', () => {
      it('Should fail when added float', () => {
        const err = () => new SI(123.12);
        expect(err).toThrow('Value should be integer');
      });

      it('Should have no suffix if value in range of (-1 000; 1 000)', () => {
        const val1 = 500;
        const res1 = new SI(val1);
        expect(res1.toString()).toBe(val1.toString());

        const val2 = 999;
        const res2 = new SI(val2);
        expect(res2.toString()).toBe(val2.toString());

        const val3 = -999;
        const res3 = new SI(val3);
        expect(res3.toString()).toBe(val3.toString());

        const val4 = 0;
        const res4 = new SI(val4);
        expect(res4.toString()).toBe(val4.toString());
      });

      it('Should add suffix K if absolute value is in range of (1K, 1M)', () => {
        const val1 = 1000;
        const res1 = new SI(val1);
        expect(res1.toString()).toBe('1K');

        const val2 = 999999;
        const res2 = new SI(val2);
        expect(res2.toString()).toBe('999.9K');

        const val3 = -1000;
        const res3 = new SI(val3);
        expect(res3.toString()).toBe('-1K');

        const val4 = -999999;
        const res4 = new SI(val4);
        expect(res4.toString()).toBe('-999.9K');
      });

      it('Should add suffix M if absolute value is in range of (1M, 1B)', () => {
        const val1 = 1000000;
        const res1 = new SI(val1);
        expect(res1.toString()).toBe('1M');

        const val2 = 999999999;
        const res2 = new SI(val2);
        expect(res2.toString()).toBe('999.9M');

        const val3 = -1000000;
        const res3 = new SI(val3);
        expect(res3.toString()).toBe('-1M');

        const val4 = -999999999;
        const res4 = new SI(val4);
        expect(res4.toString()).toBe('-999.9M');
      });
    });
  });
});
