const app = new Set([["name", "llm"], ["boyFriend", "zh"]]);
const map = new Map(app);
for (let i of map) {
  console.log(i[0] + ":  " + i[1])
}