import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Bitcoin, TrendingUp, Zap, Globe, Users, ArrowRight, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Design System: Minimalismo Futurista + Estilo Defiverso
 * - Paleta: Azul escuro (#0F172A), Roxo (#7C3AED), Amarelo ouro (#FCD34D), Verde Neon (#00FF00)
 * - Tipografia: Poppins 700 (títulos em CAPS), Outfit 600 (subtítulos), Inter 400 (corpo)
 * - Animações: Fade-in + slide-up, hover effects com profundidade, pulse effects
 * - Elementos: Orbes abstratos, linhas diagonais, cards com borda neon, CTAs vibrantes
 * - Inspiração: Defiverso (borda neon, CAPS, hero com foto, carousel)
 */

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Qual é o pré-requisito para fazer o curso?",
    answer: "Nenhum! O curso é 100% do zero. Você não precisa ter conhecimento prévio sobre criptomoedas ou blockchain. Começamos desde os conceitos mais básicos.",
  },
  {
    question: "Quanto tempo leva para completar o curso?",
    answer: "O curso tem 7 módulos completos. O tempo varia de acordo com seu ritmo, mas em média leva de 4 a 8 semanas estudando 1-2 horas por dia.",
  },
  {
    question: "O curso inclui suporte?",
    answer: "Sim! Você terá acesso a uma comunidade ativa, suporte direto e acesso a um mapa mental exclusivo para facilitar o farm de airdrops.",
  },
  {
    question: "Posso acessar o curso em qualquer dispositivo?",
    answer: "Sim! O curso é acessível via web em qualquer dispositivo (computador, tablet ou smartphone). Você estuda quando quiser, onde quiser.",
  },
  {
    question: "Há garantia de reembolso?",
    answer: "Sim! Oferecemos garantia de 7 dias. Se não gostar do curso, devolvemos 100% do seu investimento, sem perguntas.",
  },
  {
    question: "O curso aborda airdrops?",
    answer: "Sim! Temos um módulo completo sobre airdrops com um mapa mental exclusivo e estratégias práticas para maximizar seus ganhos.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [userPosition, setUserPosition] = useState(0);
  const [totalSignups, setTotalSignups] = useState(347);
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 30, seconds: 45 });
  const [copied, setCopied] = useState(false);

  // Calcular temporizador regressivo
  useEffect(() => {
    const launchDate = new Date("2026-03-15T00:00:00").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateReferralCode = () => {
    return "LC" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const code = generateReferralCode();
    setReferralCode(code);
    const position = totalSignups + 1;
    setUserPosition(position);
    setTotalSignups(totalSignups + 1);

    console.log("Email inscrito:", email, "Codigo:", code);
    setSubmitted(true);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="blob w-96 h-96 bg-purple-600 -top-20 -left-20" style={{ animationDelay: "0s" }} />
        <div className="blob w-80 h-80 bg-blue-600 top-1/2 -right-40" style={{ animationDelay: "2s" }} />
        <div className="blob w-72 h-72 bg-purple-500 bottom-0 left-1/3" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-6 h-6 text-yellow-400" />
              <span className="font-bold text-lg" style={{ fontFamily: "Poppins" }}>
                Level Cripto PRO
              </span>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#beneficios" className="text-sm hover:text-yellow-400 transition-colors">
                Benefícios
              </a>
              <a href="#conteudo" className="text-sm hover:text-yellow-400 transition-colors">
                Conteúdo
              </a>
              <a href="#professor" className="text-sm hover:text-yellow-400 transition-colors">
                Professor
              </a>
              <a href="#faq" className="text-sm hover:text-yellow-400 transition-colors">
                FAQ
              </a>
              <a href="#depoimentos" className="text-sm hover:text-yellow-400 transition-colors">
                Depoimentos
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section with Countdown */}
        <section className="container py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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

            {/* Hero Image */}
            <div className="relative h-96 flex items-center justify-center animate-stagger" style={{ animationDelay: "0.2s" }}>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/cKJrIRfRyjiATVmg.png"
                alt="Bitcoin Pro"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Benefits Section */}
        <section id="beneficios" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: "Poppins" }}>
              Por que aderir cedo?
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Inter" }}>
              Benefícios exclusivos para os primeiros inscritos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Desconto de Lançamento",
                description:
                  "Garanta 50% de desconto no preço final. Quanto mais cedo se inscrever, maior o desconto!",
              },
              {
                icon: Zap,
                title: "Acesso Antecipado",
                description:
                  "Seja um dos primeiros a acessar o curso. Ganhe 2 semanas de antecedência antes do lançamento público.",
              },
              {
                icon: Globe,
                title: "Bônus Exclusivo",
                description:
                  "Receba 3 módulos bônus sobre estratégias avançadas de trading e análise técnica profissional.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="card-luminous p-8 animate-stagger border-2 border-yellow-400/50 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/30 transition-all"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <Icon className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Outfit" }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300" style={{ fontFamily: "Inter" }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Referral Progress Section */}
        <section id="referrals" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: "Poppins" }}>
              Indique e Ganhe
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Inter" }}>
              Compartilhe seu código e suba na fila de espera
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card-luminous p-8 animate-stagger border-2 border-yellow-400/50 hover:border-yellow-400 transition-all">
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-semibold">Progresso de Indicações</span>
                  <span className="text-sm text-yellow-400 font-bold">0 / 5 indicações</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-yellow-400 h-full transition-all duration-500"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">1 indicação</p>
                  <p className="text-sm font-bold">Suba 10 posições</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">3 indicações</p>
                  <p className="text-sm font-bold">Ganhe 1 mês grátis</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">5 indicações</p>
                  <p className="text-sm font-bold">Acesso vitalício</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Course Content Section */}
        <section id="conteudo" className="container py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 flex items-center justify-center animate-stagger">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/PpVZxBRJBlDFtaCv.png"
                alt="Conteúdo do Curso"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="animate-stagger" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-5xl font-black mb-6 uppercase" style={{ fontFamily: "Poppins" }}>
                O que você vai aprender
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: "Inter" }}>
                Conteúdo completo e estruturado para levar você do zero ao profissional em criptomoedas.
              </p>
              <ul className="space-y-4 text-gray-300" style={{ fontFamily: "Inter" }}>
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
                  <li key={idx} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span>{item}</span>
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 flex items-center justify-center">
              <img
                src="/images/testimonial-avatar-1.png"
                alt="Renan Mataveli"
                className="w-64 h-64 rounded-full animate-stagger"
                style={{ animationDelay: "0s" }}
              />
            </div>

            <div className="animate-stagger" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-5xl font-black mb-6 uppercase" style={{ fontFamily: "Poppins" }}>
                Conheça o Professor
              </h2>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4" style={{ fontFamily: "Outfit" }}>
                Renan Mataveli
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: "Inter" }}>
                Especialista em criptomoedas com mais de 10 anos de experiência no mercado financeiro. Renan é criador do canal <strong>Level Cripto</strong>, com mais de 10k seguidores no YouTube e comunidade ativa no Instagram.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: "Inter" }}>
                Sua missão é democratizar o conhecimento sobre criptomoedas, explicando de forma clara e sem jargão desnecessário. No canal, você encontra:
              </p>
              <ul className="space-y-3 text-gray-300 mb-8" style={{ fontFamily: "Inter" }}>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Análises profundas do mercado de criptomoedas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Estratégias de investimento e farm de airdrops</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Conteúdo educativo sobre DeFi, NFTs e Web3</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Comunidade ativa e suporte direto aos alunos</span>
                </li>
              </ul>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/level_cripto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all"
                >
                  Seguir no Instagram
                </a>
                <a
                  href="https://www.youtube.com/channel/UCCbpFaIRJkltWCbiFNiv2Bw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition-all"
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
              O que dizem nossos alunos
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
                image: "/images/testimonial-avatar-1.png",
                text: "Curso excelente! Saí do zero e consegui meu primeiro investimento com confiança. Renan explica de forma muito clara.",
              },
              {
                name: "Marina Costa",
                role: "Empreendedora",
                image: "/images/testimonial-avatar-2.png",
                text: "O melhor investimento que fiz. O conteúdo é prático e aplicável. Recomendo para quem quer entender cripto de verdade.",
              },
              {
                name: "João Santos",
                role: "Trader",
                image: "/images/testimonial-avatar-1.png",
                text: "Muito bom! Aprendi estratégias que não conhecia. O suporte e a comunidade são incríveis.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="card-luminous p-8 animate-stagger border-2 border-yellow-400/50 hover:border-yellow-400 transition-all"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold" style={{ fontFamily: "Outfit" }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed" style={{ fontFamily: "Inter" }}>
                  "{testimonial.text}"
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
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
              Perguntas Frequentes
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Inter" }}>
              Tire suas dúvidas sobre o curso Level Cripto PRO
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="card-luminous overflow-hidden animate-stagger border-2 border-yellow-400/50 hover:border-yellow-400 transition-all"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <h3 className="font-semibold text-lg" style={{ fontFamily: "Outfit" }}>
                    {item.question}
                  </h3>
                  <span className="text-yellow-400 text-2xl flex-shrink-0">
                    {expandedFAQ === idx ? "−" : "+"}
                  </span>
                </button>
                {expandedFAQ === idx && (
                  <div className="px-8 pb-6 border-t border-white/10 text-gray-300" style={{ fontFamily: "Inter" }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* CTA Section */}
        <section className="container py-20 text-center">
          <div className="animate-stagger">
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase" style={{ fontFamily: "Poppins" }}>
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
              Inscreva-se agora para acesso antecipado e receba um desconto exclusivo de lançamento.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black uppercase tracking-wide text-lg transition-all transform hover:scale-105 inline-flex items-center gap-2 rounded-lg shadow-lg shadow-yellow-500/50">
              Entrar na Lista de Espera
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-sm mt-20">
          <div className="container py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Bitcoin className="w-6 h-6 text-yellow-400" />
                  <span className="font-bold" style={{ fontFamily: "Poppins" }}>
                    Level Cripto PRO
                  </span>
                </div>
                <p className="text-sm text-gray-400">Educação em criptomoedas de qualidade com Renan Mataveli.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>
                  Links
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
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a
                      href="https://www.instagram.com/level_cripto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-400 transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCCbpFaIRJkltWCbiFNiv2Bw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-400 transition-colors"
                    >
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ fontFamily: "Outfit" }}>
                  Legal
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition-colors">
                      Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition-colors">
                      Termos de Uso
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
              <p>
                © 2026 Level Cripto PRO. Todos os direitos reservados. Desenvolvido com{" "}
                <span className="text-yellow-400">♥</span> para educação em criptomoedas.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
