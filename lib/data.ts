export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  ath: number;
  atl: number;
  change24h: number;
  change7d: number;
  sparkline: number[]; // 24 values
  history30d: { date: string; price: number }[]; // 30 values
  category: 'Layer 1' | 'Layer 2' | 'Meme Coin' | 'AI' | 'Gaming' | 'NFT' | 'DeFi' | 'Stablecoin' | 'RWA';
  blockchain: string;
  about: string;
  website: string;
  whitepaper: string;
  explorer: string;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    reddit?: string;
  };
  tags: string[];
  faq: { question: string; answer: string }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  author: string;
  publishDate: string;
  readingTime: string;
  category: string;
  tags: string[];
}

export interface LearnGuide {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  iconName: string;
}

// Helper to generate deterministic pseudo-random numbers based on a seed string
function seedRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Generate the 100 coins
const baseCoinsInfo: {
  id: string;
  name: string;
  symbol: string;
  price: number;
  category: Coin['category'];
  blockchain: string;
  about: string;
}[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 64250.20,
    category: "Layer 1",
    blockchain: "Bitcoin",
    about: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries."
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3450.45,
    category: "Layer 1",
    blockchain: "Ethereum",
    about: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform."
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    price: 1.00,
    category: "Stablecoin",
    blockchain: "Multi-Chain",
    about: "Tether is a cryptocurrency with tokens issued by Tether Limited, which is controlled by the owners of Bitfinex. It is pegged to the US dollar."
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    price: 575.10,
    category: "Layer 1",
    blockchain: "BNB Chain",
    about: "BNB powers the BNB Chain ecosystem. It is the native token of the Binance cryptocurrency exchange and the BNB Smart Chain."
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 146.80,
    category: "Layer 1",
    blockchain: "Solana",
    about: "Solana is a public blockchain platform with smart contract functionality. It achieves high speed and low cost via a proof-of-history consensus."
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    price: 1.00,
    category: "Stablecoin",
    blockchain: "Multi-Chain",
    about: "USDC is a stablecoin fully backed by US dollars or dollar-denominated assets like US Treasury securities, managed by Circle."
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: 0.58,
    category: "Layer 1",
    blockchain: "XRP Ledger",
    about: "XRP is the native cryptocurrency of the XRP Ledger, an open-source, public blockchain designed to facilitate global financial transfers."
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.38,
    category: "Layer 1",
    blockchain: "Cardano",
    about: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake."
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    category: "Meme Coin",
    blockchain: "Dogecoin",
    about: "Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a joke."
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.00001740,
    category: "Meme Coin",
    blockchain: "Ethereum",
    about: "Shiba Inu is a decentralized, community-led cryptocurrency project inspired by the popular dog breed, built on the Ethereum blockchain."
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 6.22,
    category: "Layer 1",
    blockchain: "Polkadot",
    about: "Polkadot is a sharded blockchain applications platform that enables diverse blockchains to transfer messages and value in a trust-free fashion."
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    price: 13.80,
    category: "DeFi",
    blockchain: "Ethereum",
    about: "Chainlink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain, bridging off-chain and on-chain."
  },
  {
    id: "polygon",
    name: "POL (ex-MATIC)",
    symbol: "POL",
    price: 0.42,
    category: "Layer 2",
    blockchain: "Polygon",
    about: "Polygon is an Ethereum Layer 2 scaling platform. POL is the upgraded native token driving utility, staking, and gas across the network."
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    symbol: "ARB",
    price: 0.65,
    category: "Layer 2",
    blockchain: "Arbitrum One",
    about: "Arbitrum is a Layer 2 optimistic rollup scaling solution for Ethereum, offering high-throughput, low-cost smart contract execution."
  },
  {
    id: "optimism",
    name: "Optimism",
    symbol: "OP",
    price: 1.54,
    category: "Layer 2",
    blockchain: "OP Mainnet",
    about: "Optimism is a Layer 2 scaling solution for Ethereum. It is built as an optimistic rollup and shares security with the Ethereum mainnet."
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    price: 7.20,
    category: "DeFi",
    blockchain: "Ethereum",
    about: "Uniswap is a popular decentralized trading protocol, known for its role in facilitating automated trading of decentralized finance tokens."
  },
  {
    id: "render-token",
    name: "Render Token",
    symbol: "RENDER",
    price: 4.88,
    category: "AI",
    blockchain: "Solana",
    about: "Render Network is the leading provider of decentralized GPU-based rendering solutions, revolutionizing the digital creation process."
  },
  {
    id: "fetch-ai",
    name: "Artificial Superintelligence",
    symbol: "FET",
    price: 1.15,
    category: "AI",
    blockchain: "Cosmos",
    about: "FET is the core token driving the Artificial Superintelligence Alliance, powering decentralized AI agents, machine learning, and data sharing."
  },
  {
    id: "near-protocol",
    name: "Near Protocol",
    symbol: "NEAR",
    price: 4.10,
    category: "Layer 1",
    blockchain: "Near",
    about: "NEAR Protocol is a software development platform and Layer 1 blockchain designed to make web apps usable and easily accessible for creators."
  },
  {
    id: "pepe",
    name: "Pepe",
    symbol: "PEPE",
    price: 0.00000850,
    category: "Meme Coin",
    blockchain: "Ethereum",
    about: "Pepe is a meme coin launched in tribute to the Pepe the Frog internet meme, aiming to capitalize on the popularity of meme currencies."
  },
  {
    id: "dogwifhat",
    name: "dogwifhat",
    symbol: "WIF",
    price: 1.74,
    category: "Meme Coin",
    blockchain: "Solana",
    about: "dogwifhat is a viral meme coin on the Solana blockchain featuring a Shiba Inu puppy wearing a knitted pink beanie."
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    price: 24.50,
    category: "Layer 1",
    blockchain: "Avalanche",
    about: "Avalanche is a Layer 1 blockchain platform that functions as a secure, decentralized platform for custom blockchain networks and dApps."
  },
  {
    id: "maker",
    name: "Maker",
    symbol: "MKR",
    price: 1540.00,
    category: "DeFi",
    blockchain: "Ethereum",
    about: "Maker is the governance token of the MakerDAO and Maker Protocol, enabling decentralized issuance and management of the DAI stablecoin."
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    price: 112.50,
    category: "DeFi",
    blockchain: "Ethereum",
    about: "Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers to earn interest or borrow assets."
  },
  {
    id: "ondo-finance",
    name: "Ondo Finance",
    symbol: "ONDO",
    price: 0.72,
    category: "RWA",
    blockchain: "Ethereum",
    about: "Ondo Finance is a decentralized investment platform focusing on tokenized Real World Assets (RWA), bringing institutional-grade yield to retail."
  },
  {
    id: "sui",
    name: "Sui",
    symbol: "SUI",
    price: 1.05,
    category: "Layer 1",
    blockchain: "Sui",
    about: "Sui is a first-of-its-kind Layer 1 blockchain and smart contract platform designed from the ground up to make digital asset ownership fast and private."
  },
  {
    id: "aptos",
    name: "Aptos",
    symbol: "APT",
    price: 6.80,
    category: "Layer 1",
    blockchain: "Aptos",
    about: "Aptos is a Layer 1 blockchain developed using the Move programming language, focused on scalability, safety, and upgradeability."
  },
  {
    id: "floki",
    name: "Floki",
    symbol: "FLOKI",
    price: 0.00013500,
    category: "Meme Coin",
    blockchain: "BNB Chain",
    about: "Floki is the people's cryptocurrency and the utility token of the Floki Ecosystem, which includes gaming metaverse, DeFi, and NFTs."
  },
  {
    id: "gala",
    name: "Gala",
    symbol: "GALA",
    price: 0.021,
    category: "Gaming",
    blockchain: "Ethereum",
    about: "Gala is the native utility token of the Gala Games ecosystem, a decentralized Web3 gaming network designed to give players control over their items."
  },
  {
    id: "the-sandbox",
    name: "The Sandbox",
    symbol: "SAND",
    price: 0.31,
    category: "Gaming",
    blockchain: "Ethereum",
    about: "The Sandbox is a virtual world where players can build, own, and monetize their gaming experiences on the Ethereum blockchain."
  }
];

