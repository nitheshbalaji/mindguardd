
import { MoodEntry, RiskLevel } from "../types";

export const detectPatterns = (entries: MoodEntry[]) => {
  if (entries.length < 3) return { level: RiskLevel.STABLE, patterns: [] };

  const recent = entries.slice(-7);
  const patterns: string[] = [];
  let score = 0;

  // 1. Burnout Check (Decreasing mood + Increasing stress)
  const avgMood = recent.reduce((sum, e) => sum + e.moodScore, 0) / recent.length;
  const avgStress = recent.reduce((sum, e) => sum + e.stressLevel, 0) / recent.length;
  
  if (avgMood < 4 && avgStress > 7) {
    patterns.push("Potential Burnout Detected: High stress paired with consistently low mood.");
    score += 2;
  }

  // 2. Sleep-Depression Correlation
  const badSleepDays = recent.filter(e => e.sleepHours < 5).length;
  if (badSleepDays >= 4 && avgMood < 5) {
    patterns.push("Sleep-Depression Correlation: Chronic sleep deprivation linked to mood decline.");
    score += 2;
  }

  // 3. Academic Pressure Spikes
  const examStress = recent.filter(e => e.academicPressure > 8).length;
  if (examStress >= 3) {
    patterns.push("Critical Academic Pressure: Consistent high academic stress detected.");
    score += 1;
  }

  let level = RiskLevel.STABLE;
  if (score >= 5) level = RiskLevel.CRITICAL;
  else if (score >= 3) level = RiskLevel.HIGH;
  else if (score >= 1) level = RiskLevel.MODERATE;

  return { level, patterns };
};
