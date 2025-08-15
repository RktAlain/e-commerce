"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: 'MacBook Pro M3 14"',
    sku: "MBP-M3-14-512",
    category: "Électronique",
    price: 2499,
    stock: 15,
    status: "Actif",
    sales: 45,
    image: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    sku: "IPH-15-PRO-MAX",
    category: "Électronique",
    price: 1199,
    stock: 3,
    status: "Actif",
    sales: 67,
    image: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    sku: "APP-2-GEN",
    category: "Audio",
    price: 249,
    stock: 0,
    status: "Rupture",
    sales: 123,
    image: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    sku: "SGS-24-256",
    category: "Électronique",
    price: 899,
    stock: 25,
    status: "Actif",
    sales: 34,
    image: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-08",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    sku: "SONY-WH-1000XM5",
    category: "Audio",
    price: 399,
    stock: 12,
    status: "Inactif",
    sales: 28,
    image: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-05",
  },
]

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Inactif":
        return "bg-gray-100 text-gray-800"
      case "Rupture":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", icon: AlertTriangle }
    if (stock < 10) return { color: "text-orange-600", icon: AlertTriangle }
    return { color: "text-green-600", icon: Package }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des produits</h1>
            <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
          </div>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom ou SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Électronique">Électronique</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="Rupture">Rupture de stock</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Produit</th>
                    <th className="text-left py-3 px-4">SKU</th>
                    <th className="text-left py-3 px-4">Catégorie</th>
                    <th className="text-left py-3 px-4">Prix</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Ventes</th>
                    <th className="text-left py-3 px-4">Statut</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock)
                    return (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">Créé le {product.createdAt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{product.sku}</code>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold">{product.price}€</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <stockStatus.icon className={`w-4 h-4 ${stockStatus.color}`} />
                            <span className={stockStatus.color}>{product.stock}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span>{product.sales}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
                <p className="text-gray-400">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="outline">Actions en lot</Button>
              <Button variant="outline">Exporter CSV</Button>
            </div>

            <div className="text-sm text-gray-500">Page 1 sur 1 • {filteredProducts.length} produits</div>
          </div>
        )}
      </div>
    </div>
  )
}
