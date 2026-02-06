import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-farmateca-primary py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Trial de 7 días incluido
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            El Vademécum Farmacológico
            <br />
            <span className="text-farmateca-primary-light">para Profesionales</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto text-balance">
            Accede a información clínica completa de más de 200 compuestos
            farmacológicos y 2.500+ marcas comerciales. Diseñado específicamente
            para profesionales de la salud en Chile.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-white text-farmateca-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Empezar Gratis
            </Link>
            <Link
              href="/app"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              Ver Demo
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-white/80">Compuestos Farmacológicos</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">2.500+</div>
              <div className="text-white/80">Marcas Comerciales</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/80">Offline & Actualizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
