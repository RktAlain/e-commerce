"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Users,
  Mail,
  Percent,
  TrendingUp,
  Target,
  Gift,
  ImageIcon,
  BarChart3,
} from "lucide-react"

const coupons = [
  {
    id: 1,
    code: "WELCOME20",
    type: "Pourcentage",
    value: 20,
    description: "Réduction de bienvenue",
    minAmount: 50,
    maxUses: 1000,
    currentUses: 234,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Actif",
  },
  {
    id: 2,
    code: "SUMMER50",
    type: "Montant fixe",
    value: 50,
    description: "Promo été",
    minAmount: 200,
    maxUses: 500,
    currentUses: 156,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "Programmé",
  },
  {
    id: 3,
    code: "FREESHIP",
    type: "Livraison gratuite",
    value: 0,
    description: "Livraison offerte",
    minAmount: 30,
    maxUses: 2000,
    currentUses: 1847,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Actif",
  },
]

const campaigns = [
  {
    id: 1,
    name: "Newsletter Janvier",
    type: "Email",
    subject: "Découvrez nos nouveautés 2024",
    recipients: 15420,
    sent: 15420,
    opened: 8934,
    clicked: 1247,
    status: "Envoyée",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Promo Black Friday",
    type: "Email",
    subject: "Black Friday : -70% sur tout !",
    recipients: 18750,
    sent: 18750,
    opened: 12456,
    clicked: 3421,
    status: "Envoyée",
    date: "2023-11-24",
  },
  {
    id: 3,
    name: "Retour clients inactifs",
    type: "Email",
    subject: "Nous vous avons manqué ?",
    recipients: 2340,
    sent: 0,
    opened: 0,
    clicked: 0,
    status: "Brouillon",
    date: "2024-01-20",
  },
]

const banners = [
  {
    id: 1,
    title: "Soldes d'hiver",
    description: "Jusqu'à -70% sur une sélection",
    image: "/placeholder.svg?height=200&width=400",
    link: "/products?sale=true",
    position: "Hero",
    status: "Actif",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: 2,
    title: "Nouveautés Tech",
    description: "Découvrez les derniers produits",
    image: "/placeholder.svg?height=200&width=400",
    link: "/products?category=tech",
    position: "Sidebar",
    status: "Actif",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
]

export default function AdminMarketingPage() {
  const [activeTab, setActiveTab] = useState("coupons")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Programmé":
        return "bg-blue-100 text-blue-800"
      case "Expiré":
        return "bg-red-100 text-red-800"
      case "Envoyée":
        return "bg-green-100 text-green-800"
      case "Brouillon":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Marketing</h1>
          <p className="text-gray-600">Gérez vos campagnes, coupons et promotions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Coupons actifs</p>
                  <p className="text-2xl font-bold">{coupons.filter((c) => c.status === "Actif").length}</p>
                </div>
                <Percent className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Emails envoyés</p>
                  <p className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}</p>
                </div>
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux d'ouverture</p>
                  <p className="text-2xl font-bold">58.2%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold">12.4%</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Campagnes Email
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Bannières
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Coupons Tab */}
          <TabsContent value="coupons">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Codes de réduction</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau coupon
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coupon Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Créer un coupon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="couponCode">Code du coupon</Label>
                      <Input id="couponCode" placeholder="PROMO2024" />
                    </div>

                    <div>
                      <Label htmlFor="couponType">Type de réduction</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Pourcentage</SelectItem>
                          <SelectItem value="fixed">Montant fixe</SelectItem>
                          <SelectItem value="shipping">Livraison gratuite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="couponValue">Valeur</Label>
                        <Input id="couponValue" type="number" placeholder="20" />
                      </div>
                      <div>
                        <Label htmlFor="minAmount">Montant minimum</Label>
                        <Input id="minAmount" type="number" placeholder="50" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="couponDescription">Description</Label>
                      <Textarea id="couponDescription" placeholder="Description du coupon" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Date de début</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="endDate">Date de fin</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>

                    <Button className="w-full">Créer le coupon</Button>
                  </CardContent>
                </Card>

                {/* Coupons List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Coupons existants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {coupons.map((coupon) => (
                        <div key={coupon.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{coupon.code}</h3>
                              <p className="text-sm text-gray-600">{coupon.description}</p>
                            </div>
                            <Badge className={getStatusColor(coupon.status)}>{coupon.status}</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Réduction:</span>
                              <span className="ml-1 font-medium">
                                {coupon.type === "Pourcentage"
                                  ? `${coupon.value}%`
                                  : coupon.type === "Montant fixe"
                                    ? `${coupon.value}€`
                                    : "Gratuit"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Utilisations:</span>
                              <span className="ml-1 font-medium">
                                {coupon.currentUses}/{coupon.maxUses}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-500">
                              Valide du {new Date(coupon.startDate).toLocaleDateString()} au{" "}
                              {new Date(coupon.endDate).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Campagnes email</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle campagne
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Historique des campagnes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Campagne</th>
                          <th className="text-left py-3 px-4">Destinataires</th>
                          <th className="text-left py-3 px-4">Ouvertures</th>
                          <th className="text-left py-3 px-4">Clics</th>
                          <th className="text-left py-3 px-4">Statut</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-sm text-gray-500">{campaign.subject}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span>{campaign.recipients.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium">{campaign.opened.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">
                                  {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium">{campaign.clicked.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">
                                  {campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : 0}%
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm">{new Date(campaign.date).toLocaleDateString()}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {campaign.status === "Brouillon" && (
                                  <Button variant="ghost" size="sm">
                                    <Send className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Banners Tab */}
          <TabsContent value="banners">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Bannières promotionnelles</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle bannière
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner) => (
                  <Card key={banner.id}>
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img
                          src={banner.image || "/placeholder.svg"}
                          alt={banner.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Badge className={`absolute top-2 right-2 ${getStatusColor(banner.status)}`}>
                          {banner.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold">{banner.title}</h3>
                        <p className="text-sm text-gray-600">{banner.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Position: {banner.position}</span>
                          <span>Du {new Date(banner.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" size="sm">
                          Prévisualiser
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Analytics Marketing</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance des coupons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {coupons.slice(0, 3).map((coupon) => (
                        <div key={coupon.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{coupon.code}</p>
                            <p className="text-sm text-gray-500">{coupon.currentUses} utilisations</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{((coupon.currentUses / coupon.maxUses) * 100).toFixed(1)}%</p>
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${(coupon.currentUses / coupon.maxUses) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ROI des campagnes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">324%</p>
                        <p className="text-sm text-gray-500">ROI moyen</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold">€45,230</p>
                          <p className="text-sm text-gray-500">Revenus générés</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold">€13,950</p>
                          <p className="text-sm text-gray-500">Coût des campagnes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
