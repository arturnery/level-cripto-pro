import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Bitcoin, TrendingUp, Zap, Globe, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

/**
 * Design System: Minimalismo Futurista com Gradientes Dinâmicos
 * - Paleta: Azul escuro (#0F172A), Roxo (#7C3AED), Amarelo ouro (#FCD34D)
 * - Tipografia: Poppins 700 (títulos), Outfit 600 (subtítulos), Inter 400 (corpo)
 * - Animações: Fade-in + slide-up, hover effects com profundidade, pulse effects
 * - Elementos: Orbes abstratos, linhas diagonais, cards com brilho sutil
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
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
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold" style={{ fontFamily: "Poppins" }}>
                Level Cripto PRO
              </span>
            </div>
            <nav className="hidden md:flex gap-8 text-sm">
              <a href="#beneficios" className="hover:text-yellow-400 transition-colors">
                Benefícios
              </a>
              <a href="#conteudo" className="hover:text-yellow-400 transition-colors">
                Conteúdo
              </a>
              <a href="#professor" className="hover:text-yellow-400 transition-colors">
                Professor
              </a>
              <a href="#faq" className="hover:text-yellow-400 transition-colors">
                FAQ
              </a>
              <a href="#depoimentos" className="hover:text-yellow-400 transition-colors">
                Depoimentos
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-stagger">
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-full text-sm">
              <span className="text-yellow-400">✨</span> Lançamento Exclusivo
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "Poppins" }}
            >
              Level Cripto
              <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                PRO
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: "Inter" }}>
              Do zero ao avançado: Bitcoin, DeFi, NFTs, Metaverso, Mercado de Futuros e Web3. Com suporte, comunidade ativa, mapa mental para airdrops e acesso vitalício.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors text-white placeholder-gray-500"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 pulse-subtle"
              >
                Inscrever <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {submitted && (
              <div className="text-green-400 text-sm animate-stagger">
                ✓ Inscrição realizada com sucesso! Verifique seu email.
              </div>
            )}

            <div className="flex gap-8 text-sm text-gray-400">
              <div>
                <div className="font-bold text-white">+347</div>
                <div>Alunos Inscritos</div>
              </div>
              <div>
                <div className="font-bold text-white">1.2K+</div>
                <div>Seguidores YouTube</div>
              </div>
              <div>
                <div className="font-bold text-white">7</div>
                <div>Módulos Completos</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <img
              src="/images/bitcoin-hero.png"
              alt="Bitcoin Pro"
              className="w-full h-full object-contain animate-stagger"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="divider-diagonal" />
        </div>

        {/* Features Section */}
        <section id="beneficios" className="container py-20">
          <div className="text-center mb-16 animate-stagger">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Poppins" }}>
              Por que escolher Bitcoin Pro?
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: "Inter" }}>
              Tudo que você precisa para começar e prosperar no mercado de criptomoedas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Conhecimento Completo",
                description:
                  "Do zero ao avançado: Bitcoin, DeFi, NFTs, Metaverso, Mercado de Futuros e Web3 em um único curso.",
              },
              {
                icon: Zap,
                title: "Suporte & Comunidade",
                description:
                  "Acesso a comunidade ativa, suporte direto, mapa mental exclusivo para farm de airdrops e estratégias práticas.",
              },
              {
                icon: Globe,
                title: "Acesso Vitalício",
                description:
                  "Estude no seu ritmo com acesso permanente ao conteúdo. Atualizações incluídas e airdrops em destaque.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="card-luminous card-hover p-8 animate-stagger"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <Icon className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Outfit" }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "Inter" }}>
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

        {/* Course Preview Section */}
        <section id="conteudo" className="container py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-stagger">
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Poppins" }}>
                O que você vai aprender
              </h2>
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

            <div className="relative h-96 flex items-center justify-center">
              <img
                src="/images/course-preview.png"
                alt="Conteúdo do Curso"
                className="w-full h-full object-contain animate-stagger"
                style={{ animationDelay: "0.2s" }}
              />
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
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Poppins" }}>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Poppins" }}>
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
                className="card-luminous p-8 animate-stagger"
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
                <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "Inter" }}>
                  "{testimonial.text}"
                </p>
                <div className="flex gap-1 mt-4">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Poppins" }}>
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
                className="card-luminous overflow-hidden animate-stagger"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Poppins" }}>
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "Inter" }}>
              Inscreva-se agora para acesso antecipado e receba um desconto exclusivo de lançamento.
            </p>
            <Button
              onClick={() => {
                const input = document.querySelector("input[type='email']") as HTMLInputElement;
                input?.focus();
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-lg font-bold text-lg flex items-center gap-2 mx-auto pulse-subtle"
            >
              Inscrever Agora <ArrowRight className="w-5 h-5" />
            </Button>
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
