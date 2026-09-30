import { en } from "./en";

export const mr: typeof en = {
  nav: {
    dashboard: "डॅशबोर्ड",
    search: "शोधा",
    history: "इतिहास",
    saved: "जतन केलेले",
    compliance: "अनुपालन",
    architecture: "आर्किटेक्चर",
    sources: "स्रोत",
    settings: "सेटिंग्ज",
    help: "मदत",
  },
  general: {
    demoData: "डेमो डेटा",
    verificationPending: "पडताळणी प्रलंबित",
    verified: "BIS सत्यापित",
    notVerified: "सत्यापित नाही",
    translatedNote: "सोयीसाठी भाषांतरित",
  },
  dashboard: {
    title: "प्रोक्योरमेंट इंटेलिजन्स",
    subtitle: "तुमच्या खरेदीच्या आवश्यकतेसाठी योग्य भारतीय मानके (IS) शोधा.",
    searchPrompt: "तुम्ही काय खरेदी करत आहात?",
    searchPlaceholder: "उत्पादन, सामग्री किंवा वापराचे वर्णन करा...",
  },
  search: {
    title: "मानके शोधा",
    subtitle: "उत्पादन, सामग्री, वापर किंवा खरेदी आवश्यकता आपल्या स्वतःच्या शब्दात सांगा.",
    placeholder: "उदा. रुग्णालयासाठी तांब्याची वायर आवश्यक आहे",
    button: "शोधा",
    examplesHeader: "उदाहरणे:",
    categories: {
      electrical: "इलेक्ट्रिकल",
      construction: "बांधकाम",
      safety: "सुरक्षा",
      water: "पाणी आणि प्लंबिंग",
      lighting: "प्रकाश",
      industrial: "औद्योगिक उपकरणे"
    },
    loading: {
      understanding: "क्वेरी समजून घेत आहे...",
      semantic: "सिमेंटिक शोध...",
      match: "मानक जुळवत आहे...",
      compliance: "अनुपालन तपासत आहे...",
      evidence: "पुराव्यांची पडताळणी करत आहे..."
    },
    noMatch: "कोणतेही जुळणारे मानक आढळले नाही.",
    noMatchDesc: "आम्हाला या आवश्यकतेसाठी लागू असलेले भारतीय मानक सापडले नाही.",
    error: "शोधण्यात त्रुटी.",
    results: {
      queryUnderstanding: "क्वेरी समज",
      recommended: "शिफारस केलेले भारतीय मानक",
      whyThisStandard: "हे मानक का?",
      verificationStatus: "सत्यापन स्थिती",
      compliance: "अनुपालन / प्रमाणन",
      related: "संबंधित मानके",
      openOfficial: "अधिकृत BIS रेकॉर्ड उघडा ↗"
    },
    relationships: {
      normative: "नॉर्मेटिव्ह संदर्भ",
      testMethod: "चाचणी पद्धत",
      safety: "सुरक्षा",
      installation: "स्थापना",
      terminology: "परिभाषा",
      relatedProduct: "संबंधित उत्पादन"
    }
  },
  pages: {
    historyTitle: "शोध इतिहास",
    historySub: "केलेल्या सर्व शोधांची नोंद.",
    savedTitle: "जतन केलेली मानके",
    savedSub: "त्वरित संदर्भासाठी जतन केलेली मानके.",
    complianceTitle: "अनुपालन विहंगावलोकन",
    complianceSub: "अनुक्रमित मानके आणि प्रमाणन नियमांचा सारांश.",
    architectureTitle: "सिस्टीम आर्किटेक्चर",
    sourcesTitle: "डेटा स्रोत",
    settingsTitle: "सेटिंग्ज"
  }
};
