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
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur border-b border-yellow-400/20 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-yellow-400">₿</span>
            <span className="text-xl font-bold">Level Cripto PRO</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#beneficios" className="text-gray-300 hover:text-yellow-400 transition">
              Benefícios
            </a>
            <a href="#conteudo" className="text-gray-300 hover:text-yellow-400 transition">
              Conteúdo
            </a>
            <a href="#diferenciais" className="text-gray-300 hover:text-yellow-400 transition">
              Diferenciais
            </a>
            <a href="#resultados" className="text-gray-300 hover:text-yellow-400 transition">
              Resultados
            </a>
            <a href="#faq" className="text-gray-300 hover:text-yellow-400 transition">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-black pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="inline-block mb-6 px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-sm">
              <span className="text-yellow-400">✨</span> Lançamento Exclusivo
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            <span className="block">SE TORNE UM</span>
            <span className="text-yellow-400">LEVEL CRIPTO PRO</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Domine o mercado cripto com a ajuda de profissionais que vivem desse mercado.
          </p>

          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Do zero ao avançado: Bitcoin, DeFi, NFTs, Mercado de Futuros, Web3 e Airdrops.<br/>
            Com suporte 24h, comunidade ativa, mapa mental para organizar seus airdrops e mais
          </p>

          {/* Big CTA Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-12 py-6 bg-yellow-400 text-black font-black text-xl rounded-lg hover:bg-yellow-300 transition transform hover:scale-105 flex items-center justify-center gap-3"
          >
            ENTRAR NA LISTA DE ESPERA
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Modal de Inscrição */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-yellow-400 text-black rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-black mb-6">ENTRE NA LISTA DE ESPERA</h2>

            {submitted && referralCode ? (
              <div className="space-y-4">
                <p className="text-lg font-bold">✓ Inscrição confirmada!</p>
                <p className="text-gray-700">Seu código de referência:</p>
                <div className="flex items-center gap-3 bg-black/20 p-4 rounded">
                  <code className="text-black font-mono font-bold flex-1 text-lg">{referralCode}</code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-black/30 rounded transition"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                <p className="text-sm text-gray-700 mt-4">Compartilhe este código com seus amigos e ganhe benefícios!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black/20 border border-black/30 rounded text-black placeholder-gray-600 focus:outline-none focus:border-black/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Telefone (WhatsApp)</label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/20 border border-black/30 rounded text-black placeholder-gray-600 focus:outline-none focus:border-black/50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-black text-yellow-400 font-black rounded hover:bg-gray-900 transition"
                >
                  CONFIRMAR INSCRIÇÃO
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Vagas Limitadas Section */}
      <section id="beneficios" className="w-full bg-yellow-400 text-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black mb-8">⚡ VAGAS LIMITADAS</h2>
            <p className="text-2xl font-bold mb-8">Apenas 20 alunos na primeira turma</p>
            <p className="text-lg leading-relaxed mb-8 max-w-3xl">
              Sabemos que qualidade exige dedicação. Por isso, limitamos a primeira turma a apenas <strong>20 alunos</strong> para garantir:
            </p>

            <div className="space-y-4 max-w-3xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black">✓</span>
                <div>
                  <p className="font-bold text-lg">Suporte personalizado</p>
                  <p className="text-gray-700">Você não é apenas um número, é parte de uma comunidade</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black">✓</span>
                <div>
                  <p className="font-bold text-lg">Comunidade ativa</p>
                  <p className="text-gray-700">Networking real com outros alunos e oportunidades genuínas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black">✓</span>
                <div>
                  <p className="font-bold text-lg">Mentoria de qualidade</p>
                  <p className="text-gray-700">Renan pode dedicar tempo real para suas dúvidas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black">✓</span>
                <div>
                  <p className="font-bold text-lg">Conteúdo exclusivo</p>
                  <p className="text-gray-700">Bônus e atualizações que só os primeiros recebem</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-black text-white rounded-lg border-2 border-yellow-400">
              <p className="text-gray-400 mb-2">⏰ Aja rápido</p>
              <p className="text-2xl font-black mb-4">{totalSignups} de 20 vagas já preenchidas</p>
              <p className="text-lg">Não perca essa oportunidade. As vagas estão acabando rápido!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Section */}
      <section id="conteudo" className="w-full bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">O QUE VOCÊ VAI APRENDER</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">Origem e história do Bitcoin</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">Como funciona a blockchain</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">Estratégias de investimento seguro</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">DeFi e finanças descentralizadas</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">NFTs e ativos digitais</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">Airdrops: Mapa Mental e Farm Estratégico</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">Análise técnica e fundamental</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-400 font-black text-2xl">•</span>
                <span className="text-lg">Segurança, Suporte e Comunidade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="w-full bg-yellow-400 text-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">NOSSOS DIFERENCIAIS</h2>
          <img src="/diferenciais.png" alt="Diferenciais" className="w-full max-w-4xl mx-auto rounded-lg" />
        </div>
      </section>

      {/* Resultados Section */}
      <section id="resultados" className="w-full bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">RESULTADOS DA COMUNIDADE</h2>

          {/* Resultados de Trades */}
          <div className="mb-16">
            <h3 className="text-3xl font-black mb-6 text-yellow-400">📈 Resultados de Trades</h3>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-3xl">
              Nossos alunos aplicam as estratégias ensinadas no curso e conseguem resultados consistentes no mercado. Alguns destaques:
            </p>
            <ul className="space-y-3 max-w-3xl mb-8">
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-black">✓</span>
                <span>Alunos que dobraram seu capital em 3 meses com estratégias de swing trading</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-black">✓</span>
                <span>Comunidade que compartilha análises técnicas e oportunidades diárias</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-black">✓</span>
                <span>Suporte 24h para ajudar em dúvidas sobre posições e estratégias</span>
              </li>
            </ul>
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-8 aspect-video flex items-center justify-center">
              <p className="text-gray-400 text-center">Vídeo dos Resultados de Trades (em breve)</p>
            </div>
          </div>

          {/* Resultados de Airdrops */}
          <div>
            <h3 className="text-3xl font-black mb-6 text-yellow-400">🎁 Resultados de Airdrops</h3>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-3xl">
              Com o mapa mental e as estratégias de farm de airdrops ensinadas no curso, nossos alunos conseguem identificar e participar de airdrops lucrativos:
            </p>
            <ul className="space-y-3 max-w-3xl mb-8">
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-black">✓</span>
                <span>Alunos que ganharam mais de $5.000 em airdrops em 2 meses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-black">✓</span>
                <span>Mapa mental exclusivo para organizar e priorizar airdrops</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-black">✓</span>
                <span>Comunidade que compartilha oportunidades de airdrops em tempo real</span>
              </li>
            </ul>
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-8 aspect-video flex items-center justify-center">
              <p className="text-gray-400 text-center">Vídeo dos Resultados de Airdrops (em breve)</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full bg-yellow-400 text-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4">PERGUNTAS FREQUENTES</h2>
          <p className="text-lg mb-12">Tire suas dúvidas sobre o curso Level Cripto PRO</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ Image */}
            <div>
              <img src="/faq-defiverso.png" alt="FAQ" className="w-full rounded-lg" />
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="border-2 border-black rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-black/10 transition font-bold text-lg"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={24}
                      className={`transition-transform ${
                        expandedFAQ === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-6 py-4 bg-black/5 border-t-2 border-black text-gray-800">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">PRONTO PARA COMEÇAR?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Se chegou até aqui tenho certeza que você está pronto e interessado para fazer parte da comunidade.<br/><br/>
            Garanta a sua vaga entrando na lista de espera.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-10 py-5 bg-yellow-400 text-black font-black text-lg rounded-lg hover:bg-yellow-300 transition transform hover:scale-105"
          >
            ENTRAR NA LISTA DE ESPERA
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-yellow-400 text-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-black text-lg mb-4">Level Cripto PRO</h3>
              <p className="text-gray-700">Domine o mercado de criptomoedas com profissionais</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegação</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#beneficios" className="hover:text-black transition">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="#conteudo" className="hover:text-black transition">
                    Conteúdo
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-black transition">
                    Diferenciais
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a
                    href="https://www.instagram.com/level_cripto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCCbpFaIRJkltWCbiFNiv2Bw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#" className="hover:text-black transition">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-black pt-8 text-center text-gray-700">
            <p>&copy; 2026 Level Cripto PRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
