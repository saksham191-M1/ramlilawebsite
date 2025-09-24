"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, RotateCcw, Crown, Medal, Award } from "lucide-react"

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const allQuizQuestions: QuizQuestion[] = [
  // All 45 of your questions are included here...
  // To save space, they are omitted from this view, but the logic assumes they are present.
  {
    question: "मूल रामायण महाकाव्य की रचना किसने की थी?",
    options: ["महर्षि वाल्मीकि जी", "महर्षि व्यास जी", "गोस्वामी तुलसीदास जी", "महाकवि कालिदास जी"],
    correct: 0,
    explanation: "महर्षि वाल्मीकि जी को मूल संस्कृत रामायण महाकाव्य की रचना का श्रेय दिया जाता है।",
  },
  {
    question: "भगवान श्रीराम का जन्म किस नगर में हुआ था?",
    options: ["मथुरा", "अयोध्या", "वाराणसी", "उज्जैन"],
    correct: 1,
    explanation: "भगवान श्रीराम का जन्म अयोध्या में हुआ था, जो कोसल राज्य की राजधानी थी।",
  },
  {
    question: "भगवान श्रीराम की अर्धांगिनी का नाम क्या है?",
    options: ["राधा जी", "रुक्मिणी जी", "माता सीता जी", "द्रौपदी जी"],
    correct: 2,
    explanation: "माता सीता जी भगवान श्रीराम की अर्धांगिनी हैं और रामायण की मुख्य पात्र हैं।",
  },
  {
    question: "भगवान श्रीराम के वो भक्त कौन हैं जो अपनी शक्ति के लिए प्रसिद्ध हैं?",
    options: [" हनुमान जी", "गरुड़ जी", "भीम", "अर्जुन"],
    correct: 0,
    explanation: " हनुमान जी भगवान श्रीराम के सबसे समर्पित भक्त हैं, जो अपनी अपार शक्ति और भक्ति के लिए प्रसिद्ध हैं।",
  },
  {
    question: "माता सीता जी का हरण करने वाले राक्षस राज का नाम क्या था?",
    options: ["कुम्भकर्ण", "रावण", "मेघनाद", "शूर्पणखा"],
    correct: 1,
    explanation: "रावण, लंका का दस सिर वाला राक्षस राज, ने माता सीता जी का हरण किया था।",
  },
  {
    question: "श्रीराम ने कितने वर्ष वनवास में बिताए?",
    options: ["12 वर्ष", "13 वर्ष", "14 वर्ष", "15 वर्ष"],
    correct: 2,
    explanation: "भगवान श्रीराम ने अपने पिता राजा दशरथ जी की कैकेयी से की गई प्रतिज्ञा के अनुसार 14 वर्ष वनवास में बिताए।",
  },
  {
    question: "कौन सा त्योहार श्रीराम की रावण पर विजय का जश्न मनाता है?",
    options: ["दिवाली", "होली", "दशहरा", "नवरात्रि"],
    correct: 2,
    explanation: "दशहरा भगवान श्रीराम की राक्षस राज रावण पर विजय का जश्न मनाता है।",
  },
  {
    question: "श्रीराम के पिता का नाम क्या था?",
    options: ["राजा दशरथ जी", "राजा जनक जी", "भरत जी", "माता कौशल्या जी"],
    correct: 0,
    explanation: "राजा दशरथ जी भगवान श्रीराम के पिता और अयोध्या के शासक थे।",
  },
  {
    question: "रामचरितमानस की रचना किसने की?",
    options: ["महर्षि वाल्मीकि जी", "गोस्वामी तुलसीदास जी", "महाकवि कालिदास जी", "भर्तृहरि जी"],
    correct: 1,
    explanation: "गोस्वामी तुलसीदास जी ने रामचरितमानस की रचना की, जो अवधी भाषा में रामायण का पुनर्कथन है।",
  },
  {
    question: "श्रीराम के साथ वनवास में जाने वाले भाई का नाम क्या था?",
    options: ["भरत जी", "शत्रुघ्न जी", "लक्ष्मण जी", "पवनपुत्र हनुमान जी"],
    correct: 2,
    explanation: "लक्ष्मण जी ने भगवान श्रीराम और माता सीता जी के साथ 14 वर्ष के वनवास में साथ दिया।",
  },
  {
    question: "श्रीराम, माता सीता और लक्ष्मण ने अपने वनवास का अधिकांश समय किस वन में बिताया?",
    options: ["दंडकारण्य", "नैमिषारण्य", "काम्यक", "चित्रकूट"],
    correct: 0,
    explanation: "दंडकारण्य वन में उन्होंने अपने वनवास का महत्वपूर्ण हिस्सा बिताया।",
  },
  {
    question: "रावण का कौन सा भाई भगवान श्रीराम की सेना में शामिल हुआ?",
    options: ["कुम्भकर्ण", "विभीषण", "मेघनाद", "अक्षय"],
    correct: 1,
    explanation: "विभीषण, रावण का धर्मात्मा भाई, युद्ध में भगवान श्रीराम के पक्ष में शामिल हुआ।",
  },
  {
    question: "लंका तक पहुंचने के लिए बनाए गए पुल का नाम क्या है?",
    options: ["राम सेतु", "गंगा सेतु", "लंका सेतु", "हनुमान सेतु"],
    correct: 0,
    explanation: "राम सेतु (एडम्स ब्रिज भी कहा जाता है) पवनपुत्र हनुमान जी की सेना द्वारा लंका तक पहुंचने के लिए बनाया गया था।",
  },
  {
    question: "श्रीराम की सहायता करने वाले भालुओं के राजा कौन थे?",
    options: ["सुग्रीव", "जाम्बवान्त", "अंगद", "नल"],
    correct: 1,
    explanation: "जाम्बवान्त, भालुओं के राजा, एक बुद्धिमान सहयोगी थे जिन्होंने भगवान श्रीराम की खोज में मदद की।",
  },
  {
    question: "श्रीराम ने रावण को मारने के लिए कौन सा अस्त्र इस्तेमाल किया?",
    options: ["सुदर्शन चक्र", "ब्रह्मास्त्र", "त्रिशूल", "धनुष बाण"],
    correct: 1,
    explanation: "भगवान श्रीराम ने अंततः रावण को हराने के लिए ब्रह्मास्त्र, एक दिव्य अस्त्र का उपयोग किया।",
  },
  {
    question: "माता सीता जी के पिता कौन थे?",
    options: ["राजा दशरथ जी", "राजा जनक जी", "भरत जी", "माता कौशल्या जी"],
    correct: 1,
    explanation: "मिथिला के राजा जनक जी माता सीता जी के दत्तक पिता थे जिन्होंने उन्हें हल की रेखा में पाया था।",
  },
  {
    question: "लक्ष्मण जी को रावण के किस पुत्र ने शक्ति बाण से मूर्छित किया था?",
    options: ["मेघनाद ", "अक्षय", "नरांतक", "देवांतक"],
    correct: 0,
    explanation: "मेघनाद (इंद्रजीत भी कहा जाता है) रावण का शक्तिशाली पुत्र और महान योद्धा था।",
  },
  {
    question: "लक्ष्मण को बचाने के लिए पवनपुत्र हनुमान जी कौन सा पर्वत लेकर आए थे?",
    options: ["कैलाश", "गोवर्धन", "द्रोणगिरि", "मंदार"],
    correct: 2,
    explanation: "पवनपुत्र हनुमान जी ने लक्ष्मण जी को बचाने के लिए संजीवनी बूटी लाने हेतु द्रोणगिरि पर्वत उठाया।",
  },
  {
    question: "श्रीराम को भटकाने वाले सुनहरे हिरण का नाम क्या था?",
    options: ["मारीच", "सुबाहु", "ताड़का", "खर"],
    correct: 0,
    explanation: "मारीच, एक राक्षस, ने सुनहरे हिरण का रूप धारण कर भगवान श्रीराम को माता सीता जी से अलग किया।",
  },
  {
    question: "किसे शेषनाग का अवतार माना जाता है, जिन पर भगवान विष्णु विश्राम करते हैं?",
    options: ["भरत", "हनुमान", "सुग्रीव", "लक्ष्मण"],
    correct: 3,
    explanation: "लक्ष्मण जी को शेषनाग का अवतार माना जाता है, जिन पर भगवान विष्णु विश्राम करते हैं।",
  },
  {
    question: "दशहरा पारंपरिक रूप से किस महीने में आयोजित की जाती है?",
    options: ["कार्तिक", "आश्विन", "चैत्र", "भाद्रपद"],
    correct: 1,
    explanation: "दशहरा पारंपरिक रूप से आश्विन महीने में आयोजित की जाती है, जो रामलीला के समापन के साथ होती है।",
  },
  // Additional questions about Ram's life
  {
    question: "भगवान श्रीराम का जन्म किस नक्षत्र में हुआ था?",
    options: ["पुनर्वसु", "पुष्य", "आश्लेषा", "मघा"],
    correct: 0,
    explanation: "भगवान श्रीराम का जन्म पुनर्वसु नक्षत्र में हुआ था।",
  },
  {
    question: "श्रीराम ने किस गुरु/ गुरुओं से शिक्षा और ज्ञान प्राप्त किया था ?",
    options: ["वशिष्ठ", "विश्वामित्र", "अगस्त्य", "उपरोक्त सभी"],
    correct: 3,
    explanation: "भगवान श्रीराम ने वशिष्ठ, विश्वामित्र और अगस्त्य सभी से शिक्षा प्राप्त की थी।",
  },
  {
    question: "श्री राम के कुलगुरु कौन थे, जिन्होंने उन्हें वेदों और उपनिषदों का ज्ञान दिया और दीक्षा प्रदान की ?",
    options: ["वशिष्ठ", "विश्वामित्र", "अगस्त्य", "उपरोक्त सभी"],
    correct: 0,
    explanation: "श्री राम के कुलगुरु महर्षि वशिष्ठ थे, जिन्होंने उन्हें आध्यात्मिक और धार्मिक शिक्षा दी थी. महर्षि वशिष्ठ न केवल दशरथ के कुल पुरोहित थे बल्कि उन्होंने राम और उनके भाइयों को प्रारंभिक शिक्षा और दीक्षा भी दी थी.",
  },
  {
    question: "श्रीराम ने कौनसा यज्ञ किया था?",
    options: ["अश्वमेध यज्ञ", "राजसूय यज्ञ", "पुत्रकामेष्टि यज्ञ", "सभी यज्ञों में"],
    correct: 0,
    explanation: "श्रीराम ने अयोध्या के चक्रवर्ती सम्राट के रूप में अपनी संप्रभुता स्थापित करने और साम्राज्य के विस्तार के लिए अश्वमेध यज्ञ किया था।",
  },
  {
    question: "श्रीराम ने किस वन में सबसे पहले वनवास बिताया?",
    options: ["चित्रकूट", "दंडकारण्य", "पंचवटी", "नैमिषारण्य"],
    correct: 0,
    explanation: "भगवान श्रीराम ने सबसे पहले चित्रकूट में वनवास बिताया था।",
  },
  // Hanuman's life questions
  {
    question: "हनुमान जी के पिता कौन थे?",
    options: ["केशरी जी", "इन्द्र देव", "अंजना जी", "सुग्रीव जी"],
    correct: 0,
    explanation: "हनुमान जी के पिता केशरी जी थे।",
  },
  { 
    question: "हनुमान जी की माता कौन थीं?",
    options: ["अंजना जी", "कौशल्या जी", "सुमित्रा जी", "कैकेयी जी"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी की माता अंजना जी थीं।",
  },
  {
    question: "हनुमान जी को चिरंजीवी (अमर) होने का वरदान किस देवता ने दिया था?",
    options: ["इंद्र देव", "शिव जी", "ब्रह्मा जी", "पवन देव"],
    correct: 2,
    explanation: "देवताओं द्वारा हनुमान जी को कई वरदान प्राप्त हुए, परन्तु उन्हें चिरंजीवी (अमर) होने का मुख्य वरदान ब्रह्मा जी ने दिया था।"
  },
  {
    question: "हनुमान जी जब लंका की ओर उड़ रहे थे, तब किस पर्वत ने उन्हें विश्राम के लिए आमंत्रित किया था?",
    options: ["मैनाक पर्वत", "गंधमादन पर्वत", "सुमेरु पर्वत", "कैलाश पर्वत"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी जब लंका की ओर उड़ रहे थे, तब समुद्र ने मैनाक पर्वत को ऊपर उठाया ताकि वह उन्हें विश्राम दे सके, लेकिन हनुमान जी ने कर्तव्य को प्राथमिकता देते हुए विश्राम नहीं किया।",
  },
  {
    question: "हनुमान जी ने कितनी बार सूर्य को निगलने का प्रयास किया था?",
    options: ["एक बार", "दो बार", "तीन बार", "चार बार"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी ने एक बार सूर्य को निगलने का प्रयास किया था।",
  },
  {
  question: "अशोक वाटिका में हनुमान जी ने माता सीता को श्रीराम की पहचान के रूप में क्या दिया था?",
    options: ["श्रीराम का बाण", "श्रीराम की अंगूठी", "श्रीराम की खड़ाऊँ", "श्रीराम का वस्त्र"],
    correct: 1,
    explanation: "जब हनुमान जी पहली बार अशोक वाटिका में माता सीता से मिले, तो उन्होंने श्रीराम के दूत के रूप में अपनी पहचान सिद्ध करने के लिए उन्हें श्रीराम की दी हुई अंगूठी दी थी।"
  },
  // Ravana's life questions
  {
    question: "रावण के पिता कौन थे?",
    options: ["विश्रवा जी", "पुलस्त्य जी", "कुबेर जी", "विभीषण जी"],
    correct: 0,
    explanation: "रावण के पिता विश्रवा जी थे।",
  },
  {
    question: "रावण की माता कौन थीं?",
    options: ["कैकसी", "मंदोदरी", "शूर्पणखा", "ताड़का"],
    correct: 0,
    explanation: "रावण की माता कैकसी थीं।",
  },
  {
  question: "रावण ने किस देवता को प्रसन्न करके चंद्रहास नामक दिव्य खड्ग (तलवार) प्राप्त किया था?",
  options: ["ब्रह्मा जी", "विष्णु जी", "शिव जी", "इंद्र देव"],
  correct: 2,
  explanation: "रावण ने अपनी कठोर तपस्या से भगवान शिव को प्रसन्न किया था, जिन्होंने वरदान के रूप में उसे अजेय चंद्रहास खड्ग प्रदान किया।"
},

{
  question: "रावण का बड़ा सौतेला भाई कौन था, जो लंका का मूल शासक भी था?",
  options: ["विभीषण", "कुम्भकर्ण", "कुबेर", "अहिरावण"],
  correct: 2,
  explanation: "कुबेर, ऋषि विश्रवा और उनकी पहली पत्नी इलविडा के पुत्र थे। रावण के पिता भी विश्रवा थे, लेकिन उसकी माँ कैकसी थीं, इस प्रकार कुबेर रावण के सौतेले भाई हुए।"
},
  // Sita Ji questions
  {
    question: "माता सीता  का जन्म कैसे हुआ था?",
    options: ["हल की रेखा से", "कमल से", "अग्नि से", "पृथ्वी से"],
    correct: 0,
    explanation: "माता सीता जी का जन्म हल की रेखा से हुआ था, इसीलिए उन्हें भूमि पुत्री भी कहा जाता है।",
  },
  {
    question: "रावण द्वारा हरण किए जाने के बाद, माता सीता लंका की अशोक वाटिका में किस वृक्ष के नीचे रहती थीं?",
    options: ["वट वृक्ष", "पीपल वृक्ष", "अशोक वृक्ष", "आम्र वृक्ष"],
    correct: 2,
    explanation: "रावण की कैद में रहते हुए, माता सीता ने लंका की अशोक वाटिका में अशोक वृक्ष के नीचे ही अपना समय व्यतीत किया था।"
  },
  {
    question: "श्रीराम से विवाह की मनोकामना के लिए, पुष्प वाटिका में माता सीता ने किस देवी की पूजा की थी?",
    options: ["देवी लक्ष्मी", "देवी सरस्वती", "देवी गौरी", "देवी गंगा"],
    correct: 2,
    explanation: "रामचरितमानस के अनुसार, श्रीराम से मिलने के बाद माता सीता ने पुष्प वाटिका में देवी गौरी (पार्वती) की पूजा करके उन्हें पति रूप में पाने का वरदान मांगा था।"
  },
  
  // Interactions between characters
  {
    question: "श्रीराम और हनुमान(ब्राह्मण वेश में) जी की पहली मुलाकात कहाँ हुई थी?",
    options: ["किष्किंधा", "लंका", "अयोध्या", "मिथिला"],
    correct: 0,
    explanation: "श्रीराम और हनुमान जी की पहली मुलाकात ऋष्यमूक पर्वत पर हुई थी, जो किष्किंधa राज्य के अंतर्गत आता है। वहाँ हनुमान जी ने ब्राह्मण वेश में राम से संवाद किया और उसी क्षण उन्हें अपना आराध्य मान लिया।",

  },
 {
  question: "माता सीता को अपना संदेशवाहक प्रमाणित करने के लिए श्रीराम ने हनुमान जी को क्या दिया था?",
  options: [
    "अपना धनुष",
    "अपनी खड़ाऊँ",
    "एक दिव्य वस्त्र",
    "अपनी अंगूठी"
  ],
  correct: 3,
  explanation: "श्रीराम ने अपनी अंगूठी हनुमान जी को दी ताकि जब वे सीता जी से मिलें, तो इसे दिखाकर विश्वास दिला सकें कि वे सच में श्रीराम के ही दूत हैं।"
},
{
  question: "उस बुद्धिमान और वृद्ध गिद्ध का क्या नाम था जिसने रावण को सीता का हरण करने से रोकने का प्रयास किया था?",
  options: [
    "जटायु",
    "संपाती",
    "गरुड़",
    "कौआ"
  ],
  correct: 0,
  explanation: "जटायु ने रावण को सीता का हरण करने से रोकने का प्रयास किया था।"
},
  {
    question: "रावण ने सीता जी को कहाँ रखा था?",
    options: ["अशोक वाटिका", "सुंदर वाटिका", "राम वाटिका", "सीता वाटिका"],
    correct: 0,
    explanation: "रावण ने माता सीता जी को अशोक वाटिका में रखा था।",
  },
  {
    question: "यदि राम का संबंध दशरथ से है, तो घटोत्कच का संबंध भीम से है। निम्नलिखित में से किस जोड़ी का संबंध समान है?",
    options: ["वाली और सुग्रीव", "लक्ष्मण और शत्रुघ्न", "जटायु और सम्पाती", "लव और कुश"],
    correct: 3,
    explanation: "प्रश्न में दिया गया संबंध पुत्र से पिता का है। राम, दशरथ के पुत्र हैं और घटोत्कच, भीम के पुत्र हैं। विकल्पों में, केवल लव और कुश ही राम के पुत्र हैं, जो इसी तर्क का पालन करते हैं। अन्य सभी विकल्प (लक्ष्मण-शत्रुघ्न, जटायु-सम्पाती, वाली-सुग्रीव) भाइयों की जोड़ियाँ हैं।",
  },
  {
  question: "किसने श्रीराम को रावण की मृत्यु का रहस्य बताया था?",
  options: [
    "कुम्भकर्ण ने",
    "मंदोदरी ने",
    "विभीषण ने",
    "अंगद ने"
  ],
  correct: 2,
  explanation: "रावण के छोटे भाई विभीषण ने, जो धर्म के पक्ष में श्रीराम से आ मिले थे, उन्होंने ही यह रहस्य उजागर किया कि रावण की नाभि में अमृत कुंड है, जिसे सुखाने पर ही उसकी मृत्यु संभव है।"
},
{
  question: "उस दिव्य धनुष का क्या नाम था जिसे भगवान राम ने सीता स्वयंवर में विवाह के लिए तोड़ा था?",
  options: [
    "पिनाक",
    "शारंग",
    "विजय",
    "गांडीव"
  ],
  correct: 0,
  explanation: "सीता स्वयंवर की शर्त भगवान शिव के दिव्य धनुष पिनाक पर प्रत्यंचा चढ़ाना था। भगवान राम ने न केवल प्रत्यंचा चढ़ाई, बल्कि धनुष को तोड़ भी दिया, जिससे उनकी दिव्य शक्ति का प्रदर्शन हुआ।"
},
]

interface LeaderboardEntry {
  name: string
  score: number
  percentage: number
  date: string
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [playerName, setPlayerName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizLanguage] = useState<"hi" | "en">("hi") // Default to Hindi
  const [quizStartTime, setQuizStartTime] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchLeaderboard()
    initializeQuiz()
  }, [])

  // In page.tsx

// In page.tsx

const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/leaderboard?limit=10');

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      } else {
        const savedLeaderboard = localStorage.getItem("ramlila-leaderboard");
        if (savedLeaderboard) {
          setLeaderboard(JSON.parse(savedLeaderboard));
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      const savedLeaderboard = localStorage.getItem("ramlila-leaderboard");
      if (savedLeaderboard) {
        setLeaderboard(JSON.parse(savedLeaderboard));
      }
    } finally {
        setIsLoading(false);
    }
  };
  // Replace the existing initializeQuiz function in your page.tsx with this one.

const initializeQuiz = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('/.netlify/functions/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Ramayana Characters',
        language: 'hi',
        count: 5,
        difficulty: 'medium'
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const aiQuestions: QuizQuestion[] = await response.json();

    const shuffledHardcoded = [...allQuizQuestions].sort(() => Math.random() - 0.5);
    const hardcodedQuestions = shuffledHardcoded.slice(0, 5);

    const combinedQuestions = [...aiQuestions, ...hardcodedQuestions];
    const finalShuffledQuestions = combinedQuestions.sort(() => Math.random() - 0.5);

    setQuizQuestions(finalShuffledQuestions);

  } catch (error) {
    console.error('Could not fetch AI questions, using fallback:', error);
    const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled.slice(0, 10));
  } finally {
    setQuizStartTime(Date.now());
    setIsLoading(false);
  }
};

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return // Prevent changing answer after result is shown
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion]?.correct;
    if (isCorrect) {
      setScore(score + 1)
    }

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    
    setShowResult(true)

    // Automatically move to the next question or end the quiz after a delay
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
        // Directly show the final score screen instead of name input
      }
    }, 6000) // 6-second delay to show the explanation
  }

  // In page.tsx

