import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [totalSignups, setTotalSignups] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone) {
      const code = `LC${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setReferralCode(code);
      setTotalSignups(totalSignups + 1);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setPhone("");
        setShowModal(false);
      }, 3000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Qual é o pré-requisito para fazer o curso?",
      answer:
        "Nenhum! O curso é 100% para iniciantes. Se você quer aprender sobre criptomoedas do zero, este é o lugar certo.",
    },
    {
      question: "Quanto tempo leva para completar o curso?",
      answer:
        "O curso é estruturado em 7 semanas, com módulos que você pode acessar no seu próprio ritmo. Cada módulo leva entre 2-4 horas.",
    },
    {
      question: "O curso inclui suporte?",
      answer:
        "Sim! Você terá acesso a uma comunidade ativa, suporte direto do Renan e respostas em até 24 horas.",
    },
    {
      question: "Posso acessar o curso em qualquer dispositivo?",
      answer:
        "Sim! O curso é 100% online e responsivo. Acesse pelo celular, tablet ou computador quando quiser.",
    },
    {
      question: "Há garantia de reembolso?",
      answer:
        "Sim, oferecemos 7 dias de garantia de reembolso total se não gostar do curso.",
    },
    {
      question: "O curso aborda airdrops?",
      answer:
        "Sim! Temos um módulo completo sobre estratégias de farm de airdrops com mapa mental e guias práticos.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur border-b border-orange-600/20 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">₿</span>
            <span className="text-xl font-bold">Level Cripto PRO</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#beneficios" className="text-gray-300 hover:text-orange-600 transition">
              Benefícios
            </a>
            <a href="#conteudo" className="text-gray-300 hover:text-orange-600 transition">
              Conteúdo
            </a>
            <a href="#professor" className="text-gray-300 hover:text-orange-600 transition">
              Professor
            </a>
            <a href="#diferenciais" className="text-gray-300 hover:text-orange-600 transition">
              Diferenciais
            </a>
            <a href="#resultados" className="text-gray-300 hover:text-orange-600 transition">
              Resultados
            </a>
            <a href="#depoimentos" className="text-gray-300 hover:text-orange-600 transition">
              Depoimentos
            </a>
            <a href="#faq" className="text-gray-300 hover:text-orange-600 transition">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-orange-600/10 border border-orange-600/30 rounded-full">
            <span className="text-orange-600 text-sm font-bold">✨ Lançamento Exclusivo</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            SE TORNE UM<br />
            <span className="text-orange-600">LEVEL CRIPTO PRO</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Domine o mercado cripto com a ajuda de profissionais que vivem desse mercado.
          </p>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Do zero ao avançado: Bitcoin, DeFi, NFTs, Mercado de Futuros, Web3 e Airdrops.
            <br />
            Com suporte 24h, comunidade ativa, mapa mental para organizar seus airdrops e mais
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-600 text-black font-black py-4 px-8 rounded-lg hover:bg-orange-700 transition transform hover:scale-105 text-lg flex items-center gap-2"
          >
            ENTRAR NA LISTA DE ESPERA <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-orange-600/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">INSCREVER-SE</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600"
                required
              />
              <input
                type="tel"
                placeholder="Seu telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-600 text-black font-black py-3 rounded-lg hover:bg-orange-700 transition"
              >
                CONFIRMAR INSCRIÇÃO
              </button>
            </form>
            {submitted && referralCode && (
              <div className="mt-6 p-4 bg-orange-600/10 border border-orange-600/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-3">Seu código de referência:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-orange-600 font-bold">{referralCode}</code>
                  <button
                    onClick={copyToClipboard}
                    className="text-orange-600 hover:text-orange-700 transition"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vagas Limitadas Section - Benefícios */}
      <section id="beneficios" className="py-20 px-4 md:px-8 bg-orange-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-black">⚡ VAGAS LIMITADAS</h2>
          <p className="text-2xl font-bold text-black mb-6">Apenas 20 alunos na primeira turma</p>
          <p className="text-lg text-black mb-8 leading-relaxed max-w-3xl">
            Sabemos que qualidade exige dedicação. Por isso, limitamos a primeira turma a apenas <strong>20 alunos</strong> para garantir:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-black text-black mb-2">Suporte personalizado</h3>
                <p className="text-black/80">Você não é apenas um número, é parte de uma comunidade</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-black text-black mb-2">Comunidade ativa</h3>
                <p className="text-black/80">Networking real com outros alunos e oportunidades genuínas</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-black text-black mb-2">Mentoria de qualidade</h3>
                <p className="text-black/80">Renan pode dedicar tempo real para suas dúvidas</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-black text-black mb-2">Conteúdo exclusivo</h3>
                <p className="text-black/80">Bônus e atualizações que só os primeiros recebem</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Conteúdo Section */}
      <section id="conteudo" className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">O QUE VOCÊ VAI APRENDER</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>Origem e história do Bitcoin</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>Como funciona a blockchain</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>Estratégias de investimento seguro</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>DeFi e finanças descentralizadas</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>NFTs e ativos digitais</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>Airdrops: Mapa Mental e Farm Estratégico</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>Análise técnica e fundamental</span>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-600 font-black">•</span>
              <span>Segurança, Suporte e Comunidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Professor Section */}
      <section id="professor" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">CONHEÇA O PROFESSOR</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black mb-4 text-orange-600">Renan Mataveli</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Renan é um especialista em criptomoedas com mais de 5 anos de experiência no mercado. 
                Ele fundou a comunidade Level Cripto para compartilhar seu conhecimento e ajudar outras pessoas 
                a alcançarem a liberdade financeira através das criptomoedas.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Com mais de 100k seguidores no YouTube e uma comunidade ativa no Instagram, 
                Renan é conhecido por sua didática clara e estratégias práticas que funcionam no mercado real.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/level_cripto" target="_blank" rel="noopener noreferrer" 
                   className="px-6 py-3 bg-orange-600 text-black font-black rounded-lg hover:bg-orange-700 transition">
                  Instagram
                </a>
                <a href="https://youtube.com/@levelcripto" target="_blank" rel="noopener noreferrer"
                   className="px-6 py-3 bg-orange-600 text-black font-black rounded-lg hover:bg-orange-700 transition">
                  YouTube
                </a>
                <a href="https://x.com/LevelCripto" target="_blank" rel="noopener noreferrer"
                   className="px-6 py-3 bg-orange-600 text-black font-black rounded-lg hover:bg-orange-700 transition">
                  X
                </a>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-orange-600/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl">👨‍🏫</span>
              </div>
              <h4 className="text-xl font-black mb-2">Renan Mataveli</h4>
              <p className="text-orange-600 font-bold">Especialista em Criptomoedas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4">NOSSOS DIFERENCIAIS</h2>
          <p className="text-xl text-gray-400 mb-16">O que torna o Level Cripto PRO diferente de qualquer outro curso</p>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-600 p-8 rounded-r-lg hover:border-orange-500 transition">
              <div className="flex gap-6 items-start">
                <div className="text-5xl flex-shrink-0">🎓</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-orange-600">Conteúdo Estruturado e Prático</h3>
                  <p className="text-gray-300 leading-relaxed">Módulos bem organizados que você pode acompanhar no seu próprio ritmo, com exemplos reais do mercado e estratégias que funcionam.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-600 p-8 rounded-r-lg hover:border-orange-500 transition">
              <div className="flex gap-6 items-start">
                <div className="text-5xl flex-shrink-0">👨‍🏫</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-orange-600">Mentorado por Renan Mataveli</h3>
                  <p className="text-gray-300 leading-relaxed">Aprenda diretamente com um profissional que vive do mercado cripto há mais de 5 anos. Renan responde suas dúvidas e compartilha suas estratégias reais.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-600 p-8 rounded-r-lg hover:border-orange-500 transition">
              <div className="flex gap-6 items-start">
                <div className="text-5xl flex-shrink-0">👥</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-orange-600">Comunidade Ativa e Engajada</h3>
                  <p className="text-gray-300 leading-relaxed">Faça parte de uma comunidade de alunos que compartilham análises, oportunidades e resultados. Networking real com profissionais do mercado.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-600 p-8 rounded-r-lg hover:border-orange-500 transition">
              <div className="flex gap-6 items-start">
                <div className="text-5xl flex-shrink-0">💬</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-orange-600">Suporte 24h Personalizado</h3>
                  <p className="text-gray-300 leading-relaxed">Dúvidas sobre o curso? Suporte direto do time Level Cripto. Lives semanais com Renan para tirar dúvidas em tempo real.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-600 p-8 rounded-r-lg hover:border-orange-500 transition">
              <div className="flex gap-6 items-start">
                <div className="text-5xl flex-shrink-0">🎁</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-orange-600">Bônus Exclusivos e Atualizações</h3>
                  <p className="text-gray-300 leading-relaxed">Mapa mental para airdrops, guias práticos, ferramentas de análise, relatórios semanais e muito mais. Tudo incluído no curso.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600/20 to-transparent border-l-4 border-orange-600 p-8 rounded-r-lg hover:border-orange-500 transition">
              <div className="flex gap-6 items-start">
                <div className="text-5xl flex-shrink-0">♾️</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-orange-600">Acesso Vitalício</h3>
                  <p className="text-gray-300 leading-relaxed">Uma vez inscrito, você tem acesso ao curso para sempre. Novas atualizações, novos módulos, tudo sem custo adicional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section id="resultados" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">RESULTADOS DA COMUNIDADE</h2>
          
          {/* Resultados de Trades */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">📈</span>
              <h3 className="text-3xl font-black text-orange-600">Resultados de Trades</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Nossos alunos aplicam as estratégias ensinadas no curso e conseguem resultados consistentes no mercado. Alguns destaques:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-orange-600 font-black">✓</span>
                    <span className="text-gray-300">Alunos que dobraram seu capital em 3 meses com estratégias de swing trading</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-600 font-black">✓</span>
                    <span className="text-gray-300">Comunidade que compartilha análises técnicas e oportunidades diárias</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-600 font-black">✓</span>
                    <span className="text-gray-300">Suporte 24h para ajudar em dúvidas sobre posições e estratégias</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-64">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Vídeo dos Resultados de Trades</p>
                  <div className="w-full aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">▶️</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">(em breve)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados de Airdrops */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🎁</span>
              <h3 className="text-3xl font-black text-orange-600">Resultados de Airdrops</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Com o mapa mental e as estratégias de farm de airdrops ensinadas no curso, nossos alunos conseguem identificar e participar de airdrops lucrativos:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-orange-600 font-black">✓</span>
                    <span className="text-gray-300">Alunos que ganharam mais de $5.000 em airdrops em 2 meses</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-600 font-black">✓</span>
                    <span className="text-gray-300">Mapa mental exclusivo para organizar e priorizar airdrops</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-600 font-black">✓</span>
                    <span className="text-gray-300">Comunidade que compartilha oportunidades de airdrops em tempo real</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-64">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Vídeo dos Resultados de Airdrops</p>
                  <div className="w-full aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">▶️</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">(em breve)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">O QUE DIZEM NOSSOS ALUNOS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-orange-600">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "Espaço para depoimento do aluno {i}. Este é um placeholder que será preenchido com um depoimento real em breve."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="font-black">Nome do Aluno {i}</p>
                    <p className="text-sm text-gray-400">Aluno do Level Cripto PRO</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4">PERGUNTAS FREQUENTES</h2>
          <p className="text-lg mb-12">Tire suas dúvidas sobre o curso Level Cripto PRO</p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* CTA Section */}
            <div className="bg-black rounded-lg p-8 flex flex-col justify-center h-full">
              <h3 className="text-2xl font-black mb-4">Fale com nosso time</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Fale com um dos nossos consultores e tire todas as suas duvidas sobre o Level Cripto PRO, sua jornada, os numeros e muito mais.
              </p>
              <button className="bg-orange-600 text-black font-black py-3 px-6 rounded-lg hover:bg-orange-700 transition w-full mb-6">
                FALE COM NOSSO WHATSAPP
              </button>
              <p className="text-xs text-gray-400 text-center">
                Responderemos em ate 2 horas
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
              <div className="text-lg font-black mb-6 text-orange-600">Tem alguma duvida?</div>
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black rounded-lg border border-gray-800 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800 transition font-bold text-white text-left"
                  >
                    <span className="text-sm">{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform flex-shrink-0 ml-4 ${
                        expandedFAQ === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-6 py-4 bg-gray-800 border-t border-gray-700 text-gray-300 text-sm">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 px-4 md:px-8 bg-orange-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">PRONTO PARA COMEÇAR?</h2>
          <p className="text-xl text-black mb-12 max-w-2xl mx-auto leading-relaxed">
            Se chegou até aqui tenho certeza que você está pronto e interessado para fazer parte da comunidade.
            <br /><br />
            Garanta a sua vaga entrando na lista de espera.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-orange-600 font-black py-4 px-8 rounded-lg hover:bg-gray-900 transition transform hover:scale-105 text-lg flex items-center gap-2 mx-auto"
          >
            ENTRAR NA LISTA DE ESPERA <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-orange-600/20 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 items-start">
            <div className="flex flex-col">
              <h3 className="font-black mb-4 text-lg">Level Cripto PRO</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Aprenda criptomoedas com os melhores profissionais do mercado.
              </p>
            </div>
            <div className="flex flex-col">
              <h4 className="font-black mb-4 text-lg">Redes Sociais</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://instagram.com/level_cripto" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">Instagram</a></li>
                <li><a href="https://youtube.com/@levelcripto" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">YouTube</a></li>
                <li><a href="https://x.com/LevelCripto" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">X (Twitter)</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Level Cripto PRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
