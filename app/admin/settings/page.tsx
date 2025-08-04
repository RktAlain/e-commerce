"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  CreditCard,
  Truck,
  Search,
  Palette,
  Shield,
  Bell,
  Mail,
  Database,
  Zap,
  Moon,
  Sun,
  Plus,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "MonShop",
    siteDescription: "Votre boutique en ligne de confiance",
    contactEmail: "contact@monshop.fr",
    phone: "+33 1 23 45 67 89",
    address: "123 Avenue des Champs-Élysées, 75008 Paris",
    currency: "EUR",
    language: "fr",
    timezone: "Europe/Paris",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    bankTransferEnabled: false,
    cryptoEnabled: false,
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50,
    standardShippingCost: 5.99,
    expressShippingCost: 9.99,
    internationalShipping: true,
  })

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "MonShop - Votre boutique en ligne",
    metaDescription: "Découvrez notre sélection de produits tech et bien plus encore",
    googleAnalytics: "GA-XXXXXXXXX",
    facebookPixel: "FB-XXXXXXXXX",
    sitemap: true,
    robots: true,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Paramètres
          </h1>
          <p className="text-gray-600">Configurez votre boutique en ligne</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Général
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Paiement
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Livraison
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Apparence
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea
                      id="address"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">Dollar US ($)</SelectItem>
                        <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>Notifications email</span>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          <span>Notifications push</span>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>Notifications SMS</span>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Méthodes de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">Stripe</h3>
                          <p className="text-sm text-gray-500">Cartes bancaires</p>
                        </div>
                      </div>
                      <Switch
                        checked={paymentSettings.stripeEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings((prev) => ({ ...prev, stripeEnabled: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        <div>
                          <h3 className="font-semibold">PayPal</h3>
                          <p className="text-sm text-gray-500">Paiement PayPal</p>
                        </div>
                      </div>
                      <Switch
                        checked={paymentSettings.paypalEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings((prev) => ({ ...prev, paypalEnabled: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-green-600" />
                        <div>
                          <h3 className="font-semibold">Virement bancaire</h3>
                          <p className="text-sm text-gray-500">Paiement par virement</p>
                        </div>
                      </div>
                      <Switch
                        checked={paymentSettings.bankTransferEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings((prev) => ({ ...prev, bankTransferEnabled: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-orange-600" />
                        <div>
                          <h3 className="font-semibold">Cryptomonnaies</h3>
                          <p className="text-sm text-gray-500">Bitcoin, Ethereum</p>
                        </div>
                      </div>
                      <Switch
                        checked={paymentSettings.cryptoEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings((prev) => ({ ...prev, cryptoEnabled: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Configuration Stripe</h3>
                    <div>
                      <Label htmlFor="stripePublicKey">Clé publique</Label>
                      <Input id="stripePublicKey" placeholder="pk_test_..." />
                    </div>
                    <div>
                      <Label htmlFor="stripeSecretKey">Clé secrète</Label>
                      <Input id="stripeSecretKey" type="password" placeholder="sk_test_..." />
                    </div>

                    <h3 className="font-semibold mt-6">Configuration PayPal</h3>
                    <div>
                      <Label htmlFor="paypalClientId">Client ID</Label>
                      <Input id="paypalClientId" placeholder="AXxxx..." />
                    </div>
                    <div>
                      <Label htmlFor="paypalClientSecret">Client Secret</Label>
                      <Input id="paypalClientSecret" type="password" placeholder="ELxxx..." />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frais de livraison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="freeShippingThreshold">Seuil livraison gratuite (€)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) =>
                        setShippingSettings((prev) => ({ ...prev, freeShippingThreshold: Number(e.target.value) }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="standardShippingCost">Livraison standard (€)</Label>
                    <Input
                      id="standardShippingCost"
                      type="number"
                      step="0.01"
                      value={shippingSettings.standardShippingCost}
                      onChange={(e) =>
                        setShippingSettings((prev) => ({ ...prev, standardShippingCost: Number(e.target.value) }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="expressShippingCost">Livraison express (€)</Label>
                    <Input
                      id="expressShippingCost"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingCost}
                      onChange={(e) =>
                        setShippingSettings((prev) => ({ ...prev, expressShippingCost: Number(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Livraison internationale</h3>
                      <p className="text-sm text-gray-500">Autoriser les commandes internationales</p>
                    </div>
                    <Switch
                      checked={shippingSettings.internationalShipping}
                      onCheckedChange={(checked) =>
                        setShippingSettings((prev) => ({ ...prev, internationalShipping: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zones de livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">France métropolitaine</h3>
                          <p className="text-sm text-gray-500">Livraison 2-3 jours</p>
                        </div>
                        <span className="text-green-600 font-semibold">Gratuite dès 50€</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">Europe</h3>
                          <p className="text-sm text-gray-500">Livraison 5-7 jours</p>
                        </div>
                        <span className="font-semibold">15€</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">International</h3>
                          <p className="text-sm text-gray-500">Livraison 7-14 jours</p>
                        </div>
                        <span className="font-semibold">25€</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une zone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métadonnées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Titre de la page</Label>
                    <Input
                      id="metaTitle"
                      value={seoSettings.metaTitle}
                      onChange={(e) => setSeoSettings((prev) => ({ ...prev, metaTitle: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={seoSettings.metaDescription}
                      onChange={(e) => setSeoSettings((prev) => ({ ...prev, metaDescription: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Sitemap XML</h3>
                      <p className="text-sm text-gray-500">Générer automatiquement le sitemap</p>
                    </div>
                    <Switch
                      checked={seoSettings.sitemap}
                      onCheckedChange={(checked) => setSeoSettings((prev) => ({ ...prev, sitemap: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Robots.txt</h3>
                      <p className="text-sm text-gray-500">Fichier robots pour les moteurs de recherche</p>
                    </div>
                    <Switch
                      checked={seoSettings.robots}
                      onCheckedChange={(checked) => setSeoSettings((prev) => ({ ...prev, robots: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                    <Input
                      id="googleAnalytics"
                      value={seoSettings.googleAnalytics}
                      onChange={(e) => setSeoSettings((prev) => ({ ...prev, googleAnalytics: e.target.value }))}
                      placeholder="GA-XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                    <Input
                      id="facebookPixel"
                      value={seoSettings.facebookPixel}
                      onChange={(e) => setSeoSettings((prev) => ({ ...prev, facebookPixel: e.target.value }))}
                      placeholder="FB-XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="googleTagManager">Google Tag Manager</Label>
                    <Input id="googleTagManager" placeholder="GTM-XXXXXXX" />
                  </div>

                  <div>
                    <Label htmlFor="hotjarId">Hotjar ID</Label>
                    <Input id="hotjarId" placeholder="1234567" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thème</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      <span>Mode sombre</span>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>

                  <div>
                    <Label>Couleur principale</Label>
                    <div className="flex gap-2 mt-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full cursor-pointer border-2 border-blue-600" />
                      <div className="w-8 h-8 bg-green-600 rounded-full cursor-pointer border-2 border-transparent hover:border-green-600" />
                      <div className="w-8 h-8 bg-purple-600 rounded-full cursor-pointer border-2 border-transparent hover:border-purple-600" />
                      <div className="w-8 h-8 bg-red-600 rounded-full cursor-pointer border-2 border-transparent hover:border-red-600" />
                      <div className="w-8 h-8 bg-orange-600 rounded-full cursor-pointer border-2 border-transparent hover:border-orange-600" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logoUpload">Logo</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-lg">MS</span>
                      </div>
                      <p className="text-sm text-gray-500">Cliquez pour télécharger un nouveau logo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personnalisation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customCss">CSS personnalisé</Label>
                    <Textarea
                      id="customCss"
                      rows={8}
                      placeholder="/* Votre CSS personnalisé */"
                      className="font-mono text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customJs">JavaScript personnalisé</Label>
                    <Textarea
                      id="customJs"
                      rows={6}
                      placeholder="// Votre JavaScript personnalisé"
                      className="font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité générale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray-500">Sécurité renforcée pour les admins</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Connexions SSL forcées</h3>
                      <p className="text-sm text-gray-500">Rediriger HTTP vers HTTPS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Protection CSRF</h3>
                      <p className="text-sm text-gray-500">Protection contre les attaques CSRF</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Timeout de session (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sauvegarde & Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Sauvegarde automatique</h3>
                      <p className="text-sm text-gray-500">Sauvegarde quotidienne des données</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label>Dernière sauvegarde</Label>
                    <p className="text-sm text-gray-600 mt-1">Aujourd'hui à 03:00</p>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Créer une sauvegarde maintenant
                  </Button>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Mode maintenance</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Activer le mode maintenance pour effectuer des mises à jour
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Activer le mode maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button size="lg">Sauvegarder les paramètres</Button>
        </div>
      </div>
    </div>
  )
}
