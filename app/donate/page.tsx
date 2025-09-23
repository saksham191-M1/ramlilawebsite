"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { QrCode, CreditCard, Heart, IndianRupee, Smartphone, Copy, Check } from "lucide-react"

export default function DonatePage() {
  const [donationType, setDonationType] = useState<"qr" | "uid">("qr")
  const [amount, setAmount] = useState<"51" | "101" | "custom">("51")
  const [customAmount, setCustomAmount] = useState("")
  const [uid, setUid] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorPhone, setDonorPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [upiIdCopied, setUpiIdCopied] = useState(false)

  const upiId = "215687414012086@cnrb"

  const handleDonation = async () => {
    if (!donorName || !donorEmail || !donorPhone) {
      alert("कृपया सभी आवश्यक जानकारी भरें")
      return
    }

    const donationAmount = amount === "custom" ? customAmount : amount
    if (!donationAmount || (amount === "custom" && parseInt(donationAmount) < 1)) {
      alert("कृपया वैध राशि दर्ज करें")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      alert(`धन्यवाद! आपका ₹${donationAmount} का दान स्वीकार किया गया।\nUID: ${uid || "QR_CODE_DONATION"}`)
      setIsProcessing(false)
    }, 2000)
  }

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId)
    setUpiIdCopied(true)
    setTimeout(() => setUpiIdCopied(false), 2000)
  }

  const generateQRCode = () => {
    const qrData = {
      type: "donation",
      amount: amount === "custom" ? customAmount : amount,
      category: "seva",
      timestamp: Date.now()
    }
    
    // In real implementation, this would generate actual QR code
    alert(`QR Code Data: ${JSON.stringify(qrData, null, 2)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              सेवा दान
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              श्री रामलीला समिति कल्याणपुर के कार्यों में सहयोग करें और धर्म के मार्ग पर आगे बढ़ें
            </p>
          </div>

          {/* UPI Payment Section */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-blue-800 flex items-center justify-center gap-2">
                <Smartphone className="w-6 h-6" />
                UPI भुगतान
              </CardTitle>
              <p className="text-center text-blue-600">
                किसी भी UPI ऐप से स्कैन करें या UPI ID का उपयोग करें
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* QR Code Section */}
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">RAM LILA SAMITI KALYANPUR LKO</h3>
                    <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
                      {/* Try to load QR code image */}
                      <img 
                        src="/payment.jpg" 
                        alt="UPI QR Code for Ramlila Samiti"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Hide image and show fallback
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'block'
                        }}
                      />
                      {/* Fallback QR code placeholder */}
                      <div className="text-center" style={{display: 'none'}}>
                        <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-2">
                          <QrCode className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">QR Code Image</p>
                        <p className="text-xs text-gray-400 mt-1">Add upi-qr-code.jpg to public folder</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Scan using any BHIM UPI enabled APP</p>
                  </div>
                </div>

                {/* UPI ID Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">UPI ID</h3>
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center justify-between">
                        <code className="text-lg font-mono text-blue-800">{upiId}</code>
                        <Button
                          onClick={copyUpiId}
                          size="sm"
                          variant="outline"
                          className="ml-2"
                        >
                          {upiIdCopied ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      UPI ID को कॉपी करें और अपने UPI ऐप में पेस्ट करें
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-800">समर्थित UPI ऐप्स</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">C</div>
                        <span>Canara</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center">B</div>
                        <span>BHIM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">G</div>
                        <span>Google Pay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">P</div>
                        <span>Paytm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center">पे</div>
                        <span>PhonePe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-center">दान के बारे में</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-lg mb-2">UPI भुगतान</h3>
                  <p className="text-muted-foreground text-sm">
                    सभी भुगतान UPI के माध्यम से सुरक्षित और तुरंत
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">कोई शुल्क नहीं</h3>
                  <p className="text-muted-foreground text-sm">
                    UPI भुगतान पर कोई अतिरिक्त शुल्क नहीं
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">धर्मार्थ उपयोग</h3>
                  <p className="text-muted-foreground text-sm">
                    सभी दान धार्मिक और सामाजिक कार्यों में उपयोग होते हैं
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
