"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReservationData {
  name: string
  email: string
  phone: string
  address: string
  numberOfSeats: string
  specialRequirements: string
}

const ramayanaQuotes = [
  "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः - धर्म का नाश करने वाले का धर्म नाश करता है, धर्म की रक्षा करने वाले की धर्म रक्षा करता है।",
  "सत्यमेव जयते नानृतं - सत्य की ही विजय होती है, असत्य की नहीं।",
  "आपदामपहर्तारं दातारं सर्वसम्पदाम् - विपत्तियों को हरने वाले और सभी संपत्तियों को देने वाले।",
  "रामो विग्रहवान् धर्मः - राम साक्षात् धर्म के स्वरूप हैं।",
  "मातृदेवो भव पितृदेवो भव - माता को देवता मानो, पिता को देवता मानो।",
]

export default function ReservePage() {
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    numberOfSeats: "",
    specialRequirements: "",
  })
  const [showCard, setShowCard] = useState(false)
  const [reservationCard, setReservationCard] = useState<(ReservationData & { quote: string; id: string }) | null>(null)

  const handleInputChange = (field: keyof ReservationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate reservation card
    const randomQuote = ramayanaQuotes[Math.floor(Math.random() * ramayanaQuotes.length)]
    const reservationId = `RLS${Date.now().toString().slice(-6)}`

    const cardData = {
      ...formData,
      quote: randomQuote,
      id: reservationId,
    }

    setReservationCard(cardData)
    setShowCard(true)

    // Save to localStorage for persistence
    const existingReservations = JSON.parse(localStorage.getItem("reservations") || "[]")
    existingReservations.push(cardData)
    localStorage.setItem("reservations", JSON.stringify(existingReservations))
  }

  const downloadCard = () => {
    // Create a simple text version for download
    const cardText = `
श्री रामलीला समिति कल्याणपुर
आरक्षण पत्र

नाम: ${reservationCard?.name}
आरक्षण संख्या: ${reservationCard?.id}
सीटें: ${reservationCard?.numberOfSeats}

प्रवेश निःशुल्क है
स्थान: रामलीला पार्क शिवानी विहार
दिनांक: 27 सितंबर - 2 अक्टूबर 2024

"${reservationCard?.quote}"

धन्यवाद!
    `

    const blob = new Blob([cardText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ramlila-reservation-${reservationCard?.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (showCard && reservationCard) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">श्री रामलीला समिति कल्याणपुर</CardTitle>
                <CardDescription className="text-lg font-semibold">आरक्षण पत्र</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-primary">{reservationCard.name} जी</h3>
                  <p className="text-sm text-muted-foreground">आरक्षण संख्या: {reservationCard.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>सीटें:</strong> {reservationCard.numberOfSeats}
                  </div>
                  <div>
                    <strong>फोन:</strong> {reservationCard.phone}
                  </div>
                </div>

                <div className="text-center space-y-2 py-4 border-t border-b border-primary/20">
                  <p className="text-lg font-bold text-green-600">प्रवेश निःशुल्क है</p>
                  <p className="text-sm">
                    <strong>स्थान:</strong> रामलीला पार्क शिवानी विहार
                  </p>
                  <p className="text-sm">
                    <strong>दिनांक:</strong> 27 सितंबर - 2 अक्टूबर 2024
                  </p>
                </div>

                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                  <p className="text-sm italic text-center">"{reservationCard.quote}"</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={downloadCard} className="flex-1">
                    कार्ड डाउनलोड करें
                  </Button>
                  <Button variant="outline" onClick={() => setShowCard(false)} className="flex-1">
                    नया आरक्षण
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">सीट आरक्षण</CardTitle>
              <CardDescription className="text-center">
                रामलीला के लिए अपनी सीट आरक्षित करें - प्रवेश निःशुल्क है
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">पूरा नाम *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    placeholder="अपना पूरा नाम दर्ज करें"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">ईमेल पता *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    placeholder="आपका ईमेल पता"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">फोन नंबर *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    placeholder="आपका फोन नंबर"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">पता *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    placeholder="आपका पूरा पता"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seats">सीटों की संख्या *</Label>
                  <Select
                    value={formData.numberOfSeats}
                    onValueChange={(value) => handleInputChange("numberOfSeats", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="सीटों की संख्या चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 सीट</SelectItem>
                      <SelectItem value="2">2 सीटें</SelectItem>
                      <SelectItem value="3">3 सीटें</SelectItem>
                      <SelectItem value="4">4 सीटें</SelectItem>
                      <SelectItem value="5">5 सीटें</SelectItem>
                      <SelectItem value="6">6 सीटें</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">विशेष आवश्यकताएं (वैकल्पिक)</Label>
                  <Textarea
                    id="requirements"
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                    placeholder="कोई विशेष आवश्यकताएं या टिप्पणियां"
                    rows={2}
                  />
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300 text-center">
                    <strong>महत्वपूर्ण:</strong> प्रवेश पूर्णतः निःशुल्क है। यह केवल सीट आरक्षण के लिए है।
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  सीट आरक्षित करें
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
