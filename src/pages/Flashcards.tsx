import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { ChevronRight, ChevronLeft, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";

// Define types for our data structures
type Confidence = "low" | "medium" | "high";

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  confidence: Confidence;
  lastReviewed: Date | null;
  reviewCount: number;
  nextReviewDate: Date;
};

type ProgrammingLanguage = {
  id: string;
  name: string;
  icon: string; // Path to the icon
  description: string;
  color: string; // For styling
  flashcards: Flashcard[];
};

// Sample flashcard data for each programming language
const programmingLanguages: ProgrammingLanguage[] = [
  {
    id: "python",
    name: "Python",
    icon: "/images/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
    description: "A high-level, interpreted programming language known for its readability and versatility.",
    color: "bg-blue-500",
    flashcards: [
      {
        id: "py1",
        question: "What is a Python decorator?",
        answer: "A decorator is a design pattern in Python that allows a user to add new functionality to an existing object without modifying its structure. Decorators are usually called before the definition of a function you want to decorate.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "py2",
        question: "Explain list comprehensions in Python.",
        answer: "List comprehensions provide a concise way to create lists based on existing lists. They consist of brackets containing an expression followed by a for clause, then zero or more for or if clauses. Example: [x**2 for x in range(10) if x % 2 == 0]",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "py3",
        question: "What are Python generators?",
        answer: "Generators are functions that return an iterable set of items, one at a time, in a special way. They generate values on the fly and do not store in memory. They use the yield statement instead of return.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "py4",
        question: "Explain the *args and **kwargs concepts in Python.",
        answer: "*args allows you to pass a variable number of positional arguments to a function. **kwargs allows you to pass a variable number of keyword arguments. Together they enable flexible function definitions.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "py5",
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        answer: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. It makes multi-threaded CPU-bound programs slower than single-threaded ones in CPython.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "/images/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
    description: "The programming language of the web, used to create interactive effects within web browsers.",
    color: "bg-yellow-500",
    flashcards: [
      {
        id: "js1",
        question: "What is closure in JavaScript?",
        answer: "A closure is a function that has access to its own scope, the scope of the outer function, and the global scope. It preserves the outer function's scope even after the outer function has returned.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "js2",
        question: "Explain the difference between '==' and '===' in JavaScript.",
        answer: "== compares values for equality after converting them to a common type (loose equality). === compares both value and type without conversion (strict equality). Always prefer === for more predictable code.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "js3",
        question: "What are JavaScript promises?",
        answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation. They provide a cleaner alternative to callbacks for handling asynchronous operations, with .then(), .catch(), and .finally() methods.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "js4",
        question: "What is event bubbling in JavaScript?",
        answer: "Event bubbling is when an event triggers on the deepest target element, then propagates up the DOM tree, triggering on each parent element until it reaches the document root or is explicitly stopped.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "js5",
        question: "Explain async/await in JavaScript.",
        answer: "async/await is syntactic sugar for promises, making asynchronous code look and behave more like synchronous code. An async function returns a promise, and the await keyword pauses execution until the promise is resolved or rejected.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    icon: "/images/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
    description: "A class-based, object-oriented programming language designed for portability and cross-platform development.",
    color: "bg-red-500",
    flashcards: [
      {
        id: "java1",
        question: "What is the difference between JDK, JRE, and JVM in Java?",
        answer: "JDK (Java Development Kit) includes development tools and JRE. JRE (Java Runtime Environment) includes JVM and libraries. JVM (Java Virtual Machine) executes Java bytecode and provides platform independence.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "java2",
        question: "Explain the concept of Java interfaces.",
        answer: "Interfaces in Java are abstract types that specify a behavior that classes must implement. They can contain method signatures, default methods, static methods, and constants. A class can implement multiple interfaces.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "java3",
        question: "What is the difference between method overloading and method overriding in Java?",
        answer: "Method overloading occurs when multiple methods have the same name but different parameters in the same class. Method overriding happens when a subclass provides a specific implementation of a method already defined in its parent class.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "java4",
        question: "What are Java exceptions? Distinguish between checked and unchecked exceptions.",
        answer: "Exceptions are events that disrupt program flow. Checked exceptions must be handled with try-catch or declared in method signature (e.g. IOException). Unchecked exceptions (RuntimeException subclasses) don't require explicit handling.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "java5",
        question: "Explain Java's garbage collection mechanism.",
        answer: "Garbage collection automatically reclaims memory by destroying unused objects. The JVM periodically identifies objects no longer referenced and frees their memory. Programmers cannot force garbage collection but can suggest it with System.gc().",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      }
    ]
  },
  {
    id: "c",
    name: "C",
    icon: "/images/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
    description: "A general-purpose, procedural programming language supporting structured programming.",
    color: "bg-blue-700",
    flashcards: [
      {
        id: "c1",
        question: "What is a pointer in C programming?",
        answer: "A pointer is a variable that stores the memory address of another variable. Pointers are declared using the * operator. They allow direct memory manipulation and efficient passing of large data structures.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "c2",
        question: "Explain the difference between malloc() and calloc() functions in C.",
        answer: "Both functions allocate memory dynamically, but malloc() allocates a single block of memory, while calloc() allocates multiple blocks of the same size and initializes them to zero. malloc(size) vs calloc(num, size).",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "c3",
        question: "What is the purpose of the 'static' keyword in C?",
        answer: "The static keyword has several uses: 1) For local variables, it preserves value between function calls, 2) For global variables/functions, it limits scope to the file, making them inaccessible from other files.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "c4",
        question: "What are macros in C? How do they differ from functions?",
        answer: "Macros are preprocessor directives defined using #define. They perform text substitution before compilation. Unlike functions, macros have no type checking, no overhead of function calls, but can lead to unexpected behavior if not carefully designed.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "c5",
        question: "What is the difference between structures and unions in C?",
        answer: "Structures allocate memory for all members separately, allowing access to all fields simultaneously. Unions allocate memory that is shared by all members, meaning only one member can be accessed at a time, and the size equals the largest member.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    icon: "/images/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
    description: "An extension of the C language that adds object-oriented features like classes and inheritance.",
    color: "bg-blue-600",
    flashcards: [
      {
        id: "cpp1",
        question: "What are the differences between C and C++?",
        answer: "C++ extends C by adding features like classes, objects, inheritance, polymorphism, encapsulation, templates, exception handling, and namespaces. C++ is object-oriented while C is procedural. C++ has a stronger type checking system.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "cpp2",
        question: "Explain constructor overloading in C++.",
        answer: "Constructor overloading allows a class to have multiple constructors with different parameter lists. The compiler selects the appropriate constructor based on the arguments provided during object creation. This enables flexible object initialization.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "cpp3",
        question: "What are virtual functions in C++?",
        answer: "Virtual functions enable polymorphism in C++. They are declared with the 'virtual' keyword in the base class and can be overridden in derived classes. When called through a base class pointer/reference, the correct derived class implementation is executed.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "cpp4",
        question: "What is the difference between new/delete and malloc/free in C++?",
        answer: "new/delete are operators that allocate memory and call constructors/destructors for objects. malloc/free are C functions that only allocate/free memory without initialization. new throws exceptions on failure while malloc returns NULL.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      },
      {
        id: "cpp5",
        question: "Explain the Rule of Three (or Five) in C++.",
        answer: "The Rule of Three states that if a class needs a custom destructor, copy constructor, or copy assignment operator, it likely needs all three. The Rule of Five (in C++11) adds move constructor and move assignment operator to handle resource management properly.",
        confidence: "medium",
        lastReviewed: null,
        reviewCount: 0,
        nextReviewDate: new Date()
      }
    ]
  }
];

const Flashcards = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<ProgrammingLanguage | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewMode, setReviewMode] = useState<"study" | "quiz">("study");
  const [feedback, setFeedback] = useState<{ type: Confidence | null, key: number }>({ type: null, key: 0 });
  const [studyFeedback, setStudyFeedback] = useState<{ show: boolean, key: number }>({ show: false, key: 0 });
  const flipTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedLanguage) {
      setIsLoading(true);
      // Simulate API call to fetch flashcards
      setTimeout(() => {
        const language = programmingLanguages.find(lang => lang.id === selectedLanguage);
        if (language) {
          setCurrentLanguage(language);
          setFlashcards(language.flashcards);
          setCurrentCardIndex(0);
          setIsFlipped(false);
        }
        setIsLoading(false);
      }, 600);
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      toast({
        title: "End of deck reached",
        description: "You've gone through all flashcards in this deck."
      });
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && reviewMode === "study") {
      setStudyFeedback({ show: true, key: Date.now() });
      if (flipTimeout.current) clearTimeout(flipTimeout.current);
      flipTimeout.current = setTimeout(() => {
        setIsFlipped(false);
        setStudyFeedback({ show: false, key: 0 });
      }, 4000);
    }
  };

  const handleUpdateConfidence = (confidence: Confidence) => {
    setFeedback({ type: confidence, key: Date.now() });
    setIsFlipped(true); // Show answer side
    if (flipTimeout.current) clearTimeout(flipTimeout.current);
    flipTimeout.current = setTimeout(() => {
      setIsFlipped(false); // Flip back after 2 seconds
      setFeedback({ type: null, key: 0 });
      if (flashcards.length > 0) {
        const updatedFlashcards = [...flashcards];
        const card = { ...updatedFlashcards[currentCardIndex] };
        card.confidence = confidence;
        card.lastReviewed = new Date();
        card.reviewCount += 1;
        // Set next review date based on confidence
        const now = new Date();
        if (confidence === "high") {
          card.nextReviewDate = new Date(now.setDate(now.getDate() + 7));
        } else if (confidence === "medium") {
          card.nextReviewDate = new Date(now.setDate(now.getDate() + 3));
        } else {
          card.nextReviewDate = new Date(now.setDate(now.getDate() + 1));
        }
        updatedFlashcards[currentCardIndex] = card;
        setFlashcards(updatedFlashcards);
        toast({
          title: `Confidence set to ${confidence}`,
          description: "We'll adjust your review schedule accordingly."
        });
        // Move to next card after flip back
        setTimeout(() => {
          if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
          }
        }, 350); // Small delay to allow flip animation before next card
      }
    }, 2000);
  };

  const resetDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    toast({
      title: "Deck reset",
      description: "Starting from the first card."
    });
  };

  useEffect(() => {
    return () => {
      if (flipTimeout.current) clearTimeout(flipTimeout.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold sm:text-4xl mb-4 text-gray-900 dark:text-white">Interactive Programming Flashcards</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Test and improve your knowledge with our curated collection of programming flashcards.
            </p>
          </div>

          {!selectedLanguage ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {programmingLanguages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang.id)}
                  className={cn(
                    "p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg text-white",
                    lang.color
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 mr-4">
                      <img src={lang.icon} alt={lang.name} className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{lang.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{lang.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{lang.flashcards.length} flashcards</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <div className="flex items-center mb-4 sm:mb-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedLanguage(null)}
                    className="mr-2"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Languages
                  </Button>
                  
                  {currentLanguage && (
                    <div className={cn(
                      "py-1 px-3 rounded-full text-white text-sm flex items-center",
                      currentLanguage.color
                    )}>
                      <img 
                        src={currentLanguage.icon} 
                        alt={currentLanguage.name} 
                        className="w-4 h-4 mr-2"
                      />
                      {currentLanguage.name}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Tabs value={reviewMode} onValueChange={(value) => setReviewMode(value as "study" | "quiz")}>
                    <TabsList>
                      <TabsTrigger value="study">Study Mode</TabsTrigger>
                      <TabsTrigger value="quiz">Quiz Mode</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pulse-500"></div>
                </div>
              ) : flashcards.length > 0 ? (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Card {currentCardIndex + 1} of {flashcards.length}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetDeck}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>

                  <div className="h-96 perspective-1000">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentCardIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        style={{ willChange: 'transform, opacity' }}
                        className="w-full h-full"
                      >
                        <Card
                          className={cn(
                            "w-full h-full cursor-pointer transform-style-3d transition-transform duration-500 relative",
                            isFlipped && "rotate-y-180"
                          )}
                          onClick={handleFlipCard}
                        >
                          {/* Front of card */}
                          <CardContent className={cn(
                            "absolute inset-0 backface-hidden flex flex-col justify-center items-center p-8 text-center",
                            `border-t-4 ${currentLanguage?.color}`
                          )}>
                            <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                              {flashcards[currentCardIndex].question}
                            </h3>
                            <div className="mt-auto text-sm text-gray-600 dark:text-gray-400">
                              Click to reveal answer
                            </div>
                          </CardContent>
                          
                          {/* Back of card */}
                          <CardContent className={cn(
                            "absolute inset-0 backface-hidden rotate-y-180 overflow-y-auto p-8",
                            `border-t-4 ${currentLanguage?.color}`
                          )}>
                            <h4 className="text-lg font-medium mb-4 dark:text-gray-100">Answer:</h4>
                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                              {flashcards[currentCardIndex].answer}
                            </p>
                            {/* Study mode emoji feedback */}
                            <AnimatePresence mode="wait">
                              {reviewMode === "study" && studyFeedback.show && (
                                <motion.div
                                  key={studyFeedback.key}
                                  initial={{ opacity: 0, y: 30, scale: 0.7 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -30, scale: 0.7 }}
                                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                                  style={{ willChange: 'transform, opacity' }}
                                  className="flex flex-col items-center justify-center my-6"
                                >
                                  <span className="text-5xl animate-bounce">👀</span>
                                  <span className="mt-2 text-lg font-semibold text-center text-gray-800 dark:text-white">
                                    Nice! Keep going!
                                  </span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            {/* Emoji Feedback - now centered below answer */}
                            <AnimatePresence mode="wait">
                              {reviewMode === "quiz" && feedback.type && (
                                <motion.div
                                  key={feedback.key}
                                  initial={{ opacity: 0, y: 30, scale: 0.7 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -30, scale: 0.7 }}
                                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                                  style={{ willChange: 'transform, opacity' }}
                                  className="flex flex-col items-center justify-center my-6"
                                >
                                  {feedback.type === "high" && (
                                    <span className="text-5xl animate-bounce">🎉</span>
                                  )}
                                  {feedback.type === "medium" && (
                                    <span className="text-5xl animate-bounce">👏</span>
                                  )}
                                  {feedback.type === "low" && (
                                    <span className="text-5xl">📚</span>
                                  )}
                                  <span className="mt-2 text-lg font-semibold text-center text-gray-800 dark:text-white">
                                    {feedback.type === "high" && "Haee!"}
                                    {feedback.type === "medium" && "Very Good!"}
                                    {feedback.type === "low" && "Learning makes man perfect!"}
                                  </span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            {/* Quiz mode buttons remain below */}
                            {reviewMode === "quiz" && (
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 mt-8">
                                <Button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateConfidence("low");
                                  }}
                                  variant="outline"
                                  className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
                                >
                                  <ThumbsDown className="mr-2 h-4 w-4" />
                                  Still Learning
                                </Button>
                                <Button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateConfidence("medium");
                                  }}
                                  variant="outline"
                                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-300"
                                >
                                  Almost Got It
                                </Button>
                                <Button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateConfidence("high");
                                  }}
                                  variant="outline"
                                  className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
                                >
                                  <ThumbsUp className="mr-2 h-4 w-4" />
                                  Got It
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-center mt-6 gap-4">
                    <Button 
                      onClick={handlePrevCard}
                      disabled={currentCardIndex === 0}
                      variant="outline"
                      size="lg"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button 
                      onClick={handleNextCard}
                      disabled={currentCardIndex === flashcards.length - 1}
                      size="lg"
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-600 dark:text-gray-400">No flashcards available for this language.</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Flashcards;
