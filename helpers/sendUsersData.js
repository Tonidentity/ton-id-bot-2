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
    const lastUsersCount = await lastCount.find()

    //Calculate new users from then till now
    const newUsersCount = allUsersCount -  lastUsersCount.value

    //Update total users count
    lastUsersCount = Object.assign(lastUsersCount, {value:allUsersCount})
    await lastUsersCount.save()
    

    const replyText = `
*Congratulations!🥳🥳 ${newUsersCount} NEW USERS!!* 😎😎

*TOTAL USERS:* ${allUsersCount}

*AMOUNT EARNED BY ALL USERS:* ${amountEarned}

`;

bot.telegram.sendMessage(chatId, replyText, {parse_mode:"Markdown"})
  } catch (error) {
    console.log("Send user's data error:\n", error)
  }
};

module.exports = sendUsersData;
