export interface ThemeReference {
  id: string
  name: string
  images: string[]
  emoji: string
  color: string
  description: string
  musicUrl: string
  facts: string[]
}

export const themes: ThemeReference[] = [
  {
    id: "rarity",
    name: "Rarity",
    images: [
      "https://media1.tenor.com/m/aQ1nSaX-eHgAAAAd/rarity-my-little-pony.gif",
      "https://media1.tenor.com/m/7nwWnwUVl6gAAAAC/rarity-mlp.gif",
      "https://media1.tenor.com/m/JT6YuEvH_uQAAAAC/rarity-my-little-pony.gif",
      "https://media1.tenor.com/m/e5hKVvDaI6EAAAAC/rarity-mlp.gif",
      "https://media1.tenor.com/m/d4a1qJJGgGkAAAAC/rarity-my-little-pony.gif",
    ],
    emoji: "💎",
    color: "#8B5CF6",
    description: "A unicornio mais fabulosa de toda Equestria! Generosidade e glamour em pessoa.",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    facts: [
      "Rarity representa o Elemento da Generosidade",
      "Ela tem uma irmazinha chamada Sweetie Belle",
      "Seu sonho e ter uma boutique em Canterlot",
      "Ela tem um gato chamado Opalescence",
      "Rarity adora fazer roupas para suas amigas",
    ],
  },
  {
    id: "jimin",
    name: "Jimin",
    images: [
      "https://media1.tenor.com/m/KJOZxRxp3PAAAAAC/jimin-bts.gif",
      "https://media1.tenor.com/m/EEtNWnW8BxkAAAAC/jimin-bts.gif",
      "https://media1.tenor.com/m/8LF_RlRUV_8AAAAC/jimin-bts.gif",
      "https://media1.tenor.com/m/dPjXhR5MIvkAAAAC/jimin-bts.gif",
      "https://media1.tenor.com/m/Q3vL7vPNp-YAAAAC/jimin-bts.gif",
    ],
    emoji: "💜",
    color: "#A855F7",
    description: "Park Jimin, o principe do K-pop! Danca, voz e carisma que conquistam o mundo.",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    facts: [
      "Jimin nasceu em 13 de outubro de 1995",
      "Ele e conhecido por suas habilidades de danca contemporanea",
      "Filter e uma de suas musicas solo mais famosas",
      "Jimin estudou danca moderna antes de entrar no BTS",
      "Ele e famoso por seu carinho com os fas (ARMY)",
    ],
  },
  {
    id: "anitta",
    name: "Anitta",
    images: [
      "https://media1.tenor.com/m/mUHNAYjPT_4AAAAC/anitta.gif",
      "https://media1.tenor.com/m/OvV7VGgm-PEAAAAC/anitta.gif",
      "https://media1.tenor.com/m/2v3L2LUO_z0AAAAC/anitta.gif",
      "https://media1.tenor.com/m/zyGVNhXhHcoAAAAC/anitta.gif",
      "https://media1.tenor.com/m/HYQ7K4K2XOEAAAAC/anitta.gif",
    ],
    emoji: "🔥",
    color: "#EC4899",
    description: "A Girl from Rio que conquistou o mundo! Rainha do funk e do pop internacional.",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    facts: [
      "Anitta nasceu em Honorio Gurgel, Rio de Janeiro",
      "Envolver foi #1 global no Spotify",
      "Ela fala portugues, espanhol e ingles fluentemente",
      "Seu nome verdadeiro e Larissa de Macedo Machado",
      "Anitta ja se apresentou no Coachella",
    ],
  },
  {
    id: "pinkpantheress",
    name: "PinkPantheress",
    images: [
      "https://media1.tenor.com/m/m5Y8PmqXCNUAAAAC/pinkpantheress.gif",
      "https://media1.tenor.com/m/z3WvVTi6JxsAAAAC/pinkpantheress.gif",
      "https://media1.tenor.com/m/S4P6vXe0wFkAAAAC/pinkpantheress.gif",
      "https://media1.tenor.com/m/F_FWLHdfKSQAAAAC/pinkpantheress.gif",
      "https://media1.tenor.com/m/RJxLnbPHbMgAAAAC/pinkpantheress.gif",
    ],
    emoji: "🎀",
    color: "#F472B6",
    description: "A princesa do UK Garage e do Jungle! Sons nostalgicos com uma vibe moderna.",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    facts: [
      "Ela comecou postando musicas no TikTok",
      "Break It Off a tornou viral mundialmente",
      "Seu estilo mistura 2-step garage com pop",
      "PinkPantheress ama cultura japonesa e anime",
      "Ela colaborou com Ice Spice em Boy's a Liar",
    ],
  },
  {
    id: "marinasena",
    name: "Marina Sena",
    images: [
      "https://media1.tenor.com/m/tI0J8K9QC2cAAAAC/marina-sena.gif",
      "https://media1.tenor.com/m/xPGJ1YbOBisAAAAd/marina-sena.gif",
      "https://media1.tenor.com/m/QUC_VbC8LHQAAAAC/marina-sena.gif",
      "https://media1.tenor.com/m/8Ej8E8E8E8EAAAAC/marina-sena.gif",
      "https://media1.tenor.com/m/kJ9K9K9K9K9AAAAC/marina-sena.gif",
    ],
    emoji: "🌟",
    color: "#F59E0B",
    description: "A diva do pop brasileiro! Por Supuesto que ela e incrivel!",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    facts: [
      "Marina nasceu em Taiobeiras, Minas Gerais",
      "Por Supuesto foi um mega hit em 2022",
      "Ela comecou na banda Rosa Neon",
      "Seu album De Primeira e aclamado pela critica",
      "Marina mistura MPB, pop e ritmos latinos",
    ],
  },
  {
    id: "adventuretime",
    name: "Hora de Aventura",
    images: [
      "https://media1.tenor.com/m/qKl_GqGu7mYAAAAC/adventure-time-finn.gif",
      "https://media1.tenor.com/m/YmHOvQq7fNkAAAAC/adventure-time-jake.gif",
      "https://media1.tenor.com/m/CwOwRHyMPJYAAAAC/adventure-time.gif",
      "https://media1.tenor.com/m/8E8E8E8E8EAAAAC/adventure-time-marceline.gif",
      "https://media1.tenor.com/m/L9L9L9L9L9LAAAAC/adventure-time-princess-bubblegum.gif",
    ],
    emoji: "⚔️",
    color: "#3B82F6",
    description: "Hora de Aventura com Finn e Jake! A Terra de Ooo te espera!",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    facts: [
      "A serie foi criada por Pendleton Ward",
      "Finn e o ultimo humano na Terra de Ooo",
      "Jake pode esticar seu corpo infinitamente",
      "Marceline tem mais de 1000 anos",
      "A Princesa Jujuba criou o Reino Doce",
    ],
  },
  {
    id: "bojack",
    name: "BoJack Horseman",
    images: [
      "https://media1.tenor.com/m/CKVv8P3gNNQAAAAC/bojack-horseman.gif",
      "https://media1.tenor.com/m/1cNt5wNwZ5UAAAAC/bojack-horseman.gif",
      "https://media1.tenor.com/m/xFGT5m2cuxkAAAAC/bojack-horseman.gif",
      "https://media1.tenor.com/m/3X3X3X3X3X3AAAAC/bojack-horseman-sad.gif",
      "https://media1.tenor.com/m/7Y7Y7Y7Y7Y7AAAAC/bojack-horseman-todd.gif",
    ],
    emoji: "🐴",
    color: "#EF4444",
    description: "O cavalo mais existencialista de Hollywoo! Drama, comedia e reflexao.",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    facts: [
      "BoJack foi a estrela de Horsin Around nos anos 90",
      "A serie aborda saude mental de forma profunda",
      "Todd Chavez e seu melhor amigo/roommate",
      "Princess Carolyn e sua agente",
      "O D de Hollywood cai no episodio piloto",
    ],
  },
  {
    id: "owlhouse",
    name: "The Owl House",
    images: [
      "https://media1.tenor.com/m/bxFJfCKX1g8AAAAC/the-owl-house-luz.gif",
      "https://media1.tenor.com/m/0yZvIjBMTkQAAAAC/the-owl-house.gif",
      "https://media1.tenor.com/m/kFT_aT4tCHQAAAAC/the-owl-house-eda.gif",
      "https://media1.tenor.com/m/9Z9Z9Z9Z9Z9AAAAC/the-owl-house-amity.gif",
      "https://media1.tenor.com/m/2W2W2W2W2W2AAAAC/the-owl-house-king.gif",
    ],
    emoji: "🦉",
    color: "#8B5CF6",
    description: "Luz Noceda nas Ilhas Ferventes! Magia, amizade e muito Lumity!",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    facts: [
      "Luz sonha em ser uma bruxa de verdade",
      "Eda e conhecida como A Dama Coruja",
      "King e um pequeno demonio adoravel",
      "Lumity e um dos casais mais amados",
      "A serie foi criada por Dana Terrace",
    ],
  },
]

export const birthdayMessages = [
  "FELIZ ANIVERSARIO!",
  "Parabens pra voce!",
  "Que todos seus sonhos se realizem!",
  "Voce e incrivel!",
  "Muita saude e felicidade!",
  "Aproveite seu dia especial!",
  "Voce merece o mundo!",
  "Celebre muito hoje!",
]

export const mainMusicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
