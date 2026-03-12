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

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {

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
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/BxtooNIozBGsEYps.jpg",
      text: "Parabéns pelo curso, muito top. entrei no Level Pro sem saber praticamente nada além de comprar, haha. O módulo q fala sobre autocustódia já valeu o curso inteiro pra mim. Hoje sei praticamente todas as áreas do mercado e até comecei a analisar alts por conta própria. Recomendo demais pra quem quer realmente aprender cripto de verdade na prática. Vlw"
    },
    {
      name: "Elikaq22",
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/QfhQqLdVaBrpGvLU.jpg",
      text: "Eu já estava no mercado cripto há um tempo, mas percebi que não estava evoluindo. Aqui junto de vcs no Level Pro finalmente entendi várias coisas que ninguém explica direito: como surgiu o Bitcoin, como funcionam os ciclos do mercado e principalmente análise gráfica. Agradeço aos professores pela paciência e dedicação. Outro ponto que gostei muito foi a parte de airdrops e DeFi, que abriu minha cabeça para novas oportunidades. A comunidade fechada ajuda muito, sempre tem gente trocando ideia e tirando dúvidas. Pra mim que estava sozinho nesse mercado foi um divisor de águas. Vocês são fera!"
    },
    {
      name: "Leonardo",
      avatar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/QNOmAyviMLTjfzYB.jpg",
      text: "Cara que aula inicial contextualizando toda a criação do BTC e Subprime foi essa, foda demais. Curso muito completo mesmo. Gostei, não fica só na teoria. Tem parte de como operar em corretora, análise gráfica, altcoins, DeFi... até mineração eu aprendi o básico. Sem falar na comunidade, que é top. Sempre tem alguém comentando oportunidades e se ajudando, bom pra quem está começando e também já tem conhecimento."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % (testimonials.length - 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + (testimonials.length - 1)) % (testimonials.length - 1));
  };

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
        "Sim! Se você não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro. Sem perguntas.",
    },
    {
      question: "O curso aborda airdrops?",
      answer:
        "Sim! Temos um módulo completo sobre estratégias de airdrops e como ganhar renda passiva com criptomoedas.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black text-blue-400">₿ Level Cripto PRO</div>
          <div className="hidden md:flex gap-8">
            <a href="#beneficios" className="hover:text-blue-400 transition">Benefícios</a>
            <a href="#conteudo" className="hover:text-blue-400 transition">Conteúdo</a>
            <a href="#professor" className="hover:text-blue-400 transition">Professor</a>
            <a href="#diferenciais" className="hover:text-blue-400 transition">Diferenciais</a>
            <a href="#resultados" className="hover:text-blue-400 transition">Resultados</a>
            <a href="#depoimentos" className="hover:text-blue-400 transition">Depoimentos</a>
            <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              DOMINE O MERCADO DE <br />
              <span className="text-blue-400">CRIPTOMOEDAS</span> <br />
              DO ZERO AO AVANÇADO
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Aprenda análise de mercado, estratégias e oportunidades no mundo cripto, mesmo começando do zero.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-green-500">✔</span>
                <span>Estratégias usadas no mercado</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✔</span>
                <span>Identificação de oportunidades</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✔</span>
                <span>DeFi, Web3 e Airdrops</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✔</span>
                <span>Comunidade ativa e suporte</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✔</span>
                <span>Análises técnicas frequentes e conteúdos atualizados</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✔</span>
                <span>Lives semanais com nossos professores</span>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition">
              ENTRAR NA LISTA DE ESPERA <ArrowRight size={20} />
            </button>
          </div>
          <div className="relative h-96 md:h-full">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663190783268/UixRSfBxbuIjTGdA.webp" 
              alt="Bitcoin Hero" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Vagas Limitadas Section */}
      <section id="beneficios" className="py-20 px-4 bg-gradient-to-b from-blue-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center text-white">⚡ VAGAS LIMITADAS POR TURMA</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Sabemos que qualidade exige dedicação. Por isso, limitamos as vagas as nossas turmas para garantirmos:</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-black text-white mb-3">Suporte Personalizado</h3>
              <p className="text-gray-400">Você não é apenas um número, é parte de uma comunidade genuína</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-black text-white mb-3">Comunidade Ativa</h3>
              <p className="text-gray-400">Networking real com outros alunos e oportunidades genuínas</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-black text-white mb-3">Moderadores</h3>
              <p className="text-gray-400">Moderadores podem dedicar tempo real para suas dúvidas e desafios</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-black text-white mb-3">Conteúdo Exclusivo</h3>
              <p className="text-gray-400">Bônus e atualizações que todos os alunos recebem</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 text-center">
            <p className="text-gray-400 mb-4">Não perca esta oportunidade exclusiva</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition">
              GARANTIR MINHA VAGA AGORA
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Countdown Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-900/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-400 font-bold mb-2">Inscrições abertas para a turma 55</p>
              <h2 className="text-4xl md:text-5xl font-black mb-8">A primeira aula começa em</h2>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">19</div>
                  <div className="text-sm text-gray-400">Dias</div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">22</div>
                  <div className="text-sm text-gray-400">Horas</div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">10</div>
                  <div className="text-sm text-gray-400">Minutos</div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-900/40 rounded-xl p-6 text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">54</div>
                  <div className="text-sm text-gray-400">Segundos</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 text-lg">Espaço para foto do exemplo</p>
                <p className="text-gray-500 text-sm mt-2">Dimensão recomendada: 400x300px</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Modules Section */}
      <section id="conteudo" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center text-white">O QUE VOCÊ VAI APRENDER</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Conteúdo estruturado e prático para você dominar o mercado de criptomoedas</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl overflow-hidden hover:border-blue-900/60 transition">
                <div className="w-full h-48 bg-gradient-to-br from-blue-900/30 to-blue-900/10 flex items-center justify-center text-6xl">
                  {"1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣"[num - 1]}
                </div>
                <div className="p-8">
                  <p className="text-blue-400 font-bold mb-2">MÓDULO {num}</p>
                  <h3 className="text-2xl font-black text-white mb-4">Título do Módulo</h3>
                  <p className="text-gray-400">Descrição do conteúdo do módulo {num}. Aqui você aprenderá os conceitos fundamentais e as estratégias práticas para dominar este tópico.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Professor Section */}
      <section id="professor" className="py-20 px-4 bg-gradient-to-b from-blue-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-black text-blue-900 mb-8">Conheça Renan Mataveli</h3>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-400 mb-6">
                Renan é um especialista em criptomoedas com mais de 5 anos de experiência no mercado. Ele fundou a comunidade Level Cripto para compartilhar seu conhecimento e ajudar outras pessoas a alcançarem a liberdade financeira através das criptomoedas.
              </p>
              <p className="text-gray-400">
                Com mais de 100k seguidores no YouTube e uma comunidade ativa no Instagram, Renan é conhecido por sua didática clara e estratégias práticas que funcionam no mercado real.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 text-lg">Espaço para foto do Renan</p>
                <p className="text-gray-500 text-sm mt-2">Dimensão recomendada: 400x500px</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center text-white">NOSSOS DIFERENCIAIS</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Ferramentas e estratégias exclusivas para dominar o mercado cripto</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-5xl mb-6">🗺️</div>
              <h3 className="text-2xl font-black text-blue-400 mb-4">Mapa de Airdrops</h3>
              <p className="text-gray-400">Acesso exclusivo ao mapa mental e estratégia completa de farm de airdrops. Identifique oportunidades lucrativos e organize suas participações de forma profissional.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-black text-blue-400 mb-4">Melhores Pontos de Compra/Venda</h3>
              <p className="text-gray-400">Análise técnica e fundamental de ativos selecionados a dedo. Identifique os melhores pontos de entrada e saída para maximizar seus lucros com operações de hold.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-black text-blue-400 mb-4">Estrutura de Long/Short</h3>
              <p className="text-gray-400">Domine as operações de longo e curto prazo. Aprenda a estruturar posições para lucro rápido com estratégias comprovadas e gerenciamento de risco profissional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Resultados Section */}
      <section id="resultados" className="py-20 px-4 bg-gradient-to-b from-blue-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-16 text-center text-white">RESULTADOS DA COMUNIDADE</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📈</span>
                <h3 className="text-3xl font-black text-blue-400">Resultados de Trades</h3>
              </div>
              <p className="text-gray-400 mb-6">Nossos alunos aplicam as estratégias ensinadas no curso e conseguem resultados consistentes no mercado. Alguns destaques:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-400">Alunos que dobraram seu capital em 3 meses com estratégias de swing trading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-400">Comunidade que compartilha análises técnicas e oportunidades diárias</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-400">Suporte 24h para ajudar em dúvidas sobre posições e estratégias</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl mb-2">▶️</p>
                <p className="text-gray-400">Vídeo dos Resultados de Trades</p>
                <p className="text-gray-500 text-sm mt-2">(em breve)</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎁</span>
                <h3 className="text-3xl font-black text-blue-400">Resultados de Airdrops</h3>
              </div>
              <p className="text-gray-400 mb-6">Com o mapa mental e as estratégias de farm de airdrops ensinadas no curso, nossos alunos conseguem identificar e participar de airdrops lucrativos:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-400">Alunos que ganharam mais de $5.000 em airdrops em 2 meses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-400">Mapa mental exclusivo para organizar e priorizar airdrops</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-400">Comunidade que compartilha oportunidades de airdrops em tempo real</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl mb-2">▶️</p>
                <p className="text-gray-400">Vídeo dos Resultados de Airdrops</p>
                <p className="text-gray-500 text-sm mt-2">(em breve)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-4">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-blue-900/40 hover:bg-blue-900/60 text-white p-2 rounded-full transition z-10"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-blue-900/40 hover:bg-blue-900/60 text-white p-2 rounded-full transition z-10"
            >
              →
            </button>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentTestimonialIndex ? 'bg-blue-400' : 'bg-blue-900/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gradient-to-b from-blue-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-16 text-center text-white">PERGUNTAS FREQUENTES</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full text-left bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-6 hover:border-blue-900/60 transition"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-white">{item.question}</h3>
                    <ChevronDown
                      size={20}
                      className={`transition ${expandedFAQ === index ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {expandedFAQ === index && (
                    <p className="text-gray-400 mt-4">{item.answer}</p>
                  )}
                </button>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-2 border-blue-900/40 rounded-2xl p-10 h-fit">
              <h3 className="text-2xl font-black text-white mb-4">Fale com nosso time</h3>
              <p className="text-gray-400 mb-6">Fale com um dos nossos consultores e tire todas as suas dúvidas sobre o Level Cripto PRO</p>
              <button className="w-full bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105">
                FALE COM NOSSO WHATSAPP
              </button>
              <p className="text-gray-500 text-sm mt-4 flex items-center gap-2">
                <span>⏱️</span> Responderemos em até 2 horas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

      {/* Events Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-16 text-center text-white">EVENTOS E PARTICIPAÇÃO ESPECIAL</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {['🏀 Evento 1', '🎓 Evento 2', '🎤 Evento 3'].map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-2 border-blue-900/40 rounded-2xl p-8 hover:border-blue-900/60 transition">
                <div className="text-5xl mb-6">{event[0]}</div>
                <p className="text-blue-400 font-bold mb-2">{event}</p>
                <h3 className="text-2xl font-black text-white mb-4">{event}</h3>
                <p className="text-gray-400 mb-4">Descrição do evento ou participação especial de Renan Mataveli</p>
                <p className="text-gray-500 text-sm">Adicione data/detalhes aqui</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-2 border-blue-900/40 rounded-2xl p-10 text-center">
            <h3 className="text-3xl font-black text-white mb-4">Pronto para começar?</h3>
            <p className="text-gray-400 mb-6">Se chegou até aqui, tenho certeza que você está pronto para fazer parte desta comunidade de elite.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition">
              GARANTIR MINHA VAGA
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/20 py-12 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-blue-400 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Youtube size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter size={24} />
            </a>
          </div>
          <p>&copy; 2026 Level Cripto PRO. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