// List of words to generate remaining 70 coins programmatically
const coinPrefixes = ["Aero", "Alpha", "Astro", "Blade", "Byte", "Chain", "Chronos", "Cyber", "Delta", "Echo", "Ember", "Fortis", "Future", "Giga", "Helix", "Helios", "Hydra", "Infinity", "Krypton", "Lux", "Matrix", "Neo", "Nova", "Nexus", "Orion", "Ocean", "Pulse", "Quantum", "Sovereign", "Shadow", "Solaria", "Stellar", "Sync", "Terra", "Titan", "Vortex", "Zenith", "Zephyr"];
const coinSuffixes = ["Token", "Network", "Protocol", "Chain", "DAO", "Coin", "Finance", "Asset", "Labs", "Node", "Link", "Vault", "Cash", "Pay", "Exchange", "Fund", "Ledger"];
const categoriesList: Coin['category'][] = ["Layer 1", "Layer 2", "Meme Coin", "AI", "Gaming", "NFT", "DeFi", "Stablecoin", "RWA"];
const blockChains = ["Ethereum", "Solana", "BNB Chain", "Avalanche", "Sui", "Arbitrum", "Optimism", "Polygon", "Base"];

export const COINS_DATA: Coin[] = (() => {
  const coins: Coin[] = [];
  
  // 1. Add base coins
  baseCoinsInfo.forEach((b) => {
    const rand = seedRandom(b.id);
    const change24h = (rand() * 15) - 7; // -7% to +8%
    const change7d = change24h + (rand() * 20) - 10; // -17% to +18%
    
    // Circulating Supply based on price
    let circulatingSupply = 100000000;
    if (b.price > 10000) circulatingSupply = 19700000;
    else if (b.price > 100) circulatingSupply = 120000000;
    else if (b.price < 0.001) circulatingSupply = 420690000000000;
    else if (b.price < 1) circulatingSupply = 10000000000;
    
    const maxSupply = b.category === "Stablecoin" ? null : b.price > 10000 ? 21000000 : Math.round(circulatingSupply * 1.5);
    const totalSupply = maxSupply ? Math.round(maxSupply * 0.9) : circulatingSupply;
    
    const marketCap = circulatingSupply * b.price;
    const volume24h = marketCap * (0.01 + rand() * 0.08); // 1% to 9% of market cap
    
    // Sparkline (24 values)
    const sparkline: number[] = [];
    let curPrice = b.price * (1 - change7d/100);
    const step = change7d / 24;
    for (let i = 0; i < 24; i++) {
      curPrice = curPrice * (1 + (rand() * 0.06 - 0.03) + (step / 100));
      // clamp price
      if (b.category === "Stablecoin") curPrice = 0.99 + (rand() * 0.02);
      sparkline.push(Number(curPrice.toFixed(8)));
    }
    sparkline[23] = b.price; // force end price
    
    // History 30d (30 values)
    const history30d: { date: string; price: number }[] = [];
    let startPrice = b.price * (1 - (change7d * 4) / 100);
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 30);
    
    for (let i = 0; i < 30; i++) {
      dateObj.setDate(dateObj.getDate() + 1);
      const dayRand = rand();
      startPrice = startPrice * (1 + (dayRand * 0.1 - 0.045));
      if (b.category === "Stablecoin") startPrice = 0.995 + (dayRand * 0.01);
      history30d.push({
        date: dateObj.toISOString().split('T')[0],
        price: Number(startPrice.toFixed(b.price < 0.01 ? 8 : 2))
      });
    }
    history30d[29] = { date: new Date().toISOString().split('T')[0], price: b.price };
    
    const ath = Math.max(...history30d.map(h => h.price)) * (1.1 + rand() * 0.9);
    const atl = Math.min(...history30d.map(h => h.price)) * (0.5 + rand() * 0.4);
    
    const tags = [b.category.toLowerCase().replace(" ", "-"), b.blockchain.toLowerCase().replace(" ", "-")];
    if (b.price > 1000) tags.push("store-of-value");
    if (b.category === "Meme Coin") tags.push("community-driven");
    if (b.category === "DeFi") tags.push("yield");
    
    coins.push({
      id: b.id,
      name: b.name,
      symbol: b.symbol,
      price: b.price,
      marketCap: Math.round(marketCap),
      volume24h: Math.round(volume24h),
      circulatingSupply: Math.round(circulatingSupply),
      totalSupply: Math.round(totalSupply),
      maxSupply: maxSupply ? Math.round(maxSupply) : null,
      ath: Number(ath.toFixed(b.price < 0.01 ? 8 : 2)),
      atl: Number(atl.toFixed(b.price < 0.01 ? 8 : 2)),
      change24h: Number(change24h.toFixed(2)),
      change7d: Number(change7d.toFixed(2)),
      sparkline,
      history30d,
      category: b.category,
      blockchain: b.blockchain,
      about: b.about,
      website: `https://${b.id}.org`,
      whitepaper: `https://${b.id}.org/whitepaper.pdf`,
      explorer: `https://etherscan.io/token/${b.id}`,
      socialLinks: {
        twitter: `https://twitter.com/${b.id}`,
        telegram: `https://t.me/${b.id}`,
        reddit: `https://reddit.com/r/${b.id}`
      },
      tags,
      faq: [
        { question: `What is ${b.name}?`, answer: `${b.name} is a leading cryptocurrency in the ${b.category} category. ${b.about}` },
        { question: `How to buy ${b.name}?`, answer: `You can buy ${b.name} on top exchanges like Binance, Coinbase, or decentralized exchanges on the ${b.blockchain} ecosystem.` },
        { question: `Is ${b.name} secure?`, answer: `Yes, ${b.name} operates on the ${b.blockchain} blockchain network which uses secure decentralized cryptography mechanisms.` }
      ]
    });
  });
  
  // 2. Generate 70 more coins to reach exactly 100
  for (let i = 0; i < 70; i++) {
    const prefixIdx = i % coinPrefixes.length;
    const suffixIdx = (i * 7) % coinSuffixes.length;
    const name = `${coinPrefixes[prefixIdx]} ${coinSuffixes[suffixIdx]}`;
    const symbol = (coinPrefixes[prefixIdx].substring(0, 3) + coinSuffixes[suffixIdx].substring(0, 1)).toUpperCase() + (i % 10);
    const id = name.toLowerCase().replace(/\s+/g, '-');
    
    const rand = seedRandom(id);
    const category = categoriesList[(i * 3) % categoriesList.length];
    const blockchain = blockChains[(i * 2) % blockChains.length];
    
    let price = 0.01 + rand() * 250; // $0.01 to $250
    if (category === "Stablecoin") {
      price = 0.99 + (rand() * 0.02); // $0.99 to $1.01
    } else if (category === "Meme Coin") {
      price = 0.00001 + (rand() * 0.05); // low price
    } else if (category === "RWA") {
      price = 10 + (rand() * 90); // RWA tokenized assets
    }
    
    const change24h = (rand() * 24) - 12; // -12% to +12%
    const change7d = change24h + (rand() * 30) - 15; // -27% to +15%
    
    let circulatingSupply = Math.round(10000000 + rand() * 900000000);
    if (category === "Meme Coin") circulatingSupply = Math.round(100000000000 + rand() * 900000000000);
    
    const maxSupply = category === "Stablecoin" ? null : Math.round(circulatingSupply * 1.6);
    const totalSupply = maxSupply ? Math.round(maxSupply * 0.85) : circulatingSupply;
    
    const marketCap = circulatingSupply * price;
    const volume24h = marketCap * (0.005 + rand() * 0.06);
    
    // Sparkline (24 values)
    const sparkline: number[] = [];
    let curPrice = price * (1 - change7d/100);
    const step = change7d / 24;
    for (let j = 0; j < 24; j++) {
      curPrice = curPrice * (1 + (rand() * 0.08 - 0.04) + (step / 100));
      if (category === "Stablecoin") curPrice = 0.99 + (rand() * 0.02);
      sparkline.push(Number(curPrice.toFixed(8)));
    }
    sparkline[23] = price;
    
    // History 30d
    const history30d: { date: string; price: number }[] = [];
    let startPrice = price * (1 - (change7d * 3.5) / 100);
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 30);
    
    for (let j = 0; j < 30; j++) {
      dateObj.setDate(dateObj.getDate() + 1);
      const dayRand = rand();
      startPrice = startPrice * (1 + (dayRand * 0.14 - 0.07));
      if (category === "Stablecoin") startPrice = 0.992 + (dayRand * 0.016);
      history30d.push({
        date: dateObj.toISOString().split('T')[0],
        price: Number(startPrice.toFixed(price < 0.01 ? 8 : 2))
      });
    }
    history30d[29] = { date: new Date().toISOString().split('T')[0], price };
    
    const ath = Math.max(...history30d.map(h => h.price)) * (1.2 + rand() * 0.8);
    const atl = Math.min(...history30d.map(h => h.price)) * (0.6 + rand() * 0.3);
    
    coins.push({
      id,
      name,
      symbol,
      price: Number(price.toFixed(price < 0.01 ? 8 : 4)),
      marketCap: Math.round(marketCap),
      volume24h: Math.round(volume24h),
      circulatingSupply: Math.round(circulatingSupply),
      totalSupply: Math.round(totalSupply),
      maxSupply: maxSupply ? Math.round(maxSupply) : null,
      ath: Number(ath.toFixed(price < 0.01 ? 8 : 2)),
      atl: Number(atl.toFixed(price < 0.01 ? 8 : 2)),
      change24h: Number(change24h.toFixed(2)),
      change7d: Number(change7d.toFixed(2)),
      sparkline,
      history30d,
      category,
      blockchain,
      about: `${name} is a decentralized project built on the ${blockchain} network. It serves as the primary utility token within the ecosystem to facilitate smart agreements, network consensus, and community incentive schemes.`,
      website: `https://${id}.io`,
      whitepaper: `https://${id}.io/whitepaper.pdf`,
      explorer: `https://etherscan.io/token/${id}`,
      socialLinks: {
        twitter: `https://twitter.com/${id}`,
        telegram: `https://t.me/${id}`
      },
      tags: [category.toLowerCase().replace(" ", "-"), blockchain.toLowerCase().replace(" ", "-")],
      faq: [
        { question: `What is the core function of ${name}?`, answer: `${name} is used primarily for utility transactions, staking, and decentralized governance mechanisms on the ${blockchain} chain.` },
        { question: `Where can I store my ${symbol}?`, answer: `${name} can be stored in any wallet that supports the ${blockchain} network architecture, such as Metamask, Phantom, or hardware solutions like Ledger.` }
      ]
    });
  }
  
  // Sort coins by market cap descending so Bitcoin is #1, Ethereum #2 etc.
  return coins.sort((a, b) => b.marketCap - a.marketCap);
})();

