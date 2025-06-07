"use client"

import { useState, useCallback } from "react"

interface Product {
  title: string
  price: number
  category: string
  description: string
  image: string
}

const ProductCard = ({ product }: { product: Product }) => (
  <div
    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    tabIndex={0}
    aria-label={`Product: ${product.title}, category: ${product.category}, price $${product.price.toFixed(2)}`}
  >
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          aria-label="Add to favorites"
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-110 transition-all duration-200"
        >
          <svg
            className="w-6 h-6 text-rose-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.title ?? "Product image"}
          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
    <div className="p-6">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-600 w-fit animate-pulse">
          {product.category}
        </span>
        <h3 className="font-semibold text-xl text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors duration-200">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
          <span className="ml-2 text-green-600 text-sm font-medium">20% OFF</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600 line-clamp-3">{product.description}</p>
      <div className="mt-6 flex gap-3">
        <button
          className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-medium
                     hover:from-black hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-2
                     shadow-lg hover:shadow-gray-300 transform hover:scale-105"
          aria-label={`Buy now for ${product.title}`}
        >
          <span>Buy Now</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button
          className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-medium
                     hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center
                     transform hover:scale-105"
          aria-label={`Add ${product.title} to cart`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
)

const Page = () => {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState<{ message: string; products: Product[] }>({ message: "", products: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!question.trim()) return
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        })
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setResponse(data)
      } catch (err) {
        console.error(err)
        setError("Oops! Something went wrong. Please try again.")
      }
      setLoading(false)
    },
    [question]
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-rose-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-16 space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 tracking-tight">
              Find Your Perfect Style
            </h1>
            <p className="mt-6 text-2xl text-gray-600 font-light">
              Let our AI stylist help you discover amazing products tailored just for you
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <span className="px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">Smart Recommendations</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">Personalized Shopping</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">AI-Powered</span>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-2xl border border-gray-100 hover:border-rose-200 transition-all duration-300">
            <input
              aria-label="Search products"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What are you looking for today?"
              className="text-black flex-1 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-full placeholder-gray-400 bg-transparent"
            />
            {question && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuestion("")}
                className="mr-3 text-gray-400 hover:text-rose-600 transition-all duration-200 hover:rotate-90"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="ml-4 px-8 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 text-white text-lg font-medium rounded-full
                       hover:from-rose-600 hover:via-rose-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300
                       flex items-center gap-2 shadow-lg hover:shadow-rose-200/50 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Finding items...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Discover</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div role="alert" className="max-w-md mx-auto p-4 bg-red-50 rounded-xl mb-6">
            <p className="text-center text-red-600 font-semibold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          </div>
        )}

        {response.message && (
          <section className="space-y-8 animate-fade-in">
            <p className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 text-center">
              {response.message}
            </p>

            {response.products.length === 0 ? (
              <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-3xl">
                <p className="text-xl text-gray-500">No products found matching your query.</p>
                <p className="mt-2 text-gray-400">Try different keywords or browse our categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {response.products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

export default Page
