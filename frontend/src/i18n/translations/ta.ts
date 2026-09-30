import { en } from "./en";

export const ta: typeof en = {
  nav: {
    dashboard: "முகப்பு",
    search: "தேடல்",
    history: "வரலாறு",
    saved: "சேமிக்கப்பட்டவை",
    compliance: "இணக்கம்",
    architecture: "கட்டமைப்பு",
    sources: "ஆதாரங்கள்",
    settings: "அமைப்புகள்",
    help: "உதவி",
  },
  general: {
    demoData: "டெமோ தரவு",
    verificationPending: "சரிபார்ப்பு நிலுவையில் உள்ளது",
    verified: "BIS சரிபார்க்கப்பட்டது",
    notVerified: "சரிபார்க்கப்படவில்லை",
    translatedNote: "வசதிக்காக மொழிபெயர்க்கப்பட்டது",
  },
  dashboard: {
    title: "கொள்முதல் நுண்ணறிவு",
    subtitle: "உங்கள் கொள்முதல் தேவைகளுக்கான சரியான இந்திய தரநிலைகளை கண்டறியவும்.",
    searchPrompt: "நீங்கள் என்ன கொள்முதல் செய்கிறீர்கள்?",
    searchPlaceholder: "பொருள், மூலப்பொருள் அல்லது பயன்பாட்டை விவரிக்கவும்...",
  },
  search: {
    title: "தரநிலைகளை தேடுங்கள்",
    subtitle: "பொருள், பயன்பாடு அல்லது கொள்முதல் தேவையை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும்.",
    placeholder: "உம்: மருத்துவமனை பயன்பாட்டிற்கான செம்பு மின்கம்பிகள் தேவை",
    button: "தேடு",
    examplesHeader: "உதாரணங்கள்:",
    categories: {
      electrical: "மின்சாரம்",
      construction: "கட்டுமானம்",
      safety: "பாதுகாப்பு",
      water: "நீர் & பிளம்பிங்",
      lighting: "ஒளியமைப்பு",
      industrial: "தொழில்துறை உபகரணங்கள்"
    },
    loading: {
      understanding: "கேள்வியை புரிந்துகொள்ளுதல்...",
      semantic: "சொற்பொருள் தேடல்...",
      match: "தரநிலையை பொருத்துதல்...",
      compliance: "இணக்கத்தை சரிபார்த்தல்...",
      evidence: "ஆதாரங்களை சரிபார்த்தல்..."
    },
    noMatch: "பொருத்தமான தரநிலை எதுவும் கிடைக்கவில்லை.",
    noMatchDesc: "இந்தத் தேவைக்கு பொருத்தமான இந்திய தரநிலையை எங்களால் கண்டறிய முடியவில்லை.",
    error: "தேடலில் பிழை.",
    results: {
      queryUnderstanding: "கேள்வி புரிதல்",
      recommended: "பரிந்துரைக்கப்பட்ட இந்திய தரநிலை",
      whyThisStandard: "இந்த தரநிலை ஏன்?",
      verificationStatus: "சரிபார்ப்பு நிலை",
      compliance: "இணக்கம் / சான்றிதழ்",
      related: "தொடர்புடைய தரநிலைகள்",
      openOfficial: "அதிகாரப்பூர்வ BIS பதிவை திற ↗"
    },
    relationships: {
      normative: "நெறிமுறை குறிப்பு",
      testMethod: "சோதனை முறை",
      safety: "பாதுகாப்பு",
      installation: "நிறுவல்",
      terminology: "சொற்களஞ்சியம்",
      relatedProduct: "தொடர்புடைய தயாரிப்பு"
    }
  },
  pages: {
    historyTitle: "தேடல் வரலாறு",
    historySub: "செய்யப்பட்ட அனைத்து தேடல்களின் பதிவு.",
    savedTitle: "சேமிக்கப்பட்ட தரநிலைகள்",
    savedSub: "விரைவான குறிப்புக்காக சேமிக்கப்பட்ட தரநிலைகள்.",
    complianceTitle: "இணக்க மேலோட்டம்",
    complianceSub: "குறியிடப்பட்ட தரநிலைகள் மற்றும் சான்றிதழ் விதிகள்.",
    architectureTitle: "கணினி கட்டமைப்பு",
    sourcesTitle: "தரவு ஆதாரங்கள்",
    settingsTitle: "அமைப்புகள்"
  }
};
