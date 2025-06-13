/*
  # Seed Initial Data for BizzyBrain

  1. Insert sample terms
  2. Insert quiz questions for terms
  3. Insert learning paths and steps
  4. Set up initial data structure
*/

-- Insert sample terms
INSERT INTO terms (title, category, difficulty, simple_definition, example, detailed_explanation, why_it_matters, rating, estimated_read_time) VALUES
('Economy', 'economics', 'beginner', 'The economy is like a giant community where people make, buy, and sell things to each other.', 'Think of your neighborhood! People work at different jobs, buy groceries, and provide services like haircuts. All of this activity together is the economy.', 'An economy is a system where people produce goods and services, and then trade them with others. It includes all the buying, selling, and making that happens in a community, country, or even the whole world.', 'Understanding the economy helps you see how everything is connected - from your allowance to global trade.', 5, 8),

('Democracy', 'government', 'beginner', 'Democracy is when everyone gets to vote and have a say in how things are run, like choosing class president.', 'If your class votes on which movie to watch during free time, that''s democracy in action! Everyone''s vote counts equally.', 'Democracy is a form of government where citizens have the power to make decisions through voting. People elect representatives who make laws and decisions on their behalf.', 'Democracy ensures everyone has a voice and can participate in shaping the rules and leaders of their community.', 5, 7),

('Inflation', 'money', 'intermediate', 'Inflation is when things cost more money than they used to - like when candy that cost 50 cents now costs 75 cents.', 'If your favorite video game used to cost $20 but now costs $25 for the exact same game, that''s inflation.', 'Inflation occurs when the general price level of goods and services increases over time, reducing the purchasing power of money. This means your money buys less than it used to.', 'Understanding inflation helps you plan for the future and understand why saving and investing money is important.', 4, 10),

('Supply and Demand', 'economics', 'intermediate', 'Supply is how much of something is available, and demand is how much people want it. Together they decide the price.', 'If there are only 10 tickets to a concert (low supply) but 100 people want them (high demand), the tickets will be expensive!', 'Supply and demand is a fundamental economic principle. When demand is high and supply is low, prices go up. When supply is high and demand is low, prices go down.', 'This concept explains why prices change and helps you understand market behavior in everything from toys to houses.', 5, 12),

('Culture', 'social', 'beginner', 'Culture is all the traditions, foods, languages, and ways of life that make each group of people special and unique.', 'Your family''s culture might include special holiday traditions, foods you eat, stories you tell, and languages you speak.', 'Culture encompasses the beliefs, customs, arts, food, language, and social behaviors shared by a group of people. It''s passed down through generations and shapes how people see the world.', 'Understanding culture helps us appreciate diversity and learn from different ways of life around the world.', 4, 6),

('Budget', 'money', 'beginner', 'A budget is a plan for how to spend your money wisely, like deciding how much allowance to save and how much to spend.', 'If you get $10 allowance, you might budget $3 for toys, $2 for snacks, and $5 to save for something big later.', 'A budget is a financial plan that tracks income and expenses over a specific period. It helps ensure you don''t spend more than you earn and can save for future goals.', 'Learning to budget early helps you make smart money decisions and achieve your financial goals throughout life.', 5, 5),

('Constitution', 'government', 'intermediate', 'A constitution is like a rulebook that explains how a country should be run and what rights people have.', 'Just like your school has rules about behavior and homework, a country''s constitution has rules about laws and government.', 'A constitution is the supreme law of a country that establishes the framework of government, defines the powers of different branches, and protects citizens'' rights.', 'The constitution protects your freedoms and ensures the government follows fair rules when making decisions.', 4, 12),

('Entrepreneurship', 'economics', 'intermediate', 'Entrepreneurship is starting your own business, like opening a lemonade stand or creating a new app.', 'If you notice kids at school need pencils and start selling them for a small profit, you''re being an entrepreneur!', 'Entrepreneurship involves identifying opportunities, taking risks, and creating new businesses or innovations to solve problems or meet needs in the market.', 'Entrepreneurs drive innovation and economic growth by creating new products, services, and jobs.', 5, 15),

('Citizenship', 'social', 'beginner', 'Citizenship means being a member of a country or community and having both rights and responsibilities.', 'As a citizen, you have the right to go to school and the responsibility to follow laws and help your community.', 'Citizenship involves legal membership in a country, granting certain rights (like voting) and requiring certain duties (like following laws and paying taxes).', 'Good citizenship helps create strong, fair communities where everyone can thrive and contribute.', 4, 8),

('Interest', 'money', 'intermediate', 'Interest is extra money you can earn by saving in a bank, or extra money you pay when borrowing.', 'If you put $100 in a savings account and the bank pays 5% interest, you''ll have $105 after one year!', 'Interest is the cost of borrowing money or the reward for saving money. It''s calculated as a percentage of the principal amount over time.', 'Understanding interest helps you make smart decisions about saving, investing, and borrowing money.', 4, 10),

('Taxes', 'government', 'intermediate', 'Taxes are money people pay to the government to fund public services like schools, roads, and hospitals.', 'When you buy something at a store, you often pay a little extra in sales tax that goes to the government for community needs.', 'Taxes are mandatory payments to the government based on income, purchases, or property ownership. They fund public goods and services that benefit society.', 'Taxes make it possible for governments to provide essential services that help everyone in the community.', 4, 9),

