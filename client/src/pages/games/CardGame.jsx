import React, { useState, useEffect } from "react";
import CardGenerator from "../../util/games/CardGenerator";
import "./CardGame.css";

const CardGame = () => {
  const types = ["diamond", "club", "heart", "spade"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const getColor = (type) => {
    return type === "diamond" || type === "heart"
      ? "rgb(193, 82, 31)"
      : "currentColor";
  };

  const totalCards = 10;

  const generateUniqueCard = (existingCards) => {
    let card, isUnique;
    do {
      const type = types[Math.floor(Math.random() * types.length)];
      card = {
        type: type,
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        color: getColor(type),
      };
      isUnique = !existingCards.some(
        (existingCard) =>
          existingCard.type === card.type && existingCard.rank === card.rank
      );
    } while (!isUnique);
    return card;
  };

  const generateUniqueCards = () => {
    const uniqueCards = [];
    while (uniqueCards.length < totalCards / 2) {
      uniqueCards.push(generateUniqueCard(uniqueCards));
    }
    return uniqueCards;
  };

  const [cards, setCards] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const tempCards = generateUniqueCards();
    const shuffledCards = shuffleArray([...tempCards, ...tempCards]);
    setCards(shuffledCards);
  }, []);

  return (
    <div className="card-game">
      {cards.map((card, index) => (
        <CardGenerator
          key={index}
          rank={card.rank}
          type={card.type}
          thick={1.5}
          color={card.color}
          size={200}
          fillColor="none"
          classText="card"
        />
      ))}
      <CardGenerator />
    </div>
  );
};

export default CardGame;
