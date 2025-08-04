"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  Ban,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    joinDate: "2023-06-15",
    lastOrder: "2024-01-15",
    totalOrders: 12,
    totalSpent: 3247,
    status: "Actif",
    segment: "VIP",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Thomas Martin",
    email: "thomas.martin@email.com",
    phone: "+33 6 23 45 67 89",
    location: "Lyon, France",
    joinDate: "2023-08-22",
    lastOrder: "2024-01-14",
    totalOrders: 8,
    totalSpent: 1856,
    status: "Actif",
    segment: "Fidèle",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    phone: "+33 6 34 56 78 90",
    location: "Bordeaux, France",
    joinDate: "2023-11-10",
    lastOrder: "2024-01-13",
    totalOrders: 5,
    totalSpent: 1245,
    status: "Actif",
    segment: "Régulier",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Alex Rousseau",
    email: "alex.rousseau@email.com",
    phone: "+33 6 45 67 89 01",
    location: "Marseille, France",
    joinDate: "2023-03-05",
    lastOrder: "2023-12-20",
    totalOrders: 3,
    totalSpent: 567,
    status: "Inactif",
    segment: "Nouveau",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Julie Moreau",
    email: "julie.moreau@email.com",
    phone: "+33 6 56 78 90 12",
    location: "Lille, France",
    joinDate: "2024-01-08",
    lastOrder: "2024-01-11",
    totalOrders: 2,
    totalSpent: 1849,
    status: "Actif",
    segment: "Nouveau",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Pierre Durand",
    email: "pierre.durand@email.com",
    phone: "+33 6 67 89 01 23",
    location: "Nice, France",
    joinDate: "2023-09-18",
    lastOrder: "Jamais",
    totalOrders: 0,
    totalSpent: 0,
    status: "Bloqué",
    segment: "Inactif",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSegment, setSelectedSegment] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment

    return matchesSearch && matchesStatus && matchesSegment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Inactif":
        return "bg-yellow-100 text-yellow-800"
      case "Bloqué":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP":
        return "bg-purple-100 text-purple-800"
      case "Fidèle":
        return "bg-blue-100 text-blue-800"
      case "Régulier":
        return "bg-green-100 text-green-800"
      case "Nouveau":
        return "bg-orange-100 text-orange-800"
      case "Inactif":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "Actif").length
  const vipCustomers = customers.filter((c) => c.segment === "VIP").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des clients</h1>
            <p className="text-gray-600">{filteredCustomers.length} clients trouvés</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total clients</p>
                  <p className="text-2xl font-bold">{totalCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                  <p className="text-2xl font-bold">{activeCustomers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients VIP</p>
                  <p className="text-2xl font-bold">{vipCustomers}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CA total</p>
                  <p className="text-2xl font-bold">{totalRevenue.toLocaleString()}€</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="Bloqué">Bloqué</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les segments</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Fidèle">Fidèle</SelectItem>
                  <SelectItem value="Régulier">Régulier</SelectItem>
                  <SelectItem value="Nouveau">Nouveau</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Localisation</th>
                    <th className="text-left py-3 px-4">Commandes</th>
                    <th className="text-left py-3 px-4">Total dépensé</th>
                    <th className="text-left py-3 px-4">Segment</th>
                    <th className="text-left py-3 px-4">Statut</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={customer.avatar || "/placeholder.svg"}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">
                              Inscrit le {new Date(customer.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{customer.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold">{customer.totalOrders}</p>
                          <p className="text-sm text-gray-500">
                            {customer.lastOrder !== "Jamais"
                              ? `Dernière: ${new Date(customer.lastOrder).toLocaleDateString()}`
                              : "Aucune commande"}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-lg">{customer.totalSpent.toLocaleString()}€</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" title="Voir détails">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Envoyer email">
                            <Mail className="w-4 h-4" />
                          </Button>
                          {customer.status !== "Bloqué" && (
                            <Button variant="ghost" size="sm" title="Bloquer" className="text-red-600">
                              <Ban className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <UserX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun client trouvé</p>
                <p className="text-gray-400">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredCustomers.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Affichage de 1 à {filteredCustomers.length} sur {filteredCustomers.length} clients
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Suivant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
