import { Info, RuleModule } from '../../ruler';
import { DEFAULT_RULE_WEIGHTS } from '../../constants';

import type { ScoringResultForRule } from '../advice-pipeline/interface';
import type { ChartRuleModule } from '../../ruler/interface';

const defaultWeights = DEFAULT_RULE_WEIGHTS;

const computeScore = (
  ruleBase: Record<string, RuleModule>,
  ruleType: 'HARD' | 'SOFT',
  info: Info,
  log: ScoringResultForRule[]
) => {
  // initial score is 1 for HARD rules and 0 for SOFT rules
  let computedScore = ruleType === 'HARD' ? 1 : 0;
  Object.values(ruleBase)
    .filter((r: RuleModule) => {
      const weight = r.option?.weight || defaultWeights[r.id] || 1;
      const extra = r.option?.extra;
      return r.type === ruleType && r.trigger({ ...info, weight, ...extra }) && !r.option?.off;
    })
    .forEach((r: RuleModule) => {
      const weight = r.option?.weight || defaultWeights[r.id] || 1;
      const extra = r.option?.extra;
      const base = (r as ChartRuleModule).validator({ ...info, weight, ...extra }) as number;
      const score = weight * base;
      // scores are multiplied for HARD rules and added for SOFT rules
      if (ruleType === 'HARD') {
        computedScore *= score;
      } else {
        computedScore += score;
      }
      log.push({ phase: 'ADVISE', ruleId: r.id, score, base, weight, ruleType });
    });
  return computedScore;
};

export default computeScore;
