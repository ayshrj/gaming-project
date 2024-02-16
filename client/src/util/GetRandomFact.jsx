const facts = [
  {
    fact: "The first video game ever made is often considered to be 'Pong', released by Atari in 1972.",
  },
  {
    fact: "The best-selling video game of all time is 'Minecraft', with over 200 million copies sold across all platforms.",
  },
  {
    fact: "The first commercially successful arcade video game was 'Space Invaders', released in 1978 by Taito.",
  },
  {
    fact: "The highest-grossing media franchise of all time is 'Pokémon', with an estimated revenue of over $100 billion.",
  },
  {
    fact: "The first console to use discs instead of cartridges was the NEC TurboGrafx-CD, released in 1988 in Japan.",
  },
  {
    fact: "The first video game character with a recognizable name and personality was 'Pac-Man', introduced in 1980.",
  },
  {
    fact: "The first gaming console to have a built-in hard drive was the Sega Saturn, released in 1994.",
  },
  {
    fact: "The longest gaming session on record lasted for 138 hours and was achieved by Okan Kaya playing 'Call of Duty: Black Ops 2'.",
  },
  {
    fact: "The first handheld gaming console with interchangeable cartridges was the Milton Bradley Microvision, released in 1979.",
  },
  {
    fact: "The first 3D video game was '3D Monster Maze', released in 1981 for the Sinclair ZX81 computer.",
  },
  {
    fact: "The first console to introduce online gaming was the Sega Dreamcast, released in 1999.",
  },
  {
    fact: "The first video game to feature a save system was 'The Legend of Zelda', released in 1986 for the Nintendo Entertainment System.",
  },
  {
    fact: "The first gaming mouse was introduced by Logitech in 1982.",
  },
  {
    fact: "The first video game Easter egg was found in 'Adventure' for the Atari 2600, hidden by programmer Warren Robinett.",
  },
  {
    fact: "The first game to feature a fully voiced soundtrack was 'Loom', released by Lucasfilm Games in 1990.",
  },
  {
    fact: "The highest-grossing arcade game of all time is 'Street Fighter II', with an estimated revenue of over $10 billion.",
  },
  {
    fact: "The first game to feature in-game advertisements was 'Billboard', released in 1983 for the Atari 2600.",
  },
  {
    fact: "The first video game to be played in space was 'Tetris', played by Russian cosmonaut Aleksandr A. Serebrov in 1993.",
  },
  {
    fact: "The first video game tournament took place at Stanford University in 1972, featuring 'Spacewar!' players.",
  },
  {
    fact: "The first video game to use motion-capture technology was 'Prince of Persia: The Sands of Time', released in 2003.",
  },
  {
    fact: "The first video game console with a built-in modem for online play was the Sega Saturn NetLink, released in 1996.",
  },
  {
    fact: "The first video game to feature a female protagonist was 'Ms. Pac-Man', released in 1981.",
  },
  {
    fact: "The first commercially successful video game console was the Magnavox Odyssey, released in 1972.",
  },
  {
    fact: "The first video game to feature a celebrity likeness was 'Bruce Lee', released in 1984 for multiple platforms.",
  },
  {
    fact: "The first video game to receive a perfect score from the gaming magazine Famitsu was 'The Legend of Zelda: Ocarina of Time'.",
  },
  {
    fact: "The first video game to feature microtransactions was 'Entropia Universe', released in 2003.",
  },
  {
    fact: "The first video game to feature an open-world environment was '1980's 'Rogue'.",
  },
  {
    fact: "The first video game to be adapted into a feature film was 'Super Mario Bros.', released in 1993.",
  },
  {
    fact: "The first video game to be inducted into the World Video Game Hall of Fame was 'Pong', in 2015.",
  },
  {
    fact: "The first video game to have a movie based on it was 'Tomb Raider', released in 2001.",
  },
  {
    fact: "The first video game to feature a multiplayer mode was 'Spacewar!', developed in 1962.",
  },
  {
    fact: "The first video game to be banned due to violence was 'Death Race', released in 1976.",
  },
  {
    fact: "The first video game to feature voice acting was 'Cliff Hanger', released in 1983.",
  },
  {
    fact: "The first video game to feature a fully orchestral score was 'Sonic the Hedgehog', released in 1991.",
  },
  {
    fact: "The first video game to feature a storyline with multiple endings was 'Castlevania II: Simon's Quest'.",
  },
  {
    fact: "The first video game to feature a cover system was 'WinBack: Covert Operations', released in 1999.",
  },
  {
    fact: "The first video game to feature a day/night cycle was 'Castlevania II: Simon's Quest'.",
  },
  {
    fact: "The first video game to feature 3D graphics was 'Maze War', developed in 1973.",
  },
  {
    fact: "The first video game to feature online multiplayer was 'Neverwinter Nights', released in 1991.",
  },
  {
    fact: "The first video game to use isometric graphics was 'Zaxxon', released in 1982.",
  },
  {
    fact: "The first video game to feature a stealth mechanic was 'Castle Wolfenstein', released in 1981.",
  },
  {
    fact: "The first video game to use digitized graphics was 'Mortal Kombat', released in 1992.",
  },
  {
    fact: "The first video game to feature a boss battle was 'Space Invaders', where the player faces a stronger enemy at the end of each level.",
  },
  {
    fact: "The first video game to feature a destructible environment was 'Rampage', released in 1986.",
  },
  {
    fact: "The first video game to feature online leaderboards was 'Star Wars Galaxies', released in 2003.",
  },
  {
    fact: "The first video game to feature a cover mechanic was 'Kill Switch', released in 2003.",
  },
  {
    fact: "The first video game to feature a full-body motion controller was 'EyeToy: Play', released in 2003 for the PlayStation 2.",
  },
  {
    fact: "The first video game to feature a photo mode was 'Gran Turismo 4', released in 2004.",
  },
  {
    fact: "The first video game to feature in-game physics was 'Stunt Island', released in 1992.",
  },
  {
    fact: "The first video game to feature a non-linear storyline was 'Ultima', released in 1981.",
  },
  {
    fact: "The first video game to feature a cover system for stealth was 'Thief: The Dark Project', released in 1998.",
  },
  {
    fact: "The first video game to feature a quick-time event was 'Dragon's Lair', released in 1983.",
  },
  {
    fact: "The first video game to feature ragdoll physics was 'Hitman: Codename 47', released in 2000.",
  },
  {
    fact: "The first video game to feature branching storylines was 'Star Wars: Knights of the Old Republic', released in 2003.",
  },
  {
    fact: "The first video game to feature bullet time was 'Max Payne', released in 2001.",
  },
  {
    fact: "The first video game to feature online voice chat was 'Quake III Arena', released in 1999.",
  },
  {
    fact: "The first video game to feature destructible terrain was 'Red Faction', released in 2001.",
  },
  {
    fact: "The first video game to feature online achievements was 'Xbox 360's 'Gears of War', released in 2006.",
  },
  {
    fact: "The first video game to feature a cover system for third-person shooters was 'Kill Switch', released in 2003.",
  },
  {
    fact: "The first video game to feature procedural generation was 'Elite', released in 1984.",
  },
  {
    fact: "The first video game to feature voice chat was 'Half-Life', released in 1998.",
  },
  {
    fact: "The first video game to feature a crafting system was 'Ultima Online', released in 1997.",
  },
  {
    fact: "The first video game to feature dynamic weather was 'Fable', released in 2004.",
  },
  {
    fact: "The first video game to feature open-world gameplay was 'The Legend of Zelda', released in 1986.",
  },
  {
    fact: "The first video game to feature a moral choice system was 'Fallout', released in 1997.",
  },
  {
    fact: "The first video game to feature a sandbox mode was 'SimCity', released in 1989.",
  },
  {
    fact: "The first video game to feature fully destructible environments was 'Blast Corps', released in 1997.",
  },
  {
    fact: "The first video game to feature dynamic lighting was 'System Shock', released in 1994.",
  },
  {
    fact: "The first video game to feature a cover system for first-person shooters was 'Killzone', released in 2004.",
  },
  {
    fact: "The first video game to feature a regenerating health system was 'Regeneration', released in 1982.",
  },
  {
    fact: "The first video game to feature a crafting system for weapons was 'Dead Rising', released in 2006.",
  },
  {
    fact: "The first video game to feature a skill tree was 'Fallout', released in 1997.",
  },
  {
    fact: "The first video game to feature an open-world environment with multiplayer was 'Ultima Online', released in 1997.",
  },
  {
    fact: "The first video game to feature a cover system for tactical shooters was 'Tom Clancy's Rainbow Six', released in 1998.",
  },
  {
    fact: "The first video game to feature bullet drop was 'Delta Force', released in 1998.",
  },
  {
    fact: "The first video game to feature bullet penetration was 'Soldier of Fortune', released in 2000.",
  },
  {
    fact: "The first video game to feature a grappling hook was 'Bionic Commando', released in 1987.",
  },
  {
    fact: "The first video game to feature regenerating ammunition was 'Halo: Combat Evolved', released in 2001.",
  },
  {
    fact: "The first video game to feature a morality system was 'Star Wars: Knights of the Old Republic', released in 2003.",
  },
];

const GetRandomFact = () => {
  return facts[Math.floor(Math.random() * facts.length)];
};

export default GetRandomFact;
