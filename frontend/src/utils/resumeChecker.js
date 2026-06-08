// frontend/src/utils/resumeChecker.js

export class ResumeConsistencyChecker {
  /**
   * 1. Date Format Validation
   * Detects if the user mixes numeric "MM/YYYY" with text-based "Month YYYY" expressions.
   */
  static checkDateConsistency(dateStrings = []) {
    const errors = [];
    let hasNumericFormat = false; // e.g., "08/2024"
    let hasTextualFormat = false; // e.g., "August 2024" or "Jan 2024"

    const numericRegex = /^\d{2}\/\d{4}$/;
    const textualRegex = /^[A-Za-z]+\s+\d{4}$/;

    dateStrings.forEach(dateStr => {
      if (!dateStr) return;
      const trimmed = dateStr.trim();
      if (numericRegex.test(trimmed)) hasNumericFormat = true;
      if (textualRegex.test(trimmed)) hasTextualFormat = true;
    });

    if (hasNumericFormat && hasTextualFormat) {
      errors.push({
        type: 'date',
        message: 'Mixed date formatting detected. Uniformly use either numeric (MM/YYYY) or text (Month YYYY) formats.',
        severity: 'warning'
      });
    }

    return errors;
  }

  /**
   * 2. Bullet Point Verb Tense Checker
   * Checks if historical roles accidentally mix in present-tense verbs at the start of sentences.
   */
  static checkTenseConsistency(pastRoleBullets = []) {
    const errors = [];
    // Common present-tense verbs that shouldn't lead historical entries
    const presentTenseIndicators = /\b(develop|design|create|manage|lead|write|build|implement)s?\b/i;

    pastRoleBullets.forEach(bullet => {
      if (!bullet) return;
      const firstWords = bullet.trim().split(/\s+/).slice(0, 3).join(' ');
      if (presentTenseIndicators.test(firstWords)) {
        errors.push({
          type: 'tense',
          message: 'Potential tense mismatch. Past positions should consistently use past-tense action verbs (e.g., "Developed" instead of "Develop").',
          severity: 'warning',
          offendingText: bullet
        });
      }
    });

    return errors;
  }

  /**
   * 3. Duplicate Content Detection
   * Catches copy-pasted text blocks or heavily repeated descriptions across sections.
   */
  static checkDuplicateContent(allBullets = []) {
    const errors = [];
    const seenPhrases = new Set();

    allBullets.forEach(bullet => {
      if (!bullet) return;
      const normalized = bullet.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
      if (normalized.length < 10) return; // Skip short fragments

      if (seenPhrases.has(normalized)) {
        errors.push({
          type: 'duplicate',
          message: 'Duplicate statement found. Avoid using identical descriptions across separate sections.',
          severity: 'error',
          offendingText: bullet
        });
      } else {
        seenPhrases.add(normalized);
      }
    });

    return errors;
  }
}