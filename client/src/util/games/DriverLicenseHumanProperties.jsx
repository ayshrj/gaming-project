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
  function generateRandomColor(amount) {
    //0 to 100

    const r = getRandom(0, 255);
    const g = getRandom(0, 255);
    const b = getRandom(0, 255);

    amount = Math.max(0, Math.min(100, amount));

    let lightenedR = r;
    let lightenedG = g;
    let lightenedB = b;

    let adjust = Math.floor((amount / 100) * 255);

    lightenedR = Math.min(255, lightenedR + adjust);
    lightenedG = Math.min(255, lightenedG + adjust);
    lightenedB = Math.min(255, lightenedB + adjust);

    lightenedR = lightenedR.toString(16).padStart(2, "0");
    lightenedG = lightenedG.toString(16).padStart(2, "0");
    lightenedB = lightenedB.toString(16).padStart(2, "0");

    return [`#${r}${g}${b}`, `#${lightenedR}${lightenedG}${lightenedB}`];
  }

  const [shirtFill, shirtStroke] = generateRandomColor(20);

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
    shirtFill: shirtFill,
    shirtStroke: shirtStroke,
    shirtDesign: generateRandomColor(20)[0],
    mouth: getRandom(1, 6),
    mouthFill: "#ff2993",
    nose: getRandom(1, 7),
    eye:
      gender === 0
        ? human.maleEye[getRandom(0, human.maleEye.length - 1)]
        : human.femaleEye[getRandom(0, human.femaleEye.length - 1)],
    eyebrow: getRandom(1, 5),
    accessory: gender === 0 ? 0 : getRandom(0, 3),
    accessoryStroke: generateRandomColor(20)[0],
  };

  return character;
}

function getRandomDate({ firstDate, dateFromNow }) {
  // Get current date
  const currentDate = new Date();

  const startDate = new Date(firstDate);

  const endDate = new Date(
    currentDate.getFullYear() + dateFromNow,
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

function generateDates(birthDateString) {
  // based on https://parivahan.gov.in/parivahan//en/content/what-validity-driving-license
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
      ? 1
      : 0);
  let startDate;
  let randomDate, anotherDate;

  if (age < 30) {
    startDate = new Date(
      birthDate.getFullYear() + 18,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  } else if (age >= 30 && age < 50) {
    startDate = new Date(
      birthDate.getFullYear() + 30,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  } else if (age >= 50 && age < 55) {
    startDate = new Date(
      birthDate.getFullYear() + 50,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  } else {
    startDate = new Date(
      birthDate.getFullYear() + 55,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysBetween = (today - startDate) / (1000 * 60 * 60 * 24);
  const randomNumberOfDays = Math.floor(Math.random() * daysBetween);
  randomDate = new Date(
    startDate.getTime() + randomNumberOfDays * (1000 * 60 * 60 * 24)
  );

  if (age < 30) {
    const potentialAnotherDate = new Date(
      randomDate.getFullYear() + 20,
      randomDate.getMonth(),
      randomDate.getDate()
    );
    const age40Date = new Date(
      birthDate.getFullYear() + 40,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    anotherDate =
      potentialAnotherDate > age40Date ? age40Date : potentialAnotherDate;
  } else if (age >= 30 && age < 50) {
    anotherDate = new Date(
      randomDate.getFullYear() + 10,
      randomDate.getMonth(),
      randomDate.getDate()
    );
  } else if (age >= 50 && age < 55) {
    const potentialAnotherDate = new Date(
      randomDate.getFullYear() + 5,
      randomDate.getMonth(),
      randomDate.getDate()
    );
    const age60Date = new Date(
      birthDate.getFullYear() + 60,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    anotherDate =
      potentialAnotherDate > age60Date ? age60Date : potentialAnotherDate;
  } else {
    anotherDate = new Date(
      randomDate.getFullYear() + 5,
      randomDate.getMonth(),
      randomDate.getDate()
    );
  }

  return [
    age,
    randomDate.toISOString().split("T")[0],
    anotherDate.toISOString().split("T")[0],
  ];
}

const completeDriverLicense = () => {
  const gender = getRandom(0, 1);
  const randomChar = generateRandomCharacter(gender);
  let firstName;
  if (gender === 0) {
    firstName = getRandom(0, human.maleFirstName.length - 1);
  } else {
    firstName = getRandom(0, human.femaleFirstName.length - 1);
  }
  const lastName = getRandom(0, human.lastName.length - 1);

  const dob = getRandomDate({ firstDate: "1969-01-07", dateFromNow: -18 });
  const [age, issuedDate, expiryDate] = generateDates(dob);

  return {
    avatarSettings: randomChar,
    gender: gender,
    firstName: firstName,
    lastName: lastName,
    address: getRandom(100, 200),
    height: getRandom(59, 73),
    dob: dob,
    age: age,
    signature: getRandom(50, 100),
    issuedDate: issuedDate,
    expiryDate: expiryDate,
  };
};

export {
  human,
  generateRandomCharacter,
  getRandomDate,
  generateDates,
  completeDriverLicense,
  getRandom,
};
