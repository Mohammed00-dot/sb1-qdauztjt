export interface Term {
  id: number;
  title: string;
  category: 'economics' | 'social' | 'government' | 'money';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  simpleDefinition: string;
  keyConceptsTitle: string;
  keyConcepts: string[];
  realWorldExamples: {
    title: string;
    examples: string[];
  };
  example: string;
  detailedExplanation: string;
  whyItMatters: string;
  rating: number;
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export const terms: Term[] = [
  // ECONOMICS CATEGORY
  {
    id: 1,
    title: "Economy",
    category: "economics",
    difficulty: "beginner",
    simpleDefinition: "The economy is like a giant community where people make, buy, and sell things to each other to meet their needs and wants.",
    keyConceptsTitle: "Key Economic Ideas",
    keyConcepts: [
      "Production: Making goods and services people need",
      "Consumption: Using or buying things we need",
      "Trade: Exchanging goods, services, or money",
      "Resources: Materials and skills used to make things",
      "Markets: Places where buying and selling happen"
    ],
    realWorldExamples: {
      title: "Economy in Action Around You",
      examples: [
        "Your local grocery store buying fruits from farmers and selling them to families",
        "A bakery using flour, sugar, and labor to make bread that people buy",
        "Students trading lunch items with each other",
        "Your family budgeting money for groceries, gas, and entertainment",
        "Online stores delivering products from warehouses to your home"
      ]
    },
    example: "Think of your school cafeteria! The school buys food from suppliers, cafeteria workers prepare meals, students pay for lunch, and everyone gets fed. That's a mini-economy!",
    detailedExplanation: "An economy is a complex system where people, businesses, and governments work together to produce, distribute, and consume goods and services. It includes everything from the farmer growing vegetables to the store selling them, from the factory making toys to kids playing with them. Every time someone makes something, buys something, or provides a service, they're participating in the economy.",
    whyItMatters: "Understanding the economy helps you see how everything in society is connected. It explains why things cost what they do, how jobs are created, and how your family's decisions affect others and vice versa.",
    rating: 5,
    quizQuestions: [
      {
        question: "What is the main purpose of an economy?",
        options: [
          "To make rich people richer",
          "To help people meet their needs and wants through trade",
          "To create complicated rules",
          "To make everything expensive"
        ],
        correctAnswer: 1,
        explanation: "Perfect! An economy exists to help people produce and exchange goods and services to meet everyone's needs and wants."
      },
      {
        question: "Which of these is the best example of economic activity?",
        options: [
          "Sleeping in your bed",
          "A farmer selling vegetables at a market",
          "Reading a book alone",
          "Taking a walk in the park"
        ],
        correctAnswer: 1,
        explanation: "Excellent! When a farmer sells vegetables, they're participating in the economy by providing goods that people need in exchange for money."
      },
      {
        question: "Why do people trade with each other in an economy?",
        options: [
          "Because they have to by law",
          "To get things they need but can't make themselves",
          "To make things more complicated",
          "Only to make money"
        ],
        correctAnswer: 1,
        explanation: "Great thinking! People trade because they can't make everything they need by themselves, so they exchange what they have for what they need."
      }
    ]
  },
  {
    id: 2,
    title: "Supply and Demand",
    category: "economics",
    difficulty: "intermediate",
    simpleDefinition: "Supply is how much of something is available to buy, and demand is how much people want it. Together, they determine the price.",
    keyConceptsTitle: "How Prices Are Set",
    keyConcepts: [
      "Supply: The amount of a product available for sale",
      "Demand: How much people want to buy something",
      "Price: What buyers pay and sellers receive",
      "Scarcity: When there's not enough of something for everyone",
      "Equilibrium: When supply and demand balance out"
    ],
    realWorldExamples: {
      title: "Supply and Demand in Daily Life",
      examples: [
        "Concert tickets: Few tickets (low supply) + many fans (high demand) = expensive tickets",
        "Ice cream in winter: Lots available (high supply) + few buyers (low demand) = lower prices",
        "New video game console: Limited stock + everyone wants one = high prices",
        "Umbrellas on a rainy day: High demand when it's raining = higher prices",
        "School lunch pizza: Popular item (high demand) might run out quickly"
      ]
    },
    example: "Imagine your school sells 100 pizza slices for lunch, but 200 students want pizza. That's high demand and low supply, so the price might be higher. But if they make 200 slices and only 50 students want pizza, the price might be lower!",
    detailedExplanation: "Supply and demand work like a seesaw. When lots of people want something but there isn't much available, prices go up. When there's plenty of something but few people want it, prices go down. This happens naturally as buyers and sellers make decisions about what to buy and sell.",
    whyItMatters: "Understanding supply and demand helps you understand why prices change, when might be a good time to buy something, and how businesses make decisions about what to produce.",
    rating: 5,
    quizQuestions: [
      {
        question: "What happens to price when demand is high but supply is low?",
        options: [
          "Price goes down",
          "Price goes up",
          "Price stays the same",
          "Price disappears"
        ],
        correctAnswer: 1,
        explanation: "Correct! When many people want something but there isn't much available, sellers can charge higher prices because people are willing to pay more."
      },
      {
        question: "Your favorite snack is suddenly very popular at school. What will likely happen?",
        options: [
          "The price will go down",
          "It might sell out quickly or cost more",
          "Nothing will change",
          "The school will ban it"
        ],
        correctAnswer: 1,
        explanation: "Exactly! When something becomes popular (high demand), it often sells out quickly or the price increases because more people want it."
      },
      {
        question: "A store has too many winter coats in spring. What might they do?",
        options: [
          "Raise the prices",
          "Put them on sale to lower the price",
          "Hide them from customers",
          "Throw them away"
        ],
        correctAnswer: 1,
        explanation: "Smart! When stores have too much of something people don't want (high supply, low demand), they often lower prices to encourage people to buy."
      }
    ]
  },
  {
    id: 3,
    title: "Entrepreneurship",
    category: "economics",
    difficulty: "intermediate",
    simpleDefinition: "Entrepreneurship is when someone starts their own business by creating something new or solving a problem in a creative way.",
    keyConceptsTitle: "What Entrepreneurs Do",
    keyConcepts: [
      "Innovation: Creating new products or better ways to do things",
      "Risk-taking: Trying something new even when success isn't guaranteed",
      "Problem-solving: Finding solutions to challenges people face",
      "Leadership: Guiding and inspiring others to work toward a goal",
      "Profit: Money earned after paying all business costs"
    ],
    realWorldExamples: {
      title: "Young Entrepreneurs in Action",
      examples: [
        "A student starting a dog-walking service in their neighborhood",
        "Kids selling homemade slime or friendship bracelets at school",
        "A teenager creating an app to help students organize homework",
        "Young people starting YouTube channels or online stores",
        "Students organizing car wash fundraisers for their sports team"
      ]
    },
    example: "Meet Sarah, age 12, who noticed her neighbors struggled to keep their gardens watered during summer vacation. She started 'Sarah's Plant Care' and now takes care of 15 gardens, earning money while helping her community!",
    detailedExplanation: "Entrepreneurs are like problem-solving detectives who start businesses. They look for problems people have, think of creative solutions, and then work hard to make their ideas real. They take risks because they believe in their ideas, even when others might doubt them.",
    whyItMatters: "Entrepreneurs create jobs, solve problems, and make life better for everyone. Learning about entrepreneurship helps you think creatively, solve problems, and maybe even start your own business someday!",
    rating: 5,
    quizQuestions: [
      {
        question: "What is the most important quality of an entrepreneur?",
        options: [
          "Having lots of money to start with",
          "Being willing to try new things and solve problems",
          "Being the smartest person in the room",
          "Never making mistakes"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Entrepreneurs succeed by being creative problem-solvers who are willing to try new approaches, even when they're not sure they'll work."
      },
      {
        question: "Which of these is the best example of entrepreneurship?",
        options: [
          "Getting a job at a grocery store",
          "Starting a tutoring business to help classmates with math",
          "Buying candy from a store",
          "Following your parents' career path"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Starting a tutoring business shows entrepreneurship because you're creating a new service to solve a problem (students needing help with math)."
      },
      {
        question: "Why do entrepreneurs take risks?",
        options: [
          "Because they like danger",
          "Because they believe their ideas can help people and succeed",
          "Because they have nothing to lose",
          "Because someone forces them to"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Entrepreneurs take calculated risks because they believe their ideas can make a positive difference and become successful businesses."
      }
    ]
  },

  // GOVERNMENT CATEGORY
  {
    id: 4,
    title: "Democracy",
    category: "government",
    difficulty: "beginner",
    simpleDefinition: "Democracy is a system where everyone gets to vote and have a say in making decisions that affect their community or country.",
    keyConceptsTitle: "How Democracy Works",
    keyConcepts: [
      "Voting: Everyone gets an equal say in choosing leaders",
      "Representation: Elected leaders speak for the people who voted for them",
      "Majority Rule: The choice that gets the most votes usually wins",
      "Minority Rights: Protecting people whose choice didn't win",
      "Free Speech: Everyone can express their opinions safely"
    ],
    realWorldExamples: {
      title: "Democracy You Can See",
      examples: [
        "Student council elections where everyone in school gets to vote",
        "Family meetings where everyone votes on vacation destinations",
        "Classroom decisions about which book to read next",
        "Town hall meetings where citizens discuss community issues",
        "Sports teams voting for team captain"
      ]
    },
    example: "In your classroom, when everyone votes on which movie to watch during a party, that's democracy! Everyone's vote counts equally, and the movie with the most votes wins.",
    detailedExplanation: "Democracy comes from Greek words meaning 'rule by the people.' In a democracy, citizens choose their leaders through elections, and those leaders make decisions on behalf of everyone. It's based on the idea that everyone deserves a voice in decisions that affect their lives.",
    whyItMatters: "Democracy ensures that everyone has a voice and that leaders are accountable to the people. It protects your rights and gives you the power to help shape your community's future.",
    rating: 5,
    quizQuestions: [
      {
        question: "What is the main idea behind democracy?",
        options: [
          "One person makes all the decisions",
          "Everyone gets a voice in choosing leaders and making decisions",
          "Only adults can participate",
          "Decisions are made randomly"
        ],
        correctAnswer: 1,
        explanation: "Exactly right! Democracy is all about giving everyone a voice and letting people choose their leaders through voting."
      },
      {
        question: "Which is the best example of democracy in action?",
        options: [
          "A teacher assigning homework",
          "Students voting for class president",
          "Following school rules",
          "Taking a test"
        ],
        correctAnswer: 1,
        explanation: "Perfect! When students vote for class president, they're practicing democracy by choosing their representative through an election."
      },
      {
        question: "Why is voting important in a democracy?",
        options: [
          "It's required by law",
          "It gives people a way to choose their leaders and influence decisions",
          "It's fun to do",
          "It makes elections longer"
        ],
        correctAnswer: 1,
        explanation: "Great understanding! Voting is how people in a democracy express their preferences and choose leaders who will represent their interests."
      }
    ]
  },
  {
    id: 5,
    title: "Constitution",
    category: "government",
    difficulty: "intermediate",
    simpleDefinition: "A constitution is like a rulebook that explains how a government should work and what rights people have that can't be taken away.",
    keyConceptsTitle: "What's in a Constitution",
    keyConcepts: [
      "Government Structure: How different parts of government work together",
      "Individual Rights: Freedoms that belong to every person",
      "Rule of Law: Everyone, including leaders, must follow the rules",
      "Checks and Balances: Different parts of government keep each other in check",
      "Amendment Process: How the constitution can be changed when needed"
    ],
    realWorldExamples: {
      title: "Constitutional Principles in Action",
      examples: [
        "School handbooks that outline student rights and responsibilities",
        "Sports league rules that all teams must follow",
        "Club constitutions that explain how the club operates",
        "Family rules that apply to everyone in the household",
        "Playground rules that ensure everyone can play safely"
      ]
    },
    example: "Think of your school's student handbook. It explains what students can and can't do, what rights students have, and how the school is organized. A country's constitution works the same way but for the whole nation!",
    detailedExplanation: "A constitution is the highest law in a country. It sets up the government's structure, defines what powers different parts of government have, and most importantly, protects citizens' rights. It's designed to last a long time and can only be changed through special processes.",
    whyItMatters: "The constitution protects your freedoms and ensures the government follows fair rules. It guarantees rights like free speech and fair treatment, and prevents any one person or group from having too much power.",
    rating: 4,
    quizQuestions: [
      {
        question: "What is the main purpose of a constitution?",
        options: [
          "To make laws complicated",
          "To set up government structure and protect people's rights",
          "To give one person all the power",
          "To create more paperwork"
        ],
        correctAnswer: 1,
        explanation: "Excellent! A constitution establishes how government works and protects citizens' fundamental rights and freedoms."
      },
      {
        question: "Why can't a constitution be changed easily?",
        options: [
          "Because it's written in permanent ink",
          "To ensure stability and prevent hasty changes to important rights",
          "Because no one knows how to change it",
          "Because it's too old"
        ],
        correctAnswer: 1,
        explanation: "Smart thinking! Constitutions are hard to change so that important rights and government structures remain stable and aren't changed for temporary reasons."
      },
      {
        question: "How is a constitution like a school handbook?",
        options: [
          "They're both boring to read",
          "Both explain rules, rights, and how the organization works",
          "They're both very short",
          "Both are written by students"
        ],
        correctAnswer: 1,
        explanation: "Great comparison! Both constitutions and school handbooks establish rules, explain rights, and describe how the organization operates fairly."
      }
    ]
  },
  {
    id: 6,
    title: "Citizenship",
    category: "government",
    difficulty: "beginner",
    simpleDefinition: "Citizenship means being a member of a country or community and having both special rights and important responsibilities.",
    keyConceptsTitle: "Rights and Responsibilities",
    keyConcepts: [
      "Rights: Things you're entitled to, like education and fair treatment",
      "Responsibilities: Things you should do, like following laws and helping others",
      "Civic Participation: Getting involved in your community",
      "Respect for Others: Treating all people fairly regardless of differences",
      "Community Service: Helping make your community better"
    ],
    realWorldExamples: {
      title: "Being a Good Citizen",
      examples: [
        "Volunteering at a local food bank or animal shelter",
        "Participating in school clean-up days",
        "Following traffic rules when walking or biking",
        "Being respectful to classmates from different backgrounds",
        "Helping elderly neighbors with groceries or yard work"
      ]
    },
    example: "As a citizen of your school community, you have the right to learn in a safe environment and the responsibility to treat others with respect and follow school rules.",
    detailedExplanation: "Citizenship is like being part of a big team. You get certain benefits and protections, but you also have jobs to do to help the team succeed. Good citizens participate in their communities, respect others, follow laws, and work to make things better for everyone.",
    whyItMatters: "Good citizenship creates strong, fair communities where everyone can thrive. When people understand their rights and responsibilities, they can work together to solve problems and make life better for all.",
    rating: 4,
    quizQuestions: [
      {
        question: "What does it mean to be a good citizen?",
        options: [
          "Only caring about yourself",
          "Having rights and responsibilities in your community",
          "Never following any rules",
          "Avoiding all community activities"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Good citizenship involves both enjoying rights and fulfilling responsibilities to help your community thrive."
      },
      {
        question: "Which is the best example of civic responsibility?",
        options: [
          "Only thinking about your own needs",
          "Volunteering to help clean up a local park",
          "Breaking rules when no one is watching",
          "Ignoring community problems"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Volunteering to clean up a park shows civic responsibility by contributing to the community's well-being."
      },
      {
        question: "Why do citizens have both rights AND responsibilities?",
        options: [
          "To make life complicated",
          "Because rights and responsibilities work together to create fair communities",
          "Because the government says so",
          "To keep people busy"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Rights protect what you deserve, while responsibilities ensure you contribute to a community where everyone's rights can be protected."
      }
    ]
  },

  // SOCIAL STUDIES CATEGORY
  {
    id: 7,
    title: "Culture",
    category: "social",
    difficulty: "beginner",
    simpleDefinition: "Culture is all the traditions, beliefs, foods, languages, and ways of life that make each group of people unique and special.",
    keyConceptsTitle: "Elements of Culture",
    keyConcepts: [
      "Traditions: Special customs passed down through generations",
      "Language: How people communicate and express ideas",
      "Food: Traditional dishes and eating customs",
      "Arts: Music, dance, stories, and visual arts",
      "Values: What a group of people believes is important"
    ],
    realWorldExamples: {
      title: "Culture Around You",
      examples: [
        "Family holiday traditions like decorating for Christmas or celebrating Diwali",
        "Different languages spoken in your community",
        "Various types of restaurants serving foods from around the world",
        "Cultural festivals with music, dance, and traditional clothing",
        "Different ways families celebrate birthdays or important milestones"
      ]
    },
    example: "Your family's culture might include speaking a certain language at home, eating special foods on holidays, telling particular stories, and celebrating traditions that your grandparents taught your parents.",
    detailedExplanation: "Culture is like a recipe that makes each group of people unique. It includes everything from the language they speak to the food they eat, the stories they tell, and the values they believe in. Culture is learned and shared, passed down from parents to children and constantly evolving.",
    whyItMatters: "Understanding culture helps us appreciate diversity and learn from different ways of life. It helps us respect others and understand that there are many wonderful ways to live and see the world.",
    rating: 4,
    quizQuestions: [
      {
        question: "What is culture?",
        options: [
          "Only the food people eat",
          "The traditions, beliefs, and ways of life that make groups unique",
          "Just the language people speak",
          "Only art and music"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Culture includes all the traditions, beliefs, languages, foods, and customs that make each group of people special and unique."
      },
      {
        question: "How do people learn about their culture?",
        options: [
          "Only from books",
          "From family, community, and participating in traditions",
          "Only from school",
          "They're born knowing it"
        ],
        correctAnswer: 1,
        explanation: "Excellent! People learn culture by growing up in families and communities, participating in traditions, and being taught by older generations."
      },
      {
        question: "Why is it important to learn about different cultures?",
        options: [
          "To prove one culture is better than others",
          "To understand and respect the diversity of human experiences",
          "To copy everything other cultures do",
          "It's not important"
        ],
        correctAnswer: 1,
        explanation: "Great thinking! Learning about different cultures helps us appreciate diversity, understand others better, and respect the many wonderful ways people live."
      }
    ]
  },
  {
    id: 8,
    title: "Community",
    category: "social",
    difficulty: "beginner",
    simpleDefinition: "A community is a group of people who live in the same area or share common interests and work together to help each other.",
    keyConceptsTitle: "What Makes a Community",
    keyConcepts: [
      "Shared Space: Living in the same neighborhood, town, or area",
      "Common Interests: Caring about similar things or goals",
      "Cooperation: Working together to solve problems",
      "Mutual Support: Helping each other in times of need",
      "Shared Responsibility: Everyone contributing to the community's well-being"
    ],
    realWorldExamples: {
      title: "Communities in Your Life",
      examples: [
        "Your neighborhood where families look out for each other",
        "Your school community of students, teachers, and staff",
        "Sports teams where players support each other",
        "Religious communities that worship and serve together",
        "Online communities of people who share hobbies or interests"
      ]
    },
    example: "Your school is a community! Students, teachers, staff, and families all work together to create a place where everyone can learn and grow safely.",
    detailedExplanation: "Communities form when people come together around shared location, interests, or goals. Strong communities are built on trust, cooperation, and mutual support. Members help each other, solve problems together, and work to make life better for everyone in the group.",
    whyItMatters: "Communities provide support, friendship, and help when we need it. Being part of a community gives us a sense of belonging and shows us how working together can accomplish more than working alone.",
    rating: 4,
    quizQuestions: [
      {
        question: "What makes a group of people a community?",
        options: [
          "They all look exactly the same",
          "They share a location, interests, or goals and support each other",
          "They never disagree about anything",
          "They all have the same job"
        ],
        correctAnswer: 1,
        explanation: "Exactly! A community forms when people share something in common and work together to support each other and achieve shared goals."
      },
      {
        question: "Which is the best example of community cooperation?",
        options: [
          "Everyone working alone on separate projects",
          "Neighbors organizing a block party to get to know each other",
          "People avoiding talking to each other",
          "Only helping people who are exactly like you"
        ],
        correctAnswer: 1,
        explanation: "Perfect! A block party brings neighbors together, helps them get to know each other, and builds community connections."
      },
      {
        question: "How can you contribute to your community?",
        options: [
          "By only thinking about yourself",
          "By helping others, participating in activities, and being a good neighbor",
          "By avoiding all community events",
          "By complaining about problems without helping solve them"
        ],
        correctAnswer: 1,
        explanation: "Great answer! Contributing to community means actively helping others, participating in community life, and working to make things better for everyone."
      }
    ]
  },
  {
    id: 9,
    title: "Globalization",
    category: "social",
    difficulty: "advanced",
    simpleDefinition: "Globalization means countries and people around the world becoming more connected through trade, technology, and sharing of ideas and culture.",
    keyConceptsTitle: "How the World Connects",
    keyConcepts: [
      "International Trade: Countries buying and selling goods with each other",
      "Technology: Internet and communication connecting people worldwide",
      "Cultural Exchange: Sharing music, food, and traditions across borders",
      "Global Economy: Businesses operating in multiple countries",
      "Interdependence: Countries relying on each other for various needs"
    ],
    realWorldExamples: {
      title: "Globalization in Your Daily Life",
      examples: [
        "Your smartphone made in one country with parts from many others",
        "Eating sushi (Japanese), pizza (Italian), or tacos (Mexican) in your hometown",
        "Watching movies or YouTube videos from creators around the world",
        "Wearing clothes made in different countries",
        "Video chatting with friends or family in other countries"
      ]
    },
    example: "Look at your favorite video game! It might be designed in Japan, programmed in the United States, manufactured in China, and played by kids all over the world. That's globalization!",
    detailedExplanation: "Globalization is like the world becoming a smaller place where countries and people are more connected than ever before. Technology, especially the internet, has made it easier for people to communicate, trade, and share ideas across vast distances. This creates both opportunities and challenges.",
    whyItMatters: "Globalization affects almost everything in your life, from the products you use to the entertainment you enjoy. Understanding it helps you see how connected our world is and prepares you to be a global citizen.",
    rating: 3,
    quizQuestions: [
      {
        question: "What is globalization?",
        options: [
          "Countries becoming completely isolated from each other",
          "The world becoming more connected through trade, technology, and culture",
          "Only rich countries trading with each other",
          "Making everything the same everywhere"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Globalization is about increasing connections between countries and people through trade, technology, communication, and cultural exchange."
      },
      {
        question: "Which is the best example of globalization?",
        options: [
          "Only buying products made in your own country",
          "A multinational company with offices in many countries",
          "Never using the internet",
          "Only speaking one language"
        ],
        correctAnswer: 1,
        explanation: "Perfect! A company operating in multiple countries shows how businesses have become global, connecting different parts of the world."
      },
      {
        question: "How has technology helped globalization?",
        options: [
          "By making communication slower",
          "By making it easier for people worldwide to connect and share information",
          "By making travel impossible",
          "By creating more barriers between countries"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Technology, especially the internet, has made it much easier for people around the world to communicate, share ideas, and do business together."
      }
    ]
  },

  // MONEY & FINANCE CATEGORY
  {
    id: 10,
    title: "Budget",
    category: "money",
    difficulty: "beginner",
    simpleDefinition: "A budget is a plan for how to spend your money wisely by deciding ahead of time what you'll buy and how much you'll save.",
    keyConceptsTitle: "Budget Basics",
    keyConcepts: [
      "Income: Money you receive from allowance, gifts, or jobs",
      "Expenses: Money you spend on things you need or want",
      "Needs vs. Wants: Distinguishing between essential and optional purchases",
      "Savings: Money you set aside for future goals",
      "Tracking: Keeping record of what you spend money on"
    ],
    realWorldExamples: {
      title: "Budgeting in Real Life",
      examples: [
        "Planning how to spend your birthday money on games, treats, and savings",
        "A family deciding how much to spend on groceries, rent, and entertainment",
        "Saving allowance money for several weeks to buy a special toy",
        "Choosing between buying candy now or saving for a bigger purchase later",
        "Planning expenses for a school trip or special event"
      ]
    },
    example: "If you get $10 allowance, you might budget $3 for snacks, $2 for small toys, and $5 to save for a bike. This way, you can enjoy some money now while working toward a bigger goal!",
    detailedExplanation: "A budget is like a roadmap for your money. It helps you make sure you have enough for the things you need, some for things you want, and some to save for future goals. Good budgeting means thinking before you spend and making sure your money lasts.",
    whyItMatters: "Learning to budget helps you make smart money decisions, avoid running out of money for important things, and achieve your financial goals. It's a skill that will help you throughout your entire life.",
    rating: 5,
    quizQuestions: [
      {
        question: "What is the main purpose of a budget?",
        options: [
          "To make spending money more complicated",
          "To plan how to use your money wisely for needs, wants, and savings",
          "To prevent you from ever buying anything fun",
          "To impress other people"
        ],
        correctAnswer: 1,
        explanation: "Perfect! A budget helps you plan how to use your money so you can cover your needs, enjoy some wants, and save for future goals."
      },
      {
        question: "What's the difference between needs and wants?",
        options: [
          "There is no difference",
          "Needs are essential things you must have; wants are things you'd like but can live without",
          "Wants are more important than needs",
          "Needs cost more than wants"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Needs are things you must have to live safely and healthily, while wants are things that would be nice to have but aren't essential."
      },
      {
        question: "Why is it important to include savings in your budget?",
        options: [
          "To make your budget look more complicated",
          "To prepare for future goals and unexpected expenses",
          "Because parents force you to",
          "Savings aren't important in a budget"
        ],
        correctAnswer: 1,
        explanation: "Great thinking! Including savings in your budget helps you prepare for future goals and gives you money for unexpected needs or opportunities."
      }
    ]
  },
  {
    id: 11,
    title: "Interest",
    category: "money",
    difficulty: "intermediate",
    simpleDefinition: "Interest is extra money you can earn by saving money in a bank, or extra money you pay when you borrow money from someone.",
    keyConceptsTitle: "How Interest Works",
    keyConcepts: [
      "Earning Interest: Getting paid for letting the bank use your money",
      "Paying Interest: The cost of borrowing someone else's money",
      "Interest Rate: The percentage that determines how much interest you earn or pay",
      "Compound Interest: Earning interest on your interest over time",
      "Time Factor: The longer you save or borrow, the more interest accumulates"
    ],
    realWorldExamples: {
      title: "Interest in Action",
      examples: [
        "Putting $100 in a savings account and having $105 after one year",
        "A family paying extra money on top of their house loan each month",
        "Credit card companies charging extra if people don't pay their full bill",
        "A student loan that grows larger if payments aren't made",
        "A certificate of deposit that pays more interest for longer commitments"
      ]
    },
    example: "Imagine you put $100 in a savings account that pays 5% interest per year. After one year, the bank gives you $5 extra, so you have $105. That $5 is the interest you earned for letting the bank use your money!",
    detailedExplanation: "Interest is like a reward for saving or a fee for borrowing. When you save money, the bank pays you interest because they can lend your money to other people. When you borrow money, you pay interest because someone else is letting you use their money.",
    whyItMatters: "Understanding interest helps you make smart decisions about saving and borrowing. It shows you how your money can grow over time when you save, and why it's important to be careful about borrowing.",
    rating: 4,
    quizQuestions: [
      {
        question: "What is interest?",
        options: [
          "Money you lose when you save",
          "Extra money earned on savings or paid on borrowed money",
          "A type of bank account",
          "Money that disappears over time"
        ],
        correctAnswer: 1,
        explanation: "Correct! Interest is extra money you can earn when you save or extra money you pay when you borrow."
      },
      {
        question: "Why do banks pay interest on savings accounts?",
        options: [
          "Because they're required to by law",
          "To encourage people to save money with them",
          "Because they have too much money",
          "To make banking more complicated"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Banks pay interest to encourage people to save money with them, which the bank can then lend to other customers."
      },
      {
        question: "What happens to your savings over time with compound interest?",
        options: [
          "Your money shrinks",
          "Your money grows faster because you earn interest on your interest",
          "Nothing changes",
          "Your money disappears"
        ],
        correctAnswer: 1,
        explanation: "Perfect! With compound interest, your money grows faster over time because you earn interest not just on your original savings, but also on the interest you've already earned."
      }
    ]
  },
  {
    id: 12,
    title: "Inflation",
    category: "money",
    difficulty: "intermediate",
    simpleDefinition: "Inflation is when things generally cost more money than they used to, which means your money doesn't buy as much as it did before.",
    keyConceptsTitle: "Understanding Rising Prices",
    keyConcepts: [
      "Price Increases: When the cost of goods and services goes up over time",
      "Purchasing Power: How much you can buy with the same amount of money",
      "Cost of Living: How much money you need for basic necessities",
      "Wage Growth: How salaries might increase to keep up with inflation",
      "Economic Cycles: How inflation is a normal part of economic changes"
    ],
    realWorldExamples: {
      title: "Inflation You Might Notice",
      examples: [
        "A candy bar that cost $1 last year now costs $1.25",
        "Movie tickets becoming more expensive over the years",
        "Your parents talking about how gas prices have gone up",
        "School lunch prices increasing from one year to the next",
        "Grandparents saying things were much cheaper when they were young"
      ]
    },
    example: "Remember when your favorite snack cost 75 cents, but now it costs $1? That's inflation! The same snack costs more money, so your dollar doesn't buy as much as it used to.",
    detailedExplanation: "Inflation happens when there's more demand for things than there are things available, or when it costs more to make products. It's like a slow, gradual increase in prices across many different items. A little inflation is normal and expected in a healthy economy.",
    whyItMatters: "Understanding inflation helps you understand why prices change and why it's important to save and invest your money so it can grow along with rising prices. It also helps explain economic news and family financial decisions.",
    rating: 4,
    quizQuestions: [
      {
        question: "What is inflation?",
        options: [
          "When all prices go down",
          "When prices generally increase over time",
          "When money becomes worth more",
          "When stores close permanently"
        ],
        correctAnswer: 1,
        explanation: "Correct! Inflation is when the general level of prices for goods and services increases over time."
      },
      {
        question: "How does inflation affect your purchasing power?",
        options: [
          "You can buy more with the same amount of money",
          "You can buy less with the same amount of money",
          "It doesn't affect what you can buy",
          "You can only buy expensive things"
        ],
        correctAnswer: 1,
        explanation: "Exactly! When prices go up due to inflation, your money doesn't stretch as far, so you can buy less with the same amount."
      },
      {
        question: "Why might a little inflation be normal in an economy?",
        options: [
          "Because governments want to make life harder",
          "Because it can indicate a growing, active economy",
          "Because stores want to make more money",
          "Because it's always bad for everyone"
        ],
        correctAnswer: 1,
        explanation: "Great understanding! A small amount of inflation often indicates that an economy is growing and active, with people buying goods and services."
      }
    ]
  }
];