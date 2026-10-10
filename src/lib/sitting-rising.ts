export type Phase = Readonly<{ supports: number; unsteady: boolean }>;
const phaseScore = ({ supports, unsteady }: Phase) =>
  Math.max(0, 5 - Math.min(5, Math.max(0, Math.trunc(supports))) - (unsteady ? 0.5 : 0));

export const scoreSittingRising = (sitting: Phase, rising: Phase) => {
  const down = phaseScore(sitting);
  const up = phaseScore(rising);
  return { down, up, total: down + up };
};
