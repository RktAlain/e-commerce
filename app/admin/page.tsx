"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Eye,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Chiffre d'affaires",
    value: "€125,430",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Commandes",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Clients",
    value: "8,945",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Produits",
    value: "456",
    change: "-2.1%",
    trend: "down",
    icon: Package,
    color: "text-orange-600",
  },
]

const recentOrders = [
  {
    id: "CMD-001234",
    customer: "Marie Dubois",
    amount: 1299,
    status: "En cours",
    date: "Il y a 2h",
  },
  {
    id: "CMD-001233",
    customer: "Thomas Martin",
    amount: 249,
    status: "Expédiée",
    date: "Il y a 4h",
  },
  {
    id: "CMD-001232",
    customer: "Sophie Laurent",
    amount: 899,
    status: "Livrée",
    date: "Il y a 6h",
  },
  {
    id: "CMD-001231",
    customer: "Alex Rousseau",
    amount: 2499,
    status: "En cours",
    date: "Il y a 8h",
  },
]

const topProducts = [
  {
    name: "MacBook Pro M3",
    sales: 45,
    revenue: 112475,
    trend: "up",
  },
  {
    name: "iPhone 15 Pro",
    sales: 67,
    revenue: 80333,
    trend: "up",
  },
  {
    name: "AirPods Pro",
    sales: 123,
    revenue: 30627,
    trend: "down",
  },
  {
    name: "iPad Air",
    sales: 34,
    revenue: 20366,
    trend: "up",
  },
]

const alerts = [
  {
    type: "stock",
    message: "Stock faible pour iPhone 15 Pro (3 restants)",
    severity: "warning",
  },
  {
    type: "order",
    message: "5 commandes en attente de traitement",
    severity: "info",
  },
  {
    type: "return",
    message: "2 demandes de retour à traiter",
    severity: "warning",
  },
]

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livrée":
        return "bg-green-100 text-green-800"
      case "Expédiée":
        return "bg-blue-100 text-blue-800"
      case "En cours":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre boutique</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Commandes récentes</CardTitle>
                <Link href="/admin/orders">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir tout
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.amount}€</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alertes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.severity === "warning" ? "bg-orange-50 border-orange-400" : "bg-blue-50 border-blue-400"
                      }`}
                    >
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Produits populaires</CardTitle>
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} ventes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{product.revenue.toLocaleString()}€</p>
                      {product.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 ml-auto" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/products/new">
                  <Button className="w-full h-20 flex flex-col gap-2">
                    <Package className="w-6 h-6" />
                    <span className="text-sm">Ajouter produit</span>
                  </Button>
                </Link>
                <Link href="/admin/orders">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-sm">Gérer commandes</span>
                  </Button>
                </Link>
                <Link href="/admin/customers">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                    <Users className="w-6 h-6" />
                    <span className="text-sm">Voir clients</span>
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-sm">Analytics</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
