"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function About() {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const content = {
    hindi: {
      title: "रामलीला के बारे में",
      subtitle:
        "रामलीला एक पारंपरिक नाट्य प्रदर्शन है जो भगवान राम के जीवन और रोमांच को दर्शाता है, जो प्राचीन महाकाव्य रामायण पर आधारित है।",
      
      historyNote: {
        title: "समिति का संदेश",
        content:
          "स्नेही स्वजन,\n\nमर्यादा पुरुषोत्तम श्रीराम को भगवान विष्णु का सातवां अवतार माना जाता है। श्रीराम के जीवन रूप का दर्शन मात्र भारतीय समाज के नस-नस में मूल्य भर देता है एवं इस पुनीत कथा-दर्शन को, पुन्य रूप, पापहारी, कल्याणकारी, भक्ति प्रदायक, माया-मोह नाशक एवं मंगलकारी माना गया है।\n\nश्री रामलीला समिति कल्याणपुर कि स्थापना सन् 2001 में की गई थी। उपरोक्त परम्परा को आगे बढ़ाते हुए विगत 23 वर्षों की भांति इस वर्ष भी विजयादशमी के पावन पर्व पर पुनः जन-जन के सहयोग से समिति द्वारा श्री रामलीला महोत्सव का आयोजन किया जाना सुनिश्चित हुआ है। इस विशाल कार्यक्रम की सफलता हेतु आपसे उदार सहयोग की आकांक्षा है। महोदय, महोत्सव में सपरिवार पधारने हेतु हमारा भाव भरा आमंत्रण स्वीकार करने की कृपा करें।\n\nहमारी रामलीला केवल एक मंचीय प्रस्तुति नहीं, बल्कि हमारी सांस्कृतिक धरोहर का जीवंत उत्सव है — जो पीढ़ी दर पीढ़ी हमारे मूल्यों, कला और परम्पराओं को संजोए रखता है। यह आयोजन समुदाय की साझी चेतना, पारस्परिक सहयोग और सौहार्द की भावना को सुदृढ़ करता है, ताकि हम सब मिलकर ‘रामराज्य’ के आदर्शों को जीवन में उतार सकें।",
      },
    },
    english: {
      title: "About Ramlila",
      subtitle:
        "Ramlila is a traditional theatrical performance that depicts the life and adventures of Lord Rama, based on the ancient epic Ramayana.",
      
      historyNote: {
        title: "A Message from the Committee",
        content:
          "Dear well‑wishers,\n\nMaryada Purushottam Shri Ram is revered as the seventh incarnation of Lord Vishnu. Even a glimpse of His life fills every vein of our society with values. This sacred katha‑darshan is regarded as purifying, sin‑destroying, welfare‑bringing, devotion‑bestowing, illusion‑dispelling, and auspicious.\n\nShri Ramlila Samiti, Kalyanpur was established in the year 2001. Carrying this tradition forward, just as in the past years, the Committee will once again organize the grand Shri Ramlila Mahotsav on the auspicious occasion of Vijayadashami with the support of one and all. We humbly seek your generous cooperation for the success of this mega event. Please accept our heartfelt invitation to attend the festival with your family.\n\nOur Ramlila is not merely a stage presentation; it is a living celebration of our cultural heritage that preserves values, art, and traditions across generations. This festival strengthens our shared community spirit, mutual cooperation, and harmony—so that together we may strive to live the ideals of ‘Ram Rajya’.",
      },
    },
  }

  const currentContent = language === "en" ? content.english : content.hindi

  return (
    <section className="py-20 bg-ramlila-performers relative">
      <div className="absolute inset-0 bg-[url('/4.jpg')] bg-cover bg-center opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{currentContent.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Carousel className="relative" setApi={(api) => {
              if (api) {
                api.on('select', () => {
                  setCurrentSlide(api.selectedScrollSnap())
                })
              }
            }}>
              <CarouselContent>
                <CarouselItem>
                  <div className="relative w-full aspect-video">
                    <img
                      src="/1.jpg"
                      alt="Ramlila performance scene 1"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative w-full aspect-video">
                    <img
                      src="/2.jpg"
                      alt="Ramlila performance scene 2"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative w-full aspect-video">
                    <img
                      src="/3.jpg"
                      alt="Ramlila performance scene 3"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            {/* Dot indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{currentContent.historyNote.title}</h3>
                <div className="text-muted-foreground text-pretty leading-relaxed max-h-64 overflow-y-auto md:max-h-none whitespace-pre-line">
                  {currentContent.historyNote.content}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
