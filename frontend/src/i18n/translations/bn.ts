import { en } from "./en";

export const bn: typeof en = {
  nav: {
    dashboard: "ড্যাশবোর্ড",
    search: "অনুসন্ধান",
    history: "ইতিহাস",
    saved: "সংরক্ষিত",
    compliance: "কমপ্লায়েন্স",
    architecture: "আর্কিটেকচার",
    sources: "উৎস",
    settings: "সেটিংস",
    help: "সাহায্য",
  },
  general: {
    demoData: "ডেমো ডেটা",
    verificationPending: "যাচাইকরণ মুলতুবি",
    verified: "BIS যাচাইকৃত",
    notVerified: "যাচাই করা হয়নি",
    translatedNote: "সুবিধার জন্য অনুবাদ করা হয়েছে",
  },
  dashboard: {
    title: "প্রোকিউরমেন্ট ইন্টেলিজেন্স",
    subtitle: "আপনার ক্রয়ের প্রয়োজনীয়তার জন্য সঠিক ভারতীয় মানগুলি (IS) খুঁজুন।",
    searchPrompt: "আপনি কি সংগ্রহ করছেন?",
    searchPlaceholder: "পণ্য, উপাদান বা অ্যাপ্লিকেশন বর্ণনা করুন...",
  },
  search: {
    title: "মানগুলি অনুসন্ধান করুন",
    subtitle: "পণ্য, উপাদান, অ্যাপ্লিকেশন বা ক্রয়ের প্রয়োজনীয়তা আপনার নিজের কথায় বর্ণনা করুন।",
    placeholder: "উদাঃ, হাসপাতালের বিল্ডিংয়ের জন্য তামার তারের প্রয়োজন",
    button: "অনুসন্ধান",
    examplesHeader: "উদাহরণ:",
    categories: {
      electrical: "বৈদ্যুতিক",
      construction: "নির্মাণ",
      safety: "নিরাপত্তা",
      water: "জল ও প্লাম্বিং",
      lighting: "আলো",
      industrial: "শিল্প সরঞ্জাম"
    },
    loading: {
      understanding: "ক্যোয়ারী বোঝা হচ্ছে...",
      semantic: "শব্দার্থিক অনুসন্ধান...",
      match: "মান মেলানো হচ্ছে...",
      compliance: "কমপ্লায়েন্স পরীক্ষা করা হচ্ছে...",
      evidence: "প্রমাণ যাচাই করা হচ্ছে..."
    },
    noMatch: "কোনো মানানসই মান পাওয়া যায়নি।",
    noMatchDesc: "আমরা এই প্রয়োজনীয়তার জন্য প্রযোজ্য কোনো ভারতীয় মান খুঁজে পাইনি।",
    error: "অনুসন্ধানে ত্রুটি।",
    results: {
      queryUnderstanding: "ক্যোয়ারী বোঝা",
      recommended: "প্রস্তাবিত ভারতীয় মান",
      whyThisStandard: "এই মানটি কেন?",
      verificationStatus: "যাচাইকরণের অবস্থা",
      compliance: "কমপ্লায়েন্স / সার্টিফিকেশন",
      related: "সম্পর্কিত মান",
      openOfficial: "অফিসিয়াল BIS রেকর্ড খুলুন ↗"
    },
    relationships: {
      normative: "নিয়মমাফিক রেফারেন্স",
      testMethod: "পরীক্ষা পদ্ধতি",
      safety: "নিরাপত্তা",
      installation: "ইনস্টলেশন",
      terminology: "পরিভাষা",
      relatedProduct: "সম্পর্কিত পণ্য"
    }
  },
  pages: {
    historyTitle: "অনুসন্ধানের ইতিহাস",
    historySub: "করা সমস্ত অনুসন্ধানের রেকর্ড।",
    savedTitle: "সংরক্ষিত মান",
    savedSub: "দ্রুত রেফারেন্সের জন্য সংরক্ষিত মান।",
    complianceTitle: "কমপ্লায়েন্স ওভারভিউ",
    complianceSub: "সূচীবদ্ধ মান এবং সার্টিফিকেশন নিয়মের সারাংশ।",
    architectureTitle: "সিস্টেম আর্কিটেকচার",
    sourcesTitle: "ডেটা উৎস",
    settingsTitle: "সেটিংস"
  }
};
