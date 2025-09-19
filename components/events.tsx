"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function Events() {
  const { language } = useLanguage()

  const content = {
    hi: {
      title: "हमारे आयोजित कार्यक्रम",
      subtitle: "",
      info:
        "श्री रामलीला समिति, कल्याणपुर, लखनऊ\n\nसन 2001 में स्थापित श्री रामलीला समिति, कल्याणपुर, लखनऊ धार्मिक एवं सांस्कृतिक मूल्यों के संरक्षण और संवर्धन के लिए निरंतर प्रयासरत है। समिति का मुख्य उद्देश्य मर्यादा पुरुषोत्तम भगवान श्रीराम के आदर्शों को समाज तक पहुँचाना और भारतीय संस्कृति की समृद्ध परंपराओं का प्रचार-प्रसार करना है। समिति द्वारा प्रतिवर्ष विभिन्न भव्य धार्मिक आयोजनों का आयोजन किया जाता है, जिनमें प्रमुख रूप से **श्री रामलीला महोत्सव, श्री कृष्ण जन्माष्टमी, चैत्र रामनवमी के अवसर पर विशाल भण्डार, और अखण्ड रामायण पाठ (17-18 जुलाई) शामिल हैं।** इन आयोजनों के माध्यम से समिति समाज में भक्ति, प्रेम, एकता और सद्भाव का संदेश देती है।\n\nआगामी श्री रामलीला महोत्सव 2025 का भव्य आयोजन **27 सितम्बर से 2 अक्टूबर 2025** तक रामलीला मैदान, कल्याणपुर, लखनऊ में प्रतिदिन संध्या 7:00 बजे से आयोजित किया जाएगा। श्री रामलीला समिति, कल्याणपुर, लखनऊ समस्त श्रद्धालुओं और नगरवासियों को इस पावन अवसर पर हार्दिक आमंत्रण देती है। आइए, परिवार सहित इस भव्य आयोजन का हिस्सा बनें और भगवान श्रीराम के जीवन आदर्शों को आत्मसात करें। आपकी उपस्थिति ही इस आयोजन की शोभा बढ़ाएगी।\n\nजय श्री राम! 🙏",
    },
    en: {
      title: "Events We Organise",
      subtitle: "",
      info:
        "Shri Ramlila Samiti, Kalyanpur, Lucknow (established 2001) is dedicated to preserving and promoting spiritual and cultural values. Each year we organise grand festivals including the Shri Ramlila Mahotsav, Krishna Janmashtami, a large bhandara on Chaitra Ram Navami, and Akhand Ramayan Paath (17–18 July). Through these events we share the message of devotion, love, unity and harmony.\n\nThe upcoming Shri Ramlila Mahotsav 2025 will be held from 27 September to 2 October 2025 at Ramlila Maidan, Kalyanpur, Lucknow, every evening from 7:00 PM. We warmly invite all devotees and residents to join with their families and imbibe the ideals of Lord Rama. Your presence will enhance the glory of the celebration.\n\nJai Shri Ram! 🙏",
    },
  }

  const currentContent = content[language] || content.hi

  return (
    <section className="py-20 bg-ramlila-decorative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4 text-balance">
            {currentContent.title}
          </h2>
        </div>

        <Card>
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground text-balance">
              {language === "hi" ? "सूचना" : "Information"}
                </CardTitle>
              </CardHeader>
          <CardContent>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: currentContent.info.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }} />
                  </div>
              </CardContent>
            </Card>
      </div>
    </section>
  )
}
