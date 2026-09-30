import { en } from "./en";

export const hi: typeof en = {
  nav: {
    dashboard: "डैशबोर्ड",
    search: "खोजें",
    history: "इतिहास",
    saved: "सहेजे गए",
    compliance: "अनुपालन (Compliance)",
    architecture: "संरचना",
    sources: "स्रोत",
    settings: "सेटिंग्स",
    help: "मदद",
  },
  general: {
    demoData: "डेमो डेटा",
    verificationPending: "सत्यापन लंबित (PENDING)",
    verified: "BIS सत्यापित",
    notVerified: "सत्यापित नहीं",
    translatedNote: "सुविधा के लिए अनुवादित",
  },
  dashboard: {
    title: "खरीद संबंधी जानकारी",
    subtitle: "अपनी खरीद आवश्यकताओं के लिए सही भारतीय मानक (IS) खोजें।",
    searchPrompt: "आप क्या खरीद रहे हैं?",
    searchPlaceholder: "उत्पाद, सामग्री, या उपयोग का वर्णन करें...",
  },
  search: {
    title: "मानक खोजें",
    subtitle: "उत्पाद, सामग्री, उपयोग, या खरीद की आवश्यकता का अपने शब्दों में वर्णन करें।",
    placeholder: "उदा., अस्पताल भवन के लिए कॉपर केबल की आवश्यकता है",
    button: "खोजें",
    examplesHeader: "उदाहरण:",
    categories: {
      electrical: "विद्युत (Electrical)",
      construction: "निर्माण (Construction)",
      safety: "सुरक्षा (Safety)",
      water: "पानी और प्लंबिंग",
      lighting: "प्रकाश (Lighting)",
      industrial: "औद्योगिक उपकरण"
    },
    loading: {
      understanding: "क्वेरी को समझा जा रहा है...",
      semantic: "सिमेंटिक खोज...",
      match: "मानक मिलाया जा रहा है...",
      compliance: "अनुपालन की जाँच...",
      evidence: "साक्ष्य स्थिति जांची जा रही है..."
    },
    noMatch: "कोई मेल खाता मानक नहीं मिला।",
    noMatchDesc: "हम इस आवश्यकता के लिए कोई लागू भारतीय मानक नहीं खोज पाए।",
    error: "खोजने में त्रुटि हुई।",
    results: {
      queryUnderstanding: "क्वेरी की समझ",
      recommended: "अनुशंसित भारतीय मानक",
      whyThisStandard: "यह मानक क्यों?",
      verificationStatus: "सत्यापन की स्थिति",
      compliance: "अनुपालन / प्रमाणन",
      related: "संबंधित मानक",
      openOfficial: "आधिकारिक BIS रिकॉर्ड खोलें ↗"
    },
    relationships: {
      normative: "मानक संदर्भ",
      testMethod: "परीक्षण विधि",
      safety: "सुरक्षा",
      installation: "स्थापना (Installation)",
      terminology: "शब्दावली",
      relatedProduct: "संबंधित उत्पाद"
    }
  },
  pages: {
    historyTitle: "खोज का इतिहास",
    historySub: "किए गए सभी मानक खोजों का रिकॉर्ड।",
    savedTitle: "सहेजे गए मानक",
    savedSub: "त्वरित संदर्भ के लिए सहेजे गए मानक।",
    complianceTitle: "अनुपालन अवलोकन",
    complianceSub: "अनुक्रमित मानकों और प्रमाणन नियमों का सारांश।",
    architectureTitle: "सिस्टम संरचना",
    sourcesTitle: "डेटा स्रोत",
    settingsTitle: "सेटिंग्स"
  }
};
