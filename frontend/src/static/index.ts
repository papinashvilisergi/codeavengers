type Quiz = {
  id: number;
  name: string;
  questions: Questions[];
};

type Questions = {
  id: number;
  score: number;
  name: string;
  variants: Variant[];
};

type Variant = {
  id: number;
  name: string;
  isCorrect: boolean;
  symbol: string;
};

export const QUIZ: Quiz = {
  id: 1,
  name: "Quiz #2",
  questions: [
    {
      id: 1,
      score: 100,
      name: "რას გვიბრუნებს useState ჰუკი?",
      variants: [
        { id: 1, name: "ობიექტს", isCorrect: false, symbol: "A" },
        { id: 2, name: "მასივს", isCorrect: true, symbol: "B" },
        { id: 3, name: "სტრინგს", isCorrect: false, symbol: "C" },
        { id: 4, name: "ბულეანს", isCorrect: false, symbol: "D" },
      ],
    },
    {
      id: 2,
      score: 100,
      name: "რეაქტში მონაცემები მოძრაობენ იერარქიულად",
      variants: [
        { id: 1, name: "ზემოდან ქვემოთ", isCorrect: true, symbol: "A" },
        { id: 2, name: "ქვემოდან ზემოთ", isCorrect: false, symbol: "B" },
        { id: 3, name: "ორივე მიმართულებით", isCorrect: false, symbol: "C" },
      ],
    },
    {
      id: 3,
      score: 100,
      name: "useState-ის საწყის მნიშვნელობად შეგვიძლია გვქონდეს",
      variants: [
        { id: 1, name: "სტრინგი", isCorrect: false, symbol: "A" },
        { id: 2, name: "ობიექტი", isCorrect: false, symbol: "B" },
        {
          id: 3,
          name: "ნებისმიერი მონაცემის ტიპი",
          isCorrect: true,
          symbol: "C",
        },
      ],
    },
    {
      id: 4,
      score: 100,
      name: "შეგვიძლია თუ არა useState ჰუკის გამოყენება if-ის შიგნით?",
      variants: [
        { id: 1, name: "კი", isCorrect: false, symbol: "A" },
        { id: 2, name: "არა", isCorrect: true, symbol: "B" },
      ],
    },
  ],
};
