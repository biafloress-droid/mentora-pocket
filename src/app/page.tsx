"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Target, Heart, TrendingUp, Camera, MessageCircle, Play, Copy, RefreshCw, Check, Calendar, BarChart3, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'

interface ContentIdea {
  id: number
  type: 'empresa' | 'empresaria'
  format: 'elaborado' | 'simples'
  title: string
  hook: string
  development: string
  narration: string
  caption: string
  cta: string
  hashtags: string[]
  isRecorded?: boolean
  recordedDate?: string
}

interface StoryIdea {
  id: number
  title: string
  description: string
  tips: string[]
  isRecorded?: boolean
  recordedDate?: string
}

interface ManualContent {
  date: string
  contents: number
  stories: number
}

interface DashboardMetrics {
  totalRecorded: number
  todayRecorded: number
  weekRecorded: number
  monthRecorded: number
  dailyData: { date: string; count: number }[]
  weeklyData: { week: string; count: number }[]
  monthlyData: { month: string; count: number }[]
}

interface DayContent {
  date: string
  recordedContents: ContentIdea[]
  recordedStories: StoryIdea[]
  manualContents: number
  manualStories: number
}

export default function ContentGenerator() {
  const [niche, setNiche] = useState('')
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([])
  const [storyIdeas, setStoryIdeas] = useState<StoryIdea[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [recordedContents, setRecordedContents] = useState<ContentIdea[]>([])
  const [recordedStories, setRecordedStories] = useState<StoryIdea[]>([])
  const [manualContents, setManualContents] = useState<ManualContent[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [dailyContents, setDailyContents] = useState(0)
  const [dailyStories, setDailyStories] = useState(0)
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  
  // Estados para calendário e seleção de período
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedPeriod, setSelectedPeriod] = useState<'30days' | 'custom'>('30days')
  const [selectedDayDetails, setSelectedDayDetails] = useState<DayContent | null>(null)
  const [showDayModal, setShowDayModal] = useState(false)

  const motivationalPhrases = [
    "Alguém está esperando você fazer e se inspirar! 💪",
    "Sua história pode ser a inspiração que alguém precisa hoje! ✨",
    "Cada conteúdo seu pode transformar a vida de uma mulher! 🌟",
    "Você tem o poder de impactar vidas através das suas palavras! 💜",
    "Sua autenticidade é seu maior diferencial! Brilhe! ⭐"
  ]

  const getRandomMotivationalPhrase = () => {
    return motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]
  }

  // Carregar dados do localStorage
  useEffect(() => {
    const savedRecorded = localStorage.getItem('recordedContents')
    const savedRecordedStories = localStorage.getItem('recordedStories')
    const savedManual = localStorage.getItem('manualContents')
    
    if (savedRecorded) {
      setRecordedContents(JSON.parse(savedRecorded))
    }
    if (savedRecordedStories) {
      setRecordedStories(JSON.parse(savedRecordedStories))
    }
    if (savedManual) {
      setManualContents(JSON.parse(savedManual))
    }
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('recordedContents', JSON.stringify(recordedContents))
  }, [recordedContents])

  useEffect(() => {
    localStorage.setItem('recordedStories', JSON.stringify(recordedStories))
  }, [recordedStories])

  useEffect(() => {
    localStorage.setItem('manualContents', JSON.stringify(manualContents))
  }, [manualContents])

  const generateContent = async () => {
    if (!niche.trim()) return
    
    setIsGenerating(true)
    
    // Simular geração de conteúdo (em produção, conectaria com API de IA)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const ideas: ContentIdea[] = [
      {
        id: 1,
        type: 'empresa',
        format: 'elaborado',
        title: `5 Erros que ${niche} Cometem e Como Evitar`,
        hook: `Se você trabalha com ${niche}, PARE tudo e assista isso!`,
        development: `Vou te mostrar os 5 erros mais comuns que vejo empresárias do ramo de ${niche} cometendo e que estão sabotando seus resultados. ${getRandomMotivationalPhrase()}`,
        narration: `Erro #1: Não conhecer seu público ideal. Erro #2: Preços muito baixos. Erro #3: Não ter presença digital consistente. Erro #4: Não acompanhar métricas. Erro #5: Não investir em si mesma. Lembra: cada erro é uma oportunidade de crescimento!`,
        caption: `💡 Quantas vezes você já cometeu esses erros? Comenta aqui embaixo qual foi o seu maior aprendizado!\\n\\nSe você é do ramo de ${niche}, salva esse post para não esquecer! 📌\\n\\n${getRandomMotivationalPhrase()}`,
        cta: `Segue aqui para mais dicas de ${niche} que realmente funcionam! Você merece ter sucesso! 🚀`,
        hashtags: [`#${niche.replace(/\s+/g, '')}`, '#empreendedorismo', '#dicasdevendas', '#mulheresempreendedoras', '#negociosonline']
      },
      {
        id: 2,
        type: 'empresaria',
        format: 'simples',
        title: 'Bastidores do Meu Dia',
        hook: 'POV: Você é empresária e seu dia é assim...',
        development: 'Mostrar a rotina real de uma empreendedora, sem filtros. Ser autêntica conecta mais que qualquer estratégia!',
        narration: 'Vídeo mostrando momentos do dia: café da manhã, planejamento, atendimento a clientes, momentos de pausa. Narração: "Gente, a vida real é assim mesmo... e tá tudo bem!"',
        caption: `A vida de empresária não é só glamour, né? 😅\\n\\nTem dias que é café frio, reunião atrás de reunião e aquela sensação de que o dia não teve 24h...\\n\\nMas sabe o que me move? Ver o resultado do meu trabalho e saber que estou construindo algo meu! 💪\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Comenta aí: qual parte da sua rotina de empresária é mais desafiadora? Vamos nos apoiar! 👇',
        hashtags: ['#bastidores', '#vidadeempresaria', '#realidade', '#empreendedorismo', '#mulheresqueinspiram']
      },
      {
        id: 3,
        type: 'empresa',
        format: 'elaborado',
        title: `Como Precificar Seus Serviços de ${niche}`,
        hook: `Você está cobrando MUITO BARATO pelos seus serviços de ${niche}!`,
        development: `Vou te ensinar o método que uso para precificar meus serviços e que aumentou meu faturamento em 300%! Você merece ser bem remunerada pelo seu trabalho!`,
        narration: `Passo 1: Calcule todos os seus custos. Passo 2: Defina sua margem de lucro. Passo 3: Pesquise a concorrência. Passo 4: Considere o valor que você entrega. Lembra: você não está vendendo tempo, está vendendo transformação!`,
        caption: `🎯 Precificar não é sobre ser a mais barata, é sobre entregar VALOR!\\n\\nQuando você cobra o preço justo, você:\\n✅ Valoriza seu trabalho\\n✅ Atrai clientes ideais\\n✅ Consegue investir mais no seu negócio\\n\\nSalva esse post e aplica na sua empresa! 💰\\n\\n${getRandomMotivationalPhrase()}`,
        cta: `Quer mais dicas de precificação? Me segue e ativa as notificações! Você merece prosperar! 🔔`,
        hashtags: [`#precificacao`, `#${niche.replace(/\s+/g, '')}`, '#vendas', '#empreendedorismo', '#lucro']
      },
      {
        id: 4,
        type: 'empresaria',
        format: 'simples',
        title: 'Minha História de Empreendedora',
        hook: 'Há 3 anos eu estava quebrada... Hoje faturo 6 dígitos.',
        development: 'Contar a jornada pessoal de transformação através do empreendedorismo. Sua história pode inspirar outras mulheres!',
        narration: 'Vídeo com fotos antigas e atuais, mostrando a evolução pessoal e profissional. Narração emotiva sobre superação.',
        caption: `Não foi fácil chegar até aqui... 🥺\\n\\nHouve noites sem dormir, momentos de querer desistir, contas no vermelho...\\n\\nMas cada "não" me fez mais forte. Cada erro me ensinou algo novo.\\n\\nHoje olho para trás e vejo que cada obstáculo foi necessário para me tornar quem sou hoje! 💪✨\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Qual foi o maior desafio da sua jornada empreendedora? Sua história importa! Conta aqui! 👇',
        hashtags: ['#minhahistoria', '#transformacao', '#empreendedorismo', '#superacao', '#inspiracao']
      },
      {
        id: 5,
        type: 'empresa',
        format: 'simples',
        title: 'Frase Motivacional',
        hook: 'Leia isso se você está pensando em desistir...',
        development: 'Frase inspiradora sobre persistência no empreendedorismo. Às vezes uma palavra pode mudar tudo!',
        narration: 'Texto na tela: "O sucesso não é sobre não cair, é sobre se levantar toda vez que você cai. Você é mais forte do que imagina!"',
        caption: `💪 Para você que está passando por um momento difícil no seu negócio:\\n\\nLembra que todo grande empresário já passou por isso. A diferença está em não desistir!\\n\\nVocê é mais forte do que imagina! 🔥\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Marca aquela amiga empresária que precisa ler isso! Vamos nos fortalecer juntas! 👥',
        hashtags: ['#motivacao', '#empreendedorismo', '#persistencia', '#forca', '#naodesista']
      },
      {
        id: 6,
        type: 'empresaria',
        format: 'elaborado',
        title: 'Minha Rotina Matinal de Sucesso',
        hook: 'Minha rotina matinal que mudou meu negócio (e minha vida)!',
        development: 'Mostrar passo a passo da rotina matinal que contribui para o sucesso nos negócios. Pequenos hábitos geram grandes resultados!',
        narration: '5h30: Acordo sem despertador. 6h: Meditação de 10 min. 6h15: Exercício físico. 7h: Café da manhã saudável. 7h30: Planejamento do dia. 8h: Primeira tarefa mais importante.',
        caption: `🌅 Essa rotina transformou minha produtividade!\\n\\nAntes eu acordava correndo, sem foco, reativa ao que acontecia...\\n\\nHoje acordo com propósito, energia e clareza mental para tomar as melhores decisões no meu negócio! 🧠✨\\n\\nO segredo não é acordar cedo, é ter INTENÇÃO em cada ação!\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Qual é o primeiro hábito que você quer incluir na sua rotina? Você consegue! 🤔',
        hashtags: ['#rotinematinal', '#produtividade', '#habitos', '#sucesso', '#mindset']
      },
      {
        id: 7,
        type: 'empresa',
        format: 'elaborado',
        title: `Tendências de ${niche} para 2024`,
        hook: `Se você trabalha com ${niche}, precisa saber dessas tendências AGORA!`,
        development: `As 3 principais tendências que vão dominar o mercado de ${niche} este ano e como você pode se posicionar. Quem se antecipa, lidera!`,
        narration: `Tendência 1: Personalização extrema. Tendência 2: Sustentabilidade. Tendência 3: Experiência digital integrada. Você está preparada para liderar essas mudanças?`,
        caption: `🔮 O futuro do ${niche} está aqui!\\n\\nQuem se adaptar primeiro, sai na frente. Quem ficar parado, fica para trás.\\n\\nJá está aplicando alguma dessas tendências no seu negócio? Conta aqui! 👇\\n\\n${getRandomMotivationalPhrase()}`,
        cta: `Segue para mais insights sobre o mercado de ${niche}! Você nasceu para liderar! 📈`,
        hashtags: [`#tendencias2024`, `#${niche.replace(/\s+/g, '')}`, '#inovacao', '#mercado', '#futuro']
      },
      {
        id: 8,
        type: 'empresaria',
        format: 'simples',
        title: 'Momento Vulnerável',
        hook: 'Hoje chorei no banheiro da empresa...',
        development: 'Compartilhar um momento de vulnerabilidade e como superou. Ser humana é ser real!',
        narration: 'Vídeo falando sobre um dia difícil e como lidou com as emoções. Tom acolhedor e empático.',
        caption: `Ser empresária não é só força e determinação... 🥺\\n\\nTem dias que a pressão aperta, que as coisas não saem como planejado, que a insegurança bate forte.\\n\\nE tudo bem sentir isso! Somos humanas antes de tudo.\\n\\nO importante é não ficar nesse lugar. Chorei, senti, me permiti... e depois levantei e continuei! 💪\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Como você lida com os dias difíceis? Vamos nos acolher! Me conta aqui 💜',
        hashtags: ['#vulnerabilidade', '#realidade', '#emocoes', '#humanidade', '#forca']
      },
      {
        id: 9,
        type: 'empresa',
        format: 'simples',
        title: 'Dica Rápida',
        hook: `Dica de ouro para quem trabalha com ${niche}:`,
        development: 'Uma dica prática e aplicável imediatamente. Simplicidade é genialidade!',
        narration: 'Texto na tela com a dica principal e explicação rápida. Tom didático e encorajador.',
        caption: `💡 Dica simples mas que faz TODA a diferença!\\n\\nQuantas vezes você já deixou de aplicar algo simples assim?\\n\\nÀs vezes a solução está bem na nossa frente! 👀\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Salva esse post e aplica hoje mesmo! Você é capaz! 📌',
        hashtags: [`#dica`, `#${niche.replace(/\s+/g, '')}`, '#pratico', '#simples', '#resultado']
      },
      {
        id: 10,
        type: 'empresaria',
        format: 'elaborado',
        title: 'Por Que Decidi Empreender',
        hook: 'Por que larguei meu emprego CLT para empreender...',
        development: 'Contar os motivos profundos que levaram ao empreendedorismo. Sua coragem pode inspirar outras!',
        narration: 'Não era sobre dinheiro... Era sobre liberdade. Liberdade de criar, de decidir, de impactar vidas, de construir algo meu. Era sobre me tornar quem eu realmente sou.',
        caption: `🚀 Empreender foi a melhor decisão da minha vida!\\n\\nNão pelo dinheiro (que demorou para vir), mas pela pessoa que me tornei no processo.\\n\\nAprender a lidar com incertezas, a tomar decisões difíceis, a confiar em mim mesma...\\n\\nIsso não tem preço! 💎\\n\\nE você? O que te motiva a empreender?\\n\\n${getRandomMotivationalPhrase()}`,
        cta: 'Comenta aí o seu PORQUÊ de empreender! Vamos nos inspirar juntas! Você faz a diferença! 💪',
        hashtags: ['#proposito', '#empreendedorismo', '#liberdade', '#realizacao', '#inspiracao']
      }
    ]

    const stories: StoryIdea[] = [
      {
        id: 1,
        title: 'Rotina Matinal',
        description: 'Mostre sua rotina matinal de forma autêntica - sua energia matinal inspira outras mulheres!',
        tips: [
          'Filme acordando naturalmente (sem pose) - autenticidade conecta',
          'Mostre o café sendo preparado - momentos simples são preciosos',
          'Compartilhe uma reflexão ou gratidão do dia - positividade é contagiante',
          'Use música suave de fundo - crie uma atmosfera acolhedora'
        ]
      },
      {
        id: 2,
        title: 'Bastidores do Trabalho',
        description: 'Leve seus seguidores para dentro do seu dia de trabalho - transparência gera confiança!',
        tips: [
          'Filme seu espaço de trabalho - mostre onde a magia acontece',
          'Mostre reuniões (sem expor clientes) - profissionalismo inspira',
          'Compartilhe desafios do dia - vulnerabilidade conecta',
          'Celebre pequenas conquistas - cada vitória merece ser comemorada!'
        ]
      },
      {
        id: 3,
        title: 'Dicas Rápidas',
        description: 'Compartilhe conhecimento de forma rápida e visual - seu conhecimento pode transformar vidas!',
        tips: [
          'Use texto grande e legível - acessibilidade é amor',
          'Máximo 3 dicas por story - menos é mais impactante',
          'Adicione GIFs ou stickers relacionados - diversão engaja',
          'Termine com "Salva esse story!" - incentive o salvamento'
        ]
      },
      {
        id: 4,
        title: 'Perguntas e Interação',
        description: 'Crie conexão através de perguntas - cada interação fortalece sua comunidade!',
        tips: [
          'Faça perguntas sobre o negócio delas - interesse genuíno conecta',
          'Use enquetes e caixas de perguntas - facilite a participação',
          'Responda todas as interações - cada pessoa importa',
          'Compartilhe algumas respostas (com permissão) - crie senso de comunidade'
        ]
      },
      {
        id: 5,
        title: 'Vida Pessoal',
        description: 'Mostre quem você é além da empresária - humanidade é seu maior diferencial!',
        tips: [
          'Compartilhe hobbies e interesses - você é multifacetada',
          'Mostre família/pets (se confortável) - amor aquece corações',
          'Fale sobre livros, filmes, músicas - cultura conecta pessoas',
          'Seja autêntica e natural - sua essência é única e valiosa'
        ]
      }
    ]

    setContentIdeas(ideas)
    setStoryIdeas(stories)
    setHasGenerated(true)
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleContentRecorded = (idea: ContentIdea) => {
    if (idea.isRecorded) {
      // Desmarcar como gravado
      setRecordedContents(prev => prev.filter(item => item.id !== idea.id))
      setContentIdeas(prev => prev.map(item => 
        item.id === idea.id ? { ...item, isRecorded: false, recordedDate: undefined } : item
      ))
    } else {
      // Marcar como gravado
      const recordedIdea = {
        ...idea,
        isRecorded: true,
        recordedDate: new Date().toISOString().split('T')[0]
      }
      
      setRecordedContents(prev => [...prev, recordedIdea])
      setContentIdeas(prev => prev.map(item => 
        item.id === idea.id ? { ...item, isRecorded: true, recordedDate: recordedIdea.recordedDate } : item
      ))
    }
  }

  const toggleStoryRecorded = (story: StoryIdea) => {
    if (story.isRecorded) {
      // Desmarcar como gravado
      setRecordedStories(prev => prev.filter(item => item.id !== story.id))
      setStoryIdeas(prev => prev.map(item => 
        item.id === story.id ? { ...item, isRecorded: false, recordedDate: undefined } : item
      ))
    } else {
      // Marcar como gravado
      const recordedStory = {
        ...story,
        isRecorded: true,
        recordedDate: new Date().toISOString().split('T')[0]
      }
      
      setRecordedStories(prev => [...prev, recordedStory])
      setStoryIdeas(prev => prev.map(item => 
        item.id === story.id ? { ...item, isRecorded: true, recordedDate: recordedStory.recordedDate } : item
      ))
    }
  }

  const addManualContent = () => {
    if (dailyContents === 0 && dailyStories === 0) return

    const existingIndex = manualContents.findIndex(item => item.date === selectedDate)
    
    if (existingIndex >= 0) {
      setManualContents(prev => prev.map((item, index) => 
        index === existingIndex 
          ? { ...item, contents: dailyContents, stories: dailyStories }
          : item
      ))
    } else {
      setManualContents(prev => [...prev, {
        date: selectedDate,
        contents: dailyContents,
        stories: dailyStories
      }])
    }
    
    setDailyContents(0)
    setDailyStories(0)
  }

  // Função para calcular métricas baseadas no período selecionado
  const calculateMetrics = (): DashboardMetrics => {
    const today = new Date().toISOString().split('T')[0]
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Combinar conteúdos gravados e manuais
    const allContents = [...recordedContents, ...recordedStories]
    manualContents.forEach(manual => {
      for (let i = 0; i < manual.contents + manual.stories; i++) {
        allContents.push({
          id: Date.now() + i,
          type: 'empresa',
          format: 'simples',
          title: 'Conteúdo Manual',
          hook: '',
          development: '',
          narration: '',
          caption: '',
          cta: '',
          hashtags: [],
          isRecorded: true,
          recordedDate: manual.date
        })
      }
    })

    const totalRecorded = allContents.length
    const todayRecorded = allContents.filter(item => item.recordedDate === today).length
    const weekRecorded = allContents.filter(item => item.recordedDate && item.recordedDate >= weekAgo).length
    const monthRecorded = allContents.filter(item => item.recordedDate && item.recordedDate >= monthAgo).length

    // Dados para gráficos baseados no período selecionado
    let dailyData: { date: string; count: number }[] = []
    
    if (selectedPeriod === '30days') {
      // Últimos 30 dias
      for (let i = 29; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        const count = allContents.filter(item => item.recordedDate === date).length
        dailyData.push({ date, count })
      }
    } else {
      // Mês customizado
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]
        const count = allContents.filter(item => item.recordedDate === date).length
        dailyData.push({ date, count })
      }
    }

    return {
      totalRecorded,
      todayRecorded,
      weekRecorded,
      monthRecorded,
      dailyData,
      weeklyData: [],
      monthlyData: []
    }
  }

  // Função para calcular métricas separadas de conteúdos e stories
  const calculateSeparateMetrics = () => {
    const today = new Date().toISOString().split('T')[0]
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Métricas de conteúdos
    const allContentsWithManual = [...recordedContents]
    manualContents.forEach(manual => {
      for (let i = 0; i < manual.contents; i++) {
        allContentsWithManual.push({
          id: Date.now() + i,
          type: 'empresa',
          format: 'simples',
          title: 'Conteúdo Manual',
          hook: '',
          development: '',
          narration: '',
          caption: '',
          cta: '',
          hashtags: [],
          isRecorded: true,
          recordedDate: manual.date
        })
      }
    })

    // Métricas de stories
    const allStoriesWithManual = [...recordedStories]
    manualContents.forEach(manual => {
      for (let i = 0; i < manual.stories; i++) {
        allStoriesWithManual.push({
          id: Date.now() + i + 1000,
          title: 'Story Manual',
          description: '',
          tips: [],
          isRecorded: true,
          recordedDate: manual.date
        })
      }
    })

    // Dados para gráficos de conteúdos
    let contentsDailyData: { date: string; count: number }[] = []
    let storiesDailyData: { date: string; count: number }[] = []
    
    if (selectedPeriod === '30days') {
      for (let i = 29; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        const contentsCount = allContentsWithManual.filter(item => item.recordedDate === date).length
        const storiesCount = allStoriesWithManual.filter(item => item.recordedDate === date).length
        contentsDailyData.push({ date, count: contentsCount })
        storiesDailyData.push({ date, count: storiesCount })
      }
    } else {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]
        const contentsCount = allContentsWithManual.filter(item => item.recordedDate === date).length
        const storiesCount = allStoriesWithManual.filter(item => item.recordedDate === date).length
        contentsDailyData.push({ date, count: contentsCount })
        storiesDailyData.push({ date, count: storiesCount })
      }
    }

    return { contentsDailyData, storiesDailyData }
  }

  // Função para obter detalhes de um dia específico
  const getDayDetails = (date: string): DayContent => {
    const dayRecordedContents = recordedContents.filter(item => item.recordedDate === date)
    const dayRecordedStories = recordedStories.filter(item => item.recordedDate === date)
    const dayManual = manualContents.find(item => item.date === date)

    return {
      date,
      recordedContents: dayRecordedContents,
      recordedStories: dayRecordedStories,
      manualContents: dayManual?.contents || 0,
      manualStories: dayManual?.stories || 0
    }
  }

  // Função para navegar no calendário
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  // Função para renderizar o calendário
  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const days = []
    
    // Dias vazios no início
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>)
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]
      const dayDetails = getDayDetails(date)
      const totalContent = dayDetails.recordedContents.length + dayDetails.recordedStories.length + dayDetails.manualContents + dayDetails.manualStories
      const hasContent = totalContent > 0

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDayDetails(dayDetails)
            setShowDayModal(true)
          }}
          className={`h-8 w-8 text-sm rounded-full flex items-center justify-center transition-all ${
            hasContent 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
        </button>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          <div className="text-xs font-medium text-gray-500 p-2">Dom</div>
          <div className="text-xs font-medium text-gray-500 p-2">Seg</div>
          <div className="text-xs font-medium text-gray-500 p-2">Ter</div>
          <div className="text-xs font-medium text-gray-500 p-2">Qua</div>
          <div className="text-xs font-medium text-gray-500 p-2">Qui</div>
          <div className="text-xs font-medium text-gray-500 p-2">Sex</div>
          <div className="text-xs font-medium text-gray-500 p-2">Sáb</div>
          {days}
        </div>
      </div>
    )
  }

  const metrics = calculateMetrics()
  const { contentsDailyData, storiesDailyData } = calculateSeparateMetrics()

  // Calcular conteúdos externos para exibição
  const getExternalContentsCount = () => {
    return manualContents.reduce((total, item) => total + item.contents, 0)
  }

  const getExternalStoriesCount = () => {
    return manualContents.reduce((total, item) => total + item.stories, 0)
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent mb-4">
            <Sparkles className="w-8 h-8 text-black" />
            <h1 className="text-4xl md:text-5xl font-bold">Mentora Pocket</h1>
          </div>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-2">
            Nunca mais faltará idéias! Informe seu nicho e Bora Gravar!
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Gere ideias completas e nunca mais trave na criação de conteúdos
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 border-2 border-gray-200 shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Ex: consultoria em marketing digital, loja de roupas femininas, coaching de carreira..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-black"
                />
              </div>
              <Button
                onClick={generateContent}
                disabled={!niche.trim() || isGenerating}
                className="h-12 px-8 bg-black hover:bg-gray-800 text-white font-semibold"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Ideias
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasGenerated && (
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="content" className="data-[state=active]:bg-black data-[state=active]:text-white">
                <Play className="w-4 h-4 mr-2" />
                Ideias de Conteúdo (10)
              </TabsTrigger>
              <TabsTrigger value="stories" className="data-[state=active]:bg-black data-[state=active]:text-white">
                <Camera className="w-4 h-4 mr-2" />
                Ideias para Stories (5)
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-black data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="grid gap-6">
                {contentIdeas.map((idea) => (
                  <Card key={idea.id} className="border-2 border-gray-200 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {idea.title}
                        </CardTitle>
                        <div className="flex gap-2 items-center">
                          <Badge variant={idea.type === 'empresa' ? 'default' : 'secondary'} className="bg-black text-white">
                            <Target className="w-3 h-3 mr-1" />
                            {idea.type === 'empresa' ? 'Empresa' : 'Empresária'}
                          </Badge>
                          <Badge variant={idea.format === 'elaborado' ? 'default' : 'outline'} className={idea.format === 'elaborado' ? 'bg-gray-800 text-white' : 'border-gray-400'}>
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {idea.format === 'elaborado' ? 'Elaborado' : 'Simples'}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => toggleContentRecorded(idea)}
                            className={idea.isRecorded 
                              ? "bg-green-600 hover:bg-green-700 text-white" 
                              : "bg-gray-600 hover:bg-gray-700 text-white"
                            }
                          >
                            <Check className="w-4 h-4 mr-1" />
                            {idea.isRecorded ? 'Gravado ✓' : 'Gravado'}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">🎣 Gancho</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">{idea.hook}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">📝 Desenvolvimento</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">{idea.development}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">🎙️ Narração</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">{idea.narration}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">📱 Legenda</h4>
                            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border relative">
                              <p className="whitespace-pre-line">{idea.caption}</p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(idea.caption)}
                                className="absolute top-2 right-2 h-6 w-6 p-0"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">🚀 CTA</h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">{idea.cta}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1"># Hashtags</h4>
                            <div className="flex flex-wrap gap-1">
                              {idea.hashtags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-gray-400">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {storyIdeas.map((story) => (
                  <Card key={story.id} className="border-2 border-gray-200 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Camera className="w-5 h-5 text-black" />
                          {story.title}
                        </CardTitle>
                        <Button
                          size="sm"
                          onClick={() => toggleStoryRecorded(story)}
                          className={story.isRecorded 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-gray-600 hover:bg-gray-700 text-white"
                          }
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {story.isRecorded ? 'Gravado ✓' : 'Gravado'}
                        </Button>
                      </div>
                      <p className="text-gray-700">{story.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 mb-2">💡 Dicas para aplicar:</h4>
                        <ul className="space-y-2">
                          {story.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-black font-bold">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Seletor de Período */}
              <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Período de Visualização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <Select value={selectedPeriod} onValueChange={(value: '30days' | 'custom') => setSelectedPeriod(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30days">Últimos 30 dias</SelectItem>
                        <SelectItem value="custom">Mês específico</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {selectedPeriod === 'custom' && (
                      <div className="flex-1">
                        {renderCalendar()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Métricas Principais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-2 border-gray-200 bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black">{metrics.totalRecorded}</div>
                    <div className="text-sm text-gray-600">Total Gravados</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-gray-200 bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black">{metrics.todayRecorded}</div>
                    <div className="text-sm text-gray-600">Hoje</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-gray-200 bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black">{metrics.weekRecorded}</div>
                    <div className="text-sm text-gray-600">Esta Semana</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-gray-200 bg-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black">{metrics.monthRecorded}</div>
                    <div className="text-sm text-gray-600">Este Mês</div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos Separados */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Gráfico de Conteúdos */}
                <Card className="border-2 border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Conteúdos Gravados - {selectedPeriod === '30days' ? 'Últimos 30 Dias' : `${['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][currentMonth]} ${currentYear}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-end gap-1 overflow-x-auto">
                      {contentsDailyData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[20px]">
                          <div 
                            className="bg-black w-4 rounded-t cursor-pointer hover:bg-gray-800"
                            style={{ height: `${Math.max(day.count * 20, 4)}px` }}
                            onClick={() => {
                              const dayDetails = getDayDetails(day.date)
                              setSelectedDayDetails(dayDetails)
                              setShowDayModal(true)
                            }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1 transform rotate-45 origin-left">
                            {day.date.split('-')[2]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico de Stories */}
                <Card className="border-2 border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Stories Gravados - {selectedPeriod === '30days' ? 'Últimos 30 Dias' : `${['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][currentMonth]} ${currentYear}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-end gap-1 overflow-x-auto">
                      {storiesDailyData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[20px]">
                          <div 
                            className="bg-gray-600 w-4 rounded-t cursor-pointer hover:bg-gray-800"
                            style={{ height: `${Math.max(day.count * 20, 4)}px` }}
                            onClick={() => {
                              const dayDetails = getDayDetails(day.date)
                              setSelectedDayDetails(dayDetails)
                              setShowDayModal(true)
                            }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1 transform rotate-45 origin-left">
                            {day.date.split('-')[2]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conteúdos Gravados */}
              {recordedContents.length > 0 && (
                <Card className="border-2 border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Conteúdos Gravados
                      {getExternalContentsCount() > 0 && (
                        <span className="text-sm font-normal text-gray-600 ml-2">
                          ({getExternalContentsCount()} Conteúdos Externos)
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {recordedContents.map((content, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                          <span className="text-gray-800 font-medium">{content.title}</span>
                          <span className="text-sm text-gray-600">{content.recordedDate}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stories Gravados */}
              {recordedStories.length > 0 && (
                <Card className="border-2 border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Stories Gravados
                      {getExternalStoriesCount() > 0 && (
                        <span className="text-sm font-normal text-gray-600 ml-2">
                          ({getExternalStoriesCount()} Conteúdos Externos)
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {recordedStories.map((story, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                          <span className="text-gray-800 font-medium">{story.title}</span>
                          <span className="text-sm text-gray-600">{story.recordedDate}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Adicionar Conteúdos Manuais */}
              <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Adicionar Conteúdos Externos</CardTitle>
                  <p className="text-gray-600">Registre conteúdos que você criou</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border-2 border-gray-300 focus:border-black"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdos</label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDailyContents(Math.max(0, dailyContents - 1))}
                            className="border-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-bold text-lg">{dailyContents}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDailyContents(dailyContents + 1)}
                            className="border-gray-300"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stories</label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDailyStories(Math.max(0, dailyStories - 1))}
                            className="border-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-bold text-lg">{dailyStories}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDailyStories(dailyStories + 1)}
                            className="border-gray-300"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={addManualContent}
                      disabled={dailyContents === 0 && dailyStories === 0}
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Modal de Detalhes do Dia */}
        {showDayModal && selectedDayDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Conteúdos do dia {new Date(selectedDayDetails.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowDayModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Conteúdos Gravados */}
                  {selectedDayDetails.recordedContents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Conteúdos Gravados ({selectedDayDetails.recordedContents.length})</h3>
                      <div className="space-y-2">
                        {selectedDayDetails.recordedContents.map((content, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                            <span className="text-gray-800 font-medium">{content.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stories Gravados */}
                  {selectedDayDetails.recordedStories.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Stories Gravados ({selectedDayDetails.recordedStories.length})</h3>
                      <div className="space-y-2">
                        {selectedDayDetails.recordedStories.map((story, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                            <span className="text-gray-800 font-medium">{story.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conteúdos Externos */}
                  {(selectedDayDetails.manualContents > 0 || selectedDayDetails.manualStories > 0) && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Conteúdos Externos</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedDayDetails.manualContents > 0 && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-blue-800 font-medium">{selectedDayDetails.manualContents} Conteúdos</div>
                            <div className="text-blue-600 text-sm">Adicionados manualmente</div>
                          </div>
                        )}
                        {selectedDayDetails.manualStories > 0 && (
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-purple-800 font-medium">{selectedDayDetails.manualStories} Stories</div>
                            <div className="text-purple-600 text-sm">Adicionados manualmente</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Caso não tenha nenhum conteúdo */}
                  {selectedDayDetails.recordedContents.length === 0 && 
                   selectedDayDetails.recordedStories.length === 0 && 
                   selectedDayDetails.manualContents === 0 && 
                   selectedDayDetails.manualStories === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum conteúdo registrado neste dia
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 text-black" /> para empreendedoras
          </p>
        </div>
      </div>
    </div>
  )
}