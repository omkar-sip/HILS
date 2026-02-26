// ─── Feature Flags ───
// Toggle visibility of legacy/new features for staged rollout.

export const FEATURE_FLAGS = {
    /** Show legacy tabs (Deep Dive, Quiz, Summary) in the topic page */
    showLegacyTabs: false,
} as const
