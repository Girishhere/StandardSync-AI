import { en } from "./en";

export const te: typeof en = {
  nav: {
    dashboard: "డాష్‌బోర్డ్",
    search: "శోధన",
    history: "చరిత్ర",
    saved: "సేవ్ చేయబడినవి",
    compliance: "కంప్లయన్స్",
    architecture: "ఆర్కిటెక్చర్",
    sources: "మూలాలు",
    settings: "సెట్టింగ్‌లు",
    help: "సహాయం",
  },
  general: {
    demoData: "డెమో డేటా",
    verificationPending: "ధృవీకరణ పెండింగ్‌లో ఉంది",
    verified: "BIS ధృవీకరించబడింది",
    notVerified: "ధృవీకరించబడలేదు",
    translatedNote: "సౌలభ్యం కోసం అనువదించబడింది",
  },
  dashboard: {
    title: "సేకరణ ఇంటెలిజెన్స్",
    subtitle: "మీ సేకరణ అవసరాల కోసం సరైన భారతీయ ప్రమాణాలను కనుగొనండి.",
    searchPrompt: "మీరు ఏమి సేకరిస్తున్నారు?",
    searchPlaceholder: "ఉత్పత్తి, పదార్థం లేదా అప్లికేషన్‌ను వివరించండి...",
  },
  search: {
    title: "ప్రమాణాలను శోధించండి",
    subtitle: "ఉత్పత్తి, పదార్థం, అప్లికేషన్ లేదా సేకరణ అవసరాన్ని మీ స్వంత మాటలలో వివరించండి.",
    placeholder: "ఉదా., ఆసుపత్రి భవనం కోసం కాపర్ ఎలక్ట్రికల్ కేబుల్స్ అవసరం",
    button: "శోధించండి",
    examplesHeader: "ఉదాహరణ సేకరణ అవసరాలు:",
    categories: {
      electrical: "ఎలక్ట్రికల్",
      construction: "నిర్మాణం",
      safety: "భద్రత",
      water: "నీరు & ప్లంబింగ్",
      lighting: "లైటింగ్",
      industrial: "పారిశ్రామిక పరికరాలు"
    },
    loading: {
      understanding: "ప్రశ్నను అర్థం చేసుకోవడం...",
      semantic: "సెమాంటిక్ శోధన...",
      match: "ప్రమాణాన్ని సరిపోల్చడం...",
      compliance: "కంప్లయన్స్ తనిఖీ...",
      evidence: "ఆధారాల స్థితిని ధృవీకరించడం..."
    },
    noMatch: "సరిపోలే ప్రమాణం కనుగొనబడలేదు.",
    noMatchDesc: "ఈ అవసరానికి వర్తించే భారతీయ ప్రమాణాన్ని మేము కనుగొనలేకపోయాము.",
    error: "శోధన ప్రాసెస్ చేయడంలో లోపం.",
    results: {
      queryUnderstanding: "ప్రశ్న అర్థం",
      recommended: "సిఫార్సు చేయబడిన భారతీయ ప్రమాణం",
      whyThisStandard: "ఈ ప్రమాణం ఎందుకు?",
      verificationStatus: "ధృవీకరణ స్థితి",
      compliance: "కంప్లయన్స్ / సర్టిఫికేషన్",
      related: "సంబంధిత ప్రమాణాలు",
      openOfficial: "అధికారిక BIS రికార్డ్‌ను తెరవండి ↗"
    },
    relationships: {
      normative: "నార్మేటివ్ రిఫరెన్స్",
      testMethod: "పరీక్ష పద్ధతి",
      safety: "భద్రత",
      installation: "ఇన్‌స్టాలేషన్",
      terminology: "పరిభాష",
      relatedProduct: "సంబంధిత ఉత్పత్తి"
    }
  },
  pages: {
    historyTitle: "శోధన చరిత్ర",
    historySub: "చేసిన అన్ని శోధనల రికార్డు.",
    savedTitle: "సేవ్ చేయబడిన ప్రమాణాలు",
    savedSub: "త్వరిత సూచన కోసం మీరు సేవ్ చేసిన ప్రమాణాలు.",
    complianceTitle: "కంప్లయన్స్ అవలోకనం",
    complianceSub: "ఇండెక్స్ చేయబడిన ప్రమాణాలు మరియు ధృవీకరణ నియమాల సారాంశం.",
    architectureTitle: "సిస్టమ్ ఆర్కిటెక్చర్",
    sourcesTitle: "డేటా మూలాలు",
    settingsTitle: "సెట్టింగ్‌లు"
  }
};
