import { en } from "./en";

export const kn: typeof en = {
  nav: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    search: "ಹುಡುಕಾಟ",
    history: "ಇತಿಹಾಸ",
    saved: "ಉಳಿಸಿದವು",
    compliance: "ಅನುಸರಣೆ",
    architecture: "ವಾಸ್ತುಶಿಲ್ಪ",
    sources: "ಮೂಲಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    help: "ಸಹಾಯ",
  },
  general: {
    demoData: "ಡೆಮೊ ಡೇಟಾ",
    verificationPending: "ಪರಿಶೀಲನೆ ಬಾಕಿಯಿದೆ",
    verified: "BIS ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    notVerified: "ಪರಿಶೀಲಿಸಲಾಗಿಲ್ಲ",
    translatedNote: "ಅನುಕೂಲಕ್ಕಾಗಿ ಅನುವಾದಿಸಲಾಗಿದೆ",
  },
  dashboard: {
    title: "ಪ್ರೊಕ್ಯೂರ್ಮೆಂಟ್ ಇಂಟೆಲಿಜೆನ್ಸ್",
    subtitle: "ನಿಮ್ಮ ಖರೀದಿ ಅಗತ್ಯಗಳಿಗಾಗಿ ಸರಿಯಾದ ಭಾರತೀಯ ಮಾನದಂಡಗಳನ್ನು (IS) ಹುಡುಕಿ.",
    searchPrompt: "ನೀವು ಏನು ಖರೀದಿಸುತ್ತಿದ್ದೀರಿ?",
    searchPlaceholder: "ಉತ್ಪನ್ನ, ವಸ್ತು, ಅಥವಾ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ವಿವರಿಸಿ...",
  },
  search: {
    title: "ಮಾನದಂಡಗಳನ್ನು ಹುಡುಕಿ",
    subtitle: "ಉತ್ಪನ್ನ, ವಸ್ತು, ಅಪ್ಲಿಕೇಶನ್ ಅಥವಾ ಖರೀದಿ ಅಗತ್ಯವನ್ನು ನಿಮ್ಮ ಸ್ವಂತ ಮಾತುಗಳಲ್ಲಿ ವಿವರಿಸಿ.",
    placeholder: "ಉದಾ., ಆಸ್ಪತ್ರೆ ಕಟ್ಟಡಕ್ಕೆ ತಾಮ್ರದ ವೈರ್ ಅಗತ್ಯವಿದೆ",
    button: "ಹುಡುಕಿ",
    examplesHeader: "ಉದಾಹರಣೆಗಳು:",
    categories: {
      electrical: "ವಿದ್ಯುತ್",
      construction: "ನಿರ್ಮಾಣ",
      safety: "ಸುರಕ್ಷತೆ",
      water: "ನೀರು ಮತ್ತು ಕೊಳಾಯಿ",
      lighting: "ಬೆಳಕು",
      industrial: "ಕೈಗಾರಿಕಾ ಉಪಕರಣಗಳು"
    },
    loading: {
      understanding: "ಪ್ರಶ್ನೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು...",
      semantic: "ಸೆಮ್ಯಾಂಟಿಕ್ ಹುಡುಕಾಟ...",
      match: "ಮಾನದಂಡ ಹೊಂದಿಸುವಿಕೆ...",
      compliance: "ಅನುಸರಣೆ ಪರಿಶೀಲನೆ...",
      evidence: "ಸಾಕ್ಷ್ಯ ಪರಿಶೀಲನೆ..."
    },
    noMatch: "ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಮಾನದಂಡ ಕಂಡುಬಂದಿಲ್ಲ.",
    noMatchDesc: "ಈ ಅಗತ್ಯಕ್ಕಾಗಿ ಅನ್ವಯಿಸುವ ಯಾವುದೇ ಭಾರತೀಯ ಮಾನದಂಡ ನಮಗೆ ಕಂಡುಬಂದಿಲ್ಲ.",
    error: "ಹುಡುಕುವಲ್ಲಿ ದೋಷ.",
    results: {
      queryUnderstanding: "ಪ್ರಶ್ನೆ ಅರ್ಥೈಸುವಿಕೆ",
      recommended: "ಶಿಫಾರಸು ಮಾಡಿದ ಭಾರತೀಯ ಮಾನದಂಡ",
      whyThisStandard: "ಈ ಮಾನದಂಡ ಏಕೆ?",
      verificationStatus: "ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ",
      compliance: "ಅನುಸರಣೆ / ಪ್ರಮಾಣೀಕರಣ",
      related: "ಸಂಬಂಧಿತ ಮಾನದಂಡಗಳು",
      openOfficial: "ಅಧಿಕೃತ BIS ರೆಕಾರ್ಡ್ ತೆರೆಯಿರಿ ↗"
    },
    relationships: {
      normative: "ಪ್ರಮಾಣಿತ ಉಲ್ಲೇಖ",
      testMethod: "ಪರೀಕ್ಷಾ ವಿಧಾನ",
      safety: "ಸುರಕ್ಷತೆ",
      installation: "ಅನುಸ್ಥಾಪನೆ",
      terminology: "ಪರಿಭಾಷೆ",
      relatedProduct: "ಸಂಬಂಧಿತ ಉತ್ಪನ್ನ"
    }
  },
  pages: {
    historyTitle: "ಹುಡುಕಾಟ ಇತಿಹಾಸ",
    historySub: "ಮಾಡಲಾದ ಎಲ್ಲಾ ಹುಡುಕಾಟಗಳ ದಾಖಲೆ.",
    savedTitle: "ಉಳಿಸಿದ ಮಾನದಂಡಗಳು",
    savedSub: "ತ್ವರಿತ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ಉಳಿಸಿದ ಮಾನದಂಡಗಳು.",
    complianceTitle: "ಅನುಸರಣೆ ಅವಲೋಕನ",
    complianceSub: "ಸೂಚ್ಯಂಕಿತ ಮಾನದಂಡಗಳು ಮತ್ತು ಪ್ರಮಾಣೀಕರಣ ನಿಯಮಗಳ ಸಾರಾಂಶ.",
    architectureTitle: "ಸಿಸ್ಟಮ್ ಆರ್ಕಿಟೆಕ್ಚರ್",
    sourcesTitle: "ಡೇಟಾ ಮೂಲಗಳು",
    settingsTitle: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
  }
};