// Category statistics computed from the coins
export interface CategoryStat {
  name: Coin['category'];
  avgChange24h: number;
  totalMarketCap: number;
  tokensCount: number;
  description: string;
}

export const CATEGORIES_DATA: CategoryStat[] = [
  {
    name: "Layer 1",
    avgChange24h: 2.14,
    totalMarketCap: 1540200300100,
    tokensCount: COINS_DATA.filter(c => c.category === "Layer 1").length,
    description: "Layer 1 blockchains are base networks that settle transactions independently, like Bitcoin, Ethereum, and Solana."
  },
  {
    name: "Layer 2",
    avgChange24h: -1.45,
    totalMarketCap: 18240500100,
    tokensCount: COINS_DATA.filter(c => c.category === "Layer 2").length,
    description: "Layer 2 networks build on top of Layer 1 blockchains to scale transaction speed and drastically reduce gas fees."
  },
  {
    name: "Meme Coin",
    avgChange24h: 8.92,
    totalMarketCap: 38450120800,
    tokensCount: COINS_DATA.filter(c => c.category === "Meme Coin").length,
    description: "Meme coins are cryptocurrencies inspired by popular internet memes, pop-culture humor, or community jokes."
  },
  {
    name: "AI",
    avgChange24h: 4.88,
    totalMarketCap: 12550600400,
    tokensCount: COINS_DATA.filter(c => c.category === "AI").length,
    description: "AI-based tokens drive decentralized artificial intelligence infrastructures, GPU rental, and machine learning node operations."
  },
  {
    name: "Gaming",
    avgChange24h: 0.12,
    totalMarketCap: 9450300200,
    tokensCount: COINS_DATA.filter(c => c.category === "Gaming").length,
    description: "Gaming tokens power digital player economies, in-game item transactions, NFT avatars, and virtual metaverse lands."
  },
  {
    name: "NFT",
    avgChange24h: -0.85,
    totalMarketCap: 4500300200,
    tokensCount: COINS_DATA.filter(c => c.category === "NFT").length,
    description: "NFT ecosystems support decentralized art exchanges, digital property registries, and intellectual property tokenization."
  },
  {
    name: "DeFi",
    avgChange24h: 1.87,
    totalMarketCap: 64200800500,
    tokensCount: COINS_DATA.filter(c => c.category === "DeFi").length,
    description: "Decentralized Finance (DeFi) tokens facilitate automated lending, yield farming, swap markets, and synthetics."
  },
  {
    name: "Stablecoin",
    avgChange24h: 0.01,
    totalMarketCap: 162000000000,
    tokensCount: COINS_DATA.filter(c => c.category === "Stablecoin").length,
    description: "Stablecoins peg their value directly to fiat currencies (typically the US Dollar) to offer price stability in crypto."
  },
  {
    name: "RWA",
    avgChange24h: 0.65,
    totalMarketCap: 7450800400,
    tokensCount: COINS_DATA.filter(c => c.category === "RWA").length,
    description: "Real World Assets (RWA) represent the tokenization of physical, real-world commodities like real estate, gold, or treasury bills."
  }
];

