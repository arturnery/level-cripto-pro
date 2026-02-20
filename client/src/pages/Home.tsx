import { useState, useEffect } from "react";
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
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const code = `LC${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setReferralCode(code);
      setUserPosition(totalSignups + 1);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
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
            <a href="#professor" className="text-gray-300 hover:text-yellow-400 transition">
              Professor
            </a>
            <a href="#faq" className="text-gray-300 hover:text-yellow-400 transition">
              FAQ
            </a>
            <a href="#depoimentos" className="text-gray-300 hover:text-yellow-400 transition">
              Depoimentos
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
            Domine o mercado cripto em 7 semanas
          </p>

          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Do zero ao avançado: Bitcoin, DeFi, NFTs, Metaverso, Mercado de Futuros e Web3. Com suporte, comunidade ativa, mapa mental para airdrops e acesso vitalício.
          </p>

          {/* Countdown */}
          <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-8 mb-12 max-w-2xl">
            <p className="text-gray-400 mb-6">Lançamento em:</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">{countdown.days}</div>
                <div className="text-sm text-gray-400 mt-2">Dias</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">{countdown.hours}</div>
                <div className="text-sm text-gray-400 mt-2">Horas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">{countdown.minutes}</div>
                <div className="text-sm text-gray-400 mt-2">Minutos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">{countdown.seconds}</div>
                <div className="text-sm text-gray-400 mt-2">Segundos</div>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-2xl mb-12">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-yellow-400 text-black font-black rounded-lg hover:bg-yellow-300 transition transform hover:scale-105 flex items-center gap-2"
            >
              ENTRAR NA LISTA DE ESPERA
              <ArrowRight size={20} />
            </button>
          </form>

          {submitted && referralCode && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6 max-w-2xl mb-12">
              <p className="text-yellow-400 font-bold mb-3">✓ Inscrição confirmada!</p>
              <p className="text-gray-300 mb-4">Seu código de referência:</p>
              <div className="flex items-center gap-3 bg-black/50 p-4 rounded">
                <code className="text-yellow-400 font-mono font-bold flex-1">{referralCode}</code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-yellow-400/20 rounded transition"
                >
                  {copied ? <Check size={20} className="text-yellow-400" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div>
              <div className="text-3xl font-black text-yellow-400">+{totalSignups}</div>
              <div className="text-sm text-gray-400 mt-2">Pessoas na fila</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-400">1.2K+</div>
              <div className="text-sm text-gray-400 mt-2">Seguidores YouTube</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-400">7</div>
              <div className="text-sm text-gray-400 mt-2">Módulos Completos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vagas Limitadas Section */}
      <section id="beneficios" className="w-full bg-yellow-400 text-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black mb-8">⚡ VAGAS LIMITADAS</h2>
            <p className="text-2xl font-bold mb-8">Apenas 100 alunos na primeira turma</p>
            <p className="text-lg leading-relaxed mb-8 max-w-3xl">
              Sabemos que qualidade exige dedicação. Por isso, limitamos a primeira turma a apenas <strong>100 alunos</strong> para garantir:
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
              <p className="text-2xl font-black mb-4">347 de 100 vagas já preenchidas</p>
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

      {/* Professor Section */}
      <section id="professor" className="w-full bg-yellow-400 text-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12">CONHEÇA O PROFESSOR</h2>

          <div className="max-w-3xl">
            <h3 className="text-3xl font-black mb-2">Renan Mataveli</h3>
            <p className="text-lg font-bold mb-6">Especialista em Criptomoedas</p>

            <p className="text-lg leading-relaxed mb-6">
              Especialista em criptomoedas com mais de 10 anos de experiência no mercado financeiro. Renan é criador do canal <strong>Level Cripto</strong>, com mais de 10k seguidores no YouTube e comunidade ativa no Instagram.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              Sua missão é democratizar o conhecimento sobre criptomoedas, explicando de forma clara e sem jargão desnecessário. No canal, você encontra:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-black text-xl">✓</span>
                <span className="text-lg">Análises profundas do mercado de criptomoedas</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-black text-xl">✓</span>
                <span className="text-lg">Estratégias de investimento e farm de airdrops</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-black text-xl">✓</span>
                <span className="text-lg">Conteúdo educativo sobre DeFi, NFTs e Web3</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-black text-xl">✓</span>
                <span className="text-lg">Comunidade ativa e suporte direto aos alunos</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="https://www.instagram.com/level_cripto/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-yellow-400 font-bold rounded-lg hover:bg-gray-900 transition"
              >
                Seguir no Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCCbpFaIRJkltWCbiFNiv2Bw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-yellow-400 font-bold rounded-lg hover:bg-gray-900 transition"
              >
                Inscrever no YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="w-full bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4">O QUE DIZEM NOSSOS ALUNOS</h2>
          <p className="text-gray-400 mb-12 text-lg">Histórias reais de sucesso no mercado de criptomoedas</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Silva",
                role: "Investidor",
                text: "Curso excelente! Saí do zero e consegui meu primeiro investimento com confiança. Renan explica de forma muito clara.",
              },
              {
                name: "Marina Costa",
                role: "Empreendedora",
                text: "O melhor investimento que fiz. O conteúdo é prático e aplicável. Recomendo para quem quer entender cripto de verdade.",
              },
              {
                name: "João Santos",
                role: "Trader",
                text: "Muito bom! Aprendi estratégias que não conhecia. O suporte e a comunidade são incríveis.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-8 hover:border-yellow-400/50 transition"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full bg-yellow-400 text-black py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4">PERGUNTAS FREQUENTES</h2>
          <p className="text-lg mb-12">Tire suas dúvidas sobre o curso Level Cripto PRO</p>

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
      </section>

      {/* CTA Section */}
      <section className="w-full bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">PRONTO PARA COMEÇAR?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Inscreva-se agora para acesso antecipado e receba um desconto exclusivo de lançamento.
          </p>
          <button className="px-10 py-5 bg-yellow-400 text-black font-black text-lg rounded-lg hover:bg-yellow-300 transition transform hover:scale-105">
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
              <p className="text-gray-700">Domine o mercado de criptomoedas em 7 semanas</p>
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
                  <a href="#depoimentos" className="hover:text-black transition">
                    Depoimentos
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
