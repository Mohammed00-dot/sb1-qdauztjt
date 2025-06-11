export interface Term {
  id: number;
  title: string;
  category: 'economics' | 'social' | 'government' | 'money';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  simpleDefinition: string;
  example: string;
  detailedExplanation: string;
  whyItMatters: string;
  rating: number;
}

export const terms: Term[] = [
  {
    id: 1,
    title: "Economy",
    category: "economics",
    difficulty: "beginner",
    simpleDefinition: "The economy is like a giant community where people make, buy, and sell things to each other.",
    example: "Think of your neighborhood! People work at different jobs, buy groceries, and provide services like haircuts. All of this activity together is the economy.",
    detailedExplanation: "An economy is a system where people produce goods and services, and then trade them with others. It includes all the buying, selling, and making that happens in a community, country, or even the whole world.",
    whyItMatters: "Understanding the economy helps you see how everything is connected - from your allowance to global trade.",
    rating: 5
  },
  {
    id: 2,
    title: "Democracy",
    category: "government",
    difficulty: "beginner",
    simpleDefinition: "Democracy is when everyone gets to vote and have a say in how things are run, like choosing class president.",
    example: "If your class votes on which movie to watch during free time, that's democracy in action! Everyone's vote counts equally.",
    detailedExplanation: "Democracy is a form of government where citizens have the power to make decisions through voting. People elect representatives who make laws and decisions on their behalf.",
    whyItMatters: "Democracy ensures everyone has a voice and can participate in shaping the rules and leaders of their community.",
    rating: 5
  },
  {
    id: 3,
    title: "Inflation",
    category: "money",
    difficulty: "intermediate",
    simpleDefinition: "Inflation is when things cost more money than they used to - like when candy that cost 50 cents now costs 75 cents.",
    example: "If your favorite video game used to cost $20 but now costs $25 for the exact same game, that's inflation.",
    detailedExplanation: "Inflation occurs when the general price level of goods and services increases over time, reducing the purchasing power of money. This means your money buys less than it used to.",
    whyItMatters: "Understanding inflation helps you plan for the future and understand why saving and investing money is important.",
    rating: 4
  },
  {
    id: 4,
    title: "Supply and Demand",
    category: "economics",
    difficulty: "intermediate",
    simpleDefinition: "Supply is how much of something is available, and demand is how much people want it. Together they decide the price.",
    example: "If there are only 10 tickets to a concert (low supply) but 100 people want them (high demand), the tickets will be expensive!",
    detailedExplanation: "Supply and demand is a fundamental economic principle. When demand is high and supply is low, prices go up. When supply is high and demand is low, prices go down.",
    whyItMatters: "This concept explains why prices change and helps you understand market behavior in everything from toys to houses.",
    rating: 5
  },
  {
    id: 5,
    title: "Culture",
    category: "social",
    difficulty: "beginner",
    simpleDefinition: "Culture is all the traditions, foods, languages, and ways of life that make each group of people special and unique.",
    example: "Your family's culture might include special holiday traditions, foods you eat, stories you tell, and languages you speak.",
    detailedExplanation: "Culture encompasses the beliefs, customs, arts, food, language, and social behaviors shared by a group of people. It's passed down through generations and shapes how people see the world.",
    whyItMatters: "Understanding culture helps us appreciate diversity and learn from different ways of life around the world.",
    rating: 4
  },
  {
    id: 6,
    title: "Budget",
    category: "money",
    difficulty: "beginner",
    simpleDefinition: "A budget is a plan for how to spend your money wisely, like deciding how much allowance to save and how much to spend.",
    example: "If you get $10 allowance, you might budget $3 for toys, $2 for snacks, and $5 to save for something big later.",
    detailedExplanation: "A budget is a financial plan that tracks income and expenses over a specific period. It helps ensure you don't spend more than you earn and can save for future goals.",
    whyItMatters: "Learning to budget early helps you make smart money decisions and achieve your financial goals throughout life.",
    rating: 5
  },
  {
    id: 7,
    title: "Constitution",
    category: "government",
    difficulty: "intermediate",
    simpleDefinition: "A constitution is like a rulebook that explains how a country should be run and what rights people have.",
    example: "Just like your school has rules about behavior and homework, a country's constitution has rules about laws and government.",
    detailedExplanation: "A constitution is the supreme law of a country that establishes the framework of government, defines the powers of different branches, and protects citizens' rights.",
    whyItMatters: "The constitution protects your freedoms and ensures the government follows fair rules when making decisions.",
    rating: 4
  },
  {
    id: 8,
    title: "Entrepreneurship",
    category: "economics",
    difficulty: "intermediate",
    simpleDefinition: "Entrepreneurship is starting your own business, like opening a lemonade stand or creating a new app.",
    example: "If you notice kids at school need pencils and start selling them for a small profit, you're being an entrepreneur!",
    detailedExplanation: "Entrepreneurship involves identifying opportunities, taking risks, and creating new businesses or innovations to solve problems or meet needs in the market.",
    whyItMatters: "Entrepreneurs drive innovation and economic growth by creating new products, services, and jobs.",
    rating: 5
  },
  {
    id: 9,
    title: "Citizenship",
    category: "social",
    difficulty: "beginner",
    simpleDefinition: "Citizenship means being a member of a country or community and having both rights and responsibilities.",
    example: "As a citizen, you have the right to go to school and the responsibility to follow laws and help your community.",
    detailedExplanation: "Citizenship involves legal membership in a country, granting certain rights (like voting) and requiring certain duties (like following laws and paying taxes).",
    whyItMatters: "Good citizenship helps create strong, fair communities where everyone can thrive and contribute.",
    rating: 4
  },
  {
    id: 10,
    title: "Interest",
    category: "money",
    difficulty: "intermediate",
    simpleDefinition: "Interest is extra money you can earn by saving in a bank, or extra money you pay when borrowing.",
    example: "If you put $100 in a savings account and the bank pays 5% interest, you'll have $105 after one year!",
    detailedExplanation: "Interest is the cost of borrowing money or the reward for saving money. It's calculated as a percentage of the principal amount over time.",
    whyItMatters: "Understanding interest helps you make smart decisions about saving, investing, and borrowing money.",
    rating: 4
  },
  {
    id: 11,
    title: "Taxes",
    category: "government",
    difficulty: "intermediate",
    simpleDefinition: "Taxes are money people pay to the government to fund public services like schools, roads, and hospitals.",
    example: "When you buy something at a store, you often pay a little extra in sales tax that goes to the government for community needs.",
    detailedExplanation: "Taxes are mandatory payments to the government based on income, purchases, or property ownership. They fund public goods and services that benefit society.",
    whyItMatters: "Taxes make it possible for governments to provide essential services that help everyone in the community.",
    rating: 4
  },
  {
    id: 12,
    title: "Globalization",
    category: "social",
    difficulty: "advanced",
    simpleDefinition: "Globalization means countries around the world becoming more connected through trade, technology, and culture.",
    example: "Your phone might be made in one country, your clothes in another, and your favorite app created somewhere else - that's globalization!",
    detailedExplanation: "Globalization is the process by which businesses, cultures, and governments become interconnected across national borders through trade, communication, and technology.",
    whyItMatters: "Globalization affects everything from the products we buy to the opportunities we have, making the world more interconnected.",
    rating: 3
  }
];