export const NEWS_DATA: NewsArticle[] = [
  {
    id: "btc-institutional-inflow",
    title: "Bitcoin Institutional Inflows Skyrocket: ETFs Witness Record Net Flows in August",
    summary: "Spot Bitcoin ETFs have observed an influx of over $1.2 billion in net new investment capital this week, indicating strong corporate confidence.",
    content: `<p>Global cryptocurrency markets are showing robust resilience this week, led by an exceptional surge of institutional buying. Spot Bitcoin exchange-traded funds (ETFs) listed in the US recorded aggregate net inflows of over $1.2 billion, marking one of the strongest trading weeks in recent months.</p>
    <p>Financial analysts report that primary advisory desks and wealth management firms are steadily adding exposure to digital assets, citing long-term macroeconomic stability and hedge benefits against fiat inflation. "We are seeing a structural shift from speculative retail trades to long-term portfolio allocations by institutional allocators," said Marcus Vance, Chief Market Strategist at CapitalBlock.</p>
    <blockquote>Institutional involvement is stabilizing Bitcoin price volatility over longer time horizons.</blockquote>
    <p>Ethereum ETFs also showed solid performance, capturing $220 million in inflows over the same period. Experts anticipate that as regulatory clarity improves globally, the crypto asset class will experience deeper integration with traditional stock indices and mutual fund portfolios.</p>`,
    cover: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    author: "Alex Vance",
    publishDate: "2026-08-11",
    readingTime: "4 min read",
    category: "Market Update",
    tags: ["bitcoin", "etf", "institutions"]
  },
  {
    id: "layer2-gas-reduction",
    title: "Ethereum L2 Gas Fees Fall to Record Lows Following Sharding Optimization",
    summary: "Optimism and Arbitrum report transaction gas fees below $0.001 after the integration of the new blob-carrying transaction framework.",
    content: `<p>Layer 2 rollup solutions including Arbitrum, Optimism, and Polygon are recording historic low transaction fees following the successful implementation of the Ethereum network's latest sharding optimization upgrade.</p>
    <p>The network upgrade introduced blob-carrying transactions, which create a temporary data compartment on Ethereum blocks specifically designed to carry compressed transaction data for rollups. As a result, the cost of submitting Layer 2 data batches to the Ethereum mainnet has plummeted by over 90%.</p>
    <p>Currently, users on Optimism and Arbitrum can execute transactions, swaps, and smart contracts for less than $0.001 per operation. This drastic fee reduction is triggering a massive migration of decentralized apps (dApps) from alternative high-speed Layer 1 platforms back to the Ethereum rollup ecosystem.</p>`,
    cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    author: "Elena Rostova",
    publishDate: "2026-08-09",
    readingTime: "3 min read",
    category: "Technology",
    tags: ["ethereum", "layer-2", "arbitrum", "optimism"]
  },
  {
    id: "rwa-tokenization-growth",
    title: "Real World Asset (RWA) Tokenization Surpasses $10 Billion Market Value",
    summary: "Tokenized real estate, private credit, and sovereign treasury bills on public blockchains hit a major milestone, led by institutional protocols.",
    content: `<p>The tokenization of Real World Assets (RWA) has officially reached a historic milestone, with total value locked (TVL) surpassing $10 billion across public and enterprise blockchain platforms.</p>
    <p>Sovereign treasury bills tokenized on the blockchain have emerged as the fastest-growing sector, as institutional capital seeks secure, yield-bearing blockchain assets during periods of high-interest rates. Protocols like Ondo Finance and MakerDAO are enabling qualified investors to trade fractionalized shares of US Treasury bonds directly on-chain.</p>
    <p>Industry leaders estimate that by 2030, tokenized assets could represent a multi-trillion dollar market. \"By placing traditional assets like private debt, real estate, and government bonds onto public ledger networks, we are eliminating counterparty risk, enabling 24/7 liquid secondary markets, and driving unprecedented accessibility,\" commented Clara Zhang, CEO of TokenFund.</p>`,
    cover: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    author: "Clara Zhang",
    publishDate: "2026-08-08",
    readingTime: "5 min read",
    category: "DeFi & RWA",
    tags: ["rwa", "defi", "treasury"]
  },
  {
    id: "solana-validator-upgrades",
    title: "Solana Network Achieves 99.99% Uptime in 2026, Firedancer Client Enters Beta",
    summary: "The implementation of the secondary validator client Firedancer has successfully eliminated transaction congestions and downtime on Solana.",
    content: `<p>Solana has marked a stellar performance in 2026, maintaining a 99.99% network uptime record while scaling average transactions per second (TPS) to over 35,000 under high load.</p>
    <p>The stellar reliability is credited to the progressive rollout of Firedancer, the highly anticipated secondary validator client written in C++ by Jump Crypto. Firedancer, which recently entered public beta, introduces massive performance optimizations in transaction processing, packet filtering, and peer-to-peer data distribution.</p>
    <p>Validator operators report that the introduction of Firedancer is drastically reducing memory consumption and improving network throughput during periods of high-demand meme coin spikes and NFT mints, solving Solana's historical reliability challenges.</p>`,
    cover: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80",
    author: "Tariq Mahmood",
    publishDate: "2026-08-05",
    readingTime: "4 min read",
    category: "Blockchain",
    tags: ["solana", "firedancer", "scalability"]
  },
  {
    id: "ai-agents-onchain-economy",
    title: "Autonomous AI Agents Execute Over 10% of On-Chain Swap Volume",
    summary: "Autonomous agents utilizing LLMs and crypto-wallets are actively managing portfolios and trading assets without human intervention.",
    content: `<p>In a fascinating convergence of artificial intelligence and Web3 finance, data compiled from top decentralized exchanges reveals that autonomous AI agents now execute more than 10% of total daily on-chain swap volume.</p>
    <p>These AI agents are independent software scripts equipped with large language models (LLMs) and funded on-chain crypto wallets. They are programmed to monitor market indicators, news feeds, and sentiment trends in real-time, executing trades and balancing portfolios automatically.</p>
    <p>\"AI agents are the ultimate Web3 users,\" said Dr. Arthur Pendelton of Fetch Alliance. \"They don't need banking accounts, they don't sleep, they can parse thousands of whitepapers in seconds, and they transact frictionlessly using decentralized smart contracts.\" Security experts, however, caution that rogue AI strategies could introduce flash-crash scenarios if left unmonitored.</p>`,
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    author: "Dr. Arthur Pendelton",
    publishDate: "2026-08-02",
    readingTime: "6 min read",
    category: "Artificial Intelligence",
    tags: ["ai", "trading", "defi"]
  }
];

