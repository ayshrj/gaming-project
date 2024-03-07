import React, { useEffect, useState } from "react";
import "./DriverLicense.css";
import RandomZigZag from "../../util/RandomZigZag";
import FaceCreator from "../../util/FaceCreator";
import {
  human,
  generateRandomCharacter,
  getRandomDate,
  generateDates,
  completeDriverLicense,
  getRandom,
} from "../../util/games/DriverLicenseHumanProperties";

const Questionnaire = ({
  questionDataset,
  currentPage,
  setCurrentPage,
  setShowDLNextButton,
  selectedOption,
  setSelectedOption,
  feedback,
  setFeedback,
}) => {
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setFeedback(null);
    setSelectedOption(null);
    if (currentPage + 1 === questionDataset.length - 1) {
      setShowDLNextButton(true); // Show the button on the second last question
    }
  };

  const handleOptionChange = (event) => {
    const selectedOptionIndex = parseInt(event.target.value);
    setSelectedOption(selectedOptionIndex);

    const correctAnswerIndex = questionDataset[currentPage].answer;
    if (selectedOptionIndex === correctAnswerIndex) {
      setFeedback("Correct");
    } else {
      setFeedback("Game Over");
    }
  };

  return (
    <div>
      <div>
        <p>{questionDataset[currentPage].question}</p>
        {questionDataset[currentPage].options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <input
              type="radio"
              id={`option${optionIndex}`}
              name={`question${currentPage}`}
              value={optionIndex}
              checked={selectedOption === optionIndex} // Set checked based on selectedOption
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${optionIndex}`}>{option}</label>
          </div>
        ))}
        {feedback && <p>{feedback}</p>}
      </div>
      <div>
        {selectedOption !== null &&
          currentPage < questionDataset.length - 1 && (
            <div className="dl-next-button" onClick={handleNext}>
              Next
            </div>
          )}
      </div>
    </div>
  );
};

const DriverLicense = ({ browserWindowWidth }) => {
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarDataset, setAvatarDataset] = useState([]);
  const [questionDataset, setQuestionDataset] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showDriverLicense, setShowDriverLicense] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDLNextButton, setShowDLNextButton] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setShowDriverLicense(true);
  }, []);

  const handleShowDriverLicense = () => {
    if (showDriverLicense === true) {
      setShowDriverLicense(false);
    } else {
      setShowDLNextButton(true);
      handleChangeChar();
      setShowDriverLicense(true);
      setCurrentPage(0);
      setFeedback(null);
      setSelectedOption(null);
    }
  };

  const handleChangeChar = () => {
    const licenseGenerated = completeDriverLicense();
    setNewAvatar(licenseGenerated);

    setAvatarDataset((prev) => [...avatarDataset, licenseGenerated]);
  };

  useEffect(() => {
    console.log(newAvatar);
  }, [newAvatar]);
  useEffect(() => {
    console.log(avatarDataset);
  }, [avatarDataset]);

  useEffect(() => {
    handleChangeChar();
  }, []);

  function generateQuestionWithOptions() {
    const person = avatarDataset[getRandom(0, avatarDataset.length - 1)];
    const randomProperty = getRandom(0, 2);
    let question, currentCorrectOption, options, answerType;

    switch (randomProperty) {
      case 0:
        question = `What is the age of ${
          human.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.age];
        currentCorrectOption = person.age;
        answerType = "age";
        break;
      case 1:
        question = `What was the expiry date of the person whose age was ${person.age}?`;
        options = [person.expiryDate];
        currentCorrectOption = person.expiryDate;
        answerType = "date";
        break;
      case 2:
        question = `What was the expiry date of ${
          human.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.expiryDate];
        currentCorrectOption = person.expiryDate;
        answerType = "date";
        break;
      case 3:
        question = `What was the issued date of the person whose age was ${person.age}?`;
        options = [person.issuedDate];
        currentCorrectOption = person.issuedDate;
        answerType = "date";
        break;
      case 4:
        question = `What was the issued date of ${
          human.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.issuedDate];
        currentCorrectOption = person.issuedDate;
        answerType = "date";
        break;
      case 5:
        question = `What is the DOB of ${
          human.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.dob];
        currentCorrectOption = person.dob;
        answerType = "date";
        break;
    }

    for (let i = 0; i < 3; i++) {
      const randomOption =
        avatarDataset[getRandom(0, avatarDataset.length - 1)];
      options.push(
        randomOption[
          randomProperty === 0
            ? "age"
            : randomProperty === 1
            ? "expiryDate"
            : "address"
        ]
      );
    }

    // Shuffle options to randomize the order
    options.sort(() => Math.random() - 0.5);

    let answerIndex = -1;

    for (let i = 0; i < 4; ++i) {
      if (options[i] === currentCorrectOption) {
        if (answerIndex !== -1) {
          if (answerType === "age" || answerType === "address") {
            options[i] = (Math.random() < 0.5 ? -1 : 1) * getRandom(1, 9);
          } else if (answerType === "date") {
            options[i] = getRandomDate({
              firstDate: options[i],
              dateFromNow: (Math.random() < 0.5 ? -1 : 1) * getRandom(1, 5),
            });
          }
        } else {
          answerIndex = i;
        }
      }
    }

    return { question, options, answer: answerIndex };
  }

  useEffect(() => {
    if (!showDriverLicense) {
      setShowDLNextButton(false);
    }
  }, [showDriverLicense]);

  useEffect(() => {
    if (avatarDataset.length !== 0) {
      let newQuestionDataset = [];
      let newQuestionDatasetSize;

      switch (currentLevel) {
        case 0:
          newQuestionDatasetSize = 5;
          break;
        case 1:
          newQuestionDatasetSize = 5;
          break;
        case 2:
          newQuestionDatasetSize = 6;
          break;
        case 3:
          newQuestionDatasetSize = 6;
          break;
        default:
          break;
      }
      for (let i = 0; i < newQuestionDatasetSize; ++i) {
        const newGeneratedQuestion = generateQuestionWithOptions();
        newQuestionDataset.push(newGeneratedQuestion);
      }

      setQuestionDataset(newQuestionDataset);
    }
  }, [avatarDataset]);

  useEffect(() => {
    console.log(questionDataset);
  }, [questionDataset]);

  return (
    <div className="dl-container">
      <h1>Driver License</h1>
      {showDriverLicense && (
        <div className="dl-card">
          <div className="dl-card-title">Driver License</div>
          <div className="dl-card-divider"></div>
          {newAvatar && (
            <>
              <div className="dl-card-photo-info">
                <div className="dl-card-photo-container">
                  <div className="dl-card-photo">
                    <FaceCreator
                      {...newAvatar.avatarSettings}
                      height={150}
                      width={150}
                    />
                  </div>
                  <div className="dl-card-photo-signature">
                    {`Sign: `}
                    <RandomZigZag
                      givenWidth={
                        browserWindowWidth <= 768
                          ? newAvatar.signature * 0.7
                          : newAvatar.signature
                      }
                      givenColor={"rgb(219,219,219)"}
                      givenStrokeWidth={1.5}
                    />
                  </div>
                </div>
                <div className="dl-card-info">
                  <div>
                    <span>Name:</span>
                    {` ${
                      newAvatar.gender === 0
                        ? human.maleFirstName[newAvatar.firstName]
                        : human.femaleFirstName[newAvatar.firstName]
                    } ${human.lastName[newAvatar.lastName]}`}
                  </div>
                  <div>
                    <span>Gender:</span>
                    {` ${newAvatar.gender === 0 ? "Male" : "Female"}`}
                  </div>
                  <div>
                    <span>{`Address: `}</span>
                    <RandomZigZag
                      givenWidth={
                        browserWindowWidth <= 768
                          ? newAvatar.address * 0.7
                          : newAvatar.address
                      }
                      givenColor={"rgb(219,219,219)"}
                      givenStrokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <span>{`Height: `}</span>
                    {`${Math.floor(newAvatar.height / 12)}'${
                      newAvatar.height % 12
                    }"`}
                  </div>
                  <div>
                    <span>{`DOB: `}</span>
                    {newAvatar.dob}
                  </div>
                  <div>
                    <span>{`Age: `}</span>
                    {newAvatar.age}
                  </div>
                </div>
              </div>
              <div className="dl-card-issued-expiry-container">
                <div>
                  <span>{`Issued Date: `}</span>
                  {newAvatar.issuedDate}
                </div>
                <div>
                  <span>{`Expiry Date: `}</span>
                  {newAvatar.expiryDate}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {!showDriverLicense && questionDataset.length > 0 && (
        <Questionnaire
          questionDataset={questionDataset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setShowDLNextButton={setShowDLNextButton}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      )}
      {showDLNextButton && (
        <div className="dl-next-button" onClick={handleShowDriverLicense}>
          Next
        </div>
      )}
    </div>
  );
};

export default DriverLicense;
