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
        question: "In an economy, what happens when a farmer grows vegetables and sells them to a grocery store?",
        options: [
          "The farmer is wasting time because vegetables grow naturally",
          "The farmer is producing goods that will be distributed to consumers",
          "Only the grocery store benefits from this transaction",
          "This activity doesn't count as part of the economy"
        ],
        correctAnswer: 1,
        explanation: "Excellent! The farmer is participating in the economy by producing goods (vegetables) that will be distributed through the grocery store to consumers who need them."
      },
      {
        question: "Why do people in an economy specialize in different jobs instead of everyone doing everything?",
        options: [
          "Because laws require people to have only one job",
          "Because it's more efficient when people focus on what they do best",
          "Because it's impossible to learn multiple skills",
          "Because employers don't want versatile workers"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Specialization makes the economy more efficient because people can focus on developing skills in areas where they're most talented and productive."
      },
      {
        question: "What role do consumers play in keeping an economy healthy?",
        options: [
          "Consumers should avoid spending money to save the economy",
          "Consumers create demand for goods and services by purchasing them",
          "Consumers only hurt the economy by taking resources",
          "Consumers have no real impact on economic activity"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Consumers drive economic activity by creating demand for goods and services, which encourages businesses to produce and hire workers."
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
        question: "A new smartphone is released with only 1,000 units available, but 10,000 people want to buy it. What will likely happen to the price?",
        options: [
          "The price will decrease because there aren't enough phones",
          "The price will increase due to high demand and low supply",
          "The price will stay exactly the same regardless of demand",
          "The company will give the phones away for free"
        ],
        correctAnswer: 1,
        explanation: "Correct! When demand (10,000 people) far exceeds supply (1,000 phones), the price typically increases because people are willing to pay more to get the limited product."
      },
      {
        question: "During summer, many farms produce watermelons, but it's also when most people want to eat them. What determines the final price?",
        options: [
          "Only the number of watermelons produced",
          "Only how many people want watermelons",
          "The balance between how many are produced and how many people want them",
          "The government sets all watermelon prices"
        ],
        correctAnswer: 2,
        explanation: "Excellent! The price is determined by the interaction between supply (how many watermelons are produced) and demand (how many people want them). Both factors work together."
      },
      {
        question: "Why might a store put winter coats on sale in March?",
        options: [
          "Because winter coats become more popular in spring",
          "Because demand for winter coats decreases as weather gets warmer",
          "Because it costs more to make coats in March",
          "Because the government requires spring sales"
        ],
        correctAnswer: 1,
        explanation: "Smart thinking! As spring arrives, demand for winter coats drops significantly, so stores lower prices to encourage people to buy their remaining inventory."
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
        question: "Maya notices that students at her school often forget their lunch money. What would be an entrepreneurial solution?",
        options: [
          "Tell the principal to solve the problem",
          "Create a lunch money reminder app or service",
          "Ignore the problem since it doesn't affect her",
          "Complain about forgetful students"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Creating a solution like a reminder app shows entrepreneurial thinking - identifying a problem and developing an innovative way to solve it."
      },
      {
        question: "What's the biggest difference between an employee and an entrepreneur?",
        options: [
          "Employees work harder than entrepreneurs",
          "Entrepreneurs create new businesses while employees work for existing ones",
          "Employees make more money than entrepreneurs",
          "Entrepreneurs never have to work with other people"
        ],
        correctAnswer: 1,
        explanation: "Excellent! The key difference is that entrepreneurs start and create new businesses, taking on the risks and rewards, while employees work within existing businesses."
      },
      {
        question: "Why do entrepreneurs often fail at first but keep trying?",
        options: [
          "Because they enjoy failing",
          "Because they learn from mistakes and believe in their vision",
          "Because they have nothing better to do",
          "Because failure is the only way to make money"
        ],
        correctAnswer: 1,
        explanation: "Great understanding! Successful entrepreneurs view failures as learning opportunities and persist because they believe their ideas can eventually succeed and help people."
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
        question: "In a school election for class president, what makes it democratic?",
        options: [
          "The teacher chooses who wins",
          "Every student gets one equal vote to choose their representative",
          "Only the smartest students can vote",
          "The principal decides without asking anyone"
        ],
        correctAnswer: 1,
        explanation: "Exactly right! Democracy means every person gets an equal vote to choose their representatives, making everyone's voice count the same."
      },
      {
        question: "What should happen if you disagree with a democratic decision in your community?",
        options: [
          "You should ignore all future votes",
          "You can peacefully express your views and participate in future decisions",
          "You should try to stop others from voting",
          "You must move to a different community"
        ],
        correctAnswer: 1,
        explanation: "Perfect! In a democracy, you have the right to express disagreement peacefully and continue participating to influence future decisions."
      },
      {
        question: "Why is it important that everyone can speak freely in a democracy?",
        options: [
          "So people can say whatever they want without consequences",
          "So citizens can share ideas and make informed voting decisions",
          "So there's always arguing and conflict",
          "So leaders don't have to make any decisions"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Free speech allows people to share different ideas and information, helping everyone make better-informed decisions when they vote."
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
        question: "Why does a constitution limit what government leaders can do?",
        options: [
          "To make their jobs more difficult",
          "To prevent any one person or group from having too much power",
          "To confuse people about government",
          "To make sure nothing ever gets done"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Constitutional limits prevent the concentration of power and protect citizens from potential abuse by ensuring no single person or group can control everything."
      },
      {
        question: "What happens if a government law conflicts with the constitution?",
        options: [
          "The law automatically becomes more important",
          "The constitution must be ignored",
          "The constitutional rule takes priority over the regular law",
          "Both rules apply at the same time"
        ],
        correctAnswer: 2,
        explanation: "Correct! The constitution is the supreme law, so any regular law that conflicts with it is invalid. This protects fundamental rights and principles."
      },
      {
        question: "Why might it be good that constitutions are difficult to change?",
        options: [
          "So that important rights and principles remain stable and protected",
          "To make lawyers more money",
          "To prevent any progress in society",
          "Because old ideas are always better than new ones"
        ],
        correctAnswer: 0,
        explanation: "Great thinking! Making constitutions hard to change protects fundamental rights from being removed during temporary political changes or emotional moments."
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
        question: "If you see a classmate being bullied, what would good citizenship look like?",
        options: [
          "Ignore it because it's not your problem",
          "Join in the bullying to fit in",
          "Stand up for the classmate or get help from an adult",
          "Laugh and walk away"
        ],
        correctAnswer: 2,
        explanation: "Perfect! Good citizenship means protecting others' rights and helping create a safe community for everyone, even when it's not directly affecting you."
      },
      {
        question: "What's the relationship between rights and responsibilities in citizenship?",
        options: [
          "Rights are more important than responsibilities",
          "They work together - rights protect you while responsibilities help protect others",
          "Responsibilities are just suggestions you can ignore",
          "Only adults have responsibilities"
        ],
        correctAnswer: 1,
        explanation: "Excellent understanding! Rights and responsibilities balance each other - your rights are protected when everyone fulfills their responsibilities to respect and help others."
      },
      {
        question: "How can young people practice good citizenship in their community?",
        options: [
          "Wait until they're adults to get involved",
          "Only focus on their own needs and wants",
          "Volunteer, help neighbors, and participate in community activities",
          "Avoid all community events and activities"
        ],
        correctAnswer: 2,
        explanation: "Great answer! Young people can practice citizenship by actively helping their community through volunteering, being helpful neighbors, and participating in community life."
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
        question: "Your friend's family celebrates New Year in January, but another friend's family celebrates it in February. What does this show about culture?",
        options: [
          "One family is celebrating at the wrong time",
          "Different cultures have different traditions and ways of marking important events",
          "Only one way of celebrating should be allowed",
          "Families should all celebrate the same way"
        ],
        correctAnswer: 1,
        explanation: "Perfect! This shows how different cultures have their own unique traditions and ways of celebrating, which makes our world rich and diverse."
      },
      {
        question: "Why might two families from different cultures prepare food differently, even when making similar dishes?",
        options: [
          "One family doesn't know how to cook properly",
          "Cultural traditions influence cooking methods, spices, and ingredients used",
          "It doesn't matter how food is prepared",
          "All families should cook exactly the same way"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Cultural background influences cooking traditions, including which spices, techniques, and ingredients are preferred, creating wonderful variety in food."
      },
      {
        question: "What's the best way to learn about a culture different from your own?",
        options: [
          "Assume it's exactly like your culture",
          "Ask respectful questions and participate in cultural events when invited",
          "Ignore differences and pretend they don't exist",
          "Judge it based on your own cultural standards"
        ],
        correctAnswer: 1,
        explanation: "Great approach! Learning about other cultures requires curiosity, respect, and openness to experiencing new traditions and perspectives."
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
        question: "What happens when a natural disaster affects a strong community?",
        options: [
          "Everyone only takes care of themselves",
          "People work together to help each other recover and rebuild",
          "The community falls apart immediately",
          "Only government officials provide help"
        ],
        correctAnswer: 1,
        explanation: "Exactly! Strong communities show their true strength during difficult times by supporting each other, sharing resources, and working together to recover."
      },
      {
        question: "Why might someone choose to join a community garden in their neighborhood?",
        options: [
          "To avoid talking to neighbors",
          "To connect with neighbors while growing food and beautifying the area",
          "To take all the vegetables for themselves",
          "To prove they're better at gardening than others"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Community gardens bring people together around shared interests while improving the neighborhood and building relationships."
      },
      {
        question: "What makes an online gaming community different from a neighborhood community?",
        options: [
          "Online communities aren't real communities",
          "They connect through shared interests rather than shared location",
          "Online communities never help each other",
          "There are no differences between them"
        ],
        correctAnswer: 1,
        explanation: "Great observation! While neighborhood communities are based on shared location, online communities form around shared interests, hobbies, or goals."
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
        question: "How has the internet changed the way people around the world connect?",
        options: [
          "It has made global communication slower and more expensive",
          "It allows instant communication and collaboration across continents",
          "It only connects people within the same country",
          "It has made international connections impossible"
        ],
        correctAnswer: 1,
        explanation: "Excellent! The internet has revolutionized global communication, allowing people to instantly connect, share ideas, and collaborate regardless of distance."
      },
      {
        question: "What might be a challenge of globalization for local businesses?",
        options: [
          "They get more customers from around the world",
          "They face competition from international companies",
          "They never have to change their products",
          "They automatically become more profitable"
        ],
        correctAnswer: 1,
        explanation: "Smart thinking! While globalization creates opportunities, local businesses may face increased competition from international companies with different advantages."
      },
      {
        question: "How does globalization affect cultural exchange?",
        options: [
          "It prevents cultures from sharing with each other",
          "It allows cultures to share and influence each other more easily",
          "It makes all cultures exactly the same",
          "It only affects business, not culture"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Globalization facilitates cultural exchange, allowing people to share music, food, traditions, and ideas across borders, enriching all cultures involved."
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
        question: "You have $20 and want to buy a $15 video game, but you also need $8 for lunch this week. What should your budget decision be?",
        options: [
          "Buy the game and skip lunch",
          "Prioritize lunch money and save the remaining $12 for the game later",
          "Borrow money from friends to buy both",
          "Spend all $20 on candy instead"
        ],
        correctAnswer: 1,
        explanation: "Excellent budgeting! Prioritizing needs (lunch) over wants (video game) and saving the remainder shows smart financial planning."
      },
      {
        question: "What's the benefit of writing down your budget instead of just keeping it in your head?",
        options: [
          "It makes budgeting more complicated",
          "It helps you track spending and stick to your plan",
          "It's only useful for adults",
          "It doesn't make any difference"
        ],
        correctAnswer: 1,
        explanation: "Perfect! Writing down your budget helps you remember your plan, track your progress, and make better spending decisions."
      },
      {
        question: "Why is it important to include savings in your budget, even if it's a small amount?",
        options: [
          "To impress other people",
          "To build the habit of saving and prepare for future goals",
          "Because banks require it",
          "Savings aren't important for young people"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Even small amounts of savings help build good financial habits and prepare you for future opportunities or unexpected needs."
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
        question: "If you save $50 in an account that earns 4% interest per year, how much extra money will you have after one year?",
        options: [
          "$4",
          "$2",
          "$54",
          "$46"
        ],
        correctAnswer: 0,
        explanation: "Correct! 4% of $50 is $2, so you'll earn $2 in interest, giving you $52 total. Wait, let me recalculate: 4% of $50 = 0.04 × $50 = $2. So you'll have $52 total, earning $2 in interest."
      },
      {
        question: "What is compound interest and why is it powerful for savers?",
        options: [
          "Interest that decreases over time",
          "Interest earned on both your original money and previously earned interest",
          "Interest that only applies to large amounts",
          "Interest that banks charge for keeping your money"
        ],
        correctAnswer: 1,
        explanation: "Excellent! Compound interest means you earn interest on your interest, which makes your money grow faster over time - like a snowball rolling downhill!"
      },
      {
        question: "Why might someone choose a savings account with 3% interest over one with 1% interest?",
        options: [
          "The 1% account is actually better",
          "Higher interest rates help your money grow faster",
          "Interest rates don't matter for savings",
          "Lower interest is always safer"
        ],
        correctAnswer: 1,
        explanation: "Smart thinking! Higher interest rates mean your money grows faster over time, helping you reach your savings goals more quickly."
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
        question: "Your grandmother says she bought her first car for $3,000, but the same type of car costs $30,000 today. What economic concept explains this?",
        options: [
          "Cars have gotten much worse over time",
          "Inflation has increased prices over many years",
          "Your grandmother is remembering incorrectly",
          "Car companies are trying to trick people"
        ],
        correctAnswer: 1,
        explanation: "Perfect! This is a classic example of inflation - the same type of product costs much more today than it did decades ago due to the gradual increase in prices over time."
      },
      {
        question: "If inflation is 3% per year and your allowance stays the same, what happens to your purchasing power?",
        options: [
          "You can buy more things with the same allowance",
          "You can buy slightly less each year as prices rise",
          "Your purchasing power stays exactly the same",
          "Inflation doesn't affect allowances"
        ],
        correctAnswer: 1,
        explanation: "Excellent understanding! If prices rise 3% but your allowance doesn't increase, you can afford slightly less each year because things cost more."
      },
      {
        question: "Why might a small amount of inflation actually be good for an economy?",
        options: [
          "It makes everything more expensive for no reason",
          "It can indicate that people are buying things and the economy is growing",
          "It always hurts everyone equally",
          "It makes saving money pointless"
        ],
        correctAnswer: 1,
        explanation: "Great insight! Moderate inflation often indicates a healthy, growing economy where people are confident enough to spend money, creating demand that drives business growth."
      }
    ]
  }
];