"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Heart, Menu, X, LogIn, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

export default function Header() {
  const { getCartCount } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith("/admin")

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Produits", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const adminNavigation = [
    { name: "Dashboard", href: "/admin" },
    { name: "Produits", href: "/admin/products" },
    { name: "Commandes", href: "/admin/orders" },
    { name: "Clients", href: "/admin/customers" },
    { name: "Marketing", href: "/admin/marketing" },
    { name: "Analytics", href: "/admin/analytics" },
    { name: "Paramètres", href: "/admin/settings" },
  ]

  const currentNavigation = isAdminRoute ? adminNavigation : navigation

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAdminRoute ? "/admin" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <span className="text-xl font-bold">{isAdminRoute ? "Admin Panel" : "MonShop"}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.href ? "text-blue-600 font-medium" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (only on client routes) */}
          {!isAdminRoute && (
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Rechercher des produits..." className="pl-10 pr-4" />
              </div>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Mode Switch */}
            <div className="hidden md:flex">
              {isAdminRoute ? (
                <Link href="/">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Mode Client
                  </Button>
                </Link>
              ) : (
                isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Mode Admin
                    </Button>
                  </Link>
                )
              )}
            </div>

            {/* Client-only actions */}
            {!isAdminRoute && (
              <>
                {/* Wishlist */}
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Heart className="w-5 h-5" />
                </Button>

                {/* Cart */}
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                        {getCartCount()}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2"
              >
                <User className="w-5 h-5" />
                {user && <span className="hidden md:inline">{user.name}</span>}
              </Button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      {!isAdminRoute && (
                        <Link href="/account" className="block px-4 py-2 hover:bg-gray-50">
                          Mon compte
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout()
                          setShowUserMenu(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2 hover:bg-gray-50">
                        <div className="flex items-center">
                          <LogIn className="w-4 h-4 mr-2" />
                          Connexion Client
                        </div>
                      </Link>
                      <Link href="/admin/login" className="block px-4 py-2 hover:bg-gray-50">
                        <div className="flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Connexion Admin
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="space-y-2">
              {currentNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg ${
                    pathname === item.href ? "text-blue-600 bg-blue-50" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Search (client only) */}
            {!isAdminRoute && (
              <div className="mt-4 px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Rechercher des produits..." className="pl-10" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
