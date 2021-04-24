export const getPlayerName = (player) => {
  return `Name: ${player.first_name} ${player.last_name}`;
};

export const getPlayerHeight = (player) => {
  return `Height: ${
    player.height_feet === null || player.height_inches === null
      ? "Not Available"
      : `${player.height_feet}'${player.height_inches}`
  }`;
};

export const getPlayerPosition = (player) => {
  return `Position: ${player.position || "Not Available"}`;
};

export const getPlayerTeam = (player) => {
  return `Team: ${player.team.full_name}`;
};
