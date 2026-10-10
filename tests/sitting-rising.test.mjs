import assert from 'node:assert/strict';
import test from 'node:test';
import { scoreSittingRising } from '../src/lib/sitting-rising.ts';

const phase = (supports, unsteady = false) => ({ supports, unsteady });

test('no supports or unsteadiness yields the published maximum', () => {
  assert.deepEqual(scoreSittingRising(phase(0), phase(0)), { down: 5, up: 5, total: 10 });
});
test('unsteadiness is deducted separately in both phases', () => {
  assert.deepEqual(scoreSittingRising(phase(1, true), phase(2, true)), { down: 3.5, up: 2.5, total: 6 });
});
test('a phase cannot borrow points from the other phase after reaching zero', () => {
  assert.deepEqual(scoreSittingRising(phase(5, true), phase(0)), { down: 0, up: 5, total: 5 });
});
test('five supports in both phases can represent a total of zero', () => {
  assert.equal(scoreSittingRising(phase(5, true), phase(5, true)).total, 0);
});
test('every supported control combination stays in range and adding support cannot improve the score', () => {
  for (let down = 0; down <= 5; down++) for (let up = 0; up <= 5; up++) {
    for (const downUnsteady of [false, true]) for (const upUnsteady of [false, true]) {
      const score = scoreSittingRising(phase(down, downUnsteady), phase(up, upUnsteady));
      assert.ok(score.total >= 0 && score.total <= 10);
      assert.ok(Number.isInteger(score.total * 2));
      if (down < 5) assert.ok(scoreSittingRising(phase(down + 1, downUnsteady), phase(up, upUnsteady)).total <= score.total);
    }
  }
});