('Globalization', 'social', 'advanced', 'Globalization means countries around the world becoming more connected through trade, technology, and culture.', 'Your phone might be made in one country, your clothes in another, and your favorite app created somewhere else - that''s globalization!', 'Globalization is the process by which businesses, cultures, and governments become interconnected across national borders through trade, communication, and technology.', 'Globalization affects everything from the products we buy to the opportunities we have, making the world more interconnected.', 3, 18);

-- Insert quiz questions for terms
INSERT INTO quiz_questions (term_id, question, options, correct_answer, explanation, difficulty, order_index) VALUES
-- Economy questions
(1, 'What is the main idea behind the economy?', '["It''s only about money", "It affects how people live and work together", "It''s too complicated for kids", "It only matters to adults"]', 1, 'Great! The economy affects how people interact and make decisions in their daily lives.', 'beginner', 1),
(1, 'Which example best shows economic activity?', '["Playing video games alone", "Buying lunch at school", "Sleeping", "Watching TV"]', 1, 'Exactly! Buying lunch involves exchanging money for goods, which is economic activity.', 'beginner', 2),
(1, 'Why is it important to understand the economy?', '["It''s not really important", "It helps us make better decisions", "Only teachers need to know it", "It''s just for tests"]', 1, 'Perfect! Understanding the economy helps us become better decision-makers and citizens.', 'beginner', 3),

-- Democracy questions
(2, 'What is the main principle of democracy?', '["One person makes all decisions", "Everyone gets to vote and participate", "Only adults can participate", "Decisions are made randomly"]', 1, 'Correct! Democracy is about everyone having a voice in decisions.', 'beginner', 1),
(2, 'Which is an example of democracy in action?', '["A teacher assigning homework", "Students voting for class president", "Following school rules", "Taking a test"]', 1, 'Great! Voting for class president is a perfect example of democratic participation.', 'beginner', 2),
(2, 'Why is democracy important?', '["It''s faster than other systems", "It ensures everyone has a voice", "It''s easier to understand", "It requires less work"]', 1, 'Excellent! Democracy ensures that everyone can participate in shaping their community.', 'beginner', 3),

-- Budget questions
(6, 'What is a budget?', '["A type of money", "A plan for spending money", "A bank account", "A credit card"]', 1, 'Correct! A budget is a plan that helps you decide how to spend your money wisely.', 'beginner', 1),
(6, 'If you have $10 allowance and want to save half, how much can you spend?', '["$10", "$5", "$15", "$2"]', 1, 'Right! If you save half of $10, you have $5 left to spend.', 'beginner', 2),
(6, 'Why is budgeting important?', '["It makes money grow", "It helps you plan and save", "It''s required by law", "It''s only for adults"]', 1, 'Perfect! Budgeting helps you plan your spending and save for future goals.', 'beginner', 3);

-- Insert learning paths
INSERT INTO learning_paths (title, description, category, difficulty, estimated_time, icon, color, order_index) VALUES
('Money Basics', 'Learn the fundamentals of money, saving, and spending wisely', 'money', 'beginner', '30 min', '💰', 'green', 1),
('How Government Works', 'Discover how countries are organized and run', 'government', 'beginner', '45 min', '🏛️', 'blue', 2),
('Economics for Kids', 'Explore how the economy works in simple terms', 'economics', 'beginner', '40 min', '📈', 'purple', 3),
('Understanding Society', 'Learn about culture, citizenship, and community', 'social', 'beginner', '35 min', '👥', 'teal', 4);

-- Insert learning path steps
INSERT INTO learning_path_steps (learning_path_id, title, description, order_index, estimated_time, difficulty, term_ids) VALUES
-- Money Basics path
(1, 'What is Money?', 'Understanding what money is and why we use it', 1, '5 min', 'beginner', '{6}'),
(1, 'Making a Budget', 'Learn how to plan your spending and saving', 2, '8 min', 'beginner', '{6}'),
(1, 'Saving Money', 'Why saving is important and how to do it', 3, '6 min', 'beginner', '{10}'),
(1, 'Understanding Interest', 'How your money can grow when you save it', 4, '10 min', 'intermediate', '{10}'),

-- Government path
(2, 'What is Democracy?', 'Understanding how people choose their leaders', 1, '7 min', 'beginner', '{2}'),
(2, 'The Constitution', 'The rules that guide how government works', 2, '12 min', 'intermediate', '{7}'),
(2, 'Voting and Elections', 'How people choose their representatives', 3, '8 min', 'beginner', '{2, 9}'),
(2, 'Laws and Taxes', 'Why we have laws and how they are funded', 4, '10 min', 'intermediate', '{7, 11}'),
(2, 'Being a Good Citizen', 'What it means to be a responsible citizen', 5, '6 min', 'beginner', '{9}'),

-- Economics path
(3, 'What is an Economy?', 'Understanding how people trade and work together', 1, '8 min', 'beginner', '{1}'),
(3, 'Supply and Demand', 'Why prices go up and down', 2, '12 min', 'intermediate', '{4}'),
(3, 'Starting a Business', 'How people create new businesses', 3, '15 min', 'intermediate', '{8}'),
(3, 'Global Economy', 'How countries trade with each other', 4, '18 min', 'advanced', '{12}'),

-- Society path
(4, 'Understanding Culture', 'What makes different groups of people unique', 1, '8 min', 'beginner', '{5}'),
(4, 'Being a Citizen', 'Rights and responsibilities in your community', 2, '10 min', 'beginner', '{9}'),
(4, 'Global Connections', 'How the world is becoming more connected', 3, '12 min', 'intermediate', '{12}'),
(4, 'Making a Difference', 'How you can contribute to your community', 4, '8 min', 'beginner', '{5, 9}');