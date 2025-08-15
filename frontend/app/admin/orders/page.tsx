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
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react"

const orders = [
  {
    id: "CMD-001234",
    customer: {
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
    },
    amount: 2499,
    status: "En cours",
    paymentStatus: "Payé",
    items: 2,
    date: "2024-01-15 14:30",
    shippingAddress: "123 rue de la Paix, 75001 Paris",
  },
  {
    id: "CMD-001233",
    customer: {
      name: "Thomas Martin",
      email: "thomas.martin@email.com",
    },
    amount: 249,
    status: "Expédiée",
    paymentStatus: "Payé",
    items: 1,
    date: "2024-01-14 10:15",
    shippingAddress: "456 avenue Victor Hugo, 69001 Lyon",
  },
  {
    id: "CMD-001232",
    customer: {
      name: "Sophie Laurent",
      email: "sophie.laurent@email.com",
    },
    amount: 899,
    status: "Livrée",
    paymentStatus: "Payé",
    items: 1,
    date: "2024-01-13 16:45",
    shippingAddress: "789 boulevard Saint-Germain, 33000 Bordeaux",
  },
  {
    id: "CMD-001231",
    customer: {
      name: "Alex Rousseau",
      email: "alex.rousseau@email.com",
    },
    amount: 1199,
    status: "Annulée",
    paymentStatus: "Remboursé",
    items: 1,
    date: "2024-01-12 09:20",
    shippingAddress: "321 rue de la République, 13001 Marseille",
  },
  {
    id: "CMD-001230",
    customer: {
      name: "Julie Moreau",
      email: "julie.moreau@email.com",
    },
    amount: 1849,
    status: "En attente",
    paymentStatus: "En attente",
    items: 3,
    date: "2024-01-11 11:30",
    shippingAddress: "654 avenue de la Liberté, 59000 Lille",
  },
]

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesPayment = selectedPaymentStatus === "all" || order.paymentStatus === selectedPaymentStatus

    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livrée":
        return "bg-green-100 text-green-800"
      case "Expédiée":
        return "bg-blue-100 text-blue-800"
      case "En cours":
        return "bg-orange-100 text-orange-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Annulée":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Remboursé":
        return "bg-blue-100 text-blue-800"
      case "Échoué":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Livrée":
        return CheckCircle
      case "Expédiée":
        return Truck
      case "En cours":
        return Package
      case "En attente":
        return Clock
      case "Annulée":
        return XCircle
      default:
        return Package
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des commandes</h1>
            <p className="text-gray-600">{filteredOrders.length} commandes trouvées</p>
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
                  <p className="text-sm font-medium text-gray-600">Total commandes</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold">{orders.filter((o) => o.status === "En cours").length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expédiées</p>
                  <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Expédiée").length}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Livrées</p>
                  <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Livrée").length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
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
                  placeholder="Rechercher par numéro, client ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut commande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Expédiée">Expédiée</SelectItem>
                  <SelectItem value="Livrée">Livrée</SelectItem>
                  <SelectItem value="Annulée">Annulée</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  <SelectItem value="Payé">Payé</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Remboursé">Remboursé</SelectItem>
                  <SelectItem value="Échoué">Échoué</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Commande</th>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Montant</th>
                    <th className="text-left py-3 px-4">Articles</th>
                    <th className="text-left py-3 px-4">Statut</th>
                    <th className="text-left py-3 px-4">Paiement</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status)
                    return (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4 text-gray-500" />
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{order.id}</code>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-sm text-gray-500">{order.customer.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-lg">{order.amount}€</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">
                            {order.items} article{order.items > 1 ? "s" : ""}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p>{order.date.split(" ")[0]}</p>
                            <p className="text-gray-500">{order.date.split(" ")[1]}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" title="Voir détails">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {order.status === "En cours" && (
                              <Button variant="ghost" size="sm" title="Expédier">
                                <Truck className="w-4 h-4" />
                              </Button>
                            )}
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

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
                <p className="text-gray-400">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Affichage de 1 à {filteredOrders.length} sur {filteredOrders.length} commandes
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
