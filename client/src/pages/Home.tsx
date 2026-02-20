import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Copy,
  Check,
  TrendingUp,
  Zap,
  Globe,
  ChevronDown,
} from "lucide-react";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [userPosition, setUserPosition] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [totalSignups, setTotalSignups] = useState(347);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    const launchDate = new Date("2026-03-15T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const code = `LC${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setReferralCode(code);
      setUserPosition(Math.floor(Math.random() * 50) + 300);
      setReferralCount(0);
      setSubmitted(true);
      setTotalSignups((prev) => prev + 1);

      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Qual é o pré-requisito para fazer o curso?",
      answer:
        "Nenhum! O curso é 100% do zero. Você não precisa ter experiência anterior com criptomoedas. Começamos desde os conceitos básicos e evoluímos progressivamente.",
    },
    {
      question: "Quanto tempo leva para completar o curso?",
      answer:
        "O curso é estruturado para 7 semanas, com aulas 3x por semana. Cada módulo leva em média 2-3 horas. Mas você tem acesso vitalício, então pode estudar no seu próprio ritmo.",
    },
    {
      question: "O curso inclui suporte?",
      answer:
        "Sim! Você terá acesso a uma comunidade privada no Discord, suporte direto do Renan, e sessões de dúvidas ao vivo. Estamos aqui para ajudar sua jornada.",
    },
    {
      question: "Posso acessar o curso em qualquer dispositivo?",
      answer:
        "Claro! O curso é totalmente responsivo e funciona em computadores, tablets e smartphones. Você pode estudar de qualquer lugar, a qualquer hora.",
    },
    {
      question: "Há garantia de reembolso?",
      answer:
        "Sim! Se você não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro. Sem perguntas, sem complicações.",
    },
    {
      question: "O curso aborda airdrops?",
      answer:
        "Sim! Temos um módulo completo sobre estratégias de airdrops com mapa mental exclusivo, técnicas de farm seguro e como identificar oportunidades reais no mercado.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .divider-diagonal {
          width: 100%;
          height: 100px;
          background: linear-gradient(135deg, #7C3AED 0%, #FCD34D 50%, #7C3AED 100%);
          clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
          margin: 40px 0;
        }

        .card-luminous {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(252, 211, 77, 0.05) 100%);
          backdrop-filter: blur(10px);
          border-radius: 12px;
        }

        .blob {
          position: fixed;
          border-radius: 50%;
          opacity: 0.1;
          mix-blend-mode: screen;
          animation: float 20s infinite ease-in-out;
        }

        .blob-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #7C3AED, #FCD34D);
          top: -50px;
          left: -50px;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, #FCD34D, #7C3AED);
          bottom: 100px;
          right: -50px;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-stagger {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
          <div className="container flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <span className="text-2xl">₿</span>
              <span className="font-black text-xl" style={{ fontFamily: "Poppins" }}>
                Level Cripto PRO
              </span>
            </div>
            <nav className="hidden md:flex gap-8">
              {[
                { label: "Benefícios", href: "#beneficios" },
                { label: "Conteúdo", href: "#conteudo" },
                { label: "Professor", href: "#professor" },
                { label: "FAQ", href: "#faq" },
                { label: "Depoimentos", href: "#depoimentos" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold hover:text-yellow-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* Hero Section with Countdown */}
        <section className="hero-bg w-full py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="animate-stagger">
              <div className="inline-block mb-6 px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-full text-sm">
                <span className="text-yellow-400">✨</span> Lançamento Exclusivo
              </div>
              <h1
                className="text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tighter uppercase"
                style={{ fontFamily: "Poppins" }}
              >
                SE TORNE UM
                <span className="block bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
                  LEVEL CRIPTO PRO
                </span>
              </h1>
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed font-semibold" style={{ fontFamily: "Inter" }}>
                Domine o mercado cripto em 7 semanas
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed" style={{ fontFamily: "Inter" }}>
                Do zero ao avançado: Bitcoin, DeFi, NFTs, Metaverso, Mercado de Futuros e Web3. Com suporte, comunidade ativa, mapa mental para airdrops e acesso vitalício.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-lg">
                <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: "Inter" }}>
                  Lançamento em:
                </p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400" style={{ fontFamily: "Poppins" }}>
                      {countdown.days}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Dias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400" style={{ fontFamily: "Poppins" }}>
                      {countdown.hours}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Horas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400" style={{ fontFamily: "Poppins" }}>
                      {countdown.minutes}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Minutos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400" style={{ fontFamily: "Poppins" }}>
                      {countdown.seconds}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Segundos</div>
                  </div>
                </div>
              </div>

              {/* Email Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black uppercase tracking-wide transition-all transform hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg shadow-yellow-500/50"
                  >
                    Entrar na Lista de Espera
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="mb-8 p-6 bg-green-600/20 border border-green-400/30 rounded-lg">
                  <h3 className="font-bold mb-4 text-green-400">Parabéns! Você está na lista de espera!</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Seu código de indicação:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referralCode}
                          readOnly
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm"
                        />
                        <button
                          onClick={copyReferralCode}
                          className="px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/30 rounded-lg transition-colors flex items-center gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="text-xs">Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-gray-400">Posição na fila</p>
                        <p className="text-2xl font-bold text-yellow-400">#{userPosition}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Suas indicações</p>
                        <p className="text-2xl font-bold text-purple-400">{referralCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Proof */}
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-yellow-400">+{totalSignups}</p>
                  <p className="text-sm text-gray-400">Pessoas na fila</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">1.2K+</p>
                  <p className="text-sm text-gray-400">Seguidores YouTube</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">7</p>
                  <p className="text-sm text-gray-400">Módulos Completos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Benefits Section - Scarcity Trigger */}
        <section id="beneficios" className="container py-20">
          <div className="max-w-3xl mx-auto animate-stagger">
            <div className="card-luminous p-12 border-2 border-yellow-400 hover:border-yellow-300 transition-all shadow-lg shadow-yellow-400/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">⚡</div>
                <div>
                  <h2 className="text-5xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: "Poppins" }}>
                    VAGAS LIMITADAS
                  </h2>
                  <p className="text-xl text-yellow-400 font-bold mb-6" style={{ fontFamily: "Outfit" }}>
                    Apenas 100 alunos na primeira turma
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-200 leading-relaxed" style={{ fontFamily: "Inter" }}>
                  Sabemos que qualidade exige dedicação. Por isso, limitamos a primeira turma a apenas <strong>100 alunos</strong> para garantir:
                </p>
                <ul className="space-y-3 text-gray-300" style={{ fontFamily: "Inter" }}>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg mt-1">✓</span>
                    <span><strong>Suporte personalizado</strong> - Você não é apenas um número, é parte de uma comunidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg mt-1">✓</span>
                    <span><strong>Comunidade ativa</strong> - Networking real com outros alunos e oportunidades genuínas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg mt-1">✓</span>
                    <span><strong>Mentoria de qualidade</strong> - Renan pode dedicar tempo real para suas dúvidas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg mt-1">✓</span>
                    <span><strong>Conteúdo exclusivo</strong> - Bônus e atualizações que só os primeiros recebem</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6 text-center">
                <p className="text-sm text-yellow-400 font-bold uppercase tracking-wide mb-2">⏰ Aja rápido</p>
                <p className="text-2xl font-black text-white" style={{ fontFamily: "Poppins" }}>
                  {totalSignups} de 100 vagas já preenchidas
                </p>
                <p className="text-gray-400 mt-3" style={{ fontFamily: "Inter" }}>
                  Não perca essa oportunidade. As vagas estão acabando rápido!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Content Section */}
        <section id="conteudo" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: "Poppins" }}>
              O QUE VOCÊ VAI APRENDER
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card-luminous p-12 border-2 border-yellow-400/50 hover:border-yellow-400 transition-all">
              <ul className="space-y-4" style={{ fontFamily: "Inter" }}>
                {[
                  "Origem e história do Bitcoin",
                  "Como funciona a blockchain",
                  "Estratégias de investimento seguro",
                  "DeFi e finanças descentralizadas",
                  "NFTs e ativos digitais",
                  "Airdrops: Mapa Mental e Farm Estratégico",
                  "Análise técnica e fundamental",
                  "Segurança, Suporte e Comunidade",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg text-gray-200">
                    <span className="text-yellow-400 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Professor Section */}
        <section id="professor" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: "Poppins" }}>
              CONHEÇA O PROFESSOR
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card-luminous p-12 border-2 border-yellow-400/50 hover:border-yellow-400 transition-all">
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "Outfit" }}>
                Renan Mataveli
              </h3>
              <p className="text-yellow-400 font-semibold mb-6">Especialista em Criptomoedas</p>
              
              <p className="text-gray-200 mb-6 leading-relaxed" style={{ fontFamily: "Inter" }}>
                Especialista em criptomoedas com mais de 10 anos de experiência no mercado financeiro. Renan é criador do canal <strong>Level Cripto</strong>, com mais de 10k seguidores no YouTube e comunidade ativa no Instagram.
              </p>

              <p className="text-gray-200 mb-6 leading-relaxed" style={{ fontFamily: "Inter" }}>
                Sua missão é democratizar o conhecimento sobre criptomoedas, explicando de forma clara e sem jargão desnecessário. No canal, você encontra:
              </p>

              <ul className="space-y-3 mb-8" style={{ fontFamily: "Inter" }}>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>Análises profundas do mercado de criptomoedas</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>Estratégias de investimento e farm de airdrops</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>Conteúdo educativo sobre DeFi, NFTs e Web3</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>Comunidade ativa e suporte direto aos alunos</span>
                </li>
              </ul>

              <div className="flex gap-4 pt-6 border-t border-white/10">
                <a
                  href="https://www.instagram.com/level_cripto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-center transition-all transform hover:scale-105"
                >
                  Seguir no Instagram
                </a>
                <a
                  href="https://www.youtube.com/channel/UCCbpFaIRJkltWCbiFNiv2Bw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-bold text-center transition-all transform hover:scale-105"
                >
                  Inscrever no YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Testimonials Section */}
        <section id="depoimentos" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: "Poppins" }}>
              O QUE DIZEM NOSSOS ALUNOS
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Inter" }}>
              Histórias reais de sucesso no mercado de criptomoedas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Silva",
                role: "Investidor",
                text: "Curso excelente! Saí do zero e consegui meu primeiro investimento com confiança. Renan explica de forma muito clara.",
                rating: 5,
              },
              {
                name: "Marina Costa",
                role: "Empreendedora",
                text: "O melhor investimento que fiz. O conteúdo é prático e aplicável. Recomendo para quem quer entender cripto de verdade.",
                rating: 5,
              },
              {
                name: "João Santos",
                role: "Trader",
                text: "Muito bom! Aprendi estratégias que não conhecia. O suporte e a comunidade são incríveis.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="card-luminous p-8 animate-stagger border-2 border-yellow-400/50 hover:border-yellow-400 transition-all"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-200 mb-6 italic" style={{ fontFamily: "Inter" }}>
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold" style={{ fontFamily: "Outfit" }}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* FAQ Section */}
        <section id="faq" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: "Poppins" }}>
              PERGUNTAS FREQUENTES
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Inter" }}>
              Tire suas dúvidas sobre o curso Level Cripto PRO
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                className="w-full card-luminous p-6 border-2 border-yellow-400/50 hover:border-yellow-400 transition-all text-left animate-stagger"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold" style={{ fontFamily: "Outfit" }}>
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-yellow-400 transition-transform ${
                      expandedFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFAQ === idx && (
                  <p className="mt-4 text-gray-300 leading-relaxed" style={{ fontFamily: "Inter" }}>
                    {item.answer}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Final CTA Section */}
        <section className="container py-20 text-center">
          <div className="max-w-2xl mx-auto animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase" style={{ fontFamily: "Poppins" }}>
              PRONTO PARA COMEÇAR?
            </h2>
            <p className="text-xl text-gray-200 mb-8" style={{ fontFamily: "Inter" }}>
              Inscreva-se agora para acesso antecipado e receba um desconto exclusivo de lançamento.
            </p>
            <button className="px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black uppercase tracking-wide text-lg transition-all transform hover:scale-105 rounded-lg shadow-lg shadow-yellow-500/50 flex items-center gap-3 mx-auto">
              Entrar na Lista de Espera
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-md py-12">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="font-black text-lg mb-4" style={{ fontFamily: "Poppins" }}>
                  Level Cripto PRO
                </h3>
                <p className="text-gray-400 text-sm" style={{ fontFamily: "Inter" }}>
                  Domine o mercado de criptomoedas com o curso mais completo do Brasil.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>
                  Navegação
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#beneficios" className="hover:text-yellow-400 transition-colors">
                      Benefícios
                    </a>
                  </li>
                  <li>
                    <a href="#conteudo" className="hover:text-yellow-400 transition-colors">
                      Conteúdo
                    </a>
                  </li>
                  <li>
                    <a href="#depoimentos" className="hover:text-yellow-400 transition-colors">
                      Depoimentos
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>
                  Redes Sociais
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/level_cripto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCCbpFaIRJkltWCbiFNiv2Bw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
              <p style={{ fontFamily: "Inter" }}>
                © 2026 Level Cripto PRO. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
