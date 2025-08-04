"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Les tendances tech 2024 : Ce qui va révolutionner notre quotidien",
    excerpt:
      "Découvrez les innovations technologiques qui marqueront cette année, de l'IA générative aux nouvelles interfaces utilisateur.",
    image: "/placeholder.svg?height=300&width=500",
    author: "Marie Dubois",
    date: "15 Jan 2024",
    category: "Technologie",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Guide d'achat : Comment choisir son MacBook en 2024",
    excerpt:
      "Comparatif complet des différents modèles de MacBook pour vous aider à faire le bon choix selon vos besoins.",
    image: "/placeholder.svg?height=300&width=500",
    author: "Thomas Martin",
    date: "12 Jan 2024",
    category: "Guide d'achat",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Écologie et tech : Vers des appareils plus durables",
    excerpt:
      "Comment l'industrie technologique s'adapte aux enjeux environnementaux et propose des solutions plus respectueuses.",
    image: "/placeholder.svg?height=300&width=500",
    author: "Sophie Laurent",
    date: "10 Jan 2024",
    category: "Écologie",
    readTime: "6 min",
  },
  {
    id: 4,
    title: "Les meilleurs accessoires pour votre setup gaming",
    excerpt:
      "Sélection des accessoires indispensables pour optimiser votre expérience de jeu et créer le setup parfait.",
    image: "/placeholder.svg?height=300&width=500",
    author: "Alex Rousseau",
    date: "8 Jan 2024",
    category: "Gaming",
    readTime: "7 min",
  },
  {
    id: 5,
    title: "Intelligence artificielle : Impact sur le e-commerce",
    excerpt: "Comment l'IA transforme l'expérience d'achat en ligne et personnalise les recommandations produits.",
    image: "/placeholder.svg?height=300&width=500",
    author: "Julie Moreau",
    date: "5 Jan 2024",
    category: "IA",
    readTime: "9 min",
  },
  {
    id: 6,
    title: "Sécurité numérique : Protéger ses données personnelles",
    excerpt: "Conseils pratiques pour sécuriser vos appareils et protéger votre vie privée dans le monde numérique.",
    image: "/placeholder.svg?height=300&width=500",
    author: "Pierre Durand",
    date: "3 Jan 2024",
    category: "Sécurité",
    readTime: "10 min",
  },
]

const categories = ["Tous", "Technologie", "Guide d'achat", "Gaming", "IA", "Écologie", "Sécurité"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Actualités</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les dernières tendances tech, nos guides d'achat et conseils d'experts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Rechercher un article..." className="pl-10" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <img
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4">Article vedette</Badge>
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3">
                {blogPosts[0].category}
              </Badge>
              <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>

              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {blogPosts[0].date}
                </div>
                <span>{blogPosts[0].readTime} de lecture</span>
              </div>

              <Link href={`/blog/${blogPosts[0].id}`}>
                <Button>
                  Lire l'article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </div>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {post.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime} de lecture</span>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm" className="group-hover:bg-blue-50">
                      Lire plus
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Charger plus d'articles
          </Button>
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
            <p className="mb-6 opacity-90">
              Recevez nos derniers articles et actualités tech directement dans votre boîte mail
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                placeholder="Votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="secondary">S'abonner</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