export const LEARN_DATA: LearnGuide[] = [
  {
    id: "what-is-bitcoin",
    title: "What is Bitcoin and How Does It Work?",
    category: "Fundamentals",
    summary: "A comprehensive guide for beginners to understand Bitcoin, its history, Proof of Work consensus, and why it is often referred to as digital gold.",
    content: `<h3>Introduction to Bitcoin</h3>
    <p>Bitcoin (BTC) is the world's first decentralized digital currency, created in 2009 by an anonymous person or group under the pseudonym <strong>Satoshi Nakamoto</strong>. Unlike traditional fiat currencies (like Dollars or Euros), Bitcoin is not issued or controlled by any central bank or government.</p>
    
    <h3>How Does Bitcoin Work?</h3>
    <p>Bitcoin operates on a technology called <strong>Blockchain</strong>, a distributed digital ledger that records all transactions chronologically and publicly on thousands of computers (nodes) worldwide. Network security is maintained through a process called <strong>Proof of Work (PoW)</strong> or mining.</p>
    <ul>
      <li><strong>Nodes / Miners:</strong> Specialized computers that solve complex cryptographic puzzles to validate transactions and add them to a new block on the blockchain.</li>
      <li><strong>Reward:</strong> Miners who solve the puzzles receive rewards in the form of newly minted Bitcoin, plus transaction fees.</li>
      <li><strong>Halving:</strong> Every 210,000 blocks (about every 4 years), mining rewards are cut in half to limit inflation and ensure the total supply of Bitcoin never exceeds <strong>21 million BTC</strong>.</li>
    </ul>

    <h3>Why is Bitcoin Valuable?</h3>
    <p>Bitcoin has unique characteristics that make it comparable to gold:</p>
    <ol>
      <li><strong>Scarcity:</strong> The supply is strictly capped at 21 million coins globally.</li>
      <li><strong>Decentralization:</strong> It cannot be censored, frozen, or seized by any single authority.</li>
      <li><strong>Easy Transferability:</strong> It can be sent anywhere in the world in minutes, peer-to-peer, without banking intermediaries.</li>
    </ol>`,
    readTime: "5 min read",
    difficulty: "Beginner",
    iconName: "HelpCircle"
  },
  {
    id: "blockchain-fundamentals",
    title: "Blockchain Fundamentals for Beginners",
    category: "Fundamentals",
    summary: "Learn the core concepts of blockchain architecture, blocks, hashing, public-private key cryptography, and the differences between PoW and PoS.",
    content: `<h3>What is Blockchain?</h3>
    <p>Simply put, a blockchain is a shared, decentralized database secured by cryptography. Data within a blockchain is stored in groups called <strong>blocks</strong>. Each block is linked to the previous one, forming an unchangeable (immutable) chain.</p>
    
    <h3>Core Components of Blockchain</h3>
    <ul>
      <li><strong>Hash:</strong> A unique digital signature generated by mathematical algorithms. If even a single character in a block changes, the hash changes completely, preventing tampering.</li>
      <li><strong>Key Cryptography (Public-Private Key):</strong> Users have a Public Key (wallet address to receive funds) and a Private Key (secret key to sign transactions and send funds). Losing the private key means losing access to all assets.</li>
      <li><strong>Consensus Mechanism:</strong> Rules agreed upon by all nodes in the network to validate transactions without needing mutual trust.</li>
    </ul>
    
    <h3>Proof of Work vs. Proof of Stake</h3>
    <p>The two most popular consensus mechanisms are:</p>
    <ul>
      <li><strong>Proof of Work (PoW):</strong> Validation through hardware computation (mining). Highly secure but energy-intensive. Example: Bitcoin.</li>
      <li><strong>Proof of Stake (PoS):</strong> Validation performed by validators who lock or "stake" their coins as collateral. More eco-friendly and energy-efficient. Example: Ethereum, Solana.</li>
    </ul>`,
    readTime: "7 min read",
    difficulty: "Beginner",
    iconName: "Database"
  },
  {
    id: "crypto-wallet-guide",
    title: "A Guide to Selecting and Using Crypto Wallets",
    category: "Security",
    summary: "Understand the differences between Hot and Cold Wallets, how seed phrases work, and tips to protect your crypto assets from hackers.",
    content: `<h3>What is a Crypto Wallet?</h3>
    <p>A crypto wallet is software or hardware that interacts with a blockchain to monitor balances, receive, and send assets. The wallet doesn't store coins; they reside on the blockchain. Your wallet stores the <strong>Private Key</strong> that grants ownership of a specific address.</p>
    
    <h3>Types of Crypto Wallets</h3>
    <p>There are two primary categories based on internet connectivity:</p>
    
    <h4>1. Hot Wallet (Connected to Internet)</h4>
    <p>Digital wallets connected to the internet. Practical for daily transactions but carry higher hacking risks.</p>
    <ul>
      <li><strong>Software Wallet:</strong> Mobile apps or browser extensions (e.g., MetaMask, Phantom, Trust Wallet).</li>
      <li><strong>Exchange Wallet:</strong> Wallets provided by centralized exchanges (e.g., Binance, Coinbase).</li>
    </ul>
    
    <h4>2. Cold Wallet (Offline / Hardware)</h4>
    <p>Physical devices that store private keys offline, offering maximum security from cyberattacks.</p>
    <ul>
      <li><strong>Hardware Wallet:</strong> USB-like hardware devices (e.g., Ledger, Trezor).</li>
    </ul>

    <h3>Seed Phrase: The Master Backup Key</h3>
    <p>When creating a new wallet, you will generate 12 to 24 random words called a <strong>Seed Phrase</strong>. The seed phrase is the only way to recover your wallet if your device is broken or lost. <strong>NEVER</strong> share your seed phrase and write it down physically on paper; do not store it online.</p>`,
    readTime: "6 min read",
    difficulty: "Beginner",
    iconName: "Wallet"
  },
  {
    id: "decentralized-finance-defi",
    title: "Understanding DeFi (Decentralized Finance) & Yield Farming",
    category: "DeFi",
    summary: "Explore the decentralized finance ecosystem, Automated Market Makers (AMM), liquidity pools, lending protocols, and yield farming strategies.",
    content: `<h3>What is DeFi?</h3>
    <p>Decentralized Finance (DeFi) is an ecosystem that allows financial services like lending, borrowing, trading, and insurance to run on blockchains without traditional intermediaries. Transactions are governed automatically by programs called <strong>Smart Contracts</strong>.</p>
    
    <h3>Core Pillars of DeFi</h3>
    <ul>
      <li><strong>DEX (Decentralized Exchange):</strong> Peer-to-peer token exchange using Automated Market Makers (AMM). Examples: Uniswap, PancakeSwap.</li>
      <li><strong>Lending & Borrowing:</strong> Protocols allowing users to lend crypto assets to earn interest, or pledge collateral to borrow other assets. Examples: Aave, Compound.</li>
      <li><strong>Liquidity Pools:</strong> Crypto assets locked in a smart contract by Liquidity Providers (LP) to facilitate trades on DEXs. Depositors receive a share of trading fees.</li>
    </ul>
    
    <h3>What is Yield Farming?</h3>
    <p>Yield Farming is the practice of locking your crypto assets in various DeFi protocols to maximize returns (yields) in the form of additional tokens. Risks include:</p>
    <ul>
      <li><strong>Impermanent Loss:</strong> Temporary losses due to price divergence in liquidity pools.</li>
      <li><strong>Smart Contract Vulnerabilities:</strong> Flaws in code that hackers can exploit to drain funds.</li>
    </ul>`,
    readTime: "8 min read",
    difficulty: "Intermediate",
    iconName: "TrendingUp"
  },
  {
    id: "nfts-explained",
    title: "NFTs (Non-Fungible Tokens) and Their Utilities",
    category: "NFT",
    summary: "Why these unique digital tokens are valuable, how the ERC-721 standard works, and real-world implementations from digital art to gaming items.",
    content: `<h3>What is an NFT?</h3>
    <p>A Non-Fungible Token (NFT) is a unique cryptographic token representing ownership of a specific asset that cannot be exchanged 1-to-1 with another (non-fungible). Unlike Bitcoin, where every coin has the same value, each NFT has unique metadata and serial numbers.</p>
    
    <h3>How Do NFTs Work?</h3>
    <p>Most NFTs are minted on Ethereum using specific token standards like <strong>ERC-721</strong> or <strong>ERC-1155</strong>. The blockchain serves as a transparent digital certificate of ownership, proving the authenticity and history of the asset.</p>
    
    <h3>Real-World NFT Utility</h3>
    <p>NFTs extend beyond simple digital collectibles:</p>
    <ol>
      <li><strong>Digital Art:</strong> Artists can sell digital art directly to global collectors and earn automated royalties on secondary sales.</li>
      <li><strong>Gaming:</strong> In-game assets like virtual land, weapons, or skins can be owned as NFTs and traded outside the game.</li>
      <li><strong>Ticketing & Memberships:</strong> Event tickets as NFTs prevent counterfeiting and unlock exclusive access.</li>
      <li><strong>Physical Assets:</strong> Tokenizing real estate or physical collectibles to enable instant liquidity and trading.</li>
    </ol>`,
    readTime: "6 min read",
    difficulty: "Intermediate",
    iconName: "Image"
  },
  {
    id: "risk-management-trading",
    title: "Risk Management in Crypto Investing",
    category: "Trading & Investing",
    summary: "Survival keys in volatile crypto markets, calculating risk-to-reward ratios, placing stop-losses, and diversifying portfolios.",
    content: `<h3>Importance of Risk Management</h3>
    <p>Cryptocurrency markets are highly volatile. Large percentage swings happen daily. Surviving long-term isn't about guessing price directions perfectly, but managing losses when your trade analysis is wrong.</p>
    
    <h3>Golden Rules of Risk Management</h3>
    <ol>
      <li><strong>Only Risk Capital You Can Afford to Lose:</strong> Never invest funds needed for daily living expenses, debt payments, or emergency cash.</li>
      <li><strong>Diversification:</strong> Spread capital across major assets (BTC, ETH), mid-cap utility tokens, and stablecoins.</li>
      <li><strong>Use Stop-Loss Orders:</strong> Set automated orders to sell when prices fall past a certain threshold to prevent deep drawdowns.</li>
      <li><strong>Define Risk-to-Reward Ratio:</strong> Only take setups where profit targets are at least 2 or 3 times larger than the potential loss.</li>
    </ol>`,
    readTime: "5 min read",
    difficulty: "Intermediate",
    iconName: "Shield"
  },
  {
    id: "technical-analysis-intro",
    title: "Introduction to Technical Analysis (Reading Charts)",
    category: "Technical Analysis",
    summary: "A basic guide to understanding candlestick charts, support & resistance, market trends, and key indicators like RSI, MACD, and Moving Averages.",
    content: `<h3>What is Technical Analysis?</h3>
    <p>Technical Analysis (TA) evaluates assets by examining market statistics, historical price movements, and trading volumes. Charting patterns help traders forecast potential future price trends.</p>
    
    <h3>Anatomy of Candlesticks</h3>
    <p>Candlesticks represent Open, Close, High, and Low prices for a specific timeframe (e.g., 1 hour, 4 hours, or 1 day).</p>
    <ul>
      <li><strong>Green (Bullish) Candlestick:</strong> Close is higher than open, indicating buyer dominance.</li>
      <li><strong>Red (Bearish) Candlestick:</strong> Close is lower than open, indicating seller dominance.</li>
    </ul>
    
    <h3>Support & Resistance</h3>
    <ul>
      <li><strong>Support:</strong> Price floors where strong demand stops further price declines.</li>
      <li><strong>Resistance:</strong> Price ceilings where selling pressure halts upward trends.</li>
    </ul>
    
    <h3>Popular Technical Indicators</h3>
    <ul>
      <li><strong>Moving Averages (MA):</strong> Lines representing average prices to smooth out noise and clarify trends.</li>
      <li><strong>Relative Strength Index (RSI):</strong> A momentum oscillator measuring if an asset is overbought (RSI > 70) or oversold (RSI < 30).</li>
    </ul>`,
    readTime: "9 min read",
    difficulty: "Advanced",
    iconName: "TrendingUp"
  },
  {
    id: "fundamental-analysis-intro",
    title: "Fundamental Analysis of Cryptocurrencies",
    category: "Fundamental Analysis",
    summary: "How to evaluate a token's intrinsic value by examining tokenomics, developer teams, roadmaps, GitHub repository activity, and on-chain metrics.",
    content: `<h3>What is Fundamental Analysis?</h3>
    <p>Unlike technical analysis, Fundamental Analysis (FA) evaluates the intrinsic value of an asset by studying project health, utility, and market metrics. FA helps determine if a project is long-term viable or purely speculative.</p>
    
    <h3>Pillars of Crypto Fundamental Analysis</h3>
    
    <h4>1. Tokenomics</h4>
    <p>Tokenomics regulates coin emission, team vs. public allocations, inflation schedules, burning mechanisms, and utility. Projects with high inflation or huge team allocations often struggle long-term.</p>
    
    <h4>2. Team & Partnerships</h4>
    <p>Audit the team behind the code. Look for proven tech/blockchain track records. Anonymous teams without prior public portfolios carry higher rug-pull risks.</p>
    
    <h4>3. On-Chain Metrics</h4>
    <p>Leverage the transparency of blockchain data:</p>
    <ul>
      <li><strong>Active Addresses:</strong> Count of unique active wallets.</li>
      <li><strong>Transaction Counts:</strong> Overall transactions executed on the network.</li>
      <li><strong>Total Value Locked (TVL):</strong> Assets staked inside the project's smart contracts (crucial for DeFi).</li>
    </ul>
    
    <h4>4. GitHub Code Commits</h4>
    <p>Since Web3 is mostly open-source, check code repositories on GitHub. High-quality projects feature active developer contributions.</p>`,
    readTime: "8 min read",
    difficulty: "Advanced",
    iconName: "BookOpen"
  }
];
