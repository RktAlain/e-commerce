"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, TrendingUp, Users, Package, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro M3",
    price: 2499,
    originalPrice: 2799,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 234,
    badge: "Tendance",
    category: "Électronique",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 1199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 567,
    badge: "Nouveau",
    category: "Électronique",
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    originalPrice: 299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 892,
    badge: "Promo",
    category: "Audio",
  },
  {
    id: 4,
    name: "iPad Air",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 445,
    category: "Tablettes",
  },
]

const categories = [
  { name: "Électronique", icon: "📱", count: 1234 },
  { name: "Mode", icon: "👕", count: 856 },
  { name: "Maison", icon: "🏠", count: 642 },
  { name: "Sport", icon: "⚽", count: 389 },
  { name: "Livres", icon: "📚", count: 567 },
  { name: "Beauté", icon: "💄", count: 234 },
]

const stats = [
  { label: "Produits", value: "10K+", icon: Package },
  { label: "Clients", value: "50K+", icon: Users },
  { label: "Ventes", value: "1M+", icon: TrendingUp },
]

export default function HomePage() {
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      title: "Soldes d'Hiver",
      subtitle: "Jusqu'à -70% sur une sélection",
      image: "/placeholder.svg?height=400&width=800",
      cta: "Découvrir",
    },
    {
      title: "Nouveautés Tech",
      subtitle: "Les derniers produits Apple",
      image: "/placeholder.svg?height=400&width=800",
      cta: "Voir plus",
    },
    {
      title: "Livraison Gratuite",
      subtitle: "Dès 50€ d'achat",
      image: "/placeholder.svg?height=400&width=800",
      cta: "Profiter",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <div className="min-h-screen">
      {/* Hero Banner Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <div className="relative h-full bg-gradient-to-r from-blue-600 to-purple-600">
              <img
                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div className="max-w-2xl px-4">
                  <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">{banner.title}</h1>
                  <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">{banner.subtitle}</p>
                  <Button size="lg" className="animate-fade-in-up animation-delay-400">
                    {banner.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href="/products">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} produits</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Produits Populaires</h2>
            <Link href="/products">
              <Button variant="outline">Voir tout</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge
                      className="absolute top-2 left-2"
                      variant={
                        product.badge === "Tendance"
                          ? "default"
                          : product.badge === "Nouveau"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl mb-8 opacity-90">
            Recevez nos dernières offres et nouveautés directement dans votre boîte mail
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Votre email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button variant="secondary">S'abonner</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
