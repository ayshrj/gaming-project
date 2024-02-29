import React, { useState, useEffect } from "react";
import CardGenerator from "../../util/games/CardGenerator";
import "./Concentration.css";

const Concentration = () => {
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

  const totalCards = 18;

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

  const generateUniqueCards = (noOfCards) => {
    const uniqueCards = [];
    while (uniqueCards.length < noOfCards) {
      uniqueCards.push(generateUniqueCard(uniqueCards));
    }
    return uniqueCards;
  };

  const [cards, setCards] = useState([]);
  const [cardPos, setCardsPos] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ first: -1, second: -1 });
  const [alreadyDismissedCards, setAlreadyDismissedCards] = useState(
    Array.from({ length: totalCards }, (_, i) => false)
  );

  const shuffleArray = ({ array, pos }) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      [pos[i], pos[j]] = [pos[j], pos[i]];
    }
    setCards(array);
    setCardsPos(pos);
  };

  useEffect(() => {
    const tempPos = Array.from(
      { length: totalCards },
      (_, i) => i % (totalCards / 2)
    );
    const tempCards = generateUniqueCards(totalCards / 2);
    shuffleArray({
      array: [...tempCards, ...tempCards],
      pos: tempPos,
    });
  }, []);

  useEffect(() => {
    console.log(cardPos);
  }, [cardPos]);

  const handleSelectCard = (e) => {
    const cardSelected = parseInt(e.currentTarget.getAttribute("cardno"));

    if (selectedCard.first === -1) {
      setSelectedCard({ ...selectedCard, first: cardSelected });
    } else if (
      selectedCard.second === -1 &&
      selectedCard.first !== cardSelected
    ) {
      setSelectedCard({ ...selectedCard, second: cardSelected });

      setTimeout(() => {
        if (cards[selectedCard.first] === cards[cardSelected]) {
          console.log("they are same");
          const newDismissedCards = [...alreadyDismissedCards];
          newDismissedCards[selectedCard.first] = true;
          newDismissedCards[cardSelected] = true;
          setAlreadyDismissedCards(newDismissedCards);
        }

        setSelectedCard({ first: -1, second: -1 });
        console.log("alreadyDismissedCards: ", alreadyDismissedCards);
      }, 1000);
    }
  };

  return (
    <div className="concentration-container">
      <h1>Concentration</h1>
      <div className="concentration">
        {cards.map((card, index) => (
          <div key={index} cardno={index} onClick={(e) => handleSelectCard(e)}>
            {alreadyDismissedCards[index] ? (
              <CardGenerator color="white" classText="card not-hoverable" />
            ) : index === selectedCard.first ||
              index === selectedCard.second ? (
              <CardGenerator
                rank={card.rank}
                type={card.type}
                thick={1.5}
                color={card.color}
                size={200}
                fillColor="none"
                classText="card card-selected"
              />
            ) : (
              <CardGenerator classText="card" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Concentration;
