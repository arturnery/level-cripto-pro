import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Check,
  X,
  ChevronDown,
  Instagram,
  Youtube,
  Twitter,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [totalSignups, setTotalSignups] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validatePhone = (phoneNumber: string) => {
    // Validar se tem 11 dígitos (2 de DDD + 9 dígitos)
    const numbers = phoneNumber.replace(/\D/g, '');
    return numbers.length === 11 && numbers[2] === '9';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setPhoneError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setPhoneError('Por favor, insira seu email');
      return;
    }
    if (!phone) {
      setPhoneError('Por favor, insira seu telefone');
      return;
    }
    if (!validatePhone(phone)) {
      setPhoneError('Telefone inválido. Use o formato: (XX) 9XXXX-XXXX');
      return;
    }
    setTotalSignups(totalSignups + 1);
    setSubmitted(true);
    setPhoneError('');
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
        "Sim! O curso é totalmente responsivo e funciona em computadores, tablets e smartphones.",
    },
    {
      question: "Há garantia de reembolso?",
      answer:
        "Sim, oferecemos 7 dias de garantia. Se não ficar satisfeito, devolvemos 100% do seu investimento.",
    },
    {
      question: "O curso aborda airdrops?",
      answer:
        "Sim! Temos um módulo completo sobre airdrops com mapa mental e estratégias de farm.",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-4 md:px-8 bg-black relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663190783268/U83KkfBRbFSedDHoLmymnt/BN_01_HD_574b48c5.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'crisp-edges' as any,
        }}
      >
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-4 md:p-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-center">
              <span className="text-white">DOMINE O MERCADO DE</span><br />
              <span className="text-orange-600">CRIPTOMOEDAS</span><br />
              <span className="text-white">DO ZERO AO AVANÇADO</span>
            </h1>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Aprenda análise de mercado, estratégias e oportunidades no mundo cripto, mesmo começando do zero.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-xl mt-1">✔</span>
                <span className="text-gray-300 text-base">Estratégias usadas no mercado</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-xl mt-1">✔</span>
                <span className="text-gray-300 text-base">Identificação de oportunidades</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-xl mt-1">✔</span>
                <span className="text-gray-300 text-base">DeFi, Web3 e Airdrops</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-xl mt-1">✔</span>
                <span className="text-gray-300 text-base">Comunidade ativa e suporte</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-xl mt-1">✔</span>
                <span className="text-gray-300 text-base">Análises técnicas frequentes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-xl mt-1">✔</span>
                <span className="text-gray-300 text-base">Lives semanais</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-green-600 text-white font-black py-4 px-8 rounded-lg hover:bg-green-700 transition transform hover:scale-105 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
            >
              GARANTIR MINHA VAGA NA LISTA DE ESPERA <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {!submitted ? (
              <>
                <h2 className="text-3xl font-black mb-2 text-orange-600">
                  Garanta sua vaga
                </h2>
                <p className="text-gray-300 mb-6">
                  Insira seus dados para entrar na lista de espera do Level Cripto PRO
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Seu melhor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="(XX) 9XXXX-XXXX"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  {phoneError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      {phoneError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3 rounded-lg transition"
                  >
                    Entrar na lista de espera
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-2">Sucesso!</h3>
                <p className="text-gray-300 mb-6">
                  Você foi adicionado à lista de espera. Total de inscritos: {totalSignups}
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3 rounded-lg transition"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nova Seção: Conexão com o Problema */}
      <section className="py-32 px-4 md:px-8 bg-black border-t-2 border-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
            O mercado cripto pode parecer confuso no início
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Muitas pessoas entram no mercado de criptomoedas sem entender como ele realmente funciona.
          </p>
          <p className="text-lg text-gray-400 mb-8 font-semibold">Elas não sabem:</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
            <div className="flex items-start gap-4">
              <span className="text-2xl text-orange-600 font-bold">•</span>
              <p className="text-gray-300">Como analisar o mercado</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-orange-600 font-bold">•</span>
              <p className="text-gray-300">Como identificar boas oportunidades</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-orange-600 font-bold">•</span>
              <p className="text-gray-300">Quando comprar ou vender</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-orange-600 font-bold">•</span>
              <p className="text-gray-300">Como evitar erros comuns que fazem iniciantes perder dinheiro</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            O objetivo do <strong className="text-orange-600">Level Cripto PRO</strong> é ensinar você a entender o mercado de forma clara, estruturada e prática.
          </p>
        </div>
      </section>

      {/* Vagas Limitadas Section - Benefícios */}
      <section id="beneficios" className="py-32 px-4 md:px-8 bg-orange-600">
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

      {/* Conteúdo Section - Módulos */}
      <section id="conteudo" className="py-32 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">O QUE VOCÊ VAI APRENDER</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Módulo 1 */}
            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <h3 className="text-2xl font-black text-orange-600 mb-6">Módulo 1 — Fundamentos do mercado cripto</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">Origem e história do Bitcoin</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">Como funciona a blockchain</p>
                </div>
              </div>
            </div>
            
            {/* Módulo 2 */}
            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <h3 className="text-2xl font-black text-orange-600 mb-6">Módulo 2 — Estratégias de investimento</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">Estratégias de investimento seguro</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">Análise técnica e fundamental</p>
                </div>
              </div>
            </div>
            
            {/* Módulo 3 */}
            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <h3 className="text-2xl font-black text-orange-600 mb-6">Módulo 3 — Novas oportunidades do mercado</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">NFTs e ativos digitais</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">DeFi e finanças descentralizadas</p>
                </div>
              </div>
            </div>
            
            {/* Módulo 4 */}
            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <h3 className="text-2xl font-black text-orange-600 mb-6">Módulo 4 — Airdrops e oportunidades</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">Mapa mental de Airdrops</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-orange-600 font-bold text-xl">•</span>
                  <p className="text-gray-300">Farm estratégico</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-600 text-white font-black py-4 px-8 rounded-lg hover:bg-orange-700 transition transform hover:scale-105 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl mx-auto"
            >
              GARANTIR MINHA VAGA NA LISTA DE ESPERA <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Professor Section */}
      <section id="professor" className="py-32 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">QUEM ESTÁ POR TRÁS DO LEVEL CRIPTO PRO</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black mb-4 text-orange-600">Renan Mataveli</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Renan acompanha o mercado de criptomoedas há anos e produz conteúdos e análises sobre o mercado.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Com experiência acompanhando diferentes ciclos do mercado cripto, ele desenvolveu um método estruturado para ajudar iniciantes e investidores a entenderem melhor esse mercado.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-transparent rounded-lg p-8 text-center">
              <div className="text-7xl mb-4">👨‍🏫</div>
              <p className="text-gray-300 font-semibold">Especialista em Criptomoedas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-32 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">POR QUE O LEVEL CRIPTO PRO É DIFERENTE</h2>
          <p className="text-xl text-gray-400 mb-16 text-center">Conheça os diferenciais que tornam nosso curso único</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-black mb-3 text-orange-600">Comunidade ativa</h3>
              <p className="text-gray-300 leading-relaxed">Interaja com outros alunos e acompanhe discussões sobre o mercado.</p>
            </div>

            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-black mb-3 text-orange-600">Suporte para dúvidas</h3>
              <p className="text-gray-300 leading-relaxed">Você não aprende sozinho.</p>
            </div>

            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-black mb-3 text-orange-600">Conteúdo prático</h3>
              <p className="text-gray-300 leading-relaxed">Focado em aplicação real no mercado.</p>
            </div>

            <div className="bg-gray-900 border border-orange-600/30 rounded-lg p-8 hover:border-orange-600 transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-black mb-3 text-orange-600">Análises frequentes do mercado</h3>
              <p className="text-gray-300 leading-relaxed">Conteúdos atualizados sobre o que está acontecendo no mercado cripto.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white font-black py-4 px-8 rounded-lg hover:bg-green-700 transition transform hover:scale-105 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl mx-auto"
            >
              GARANTIR MINHA VAGA NA LISTA DE ESPERA <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section id="resultados" className="py-32 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">RESULTADOS DA COMUNIDADE</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-3xl font-black mb-4 text-orange-600">Resultados de Trades</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nossos alunos aplicam as estratégias ensinadas no curso e conseguem resultados consistentes no mercado. Alguns destaques:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-300">
                  <span className="text-orange-600">✓</span>
                  Alunos que dobraram seu capital em 3 meses com estratégias de swing trading
                </li>
                <li className="flex gap-3 text-gray-300">
                  <span className="text-orange-600">✓</span>
                  Comunidade que compartilha análises técnicas e oportunidades diárias
                </li>
                <li className="flex gap-3 text-gray-300">
                  <span className="text-orange-600">✓</span>
                  Suporte 24h para ajudar em dúvidas sobre posições e estratégias
                </li>
              </ul>
            </div>

            <div>
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-3xl font-black mb-4 text-orange-600">Resultados de Airdrops</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Com o mapa mental e as estratégias de farm de airdrops ensinadas no curso, nossos alunos conseguem identificar e participar de airdrops lucrativos:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-300">
                  <span className="text-orange-600">✓</span>
                  Alunos que ganharam mais de $5.000 em airdrops em 2 meses
                </li>
                <li className="flex gap-3 text-gray-300">
                  <span className="text-orange-600">✓</span>
                  Mapa mental exclusivo para organizar e priorizar airdrops
                </li>
                <li className="flex gap-3 text-gray-300">
                  <span className="text-orange-600">✓</span>
                  Comunidade que compartilha oportunidades de airdrops em tempo real
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-32 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">O QUE DIZEM NOSSOS ALUNOS</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-orange-600/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Espaço para depoimento do aluno 1. Este é um placeholder que será preenchido com um depoimento real em breve."
              </p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">👤</div>
                <div>
                  <p className="font-black">Nome do Aluno 1</p>
                  <p className="text-gray-400 text-sm">Aluno do Level Cripto PRO</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-orange-600/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Espaço para depoimento do aluno 2. Este é um placeholder que será preenchido com um depoimento real em breve."
              </p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">👤</div>
                <div>
                  <p className="font-black">Nome do Aluno 2</p>
                  <p className="text-gray-400 text-sm">Aluno do Level Cripto PRO</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-orange-600/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Espaço para depoimento do aluno 3. Este é um placeholder que será preenchido com um depoimento real em breve."
              </p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">👤</div>
                <div>
                  <p className="font-black">Nome do Aluno 3</p>
                  <p className="text-gray-400 text-sm">Aluno do Level Cripto PRO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-4 md:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">PERGUNTAS FREQUENTES</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">Tire suas dúvidas sobre o curso Level Cripto PRO</p>

          <div className="space-y-4 mb-12">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-black rounded-lg border border-orange-600/20 overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition"
                >
                  <span className="text-lg font-black text-left">{item.question}</span>
                  <ChevronDown
                    size={24}
                    className={`text-orange-600 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 py-4 bg-gray-900 border-t border-orange-600/20 text-gray-300">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-black border border-orange-600/20 rounded-lg p-8 text-center mb-8">
            <h3 className="text-2xl font-black mb-2">Fale com nosso time</h3>
            <p className="text-gray-400 mb-6">
              Fale com um dos nossos consultores e tire todas as suas duvidas sobre o Level Cripto PRO, sua jornada, os numeros e muito mais.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white font-black py-3 px-8 rounded-lg hover:bg-green-700 transition"
            >
              FALE COM NOSSO WHATSAPP
            </button>
            <p className="text-gray-400 text-sm mt-4">Responderemos em ate 2 horas</p>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-6 text-lg">Tem alguma duvida?</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-600 text-white font-black py-4 px-8 rounded-lg hover:bg-orange-700 transition text-lg"
            >
              GARANTIR MINHA VAGA NA LISTA DE ESPERA
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-32 px-4 md:px-8 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">PRONTO PARA COMEÇAR?</h2>
          <p className="text-xl text-black mb-8 leading-relaxed">
            Se chegou até aqui tenho certeza que você está pronto e interessado para fazer parte da comunidade.
            <br /><br />
            Garanta a sua vaga entrando na lista de espera.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white font-black py-4 px-8 rounded-lg hover:bg-green-700 transition transform hover:scale-105 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl mx-auto"
          >
            GARANTIR MINHA VAGA NA LISTA DE ESPERA <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-black text-lg mb-4">Level Cripto PRO</h4>
              <p className="text-gray-400">
                Aprenda criptomoedas com os melhores profissionais do mercado.
              </p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#conteudo" className="hover:text-orange-600">Conteúdo</a></li>
                <li><a href="#professor" className="hover:text-orange-600">Professor</a></li>
                <li><a href="#diferenciais" className="hover:text-orange-600">Diferenciais</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-orange-600">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-600">
                  <Youtube size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-600">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Level Cripto PRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
