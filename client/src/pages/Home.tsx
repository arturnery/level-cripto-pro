import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

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
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "loratsm",
      turma: "",
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/BxtooNIozBGsEYps.jpg",
      text: "Parabéns pelo curso, muito top. entrei no Level Pro sem saber praticamente nada além de comprar, haha. O módulo q fala sobre autocustódia já valeu o curso inteiro pra mim. Hoje sei praticamente todas as áreas do mercado e até comecei a analisar alts por conta própria. Recomendo demais pra quem quer realmente aprender cripto de verdade na prática. Vlw"
    },
    {
      name: "Leonardo",
      turma: "",
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/jHKEmeybxfyvsKId.jpg",
      text: "Cara que aula inicial contextualizando toda a criação do BTC e Subprime foi essa, foda demais. Curso muito completo mesmo. Gostei, não fica só na teoria. Tem parte de como operar em corretora, análise gráfica, altcoins, DeFi... até mineração eu aprendi o básico. Sem falar na comunidade, que é top. Sempre tem alguém comentando oportunidades e se ajudando, bom pra quem está começando e também já tem conhecimento."
    },
    {
      name: "Elikaq22",
      turma: "",
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/FIyXgwOpWRGIUDDu.jpg",
      text: "Eu já estava no mercado cripto há um tempo, mas percebi que não estava evoluindo. Aqui junto de vcs no Level Pro finalmente entendi várias coisas que ninguém explica direito: como surgiu o Bitcoin, como funcionam os ciclos do mercado e principalmente análise gráfica, agraço aos professores pela paciência e dedicação. Outro ponto que gostei muito foi a parte de airdrops e DeFi, que abriu minha cabeça para novas oportunidades. E a comunidade fechada ajuda muito, sempre tem gente trocando ideia e tirando dúvidas. Pra mim que estava sozinho nesse mercado foi um divisor de águas. Vocês são fera"
    },
    {
      name: "Carlos S.",
      turma: "",
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/oYuXOgSyTXVIQrBn.jpg",
      text: "Já fiz outros cursos de cripto antes, mas nenhum explicou tão bem a lógica do mercado e os ciclos. A parte de análise gráfica é muito clara e me ajudou demais nas minhas operações, aprendi a montar uma carteira equilibrada e administrar os meus ativos. Vlw pessoal 👊"
    },
    {
      name: "JuniorP",
      turma: "",
      avatar: "👤",
      text: "Irmão que treinão foi esse, kkkkk ... está valendo muito mais a pena do que uns cursos caros que tem por aí, conteúdo de primeira, informações valiosas. O Level Cripto Pro me ajudou muito, muito grato a vcs. Pra quem quer entrar no mundo cripto com o pé direito, vale muito a pena."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % (testimonials.length - 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + (testimonials.length - 1)) % (testimonials.length - 1));
  };
  const [timeLeft, setTimeLeft] = useState({
    days: 19,
    hours: 22,
    minutes: 10,
    seconds: 55
  });

  // Cronômetro funcional
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validatePhone = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/\D/g, '');
    return numbers.length === 11 && numbers[2] === '9';
  };

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setPhoneError('');
  };

  const criarInscricao = trpc.inscricoes.criar.useMutation({
    onSuccess: () => {
      setTotalSignups(totalSignups + 1);
      setSubmitted(true);
      setPhoneError('');
      setEmail('');
      setPhone('');
    },
    onError: (error) => {
      let mensagemErro = 'Erro ao criar inscrição. Tente novamente.';
      if (error.message?.includes('already exists')) {
        mensagemErro = 'Este email já foi inscrito. Obrigado pelo interesse!';
      } else if (error.message) {
        mensagemErro = 'Email ou telefone inválido. Verifique os dados.';
      }
      setPhoneError(mensagemErro);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setPhoneError('Por favor, insira seu email');
      return;
    }
    if (!validateEmail(email)) {
      setPhoneError('Email invalido. Verifique e tente novamente.');
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
    criarInscricao.mutate({
      email,
      telefone: phone,
    });
  };

  const faqItems: FAQItem[] = [
    {
      question: "Qual é o pré-requisito para fazer o curso?",
      answer:
        "Nenhum! O Level Cripto PRO foi desenvolvido do zero pensando em quem nunca teve contato com o mercado de criptoativos. Você não precisa ter conhecimento em finanças, tecnologia ou investimentos. Começamos pela criação do Bitcoin, explicamos como o mercado funciona e avançamos progressivamente até os temas mais complexos como DeFi, análise gráfica e airdrops. Se você tem vontade de aprender, está pronto para começar.",
    },
    {
      question: "Quanto tempo leva para completar o curso?",
      answer:
        "O curso é estruturado em 7 semanas de conteúdo, mas você estuda no seu próprio ritmo, sem prazo para terminar. Cada módulo leva entre 2 a 4 horas e foi pensado para caber na rotina de quem trabalha ou tem uma agenda cheia. Você acessa tudo quando quiser, quantas vezes precisar.",
    },
    {
      question: "O curso inclui suporte?",
      answer:
        "Sim! Além do conteúdo gravado, você entra para uma comunidade fechada e ativa onde pode tirar dúvidas, acompanhar análises e trocar experiências com outros alunos. O Renan participa diretamente da comunidade e as dúvidas são respondidas em até 24 horas. Você não vai estudar sozinho.",
    },
    {
      question: "Posso acessar o curso em qualquer dispositivo?",
      answer:
        "Sim! O curso é 100% online e funciona em qualquer dispositivo celular, tablet ou computador. Basta ter internet para acessar. Isso significa que você pode estudar no intervalo do trabalho, em casa ou onde estiver, sem depender de horário fixo.",
    },
    {
      question: "Há garantia de reembolso?",
      answer:
        "Sim. Você tem 7 dias de garantia total e incondicional. Se por qualquer motivo sentir que o curso não é para você, basta solicitar o reembolso dentro desse prazo e devolvemos 100% do seu investimento, sem burocracia e sem perguntas.",
    },
    {
      question: "O curso aborda airdrops?",
      answer:
        "Sim! Temos um módulo completo dedicado ao universo dos airdrops. Você vai aprender o que são, como identificar as melhores oportunidades, como fazer farm de forma estratégica e terá acesso a um mapa mental exclusivo com guias práticos para não perder nenhuma oportunidade relevante do mercado. É um dos módulos mais valorizados pelos alunos.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur border-b border-blue-900/20 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-900">₿</span>
            <span className="text-xl font-bold">Level Cripto PRO</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#beneficios" className="text-gray-300 hover:text-blue-900 transition">
              Benefícios
            </a>
            <a href="#conteudo" className="text-gray-300 hover:text-blue-900 transition">
              Conteúdo
            </a>
            <a href="#professor" className="text-gray-300 hover:text-blue-900 transition">
              Professor
            </a>
            <a href="#diferenciais" className="text-gray-300 hover:text-blue-900 transition">
              Diferenciais
            </a>
            <a href="#resultados" className="text-gray-300 hover:text-blue-900 transition">
              Resultados
            </a>
            <a href="#depoimentos" className="text-gray-300 hover:text-blue-900 transition">
              Depoimentos
            </a>
            <a href="#faq" className="text-gray-300 hover:text-blue-900 transition">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 bg-black relative overflow-hidden">
        {/* Background Image */}
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/iszuWVZHXSEAcBRV.webp"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-contain lg:object-cover object-right"
          style={{ zIndex: 1, backgroundColor: '#000' }}
        />
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" style={{ zIndex: 2 }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-4 md:p-6 max-w-xl">
            <h1 className="text-2xl md:text-3xl font-black mb-4 leading-tight text-center">
              <span className="text-white">DOMINE O MERCADO DE</span><br />
              <span className="text-white">CRIPTOMOEDAS</span><br />
              <span className="text-blue-900">DO ZERO AO AVANÇADO</span>
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Aprenda análise de mercado, estratégias e oportunidades no mundo cripto, mesmo começando do zero.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-blue-900 font-bold text-lg mt-1">✔</span>
                <span className="text-gray-300">Estratégias usadas no mercado</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-900 font-bold text-lg mt-1">✔</span>
                <span className="text-gray-300">Identificação de oportunidades</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-900 font-bold text-lg mt-1">✔</span>
                <span className="text-gray-300">DeFi, Web3 e Airdrops</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-900 font-bold text-lg mt-1">✔</span>
                <span className="text-gray-300">Comunidade ativa e suporte</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-900 font-bold text-lg mt-1">✔</span>
                <span className="text-gray-300">Análises técnicas frequentes e conteúdos atualizados</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-900 font-bold text-lg mt-1">✔</span>
                <span className="text-gray-300">Lives semanais com nossos professores</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-green-600 text-white font-black py-3 px-6 rounded-lg hover:bg-green-700 transition transform hover:scale-105 text-base flex items-center justify-center gap-2"
            >
              ENTRAR NA LISTA DE ESPERA <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-blue-900/30">
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-900"
                required
              />
              <div>
                <input
                  type="tel"
                  placeholder="Seu telefone (11) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                    phoneError
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:border-blue-900'
                  }`}
                  required
                />
                {phoneError && (
                  <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{phoneError}</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-black font-black py-3 rounded-lg hover:bg-blue-950 transition"
              >
                CONFIRMAR INSCRIÇÃO
              </button>
            </form>
            {submitted && (
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-900/40 rounded-lg text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-black text-blue-900 mb-3">Inscrição Confirmada!</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Obrigado em querer fazer parte da Comunidade Level Cripto Pro. Em breve um de nossos representantes entrará em contato!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                    setPhone("");
                    setShowModal(false);
                  }}
                  className="w-full bg-blue-900 text-black font-black py-2 rounded-lg hover:bg-blue-950 transition"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}



      {/* Vagas Limitadas Section - Benefícios */}
      <section id="beneficios" className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 via-black to-black border-2 border-blue-900/40 rounded-3xl p-12 md:p-16 max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-blue-900 flex items-center gap-3"><span>⚡</span> VAGAS LIMITADAS POR TURMA</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl">
            Sabemos que qualidade exige dedicação. Por isso, limitamos as vagas as nossas turmas para garantirmos:
          </p>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-900/20 border border-blue-900/40">
                    <span className="text-blue-900 font-black">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-white mb-2">Suporte Personalizado</h3>
                  <p className="text-gray-400">Você não é apenas um número, é parte de uma comunidade genuína</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-900/20 border border-blue-900/40">
                    <span className="text-blue-900 font-black">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-white mb-2">Comunidade Ativa</h3>
                  <p className="text-gray-400">Networking real com outros alunos e oportunidades genuínas</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-900/20 border border-blue-900/40">
                    <span className="text-blue-900 font-black">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-white mb-2">Moderadores</h3>
                  <p className="text-gray-400">Moderadores podem dedicar tempo real para suas dúvidas e desafios</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-900/20 border border-blue-900/40">
                    <span className="text-blue-900 font-black">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-white mb-2">Conteúdo Exclusivo</h3>
                  <p className="text-gray-400">Bônus e atualizações que todos os alunos recebem</p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-blue-900/20">
              <p className="text-center text-gray-400 mb-6">Não perca esta oportunidade exclusiva</p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto mx-auto block bg-green-600 text-white font-black py-4 px-10 rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-lg"
              >
                GARANTIR MINHA VAGA AGORA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cronômetro Section */}
      <section id="cronometro" className="py-24 px-4 md:px-8 bg-gradient-to-br from-blue-900/30 via-black to-black border-y border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-wider">Inscrições abertas para a turma 55</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-12 leading-tight">A primeira aula começa em</h2>
              
              <div className="flex gap-4 md:gap-6">
                <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 hover:border-blue-900/60 transition">
                  <div className="text-4xl md:text-5xl font-black text-blue-400 mb-3 text-center">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Dias</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 hover:border-blue-900/60 transition">
                  <div className="text-4xl md:text-5xl font-black text-blue-400 mb-3 text-center">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Horas</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 hover:border-blue-900/60 transition">
                  <div className="text-4xl md:text-5xl font-black text-blue-400 mb-3 text-center">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Minutos</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 hover:border-blue-900/60 transition">
                  <div className="text-4xl md:text-5xl font-black text-blue-400 mb-3 text-center">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Segundos</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-900/40 p-6 max-w-sm w-full hover:border-blue-900/60 transition">
                <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-center px-6">
                    Espaço para foto do exemplo
                    <br />
                    <span className="text-sm text-gray-600 mt-2 block">Dimensão recomendada: 400x300px</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Conteúdo Section */}
      <section id="conteudo" className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">O QUE VOCÊ VAI APRENDER</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Conteúdo estruturado e prático para você dominar o mercado de criptomoedas</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* MÓDULO 1 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">1️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 1</p>
                <h3 className="text-xl font-black mb-4 text-white">Comunidade LEVEL PRO</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Tenha acesso à comunidade LEVEL PRO no Discord. Você não estuda sozinho. Ao entrar no curso, ganha acesso direto a uma comunidade ativa de traders e investidores cripto para tirar dúvidas, trocar análises e evoluir junto.
                </p>
              </div>
            </div>

            {/* MÓDULO 2 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">2️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 2</p>
                <h3 className="text-xl font-black mb-4 text-white">Entenda o conceito por trás do surgimento do Bitcoin</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Antes de investir, entenda o porquê. Você vai compreender o contexto histórico e econômico que deu origem ao Bitcoin — e por que essa tecnologia mudou para sempre a relação do mundo com o dinheiro.
                </p>
              </div>
            </div>

            {/* MÓDULO 3 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">3️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 3</p>
                <h3 className="text-xl font-black mb-4 text-white">Base Conceitual: Blockchain e Criptoativos</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Domine os conceitos que a maioria dos investidores ignora. De Bitcoin a Stablecoins, você vai entender como o ecossistema cripto funciona de verdade — e tomar decisões com base em conhecimento, não em achismo.
                </p>
              </div>
            </div>

            {/* MÓDULO 4 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">4️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 4</p>
                <h3 className="text-xl font-black mb-4 text-white">AUTOCÚSTÓDIA</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Aprenda a ser o único dono dos seus ativos. Você vai entender como proteger suas criptomoedas fora das exchanges, eliminando o risco de perder tudo por falhas ou bloqueios de terceiros.
                </p>
              </div>
            </div>

            {/* MÓDULO 5 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">5️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 5</p>
                <h3 className="text-xl font-black mb-4 text-white">Operação e Execução em Exchanges Centralizadas</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Do zero ao operacional em uma corretora profissional. Você vai criar sua conta, configurar a segurança, depositar, operar com diferentes tipos de ordem e sacar — sem depender de ninguém.
                </p>
              </div>
            </div>

            {/* MÓDULO 6 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">6️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 6</p>
                <h3 className="text-xl font-black mb-4 text-white">Análise Técnica e Leitura Gráfica de Mercado</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Pare de comprar no topo e vender no fundo. Com 19 aulas, você vai desenvolver a habilidade de ler gráficos, identificar tendências e tomar decisões de entrada e saída com critério técnico.
                </p>
              </div>
            </div>

            {/* MÓDULO 7 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">7️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 7</p>
                <h3 className="text-xl font-black mb-4 text-white">Gestão de Carteira e Controle de Risco e Ganância</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  O que separa quem lucra de quem perde no longo prazo é a gestão. Você vai aprender a montar uma carteira estratégica, controlar o risco por operação e manter a ganância sob controle.
                </p>
              </div>
            </div>

            {/* MÓDULO 8 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">8️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 8</p>
                <h3 className="text-xl font-black mb-4 text-white">Finanças Descentralizadas — DeFi</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Descubra o sistema financeiro paralelo que nenhum banco controla. Você vai entender o que é DeFi, como ele funciona e quais as oportunidades disponíveis nesse ecossistema em expansão.
                </p>
              </div>
            </div>

            {/* MÓDULO 9 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-48 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">9️⃣</span>
              </div>
              <div className="p-6">
                <p className="text-blue-900 font-black text-sm mb-2">MÓDULO 9</p>
                <h3 className="text-xl font-black mb-4 text-white">Airdrop — Tudo para que você possa lucrar</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Aprenda a capturar valor onde a maioria nem sabe que existe. Você vai entender como funcionam os airdrops e como se posicionar estrategicamente para lucrar com distribuições gra tuítas de tokens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Professor Section */}
      <section id="professor" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-8 px-4 py-2 border border-blue-500 rounded-full">
            <span className="text-blue-500 font-black text-sm">■ QUEM ESTÁ POR TRÁS DA LEVEL CRIPTO</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text Content */}
            <div>
              {/* Avatar and Name */}
              <div className="mb-8">
                <h3 className="text-2xl font-black text-white">Renan Mataveli</h3>
                <p className="text-gray-400 text-sm">No mercado de cripto desde 2017</p>
              </div>

              {/* Main Text Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                Durante anos, dinheiro era algo que eu via passar pela minha mão sem entender pra onde ia. Ninguém me ensinou sobre isso, nem em casa, nem na escola. Aprendi sobre finanças da forma mais difícil: <strong>errando com o meu próprio bolso</strong>.
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Em 2017, enquanto a maioria torcia o nariz para o Bitcoin e chamava de pirâmide, eu decidi acreditar. Não foi fácil, família duvidando, amigos rindo, notícia negativa pra todo lado. Mas algo me dizia que aquilo era real. Estudei, errei, e fiquei. <strong>Nos momentos de maior descrença do mercado, quando todo mundo fugia, eu avançava</strong>.
              </p>

              {/* Quote */}
              <div className="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-gray-800/50 rounded">
                <p className="text-gray-300 italic">
                  "As maiores oportunidades aparecem exatamente quando ninguém quer olhar."
                </p>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Mas não foram só acertos. Em determinado momento, acreditei que o mercado repetiria os ciclos anteriores à risca e investi em projetos sem valor real por trás. Aprendi da forma mais cara possível que <strong>cripto exige critério, não apenas otimismo</strong>. Esse erro me tornou um analista muito melhor.
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Com estratégia, paciência e conhecimento, construí uma carteira que chegou a <strong>mais de 30x de rentabilidade</strong>. Não por sorte, por método.
              </p>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Hoje sou fundador do <strong>Level Cripto</strong> e já formei mais de <strong>600 alunos</strong> que entraram nesse mercado sem saber nada e hoje operam com autonomia, segurança e estratégia real. <strong>Meu maior orgulho</strong> não é o que acumulei, é olhar para essa comunidade e saber que nenhum deles precisou errar sozinho como eu errei.
              </p>

              {/* Stats Cards - Inside Left Column */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 text-center">
                  <div className="text-2xl font-black text-blue-500 mb-1">+600</div>
                  <p className="text-gray-400 text-xs">Alunos formados</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 text-center">
                  <div className="text-2xl font-black text-blue-500 mb-1">+30x</div>
                  <p className="text-gray-400 text-xs">Rentabilidade <span className="block">(na carteira)</span></p>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 text-center">
                  <div className="text-2xl font-black text-blue-500 mb-2">desde 2017</div>
                  <p className="text-gray-400 text-xs">No mercado cripto</p>
                </div>
              </div>
            </div>

            {/* Right Column - Photo Space */}
            <div className="bg-gray-800 rounded-lg overflow-hidden h-96 md:h-full flex items-center justify-center">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663190783268/U83KkfBRbFSedDHoLmymnt/fotorenan_95f32cbb.webp"
                alt="Renan Mataveli"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">NOSSOS DIFERENCIAIS</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Ferramentas e estratégias exclusivas para dominar o mercado cripto</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Diferencial 1 - Mapa de Airdrops */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-64 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">🗺️</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black mb-4 text-blue-900">Mapa de Airdrops</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Acesso exclusivo ao mapa mental e estratégia completa de farm de airdrops. Identifique oportunidades lucrativos e organize suas participações de forma profissional.
                </p>
              </div>
            </div>

            {/* Diferencial 2 - Melhores Pontos de Compra/Venda */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-64 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">📊</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black mb-4 text-blue-900">Melhores Pontos de Compra/Venda</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Análise técnica e fundamental de ativos selecionados a dedo. Identifique os melhores pontos de entrada e saída para maximizar seus lucros com operações de hold.
                </p>
              </div>
            </div>

            {/* Diferencial 3 - Estrutura de Long/Short */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-900 transition group">
              <div className="h-64 bg-gradient-to-br from-blue-900/20 to-blue-900/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                <span className="text-6xl">⚡</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black mb-4 text-blue-900">Estrutura de Long/Short</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Domine as operações de longo e curto prazo. Aprenda a estruturar posições para lucro rápido com estratégias comprovadas e gerenciamento de risco profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Resultados Section */}
      <section id="resultados" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">RESULTADOS DA COMUNIDADE</h2>
          
          {/* Resultados de Trades */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-4xl">📈</span>
              <h3 className="text-4xl font-black text-white">Resultados de Trades</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white text-lg mb-8 leading-relaxed font-semibold">
                  Nossos alunos aplicam as estratégias ensinadas no curso e conseguem resultados consistentes no mercado. Alguns destaques:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-blue-400 font-black text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-base leading-relaxed">Alunos que dobraram seu capital em 3 meses com estratégias de swing trading</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-400 font-black text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-base leading-relaxed">Comunidade que compartilha análises técnicas e oportunidades diárias</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-400 font-black text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-base leading-relaxed">Suporte 24h para ajudar em dúvidas sobre posições e estratégias</span>
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
            <div className="flex items-center gap-3 mb-12">
              <span className="text-4xl">🎁</span>
              <h3 className="text-4xl font-black text-white">Resultados de Airdrops</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white text-lg mb-8 leading-relaxed font-semibold">
                  Com o mapa mental e as estratégias de farm de airdrops ensinadas no curso, nossos alunos conseguem identificar e participar de airdrops lucrativos:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-blue-400 font-black text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-base leading-relaxed">Alunos que ganharam mais de $5.000 em airdrops em 2 meses</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-400 font-black text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-base leading-relaxed">Mapa mental exclusivo para organizar e priorizar airdrops</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-400 font-black text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-base leading-relaxed">Comunidade que compartilha oportunidades de airdrops em tempo real</span>
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
      <section id="depoimentos" className="py-24 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center text-white">O QUE DIZEM NOSSOS ALUNOS</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Depoimentos autênticos de alunos que transformaram suas vidas com o Level Cripto PRO</p>
          
          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 50}%)`
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-1/2 flex-shrink-0 px-4">
                    <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 h-full hover:border-blue-900/60 transition">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-blue-900/40 rounded-full flex items-center justify-center text-2xl border border-blue-900/60 overflow-hidden">
                          {testimonial.avatar.startsWith('http') ? (
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                          ) : (
                            testimonial.avatar
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-white text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-blue-400 font-bold">{testimonial.turma}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        "{testimonial.text}"
                      </p>
                      <div className="flex gap-1 mt-6">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-blue-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-900/60 text-white rounded-full w-12 h-12 flex items-center justify-center transition"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-900/60 text-white rounded-full w-12 h-12 flex items-center justify-center transition"
            >
              →
            </button>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(testimonials.length - 1)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonialIndex(i)}
                  className={`w-2 h-2 rounded-full transition ${
                    i === currentTestimonialIndex ? 'bg-blue-900' : 'bg-blue-900/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 border-2 border-blue-500 rounded-full px-6 py-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-blue-500 font-black text-sm">DÚVIDAS FREQUENTES</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center text-white">
            Tem alguma <span className="text-blue-500">dúvida?</span>
          </h2>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-transparent border-2 border-blue-900/50 rounded-2xl overflow-hidden hover:border-blue-900/80 transition"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full px-8 py-6 flex justify-between items-center hover:bg-blue-900/10 transition font-semibold text-white text-left"
                >
                  <span className="text-base">{item.question}</span>
                  <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-500 rounded-full flex-shrink-0 ml-4">
                    <span className={`text-blue-500 text-xl font-bold transition-transform ${
                      expandedFAQ === idx ? "rotate-45" : ""
                    }`}>+</span>
                  </div>
                </button>
                {expandedFAQ === idx && (
                  <div className="px-8 py-6 bg-blue-900/10 border-t-2 border-blue-900/50 text-gray-300 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTOS E PARTICIPAÇÃO ESPECIAL Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center text-white">EVENTOS E PARTICIPAÇÃO ESPECIAL</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Event Card 1 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <video className="h-48 bg-blue-900/20 rounded-xl mb-6 w-full object-cover" controls>
                <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/grfBuNcrvheONDiz.mov" type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              <h3 className="text-xl font-black text-blue-400 mb-3">Solana Breakpoint Abu Dhabi</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Participacao especial no Evento Solana Breakpoint Abu Dhabi, realizado em 2025.
              </p>
              <p className="text-xs text-blue-400 font-bold">2025</p>
            </div>

            {/* Event Card 2 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="h-48 bg-blue-900/20 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                🎓 Espaço para Logo/Imagem
              </div>
              <h3 className="text-xl font-black text-blue-400 mb-3">Evento 2</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Descrição do evento ou participação especial de Renan Mataveli
              </p>
              <p className="text-xs text-blue-400 font-bold">Adicione data/detalhes aqui</p>
            </div>

            {/* Event Card 3 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="h-48 bg-blue-900/20 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                🎤 Espaço para Logo/Imagem
              </div>
              <h3 className="text-xl font-black text-blue-400 mb-3">Evento 3</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Descrição do evento ou participação especial de Renan Mataveli
              </p>
              <p className="text-xs text-blue-400 font-bold">Adicione data/detalhes aqui</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pronto para começar */}
      <section className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-r from-blue-900/20 to-blue-900/10 border-2 border-blue-900/40 rounded-2xl p-12">
            <h3 className="text-3xl font-black text-white mb-4">Pronto para começar?</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Se chegou até aqui, tenho certeza que você está pronto para fazer parte desta comunidade de elite.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-black py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 text-base flex items-center justify-center gap-2 mx-auto border border-green-500/60"
            >
              GARANTIR MINHA VAGA <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-blue-900/20 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div className="flex flex-col max-w-md">
              <h3 className="font-black mb-4 text-lg">Level Cripto PRO</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Aprenda criptomoedas com os melhores profissionais do mercado.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <h4 className="font-black mb-4 text-lg">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/level_cripto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-900 transition">
                  <Instagram size={24} />
                </a>
                <a href="https://youtube.com/@levelcripto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-900 transition">
                  <Youtube size={24} />
                </a>
                <a href="https://x.com/LevelCripto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-900 transition">
                  <Twitter size={24} />
                </a>
              </div>
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
