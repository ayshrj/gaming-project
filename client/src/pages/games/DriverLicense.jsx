import React, { useEffect, useState } from "react";
import "./DriverLicense.css";
import RandomZigZag from "../../util/RandomZigZag";
import FaceCreator from "../../util/FaceCreator";

const DriverLicense = ({ browserWindowWidth }) => {
  const [avatar, setAvatar] = useState(null);

  const human = {
    skinTypes: [
      "#2D221E",
      "#3C2E28",
      "#4B3932",
      "#5A453C",
      "#695046",
      "#785C50",
      "#87675A",
      "#967264",
      "#A57E6E",
      "#B48A78",
      "#C39582",
      "#D2A18C",
      "#E1AC96",
      "#F0B8A0",
      "#FFC3AA",
      "#FFCEB4",
      "#FFDABE",
      "#FFE5C8",
    ],
    hairColor: [
      "#000000", // Black
      "#2B1D0E", // Dark Brown
      "#5C3C20", // Medium Brown
      "#A7856A", // Light Brown
      "#DCD0BA", // Blonde
      "#E9EDEF", // Platinum Blonde
      "#A0522D", // Red
      "#808080", // Grey
    ],
    maleFirstName: [
      "Aarav",
      "Vihaan",
      "Ishaan",
      "Surya",
      "Arjun",
      "Rohan",
      "Aditya",
      "Vikram",
      "Rahul",
      "Aryan",
      "Dhruv",
      "Nikhil",
      "Anshul",
      "Rajesh",
      "Suresh",
      "Mohan",
      "Gaurav",
      "Harish",
      "Akash",
      "Pranav",
      "Kartik",
      "Ajay",
      "Ravi",
      "Samar",
      "Manish",
      "Vivek",
      "Kunal",
      "Abhishek",
      "Siddharth",
      "Ankit",
      "Vipul",
      "Mayank",
      "Amit",
      "Varun",
      "Pankaj",
      "Naveen",
      "Rajat",
      "Sanket",
      "Tarun",
      "Uday",
      "Vishal",
      "Yash",
      "Ayush",
      "Sahil",
      "Karan",
      "Lokesh",
      "Omkar",
      "Prateek",
      "Rishabh",
      "Tanmay",
    ],
    femaleFirstName: [
      "Aarya",
      "Priya",
      "Riya",
      "Saanvi",
      "Anika",
      "Tanvi",
      "Meera",
      "Isha",
      "Khushi",
      "Palak",
      "Divya",
      "Kriti",
      "Neha",
      "Pooja",
      "Ritu",
      "Sanya",
      "Tanya",
      "Uma",
      "Vani",
      "Aisha",
      "Bina",
      "Chaya",
      "Diya",
      "Esha",
      "Falak",
      "Gauri",
      "Hina",
      "Indu",
      "Jaya",
      "Kavya",
      "Lata",
      "Mina",
      "Naina",
      "Ojasvi",
      "Preeti",
      "Falguni",
      "Rashi",
      "Simran",
      "Trisha",
      "Urvashi",
      "Vidya",
      "Rekha",
      "Anita",
      "Yamini",
      "Zara",
      "Anushka",
      "Bhavna",
      "Charu",
      "Daksha",
      "Ekta",
    ],
    lastName: [
      "Sharma",
      "Verma",
      "Gupta",
      "Mehta",
      "Jain",
      "Patel",
      "Kumar",
      "Singh",
      "Bose",
      "Mukherjee",
      "Banerjee",
      "Chatterjee",
      "Iyer",
      "Menon",
      "Reddy",
      "Srinivasan",
      "Ghosh",
      "Kulkarni",
      "Raj",
      "Dutta",
      "Thakur",
      "Pillai",
      "Chopra",
      "Malhotra",
      "Rao",
      "Naidu",
      "Aggarwal",
      "Goel",
      "Trivedi",
      "Chaturvedi",
      "Varshney",
    ],
    maleCloth: [1, 3, 4, 6],
    femaleCloth: [1, 2, 4, 5, 7],
    maleHair: [1, 3, 4, 6, 8],
    femaleHair: [2, 5, 7, 9],
    maleEye: [1, 2],
    femaleEye: [3, 4],
  };

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomCharacter(gender) {
    function generateRandomColor() {
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += ((Math.random() * 16) | 0).toString(16);
      }
      return color;
    }

    const character = {
      hair:
        gender === 0
          ? human.maleHair[getRandom(0, human.maleHair.length - 1)]
          : human.femaleHair[getRandom(0, human.femaleHair.length - 1)],
      hairFill: human.hairColor[getRandom(0, human.hairColor.length - 1)],
      hairStroke: "#1C1C1C",
      skinColor: human.skinTypes[getRandom(0, human.skinTypes.length - 1)],
      skinBorder: "#000000",
      shirt:
        gender === 0
          ? human.maleCloth[getRandom(0, human.maleCloth.length - 1)]
          : human.femaleCloth[getRandom(0, human.femaleCloth.length - 1)],
      shirtFill: generateRandomColor(),
      shirtStroke: generateRandomColor(),
      shirtDesign: generateRandomColor(),
      mouth: getRandom(1, 6),
      mouthFill: "#ff2993",
      nose: getRandom(1, 7),
      eye:
        gender === 0
          ? human.maleEye[getRandom(0, human.maleEye.length - 1)]
          : human.femaleEye[getRandom(0, human.femaleEye.length - 1)],
      eyebrow: getRandom(1, 5),
      accessory: gender === 0 ? 0 : getRandom(0, 3),
      accessoryStroke: "#7608fe",
    };

    return character;
  }

  function getRandomDate() {
    // Get current date
    const currentDate = new Date();

    const startDate = new Date("1969-01-07");

    const endDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const randomTime =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());

    const randomDate = new Date(randomTime);

    const formattedDate = randomDate.toISOString().split("T")[0];

    return formattedDate;
  }

  const handleChangeChar = () => {
    const gender = getRandom(0, 1);
    const randomChar = generateRandomCharacter(gender);
    let firstName;
    if (gender === 0) {
      firstName = getRandom(0, human.maleFirstName.length - 1);
    } else {
      firstName = getRandom(0, human.femaleFirstName.length - 1);
    }
    const lastName = getRandom(0, human.lastName.length - 1);
    setAvatar({
      avatarSettings: randomChar,
      gender: gender,
      firstName: firstName,
      lastName: lastName,
      address: getRandom(100, 200),
      height: getRandom(59, 73),
      dob: getRandomDate(),
      signature: getRandom(50, 100),
    });
  };

  useEffect(() => {
    console.log(avatar);
  }, [avatar]);

  useEffect(() => {
    handleChangeChar();
  }, []);

  return (
    <div className="dl-container">
      <h1>Driver License</h1>
      <div className="dl-card">
        <div className="dl-card-title">Driver License</div>
        <div className="dl-card-divider"></div>
        {avatar && (
          <div className="dl-card-photo-info">
            <div className="dl-card-photo-container">
              <div className="dl-card-photo">
                <FaceCreator
                  {...avatar.avatarSettings}
                  height={150}
                  width={150}
                />
              </div>
              <div className="dl-card-photo-signature">
                {`Sign: `}
                <RandomZigZag
                  givenWidth={
                    browserWindowWidth <= 768
                      ? avatar.signature * 0.7
                      : avatar.signature
                  }
                  givenColor={"rgb(219,219,219)"}
                />
              </div>
            </div>
            <div className="dl-card-info">
              <div>
                <span>Name:</span>
                {` ${
                  avatar.gender === 0
                    ? human.maleFirstName[avatar.firstName]
                    : human.femaleFirstName[avatar.firstName]
                } ${human.lastName[avatar.lastName]}`}
              </div>
              <div>
                <span>Gender:</span>
                {` ${avatar.gender === 0 ? "Male" : "Female"}`}
              </div>
              <div>
                <span>{`Address: `}</span>
                <RandomZigZag
                  givenWidth={
                    browserWindowWidth <= 768
                      ? avatar.address * 0.7
                      : avatar.address
                  }
                  givenColor={"rgb(219,219,219)"}
                />
              </div>
              <div>
                <span>{`Height: `}</span>
                {`${Math.floor(avatar.height / 12)}'${avatar.height % 12}"`}
              </div>
              <div>
                <span>{`DOB: `}</span>
                {avatar.dob}
              </div>
            </div>
          </div>
        )}
      </div>
      <div onClick={handleChangeChar}>Change</div>
    </div>
  );
};

export default DriverLicense;
