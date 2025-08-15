"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Package, Brain, Target, Zap, BarChart3, PieChart, Download } from "lucide-react"

// Données simulées pour l'IA
const aiInsights = [
  {
    type: "prediction",
    title: "Prévision des ventes",
    description: "Les ventes devraient augmenter de 15% le mois prochain",
    confidence: 87,
    impact: "high",
    icon: TrendingUp,
  },
  {
    type: "trend",
    title: "Tendance produit",
    description: "Les AirPods Pro sont en forte demande (+45% cette semaine)",
    confidence: 92,
    impact: "medium",
    icon: Zap,
  },
  {
    type: "customer",
    title: "Segmentation client",
    description: "23% de vos clients sont à risque de churn",
    confidence: 78,
    impact: "high",
    icon: Users,
  },
  {
    type: "inventory",
    title: "Gestion des stocks",
    description: "Réapprovisionnement recommandé pour 5 produits",
    confidence: 95,
    impact: "medium",
    icon: Package,
  },
]

const salesPrediction = [
  { month: "Jan", actual: 125430, predicted: 132000 },
  { month: "Fév", actual: 134200, predicted: 140000 },
  { month: "Mar", actual: 142800, predicted: 148000 },
  { month: "Avr", actual: null, predicted: 156000 },
  { month: "Mai", actual: null, predicted: 163000 },
  { month: "Juin", actual: null, predicted: 171000 },
]

const customerSegments = [
  { segment: "VIP", count: 1250, revenue: 450000, color: "bg-purple-500" },
  { segment: "Fidèles", count: 3400, revenue: 680000, color: "bg-blue-500" },
  { segment: "Réguliers", count: 5600, revenue: 420000, color: "bg-green-500" },
  { segment: "Nouveaux", count: 2100, revenue: 180000, color: "bg-orange-500" },
  { segment: "À risque", count: 890, revenue: 45000, color: "bg-red-500" },
]

const productTrends = [
  { name: "MacBook Pro M3", trend: "+23%", sales: 145, revenue: 362475, status: "trending" },
  { name: "iPhone 15 Pro", trend: "+18%", sales: 234, revenue: 280566, status: "trending" },
  { name: "AirPods Pro", trend: "+45%", sales: 567, revenue: 141183, status: "hot" },
  { name: "iPad Air", trend: "-5%", sales: 89, revenue: 53311, status: "declining" },
  { name: "Apple Watch", trend: "+12%", sales: 156, revenue: 69840, status: "stable" },
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendColor = (trend: string) => {
    if (trend.startsWith("+")) return "text-green-600"
    if (trend.startsWith("-")) return "text-red-600"
    return "text-gray-600"
  }

  const getProductStatus = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-100 text-red-800"
      case "trending":
        return "bg-green-100 text-green-800"
      case "stable":
        return "bg-blue-100 text-blue-800"
      case "declining":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Brain className="w-8 h-8 text-purple-600" />
              Analytics IA
            </h1>
            <p className="text-gray-600">Insights intelligents et prévisions basées sur l'IA</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 jours</SelectItem>
                <SelectItem value="30d">30 jours</SelectItem>
                <SelectItem value="90d">90 jours</SelectItem>
                <SelectItem value="1y">1 an</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* AI Insights Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Insights IA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <insight.icon className="w-6 h-6 text-purple-600" />
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact === "high" ? "Critique" : insight.impact === "medium" ? "Important" : "Info"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Confiance</span>
                    <span className="text-sm font-medium">{insight.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${insight.confidence}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Prévisions
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produits
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Predictions Tab */}
          <TabsContent value="predictions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Prévisions de ventes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesPrediction.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex items-center gap-4">
                          {data.actual && (
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Réel</p>
                              <p className="font-semibold">{data.actual.toLocaleString()}€</p>
                            </div>
                          )}
                          <div className="text-right">
                            <p className="text-sm text-purple-600">Prévu</p>
                            <p className="font-semibold text-purple-600">{data.predicted.toLocaleString()}€</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Recommandations IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800">Optimisation des stocks</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Augmentez le stock d'AirPods Pro de 40% pour répondre à la demande croissante
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800">Opportunité marketing</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Lancez une campagne ciblée pour les clients inactifs avec 20% de réduction
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800">Prix dynamique</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Ajustez le prix de l'iPad Air (-5%) pour stimuler les ventes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Segmentation RFM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegments.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${segment.color}`} />
                          <span className="font-medium">{segment.segment}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{segment.count.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{segment.revenue.toLocaleString()}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analyse comportementale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Taux de rétention</span>
                        <span className="text-sm font-bold">78.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "78.5%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Valeur vie client (CLV)</span>
                        <span className="text-sm font-bold">1,247€</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Satisfaction client</span>
                        <span className="text-sm font-bold">4.6/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Tendances produits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Produit</th>
                        <th className="text-left py-3 px-4">Tendance</th>
                        <th className="text-left py-3 px-4">Ventes</th>
                        <th className="text-left py-3 px-4">Revenus</th>
                        <th className="text-left py-3 px-4">Statut</th>
                        <th className="text-left py-3 px-4">Recommandation IA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productTrends.map((product, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="font-medium">{product.name}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-semibold ${getTrendColor(product.trend)}`}>{product.trend}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span>{product.sales}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold">{product.revenue.toLocaleString()}€</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getProductStatus(product.status)}>
                              {product.status === "hot"
                                ? "🔥 Très demandé"
                                : product.status === "trending"
                                  ? "📈 En hausse"
                                  : product.status === "stable"
                                    ? "➡️ Stable"
                                    : "📉 En baisse"}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-600">
                              {product.status === "hot"
                                ? "Augmenter le stock"
                                : product.status === "trending"
                                  ? "Promouvoir davantage"
                                  : product.status === "declining"
                                    ? "Réduire le prix"
                                    : "Maintenir"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Score IA Global</p>
                      <p className="text-3xl font-bold text-purple-600">8.7/10</p>
                    </div>
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Précision prévisions</p>
                      <p className="text-3xl font-bold text-green-600">94.2%</p>
                    </div>
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Optimisations actives</p>
                      <p className="text-3xl font-bold text-blue-600">12</p>
                    </div>
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">ROI IA</p>
                      <p className="text-3xl font-bold text-orange-600">+23%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Historique des optimisations IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-green-800">Prix dynamique activé</h4>
                      <p className="text-sm text-green-600">Augmentation des ventes de 12% sur les produits ciblés</p>
                    </div>
                    <span className="text-sm text-green-600">Il y a 2 jours</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-blue-800">Recommandations personnalisées</h4>
                      <p className="text-sm text-blue-600">Taux de conversion amélioré de 8%</p>
                    </div>
                    <span className="text-sm text-blue-600">Il y a 5 jours</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-purple-800">Segmentation automatique</h4>
                      <p className="text-sm text-purple-600">Identification de 150 nouveaux clients VIP</p>
                    </div>
                    <span className="text-sm text-purple-600">Il y a 1 semaine</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
