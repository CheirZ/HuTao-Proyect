import db from "#db"

function canLevelUp(level, exp, multiplier = 1) {
  const required = Math.floor(Math.pow(level + 1, 2) * 100 * multiplier)
  return exp >= required
}

export async function before({ msg, sock }) {
  if (!msg.sender) return;
  
  const multiplier = typeof global.multiplier === 'number' ? global.multiplier : 1;

  const user = await db.getUser(msg.sender);
  if (!user) return;

  let before = user.level;
  
  while (canLevelUp(user.level, user.exp, multiplier)) {
    user.level++;
    await db.updateUser(msg.sender, 'level', user.level);
  }
}
