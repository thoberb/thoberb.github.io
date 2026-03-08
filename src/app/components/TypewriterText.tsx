import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
}

export function TypewriterText({ words }: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [currentArticle, setCurrentArticle] = useState('a');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingArticle, setIsDeletingArticle] = useState(false);
  const [isTypingArticle, setIsTypingArticle] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentPhrase = words[currentWordIndex];
    // Extract article and word from phrase like "a product manager" or "an engineer"
    const parts = currentPhrase.split(' ');
    const targetArticle = parts[0]; // "a" or "an"
    const targetWord = parts.slice(1).join(' '); // "product manager", "designer", etc.

    const timeout = setTimeout(() => {
      if (isTypingArticle) {
        // Typing the new article
        if (currentArticle.length < targetArticle.length) {
          setCurrentArticle(targetArticle.substring(0, currentArticle.length + 1));
        } else {
          setIsTypingArticle(false);
          setCurrentText(''); // Start typing the word
        }
      } else if (isDeletingArticle) {
        // Deleting the old article
        if (currentArticle.length > 0) {
          setCurrentArticle(currentArticle.substring(0, currentArticle.length - 1));
        } else {
          setIsDeletingArticle(false);
          setIsTypingArticle(true);
        }
      } else if (!isDeleting) {
        // Typing the word
        if (currentText.length < targetWord.length) {
          setCurrentText(targetWord.substring(0, currentText.length + 1));
        } else {
          // Word complete - determine pause duration
          const isProductBuilder = targetWord === 'product builder';
          const pauseDuration = isProductBuilder ? 3000 : 1500;
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting the word
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          const nextIndex = (currentWordIndex + 1) % words.length;
          const nextPhrase = words[nextIndex];
          const nextArticle = nextPhrase.split(' ')[0];
          
          // Check if article needs to change
          if (currentArticle !== nextArticle) {
            setIsDeletingArticle(true);
          }
          
          setCurrentWordIndex(nextIndex);
        }
      }
    }, isDeleting || isDeletingArticle ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentArticle, isDeleting, isDeletingArticle, isTypingArticle, currentWordIndex, words]);

  return (
    <span className="inline-block">
      <span className="text-gray-400">{currentArticle}</span>
      {currentArticle && currentText && ' '}
      <span className="text-white">{currentText}</span>
      {showCursor && (
        <span className="inline-block w-0.5 h-[1em] bg-white ml-1 align-middle" />
      )}
    </span>
  );
}