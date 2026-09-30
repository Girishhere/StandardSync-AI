import { en } from "./en";

export const gu: typeof en = {
  nav: {
    dashboard: "ડેશબોર્ડ",
    search: "શોધ",
    history: "ઇતિહાસ",
    saved: "સાચવેલ",
    compliance: "પાલન (Compliance)",
    architecture: "આર્કિટેક્ચર",
    sources: "સ્ત્રોતો",
    settings: "સેટિંગ્સ",
    help: "મદદ",
  },
  general: {
    demoData: "ડેમો ડેટા",
    verificationPending: "ચકાસણી બાકી છે",
    verified: "BIS ચકાસાયેલ",
    notVerified: "ચકાસાયેલ નથી",
    translatedNote: "સુવિધા માટે અનુવાદિત",
  },
  dashboard: {
    title: "પ્રોક્યોરમેન્ટ ઇન્ટેલિજન્સ",
    subtitle: "તમારી ખરીદી જરૂરિયાતો માટે યોગ્ય ભારતીય ધોરણો (IS) શોધો.",
    searchPrompt: "તમે શું ખરીદી રહ્યા છો?",
    searchPlaceholder: "ઉત્પાદન, સામગ્રી અથવા ઉપયોગ વર્ણવો...",
  },
  search: {
    title: "ધોરણો શોધો",
    subtitle: "તમારા પોતાના શબ્દોમાં ઉત્પાદન, સામગ્રી, ઉપયોગ અથવા ખરીદી જરૂરિયાત વર્ણવો.",
    placeholder: "ઉદા., હોસ્પિટલ બિલ્ડિંગ માટે કોપર વાયરની જરૂર છે",
    button: "શોધ",
    examplesHeader: "ઉદાહરણો:",
    categories: {
      electrical: "ઇલેક્ટ્રિકલ",
      construction: "બાંધકામ",
      safety: "સુરક્ષા",
      water: "પાણી અને પ્લમ્બિંગ",
      lighting: "લાઇટિંગ",
      industrial: "ઔદ્યોગિક સાધનો"
    },
    loading: {
      understanding: "પ્રશ્ન સમજવામાં આવી રહ્યો છે...",
      semantic: "સિમેન્ટિક શોધ...",
      match: "ધોરણ મેળવવામાં આવી રહ્યું છે...",
      compliance: "પાલન ચકાસણી...",
      evidence: "પુરાવા ચકાસણી..."
    },
    noMatch: "કોઈ મેળ ખાતું ધોરણ મળ્યું નથી.",
    noMatchDesc: "અમને આ જરૂરિયાત માટે લાગુ પડતું કોઈ ભારતીય ધોરણ મળ્યું નથી.",
    error: "શોધવામાં ભૂલ.",
    results: {
      queryUnderstanding: "પ્રશ્ન સમજ",
      recommended: "ભલામણ કરેલ ભારતીય ધોરણ",
      whyThisStandard: "આ ધોરણ શા માટે?",
      verificationStatus: "ચકાસણી સ્થિતિ",
      compliance: "પાલન / પ્રમાણપત્ર",
      related: "સંબંધિત ધોરણો",
      openOfficial: "સત્તાવાર BIS રેકોર્ડ ખોલો ↗"
    },
    relationships: {
      normative: "નોર્મેટિવ સંદર્ભ",
      testMethod: "પરીક્ષણ પદ્ધતિ",
      safety: "સુરક્ષા",
      installation: "સ્થાપન",
      terminology: "પરિભાષા",
      relatedProduct: "સંબંધિત ઉત્પાદન"
    }
  },
  pages: {
    historyTitle: "શોધ ઇતિહાસ",
    historySub: "કરેલી તમામ શોધોનો રેકોર્ડ.",
    savedTitle: "સાચવેલા ધોરણો",
    savedSub: "ઝડપી સંદર્ભ માટે સાચવેલા ધોરણો.",
    complianceTitle: "પાલન અવલોકન",
    complianceSub: "અનુક્રમિત ધોરણો અને પ્રમાણપત્ર નિયમોનો સારાંશ.",
    architectureTitle: "સિસ્ટમ આર્કિટેક્ચર",
    sourcesTitle: "ડેટા સ્ત્રોતો",
    settingsTitle: "સેટિંગ્સ"
  }
};
