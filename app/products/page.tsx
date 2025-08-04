"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Heart, Filter, Grid, List, Search } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: 1,
    name: 'MacBook Pro M3 14"',
    price: 2499,
    originalPrice: 2799,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 234,
    badge: "Tendance",
    category: "Électronique",
    brand: "Apple",
    inStock: true,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 567,
    badge: "Nouveau",
    category: "Électronique",
    brand: "Apple",
    inStock: true,
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    price: 249,
    originalPrice: 299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 892,
    badge: "Promo",
    category: "Audio",
    brand: "Apple",
    inStock: true,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 445,
    category: "Électronique",
    brand: "Samsung",
    inStock: false,
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 399,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 678,
    category: "Audio",
    brand: "Sony",
    inStock: true,
  },
  {
    id: 6,
    name: "Dell XPS 13",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 234,
    category: "Électronique",
    brand: "Dell",
    inStock: true,
  },
]

const categories = ["Tous", "Électronique", "Audio", "Informatique"]
const brands = ["Tous", "Apple", "Samsung", "Sony", "Dell"]
const priceRanges = [
  { label: "Tous", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "0 - 100€", min: 0, max: 100 },
  { label: "100 - 500€", min: 100, max: 500 },
  { label: "500 - 1000€", min: 500, max: 1000 },
  { label: "1000€+", min: 1000, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedBrand, setSelectedBrand] = useState("Tous")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "Tous" || product.category === selectedCategory) &&
        (selectedBrand === "Tous" || product.brand === selectedBrand) &&
        product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max,
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Nos Produits</h1>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <label className="text-sm cursor-pointer">{category}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Marques</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox checked={selectedBrand === brand} onCheckedChange={() => setSelectedBrand(brand)} />
                      <label className="text-sm cursor-pointer">{brand}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Prix</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.label} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedPriceRange.label === range.label}
                        onCheckedChange={() => setSelectedPriceRange(range)}
                      />
                      <label className="text-sm cursor-pointer">{range.label}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">{filteredProducts.length} produit(s) trouvé(s)</div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <Link href={`/products/${product.id}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </Link>
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
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Rupture de stock</Badge>
                        </div>
                      )}
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

                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

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
                          disabled={!product.inStock}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Link href={`/products/${product.id}`}>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </Link>
                          {product.badge && (
                            <Badge
                              className="absolute -top-2 -left-2"
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
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="text-xl font-semibold hover:text-blue-600">{product.name}</h3>
                            </Link>
                            <Button size="icon" variant="ghost">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>

                          <p className="text-gray-600 mb-2">{product.brand}</p>

                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">
                              {product.rating} ({product.reviews} avis)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">{product.price}€</span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">{product.originalPrice}€</span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {!product.inStock && <Badge variant="destructive">Rupture de stock</Badge>}
                              <Button onClick={() => addToCart(product)} disabled={!product.inStock}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Ajouter au panier
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
