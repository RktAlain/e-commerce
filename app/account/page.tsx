"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Package, Heart, MapPin, Settings, Eye } from "lucide-react"

const orders = [
  {
    id: "CMD-123456",
    date: "15 Jan 2024",
    status: "Livré",
    total: 2499,
    items: [{ name: "MacBook Pro M3", image: "/placeholder.svg?height=60&width=60", quantity: 1 }],
  },
  {
    id: "CMD-123455",
    date: "10 Jan 2024",
    status: "En transit",
    total: 249,
    items: [{ name: "AirPods Pro", image: "/placeholder.svg?height=60&width=60", quantity: 1 }],
  },
  {
    id: "CMD-123454",
    date: "5 Jan 2024",
    status: "Préparation",
    total: 1199,
    items: [{ name: "iPhone 15 Pro", image: "/placeholder.svg?height=60&width=60", quantity: 1 }],
  },
]

const wishlistItems = [
  {
    id: 1,
    name: 'iPad Pro 12.9"',
    price: 1199,
    image: "/placeholder.svg?height=150&width=150",
    inStock: true,
  },
  {
    id: 2,
    name: "Apple Watch Series 9",
    price: 449,
    image: "/placeholder.svg?height=150&width=150",
    inStock: false,
  },
  {
    id: 3,
    name: "Magic Keyboard",
    price: 349,
    image: "/placeholder.svg?height=150&width=150",
    inStock: true,
  },
]

const addresses = [
  {
    id: 1,
    type: "Domicile",
    name: "Jean Dupont",
    address: "123 rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Bureau",
    name: "Jean Dupont",
    address: "456 avenue des Champs",
    city: "Paris",
    postalCode: "75008",
    isDefault: false,
  },
]

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    birthDate: "1990-01-01",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-800"
      case "En transit":
        return "bg-blue-100 text-blue-800"
      case "Préparation":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mon Compte</h1>
          <p className="text-gray-600">Gérez vos informations et commandes</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favoris
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Adresses
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Date de naissance</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={userInfo.birthDate}
                      onChange={(e) => setUserInfo((prev) => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </div>
                </div>

                <Button className="w-full md:w-auto">Sauvegarder les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mes commandes</h2>
                <Badge variant="outline">{orders.length} commandes</Badge>
              </div>

              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="font-semibold">Commande {order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">Commandé le {order.date}</p>

                        <div className="flex items-center gap-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold mb-2">{order.total}€</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                          {order.status === "Livré" && (
                            <Button variant="outline" size="sm">
                              Racheter
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Ma liste de souhaits</h2>
                <Badge variant="outline">{wishlistItems.length} articles</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        {!item.inStock && (
                          <Badge variant="destructive" className="absolute top-2 left-2">
                            Rupture de stock
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-lg font-bold mb-4">{item.price}€</p>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" disabled={!item.inStock}>
                          Ajouter au panier
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mes adresses</h2>
                <Button>Ajouter une adresse</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <Card key={address.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{address.type}</h3>
                          {address.isDefault && (
                            <Badge variant="secondary" className="mt-1">
                              Par défaut
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          Modifier
                        </Button>
                      </div>

                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{address.name}</p>
                        <p>{address.address}</p>
                        <p>
                          {address.postalCode} {address.city}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-gray-500">Recevoir les offres et nouveautés</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activé
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications de commande</p>
                      <p className="text-sm text-gray-500">Suivi de commande et livraison</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activé
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    Changer le mot de passe
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Authentification à deux facteurs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Données personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    Télécharger mes données
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Supprimer mon compte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
