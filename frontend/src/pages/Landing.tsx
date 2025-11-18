import { Link } from 'react-router-dom';
import { ArrowRight, Workflow, Zap, Shield, TrendingUp } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Workflow className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Token Strategy Builder
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Build Trading Strategies
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Visually & Effortlessly
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Create, test, and deploy sophisticated token trading strategies with our
              intuitive visual workflow builder. No coding required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-lg border-2 border-slate-200"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image/Demo */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl -z-10"></div>
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg flex items-center justify-center">
                <Workflow className="w-24 h-24 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-600">
              Powerful features designed for traders of all levels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Visual Workflow Builder
              </h3>
              <p className="text-slate-600">
                Drag and drop filters, conditions, and actions to create complex trading
                strategies without writing a single line of code.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Real-time Execution
              </h3>
              <p className="text-slate-600">
                Execute your strategies in real-time with our high-performance engine.
                Get instant feedback and results.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-slate-600">
                Bank-level security with encrypted data storage and secure authentication
                via Google OAuth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to build your first strategy?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of traders already using our platform
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-lg shadow-lg"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-600">
          <p>&copy; 2024 Token Strategy Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
