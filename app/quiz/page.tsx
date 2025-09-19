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
    options: ["पवनपुत्र हनुमान जी", "गरुड़ जी", "भीम", "अर्जुन"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी भगवान श्रीराम के सबसे समर्पित भक्त हैं, जो अपनी अपार शक्ति और भक्ति के लिए प्रसिद्ध हैं।",
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
    options: ["कुम्भकर्ण", "विभीषण जी", "मेघनाद", "अक्षय"],
    correct: 1,
    explanation: "विभीषण जी, रावण का धर्मात्मा भाई, युद्ध में भगवान श्रीराम के पक्ष में शामिल हुआ।",
  },
  {
    question: "लंका तक पहुंचने के लिए बनाए गए पुल का नाम क्या है?",
    options: ["राम सेतु", "गंगा सेतु", "लंका सेतु", "हनुमान सेतु"],
    correct: 0,
    explanation: "राम सेतु (एडम्स ब्रिज भी कहा जाता है) पवनपुत्र हनुमान जी की सेना द्वारा लंका तक पहुंचने के लिए बनाया गया था।",
  },
  {
    question: "श्रीराम की सहायता करने वाले भालुओं के राजा कौन थे?",
    options: ["सुग्रीव जी", "जाम्बवान जी", "अंगद जी", "नल"],
    correct: 1,
    explanation: "जाम्बवान जी, भालुओं के राजा, एक बुद्धिमान सहयोगी थे जिन्होंने भगवान श्रीराम की खोज में मदद की।",
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
    question: "श्रीराम के विरुद्ध लड़ने वाले रावण के पुत्र का नाम क्या था?",
    options: ["मेघनाद (इंद्रजीत)", "अक्षय", "नरांतक", "देवांतक"],
    correct: 0,
    explanation: "मेघनाद (इंद्रजीत भी कहा जाता है) रावण का शक्तिशाली पुत्र और महान योद्धा था।",
  },
  {
    question: "लक्ष्मण को बचाने के लिए पवनपुत्र हनुमान जी कौन सा पर्वत लेकर आए?",
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
    question: "रामलीला पारंपरिक रूप से किस महीने में आयोजित की जाती है?",
    options: ["कार्तिक", "आश्विन", "चैत्र", "भाद्रपद"],
    correct: 1,
    explanation: "रामलीला पारंपरिक रूप से आश्विन महीने में आयोजित की जाती है, जो दशहरे में समाप्त होती है।",
  },
  // Additional questions about Ram's life
  {
    question: "भगवान श्रीराम का जन्म किस नक्षत्र में हुआ था?",
    options: ["पुनर्वसु", "पुष्य", "आश्लेषा", "मघा"],
    correct: 0,
    explanation: "भगवान श्रीराम का जन्म पुनर्वसु नक्षत्र में हुआ था।",
  },
  {
    question: "श्रीराम ने किस गुरु से शिक्षा प्राप्त की थी?",
    options: ["वशिष्ठ जी", "विश्वामित्र जी", "अगस्त्य जी", "उपरोक्त सभी"],
    correct: 3,
    explanation: "भगवान श्रीराम ने वशिष्ठ जी, विश्वामित्र जी और अगस्त्य जी सभी से शिक्षा प्राप्त की थी।",
  },
  {
    question: "श्रीराम ने किस यज्ञ में भाग लिया था?",
    options: ["अश्वमेध यज्ञ", "राजसूय यज्ञ", "पुत्रकामेष्टि यज्ञ", "सभी यज्ञों में"],
    correct: 2,
    explanation: "भगवान श्रीराम ने पुत्रकामेष्टि यज्ञ में भाग लिया था।",
  },
  {
    question: "श्रीराम ने किस वन में सबसे पहले वनवास बिताया?",
    options: ["चित्रकूट", "दंडकारण्य", "पंचवटी", "नैमिषारण्य"],
    correct: 0,
    explanation: "भगवान श्रीराम ने सबसे पहले चित्रकूट में वनवास बिताया था।",
  },
  // Hanuman's life questions
  {
    question: "पवनपुत्र हनुमान जी के पिता कौन थे?",
    options: ["केशरी जी", "वायु देव", "अंजना जी", "सुग्रीव जी"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी के पिता केशरी जी थे।",
  },
  {
    question: "हनुमान जी की माता कौन थीं?",
    options: ["अंजना जी", "कौशल्या जी", "सुमित्रा जी", "कैकेयी जी"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी की माता अंजना जी थीं।",
  },
  {
    question: "हनुमान जी ने किस देवता का वरदान प्राप्त किया था?",
    options: ["ब्रह्मा जी", "शिव जी", "विष्णु जी", "इन्द्र जी"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी ने ब्रह्मा जी का वरदान प्राप्त किया था।",
  },
  {
    question: "हनुमान जी ने किस पर्वत को उठाकर लंका पहुँचे थे?",
    options: ["मैनाक पर्वत", "गंधमादन पर्वत", "सुमेरु पर्वत", "कैलाश पर्वत"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी ने मैनाक पर्वत को उठाकर लंका पहुँचे थे।",
  },
  {
    question: "हनुमान जी ने कितनी बार सूर्य को निगलने का प्रयास किया था?",
    options: ["एक बार", "दो बार", "तीन बार", "चार बार"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी ने एक बार सूर्य को निगलने का प्रयास किया था।",
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
    question: "रावण ने किस देवता से वरदान प्राप्त किया था?",
    options: ["ब्रह्मा जी", "शिव जी", "विष्णु जी", "इन्द्र जी"],
    correct: 0,
    explanation: "रावण ने ब्रह्मा जी से वरदान प्राप्त किया था।",
  },
  {
    question: "रावण ने कितने साल तपस्या की थी?",
    options: ["हजार साल", "दस हजार साल", "एक लाख साल", "दस लाख साल"],
    correct: 1,
    explanation: "रावण ने दस हजार साल तपस्या की थी।",
  },
  {
    question: "रावण का सबसे बड़ा भाई कौन था?",
    options: ["कुबेर जी", "विभीषण जी", "कुम्भकर्ण", "खर"],
    correct: 0,
    explanation: "रावण का सबसे बड़ा भाई कुबेर जी थे।",
  },
  // Sita Ji questions
  {
    question: "माता सीता जी का जन्म कैसे हुआ था?",
    options: ["हल की रेखा से", "कमल से", "अग्नि से", "पृथ्वी से"],
    correct: 0,
    explanation: "माता सीता जी का जन्म हल की रेखा से हुआ था, इसीलिए उन्हें भूमि पुत्री भी कहा जाता है।",
  },
  {
    question: "सीता जी ने किस वृक्ष के नीचे बैठकर तपस्या की थी?",
    options: ["अशोक वृक्ष", "पीपल", "बरगद", "नीम"],
    correct: 0,
    explanation: "माता सीता जी ने अशोक वृक्ष के नीचे बैठकर तपस्या की थी।",
  },
  {
    question: "सीता जी ने किस देवता की पूजा की थी?",
    options: ["शिव जी", "विष्णु जी", "ब्रह्मा जी", "इन्द्र जी"],
    correct: 0,
    explanation: "माता सीता जी ने शिव जी की पूजा की थी।",
  },
  {
    question: "सीता जी ने कितने वर्ष तक अग्नि परीक्षा दी थी?",
    options: ["एक वर्ष", "दो वर्ष", "तीन वर्ष", "चार वर्ष"],
    correct: 0,
    explanation: "माता सीता जी ने एक वर्ष तक अग्नि परीक्षा दी थी।",
  },
  // Interactions between characters
  {
    question: "राम और हनुमान की पहली मुलाकात कहाँ हुई थी?",
    options: ["किष्किंधा", "लंका", "अयोध्या", "मिथिला"],
    correct: 0,
    explanation: "भगवान श्रीराम और पवनपुत्र हनुमान जी की पहली मुलाकात किष्किंधा में हुई थी।",
  },
  {
    question: "राम ने हनुमान को क्या दिया था?",
    options: ["अंगूठी", "चूड़ामणि", "संदेश", "उपरोक्त सभी"],
    correct: 3,
    explanation: "भगवान श्रीराम ने पवनपुत्र हनुमान जी को अंगूठी, चूड़ामणि और संदेश सभी दिए थे।",
  },
  {
    question: "रावण ने सीता जी को कहाँ रखा था?",
    options: ["अशोक वाटिका", "सुंदर वाटिका", "राम वाटिका", "सीता वाटिका"],
    correct: 0,
    explanation: "रावण ने माता सीता जी को अशोक वाटिका में रखा था।",
  },
  {
    question: "राम ने रावण से कितनी बार युद्ध किया था?",
    options: ["एक बार", "दो बार", "तीन बार", "चार बार"],
    correct: 0,
    explanation: "भगवान श्रीराम ने रावण से एक बार युद्ध किया था।",
  },
  {
    question: "हनुमान जी ने रावण के कितने सिर काटे थे?",
    options: ["कोई नहीं", "एक", "दो", "तीन"],
    correct: 0,
    explanation: "पवनपुत्र हनुमान जी ने रावण के कोई सिर नहीं काटे थे, क्योंकि रावण अमर था।",
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

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/quiz/leaderboard?limit=10')
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      const savedLeaderboard = localStorage.getItem("ramlila-leaderboard")
      if (savedLeaderboard) {
        setLeaderboard(JSON.parse(savedLeaderboard))
      }
    }
  }

  const initializeQuiz = () => {
    const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5)
    setQuizQuestions(shuffled.slice(0, 10))
    setQuizStartTime(Date.now())
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === quizQuestions[currentQuestion]?.correct) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
        setShowNameInput(true)
      }
    }, 2000)
  }

  const saveToLeaderboard = async () => {
    if (!playerName.trim()) return

    setIsLoading(true)
    try {
      const percentage = Math.round((score / quizQuestions.length) * 100)
      const timeSpent = Math.round((Date.now() - quizStartTime) / 1000)

      const response = await fetch('/api/quiz/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName.trim(),
          score,
          percentage,
          totalQuestions: quizQuestions.length,
          language: quizLanguage,
          answers,
          timeSpent
        }),
      })

      if (response.ok) {
        await fetchLeaderboard()
        setShowNameInput(false)
      } else {
        console.error('Failed to save quiz entry')
        const newEntry: LeaderboardEntry = {
          name: playerName.trim(),
          score,
          percentage,
          date: new Date().toLocaleDateString(),
        }
        const updatedLeaderboard = [...leaderboard, newEntry]
          .sort((a, b) => b.percentage - a.percentage || b.score - a.score)
          .slice(0, 10)
        setLeaderboard(updatedLeaderboard)
        localStorage.setItem("ramlila-leaderboard", JSON.stringify(updatedLeaderboard))
        setShowNameInput(false)
      }
    } catch (error) {
      console.error('Error saving quiz entry:', error)
      const percentage = Math.round((score / quizQuestions.length) * 100)
      const newEntry: LeaderboardEntry = {
        name: playerName.trim(),
        score,
        percentage,
        date: new Date().toLocaleDateString(),
      }
      const updatedLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => b.percentage - a.percentage || b.score - a.score)
        .slice(0, 10)
      setLeaderboard(updatedLeaderboard)
      localStorage.setItem("ramlila-leaderboard", JSON.stringify(updatedLeaderboard))
      setShowNameInput(false)
    } finally {
      setIsLoading(false)
    }
  }

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
    setQuizQuestions([])
    setQuizStartTime(0)
    setIsLoading(false)
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
                {leaderboard.length === 0 ? (
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
                            <p className="text-sm text-muted-foreground">{entry.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{entry.percentage}%</p>
                          <p className="text-sm text-muted-foreground">{entry.score}/10</p>
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
                  <Button variant="outline" onClick={() => setShowLeaderboard(false)}>
                    प्रश्नोत्तरी पर वापस जाएं
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

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <CardHeader>
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl text-foreground">बहुत बढ़िया!</CardTitle>
                <p className="text-muted-foreground">अपना स्कोर लीडरबोर्ड पर सेव करने के लिए अपना नाम दर्ज करें</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-primary">
                  {score}/{quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playerName">आपका नाम</Label>
                  <Input
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="अपना नाम दर्ज करें"
                    className="text-center"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={saveToLeaderboard} disabled={!playerName.trim() || isLoading}>
                    {isLoading ? "सेव हो रहा..." : "स्कोर सेव करें"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowNameInput(false)}>
                    रद्द करें
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
                <div className="flex gap-4 justify-center flex-wrap">
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
                    लीडरबोर्ड
                  </Button>
                  <Button variant="outline" onClick={() => setShowNameInput(true)} className="flex items-center gap-2">
                    स्कोर सेव करें
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

  if (!Array.isArray(quizQuestions) || quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">प्रश्न लोड हो रहे हैं...</p>
          </div>
        </main>
        <Footer />
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
                <div className="text-center space-y-4">
                  {selectedAnswer === quizQuestions[currentQuestion]?.correct ? (
                    <div className="text-green-600 text-xl font-semibold">
                      ✅ सही!
                    </div>
                  ) : (
                    <div className="text-red-600 text-xl font-semibold">
                      ❌ गलत
                    </div>
                  )}
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