// Corrected function for app/quiz/page.tsx

const saveToLeaderboard = async () => {
  if (!playerName.trim()) return;

  setIsLoading(true);
  const percentage = Math.round((score / quizQuestions.length) * 100);
  const timeSpent = Math.round((Date.now() - quizStartTime) / 1000); // Calculate time in seconds

  try {
    const response = await fetch('/.netlify/functions/addScore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: playerName.trim(),
        score,
        percentage,
        timeSpent, // <-- This line is added
      }),
    });

    if (!response.ok) {
      throw new Error('API request to save score failed');
    }

    await fetchLeaderboard();
    setShowNameInput(false);
    setShowLeaderboard(true);

  } catch (error) {
    console.error('Error saving score, falling back to localStorage:', error);
    // Fallback logic can be added here if you wish
  } finally {
    setIsLoading(false);
  }
};

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizCompleted(false)
    setAnswers([])
    setPlayerName("")
    setShowNameInput(false)
    setShowLeaderboard(false)
    initializeQuiz()
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
      if (percentage >= 80) return "उत्कृष्ट! आप रामलीला के विशेषज्ञ हैं! 🏆"
      if (percentage >= 60) return "बहुत बढ़िया! आप रामलीला को अच्छी तरह जानते हैं! 🎉"
      if (percentage >= 40) return "अच्छा प्रयास! रामलीला के बारे में सीखते रहें! 👍"
      return "रामलीला की अद्भुत दुनिया की खोज करते रहें! 📚"
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader className="text-center">
                <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl text-foreground">लीडरबोर्ड</CardTitle>
                <p className="text-muted-foreground">शीर्ष रामलीला चैंपियन</p>
              </CardHeader>
              <CardContent>
                {isLoading && leaderboard.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">लोड हो रहा है...</p>
                ) : leaderboard.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">अभी तक कोई स्कोर नहीं। पहले बनें!</p>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              {index === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                              {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                              {index === 2 && <Award className="w-5 h-5 text-amber-600" />}
                            {index > 2 && <span className="font-bold text-muted-foreground">#{index + 1}</span>}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{entry.percentage}%</p>
                          <p className="text-sm text-muted-foreground">{entry.score}/{quizQuestions.length > 0 ? quizQuestions.length : 10}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 justify-center mt-8">
                  <Button onClick={resetQuiz}>नई प्रश्नोत्तरी शुरू करें</Button>
                  <Button variant="outline" onClick={fetchLeaderboard} disabled={isLoading}>
                    {isLoading ? "रिफ्रेश हो रहा..." : "रिफ्रेश करें"}
                  </Button>
                  {quizCompleted && (
                    <Button variant="outline" onClick={() => setShowLeaderboard(false)}>
                      परिणाम पर वापस जाएं
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Combined Results and Name Input Screen
  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <CardHeader>
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl text-foreground">प्रश्नोत्तरी पूरी!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl font-bold text-primary">
                  {score}/{quizQuestions.length}
                </div>
                <p className="text-xl text-muted-foreground">{getScoreMessage()}</p>
                <div className="space-y-4">
                  <Progress value={(score / quizQuestions.length) * 100} className="h-3" />
                  <p className="text-muted-foreground">
                    आपने {Math.round((score / quizQuestions.length) * 100)}% स्कोर किया
                  </p>
                </div>
                
                {/* Name input section */}
                <div className="space-y-2 border-t pt-6">
                    <Label htmlFor="playerName" className="text-muted-foreground">अपना स्कोर लीडरबोर्ड पर सेव करने के लिए नाम दर्ज करें</Label>
                    <div className="flex gap-2 justify-center">
                        <Input
                            id="playerName"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="अपना नाम दर्ज करें"
                            className="text-center max-w-xs"
                        />
                        <Button onClick={saveToLeaderboard} disabled={!playerName.trim() || isLoading}>
                            {isLoading ? "सेव हो रहा..." : "सेव करें"}
                        </Button>
                    </div>
                </div>

                <div className="flex gap-4 justify-center flex-wrap pt-4">
                  <Button onClick={resetQuiz} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                      फिर से कोशिश करें
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowLeaderboard(true)}
                    className="flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                        लीडरबोर्ड देखें
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  // CORRECTION: Removed the separate showNameInput and quizCompleted screens. They are now combined.

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">प्रश्न लोड हो रहे हैं...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>रामलीला प्रश्नोत्तरी | Ramlila Quiz - श्री रामलीला समिति कल्याणपुर</title>
        <meta name="description" content="रामायण और रामलीला के बारे में अपने ज्ञान की परीक्षा करें। 40+ प्रश्नों के साथ राम, हनुमान, सीता और रावण के जीवन के बारे में जानें।" />
      </Head>
        <Navigation />
      <main className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  रामलीला ज्ञान प्रश्नोत्तरी
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowLeaderboard(true)}>
                  <Trophy className="w-4 h-4 mr-2" />
                    लीडरबोर्ड
                </Button>
                <div className="text-muted-foreground">
                  {currentQuestion + 1} / {quizQuestions.length}
                </div>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-foreground text-balance">
                {quizQuestions[currentQuestion]?.question || "प्रश्न"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showResult ? (
                <>
                  <div className="space-y-3">
                    {(quizQuestions[currentQuestion]?.options || []).map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                  <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full">
                    {currentQuestion === quizQuestions.length - 1
                      ? "प्रश्नोत्तरी समाप्त करें"
                        : "अगला प्रश्न"}
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4 p-4">
                  <div className={`text-xl font-semibold ${selectedAnswer === quizQuestions[currentQuestion]?.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedAnswer === quizQuestions[currentQuestion]?.correct ? '✅ सही!' : '❌ गलत'}
                  </div>
                  <p className="text-muted-foreground text-pretty">{quizQuestions[currentQuestion]?.explanation || ""}</p>
                  <div className="text-sm text-muted-foreground">
                    वर्तमान स्कोर: {score} / {currentQuestion + 1}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}