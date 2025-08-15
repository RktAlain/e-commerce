"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = `CMD-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>

            <p className="text-gray-600 mb-6">
              Merci pour votre commande. Votre numéro de commande est <strong>{orderNumber}</strong>
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Prochaines étapes</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Vous recevrez un email de confirmation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">Votre commande sera préparée sous 24h</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Livraison estimée : 3-5 jours ouvrés</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/account/orders" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Suivre ma commande
                </Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button className="w-full">Continuer mes achats</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
