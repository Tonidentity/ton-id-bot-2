const BotUser = require("../model/BotUserModel");
const lastCount = require("../model/lastCountModel");

const sendUsersData = async (bot, chatId) => {
  try {
    const allUsers = await BotUser.find();
    const allUsersCount = allUsers.length;

    let amountEarned = 0;
    allUsers.forEach((eachUser) => {
      amountEarned += eachUser.balance;
    });

    //Fetch last saved total users
    let lastUsersCount = await lastCount.find()
    let previousCount = lastUsersCount[0]

    //Calculate new users from then till now
    const newUsersCount = allUsersCount -  previousCount.value
    if(newUsersCount==0) return

    //Update total users count
    previousCount = Object.assign(previousCount, {value:allUsersCount})
    await previousCount.save()
    

    const replyText = `
*Congratulations*🥳🥳

*${newUsersCount}* NEW USERS🤩

TOTAL USERS: *${allUsersCount}*

AMOUNT EARNED BY ALL USERS: *${amountEarned.toLocaleString()} TFT*`;

bot.telegram.sendMessage(chatId, replyText, {parse_mode:"Markdown"})
  } catch (error) {
    console.log("Send user's data error:\n", error)
  }
};

module.exports = sendUsersData;
