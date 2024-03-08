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
  };

  const handleOptionChange = (event) => {
    const selectedOptionIndex = parseInt(event.target.value);
    setSelectedOption(selectedOptionIndex);
    if (currentPage === questionDataset.length - 1) {
      setShowDLNextButton(true);
    }

    const correctAnswerIndex = questionDataset[currentPage].answer;
    if (selectedOptionIndex === correctAnswerIndex) {
      setFeedback("Correct");
    } else {
      setFeedback("Game Over");
    }
  };

  return (
    <div className="dl-questionnaire-container">
      <div>
        <p>{questionDataset[currentPage].question}</p>
        {questionDataset[currentPage].options.map((option, optionIndex) => (
          <div className="dl-questionnaire-container-options" key={optionIndex}>
            <input
              type="radio"
              id={`option${optionIndex}`}
              name={`question${currentPage}`}
              value={optionIndex}
              checked={selectedOption === optionIndex} // Set checked based on selectedOption
              onChange={handleOptionChange}
              hidden={true}
            />
            <label
              className="dl-questionnaire-container-option"
              htmlFor={`option${optionIndex}`}
              style={{
                backgroundColor:
                  selectedOption !== optionIndex
                    ? ""
                    : selectedOption === questionDataset[currentPage].answer
                    ? "green"
                    : "red",
              }}
            >
              {option}
            </label>
          </div>
        ))}
        {feedback && <p>{feedback}</p>}
      </div>
      <div className="dl-questionnaire-next-button-container">
        {feedback !== "Game Over" &&
          selectedOption !== null &&
          currentPage < questionDataset.length - 1 && (
            <div className="dl-questionnaire-next-button" onClick={handleNext}>
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
  const [showDriverLicense, setShowDriverLicense] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDLNextButton, setShowDLNextButton] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);

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
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleChangeChar = () => {
    const licenseGenerated = completeDriverLicense();
    setNewAvatar(licenseGenerated);

    setAvatarDataset((prev) => [...prev, licenseGenerated]);
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
    const randomProperty = getRandom(0, 5);
    let questionText, currentCorrectOption, options, answerType;

    switch (randomProperty) {
      case 0:
        questionText = `What is the age of ${
          person.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.age];
        currentCorrectOption = person.age;
        answerType = "age";
        break;
      case 1:
        questionText = `What was the expiry date of the license of the person whose age was ${person.age} years old?`;
        options = [person.expiryDate];
        currentCorrectOption = person.expiryDate;
        answerType = "date";
        break;
      case 2:
        questionText = `What was the expiry date of the license of ${
          person.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.expiryDate];
        currentCorrectOption = person.expiryDate;
        answerType = "date";
        break;
      case 3:
        questionText = `What was the issued date of the license of the person whose age was ${person.age} years old?`;
        options = [person.issuedDate];
        currentCorrectOption = person.issuedDate;
        answerType = "date";
        break;
      case 4:
        questionText = `What was the issued date of the license of ${
          person.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.issuedDate];
        currentCorrectOption = person.issuedDate;
        answerType = "date";
        break;
      case 5:
        questionText = `What is the DOB of ${
          person.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]}?`;
        options = [person.dob];
        currentCorrectOption = person.dob;
        answerType = "date";
        break;
      case 6:
        questionText = `What is the month ${
          person.gender === 0
            ? human.maleFirstName[person.firstName]
            : human.femaleFirstName[person.firstName]
        } ${human.lastName[person.lastName]} was born?`;
        options = [person.dob];
        currentCorrectOption = person.dob;
        answerType = "month";
        break;
    }

    for (let i = 0; i < 3; i++) {
      const randomOption =
        avatarDataset[getRandom(0, avatarDataset.length - 1)];
      options.push(
        randomOption[
          randomProperty === 0
            ? "age"
            : randomProperty === 1 || randomProperty === 2
            ? "expiryDate"
            : randomProperty === 3 || randomProperty === 4
            ? "expiryDate"
            : "dob"
        ]
      );
    }

    // Shuffle options to randomize the order
    options.sort(() => Math.random() - 0.5);

    let answerIndex = -1;
    const randomStartPoint = getRandom(0, 3);

    for (let i = 0; i < 4; ++i) {
      if (options[(i + randomStartPoint) % 4] === currentCorrectOption) {
        answerIndex = (i + randomStartPoint) % 4;
      }

      const checkBefore = () => {
        for (let j = 0; j < i; ++j) {
          if (
            options[(j + randomStartPoint) % 4] ===
            options[(i + randomStartPoint) % 4]
          ) {
            return false;
          }
        }

        return true;
      };

      while (checkBefore() === false) {
        if (answerType === "age") {
          options[(i + randomStartPoint) % 4] =
            options[(i + randomStartPoint) % 4] +
            (Math.random() < 0.5 ? -1 : 1) * getRandom(1, 3);
        } else if (answerType === "date" || answerType === "month") {
          options[(i + randomStartPoint) % 4] = getRandomDate({
            firstDate: options[(i + randomStartPoint) % 4],
            dateFromNow: (Math.random() < 0.5 ? -1 : 1) * getRandom(1, 5),
          });
        }
      }

      if (answerType === "month") {
        options[(i + randomStartPoint) % 4] =
          options[(i + randomStartPoint) % 4].split("-")[1];
      }
    }

    return { question: questionText, options, answer: answerIndex };
  }

  useEffect(() => {
    if (!showDriverLicense) {
      setShowDLNextButton(false);
    }
  }, [showDriverLicense]);

  const makeDataset = () => {
    if (avatarDataset.length !== 0) {
      let newQuestionDataset = [];
      let newQuestionDatasetSize;

      switch (currentLevel) {
        case 0:
          newQuestionDatasetSize = 2;
          break;
        case 1:
          newQuestionDatasetSize = 3;
          break;
        case 2:
          newQuestionDatasetSize = 4;
          break;
        case 3:
          newQuestionDatasetSize = 5;
          break;
        case 4:
          newQuestionDatasetSize = 6;
          break;
        case 5:
          newQuestionDatasetSize = 7;
          break;
        case 6:
          newQuestionDatasetSize = 8;
          break;
        case 7:
          newQuestionDatasetSize = 9;
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
  };

  useEffect(() => {
    makeDataset();
  }, [avatarDataset]);

  useEffect(() => {
    console.log(questionDataset);
  }, [questionDataset]);

  const handleReset = () => {
    handleChangeChar();
    setCurrentLevel(0);
    setShowDriverLicense(true);
    setCurrentPage(0);
    setShowDLNextButton(true);
    setSelectedOption(null);
    setFeedback(null);
  };

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
      {feedback !== "Game Over" && showDLNextButton && (
        <div className="dl-next-button" onClick={handleShowDriverLicense}>
          Next
        </div>
      )}
      {feedback === "Game Over" && (
        <div className="dl-next-button" onClick={handleReset}>
          Reset
        </div>
      )}
    </div>
  );
};

export default DriverLicense;
