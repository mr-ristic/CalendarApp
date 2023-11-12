import { getRandomInteger } from './misc';

describe('Testin misc fucntions', () => {
  it('should never give values between min and above max', () => {
    const min = 1;
    const max = 20;
    const randomArray: number[] = [];
    const noIterations = 100000;
    for (let i = 0; i < noIterations; i++) {
      const randomNo = getRandomInteger(min, max);
      if (randomNo >= min && randomNo <= 20) randomArray.push(randomNo);
    }
    expect(randomArray.length).toBe(noIterations);
  });
});
