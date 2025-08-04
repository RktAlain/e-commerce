"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useParams } from "next/navigation"

const product = {
  id: 1,
  name: 'MacBook Pro M3 14"',
  price: 2499,
  originalPrice: 2799,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  rating: 4.9,
  reviews: 234,
  badge: "Tendance",
  category: "Électronique",
  brand: "Apple",
  inStock: true,
  stockCount: 15,
  description:
    'Le MacBook Pro M3 14" redéfinit la performance portable avec sa puce M3 révolutionnaire. Conçu pour les professionnels créatifs et les développeurs, il offre une puissance exceptionnelle dans un design élégant et portable.',
  features: [
    "Puce Apple M3 avec CPU 8 cœurs et GPU 10 cœurs",
    "14,2 pouces Liquid Retina XDR display",
    "16 Go de mémoire unifiée",
    "512 Go de stockage SSD",
    "Jusqu'à 22 heures d'autonomie",
    "Caméra FaceTime HD 1080p",
    "Trois ports Thunderbolt 4",
    "Port HDMI, port de carte SDXC, prise casque",
  ],
  specifications: {
    Processeur: "Apple M3 (CPU 8 cœurs, GPU 10 cœurs)",
    Mémoire: "16 Go de mémoire unifiée",
    Stockage: "512 Go SSD",
    Écran: "14,2 pouces Liquid Retina XDR (3024 x 1964)",
    Poids: "1,55 kg",
    Dimensions: "31,26 x 22,12 x 1,55 cm",
    Autonomie: "Jusqu'à 22 heures",
    Connectivité: "Wi-Fi 6E, Bluetooth 5.3",
  },
  variants: {
    storage: ["512 Go", "1 To", "2 To"],
    memory: ["16 Go", "32 Go", "64 Go"],
    color: ["Gris sidéral", "Argent"],
  },
}

const reviews = [
  {
    id: 1,
    user: "Marie L.",
    rating: 5,
    date: "15 Jan 2024",
    comment:
      "Excellent produit ! La performance est exceptionnelle et l'écran est magnifique. Parfait pour le développement et la création.",
    verified: true,
  },
  {
    id: 2,
    user: "Thomas D.",
    rating: 5,
    date: "10 Jan 2024",
    comment:
      "Très satisfait de mon achat. La batterie tient vraiment toute la journée et la qualité de construction est irréprochable.",
    verified: true,
  },
  {
    id: 3,
    user: "Sophie M.",
    rating: 4,
    date: "5 Jan 2024",
    comment: "Très bon ordinateur portable, seul bémol le prix qui reste élevé mais la qualité est au rendez-vous.",
    verified: false,
  },
]

const relatedProducts = [
  {
    id: 2,
    name: 'iPad Pro 12.9"',
    price: 1199,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    price: 249,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Magic Mouse",
    price: 99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
  },
]

export default function ProductPage() {
  const { addToCart } = useCart()
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState({
    storage: product.variants.storage[0],
    memory: product.variants.memory[0],
    color: product.variants.color[0],
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <span>Accueil</span> / <span>Produits</span> / <span>Électronique</span> /{" "}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge
                  className="absolute top-4 left-4"
                  variant={
                    product.badge === "Tendance" ? "default" : product.badge === "Nouveau" ? "secondary" : "destructive"
                  }
                >
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} avis)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">{product.price}€</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}€</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</Badge>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Variants */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stockage</label>
                <div className="flex gap-2">
                  {product.variants.storage.map((option) => (
                    <Button
                      key={option}
                      variant={selectedVariants.storage === option ? "default" : "outline"}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, storage: option }))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mémoire</label>
                <div className="flex gap-2">
                  {product.variants.memory.map((option) => (
                    <Button
                      key={option}
                      variant={selectedVariants.memory === option ? "default" : "outline"}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, memory: option }))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Couleur</label>
                <div className="flex gap-2">
                  {product.variants.color.map((option) => (
                    <Button
                      key={option}
                      variant={selectedVariants.color === option ? "default" : "outline"}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, color: option }))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantité:</label>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">{product.stockCount} en stock</span>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={() => addToCart({ ...product, quantity })}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium">Livraison gratuite</div>
                  <div className="text-sm text-gray-500">Dès 50€ d'achat</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium">Garantie 2 ans</div>
                  <div className="text-sm text-gray-500">Constructeur</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-orange-600" />
                <div>
                  <div className="font-medium">Retour 30 jours</div>
                  <div className="text-sm text-gray-500">Satisfait ou remboursé</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Caractéristiques principales</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Achat vérifié
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{relatedProduct.price}€</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
