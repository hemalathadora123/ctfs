import Navbar from './components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight gradient-text sm:text-6xl md:text-7xl">
              Welcome to CTF Adventures
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Sharing my journey through Capture The Flag competitions, cybersecurity challenges, and technical write-ups.
            </p>
            <div className="mt-10">
              <a href="/blog" className="btn-primary">
                Explore Write-ups
              </a>
            </div>
          </div>
          
          <div className="mt-24">
            <h2 className="text-3xl font-bold gradient-text mb-8">Latest Write-ups</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="card p-6 hover:border-cyan-500/50 transition-colors duration-300">
                <span className="tag bg-blue-500/20 text-blue-400">Web Exploitation</span>
                <h3 className="text-xl font-bold text-white mt-4">Sample CTF Write-up</h3>
                <p className="mt-2 text-gray-400">A detailed walkthrough of a recent web security challenge...</p>
                <a href="#" className="inline-flex items-center mt-4 text-cyan-400 hover:text-cyan-300">
                  Read more →
                </a>
              </div>
              
              <div className="card p-6 hover:border-cyan-500/50 transition-colors duration-300">
                <span className="tag bg-purple-500/20 text-purple-400">Cryptography</span>
                <h3 className="text-xl font-bold text-white mt-4">Breaking Custom Encryption</h3>
                <p className="mt-2 text-gray-400">Analyzing and exploiting a custom encryption scheme...</p>
                <a href="#" className="inline-flex items-center mt-4 text-cyan-400 hover:text-cyan-300">
                  Read more →
                </a>
              </div>
              
              <div className="card p-6 hover:border-cyan-500/50 transition-colors duration-300">
                <span className="tag bg-red-500/20 text-red-400">Reverse Engineering</span>
                <h3 className="text-xl font-bold text-white mt-4">Binary Analysis</h3>
                <p className="mt-2 text-gray-400">Reversing a complex binary to find hidden functionality...</p>
                <a href="#" className="inline-flex items-center mt-4 text-cyan-400 hover:text-cyan-300">
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 