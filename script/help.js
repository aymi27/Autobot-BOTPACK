const fs = require("fs");
const axios = require("axios");

module.exports.config = {
        name: "help",
        version: "1.0.2",
        hasPermssion: 0,
        credits: "Mirai Team",
        description: "Beginner's Guide",
        commandCategory: "system",
        usages: "[command]",
        usePrefix: false,
        cooldowns: 0,
        envConfig: {
                autoUnsend: false,
                delayUnsend: 20
        }
};

module.exports.languages = {
        "vi": {
                "moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Nhóm lệnh: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Code module by %7 «",
                "helpList": '[ Hiện tại có %1 lệnh có thể sử dụng trên bot, Sử dụng: "%2help tên_lệnh" để xem chi tiết cách sử dụng! ]',
                "user": "Người dùng",
                "adminGroup": "Quản trị viên nhóm",
                "adminBot": "Quản trị viên bot"
        },
        "en": {
                "moduleInfo": "〘 %1 〙\n%2\n\n◉ 𝗨𝘀𝗮𝗴𝗲: %3\n◉ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n◉ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: %5 𝘀𝗲𝗰𝗼𝗻𝗱𝘀(s)\n◉ 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n» 𝗖𝗼𝗱𝗲 𝗺𝗼𝗱𝘂𝗹𝗲 𝗯𝘆 %7 «",
                "helpList": '〘 𝗧𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 %1 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗼𝗻 𝘁𝗵𝗶𝘀 𝗯𝗼𝘁, 𝗨𝘀𝗲: "%2𝗵𝗲𝗹𝗽 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗡𝗮𝗺𝗲" 𝘁𝗼 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝘁𝗼 𝘂𝘀𝗲! 〙',
                "user": "𝗔𝗻𝘆𝗼𝗻𝗲",
                "adminGroup": "𝗔𝗱𝗺𝗶𝗻 𝗼𝗳 𝗴𝗿𝗼𝘂𝗽",
                "adminBot": "𝗔𝗱𝗺𝗶𝗻 𝗼𝗳 𝗯𝗼𝘁"
        }
};

module.exports.handleEvent = async function({ api, event, getText }) {
        if (!(event.body.indexOf("help") === 0 || event.body.indexOf("Help") === 0)) return;
        const args = event.body.split(/\s+/);
        args.shift();

        const { commands } = global.client;
        const { threadID, messageID } = event;
        const command = commands.get((args[0] || "").toLowerCase());
        const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
        const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
        const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

        if (!command) {
                const arrayInfo = [];
                const page = parseInt(args[0]) || 1;
                const numberOfOnePage = 20;
                let i = 0;
                let msg = "\n";

                for (var [name, value] of (commands)) {
                        name += `  ${value.config.usages}`;
                        arrayInfo.push(name);
                }
                arrayInfo.sort((a, b) => a.data - b.data);

                const startSlice = numberOfOnePage*page - numberOfOnePage;
                i = startSlice;
                const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

                for (let item of returnArray) msg +=`╭─〘🤖〙\n▣ ${item}\n╰───────────〘🤖〙\n`;
                const randomQuotes = [
        "𝖮𝖼𝗍𝗈𝗉𝗎𝗌𝖾𝗌 𝗁𝖺𝗏𝖾 𝗍𝗁𝗋𝖾𝖾 𝗁𝖾𝖺𝗋𝗍𝗌: 𝗍𝗐𝗈 𝗉𝗎𝗆𝗉 𝖻𝗅𝗈𝗈𝖽 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗂𝗅𝗅𝗌, 𝖺𝗇𝖽 𝗈𝗇𝖾 𝗉𝗎𝗆𝗉𝗌 𝗂𝗍 𝗍𝗈 𝗍𝗁𝖾 𝗋𝖾𝗌𝗍 𝗈𝖿 𝗍𝗁𝖾 𝖻𝗈𝖽𝗒.",
                "𝙷𝚘𝚗𝚎𝚢 𝚗𝚎𝚟𝚎𝚛 𝚜𝚙𝚘𝚒𝚕𝚜; 𝚊𝚛𝚌𝚑𝚊𝚎𝚘𝚕𝚘𝚐𝚒𝚜𝚝𝚜 𝚑𝚊𝚟𝚎 𝚏𝚘𝚞𝚗𝚍 𝚙𝚘𝚝𝚜 𝚘𝚏 𝚑𝚘𝚗𝚎𝚢 𝚒𝚗 𝚊𝚗𝚌𝚒𝚎𝚗𝚝 𝙴𝚐𝚢𝚙𝚝𝚒𝚊𝚗 𝚝𝚘𝚖𝚋𝚜 𝚝𝚑𝚊𝚝 𝚊𝚛𝚎 𝚘𝚟𝚎𝚛 𝟹,𝟶𝟶𝟶 𝚢𝚎𝚊𝚛𝚜 𝚘𝚕𝚍.",
                "𝚃𝚑𝚎 𝚠𝚘𝚛𝚕𝚍'𝚜 𝚘𝚕𝚍𝚎𝚜𝚝 𝚔𝚗𝚘𝚠𝚗 𝚛𝚎𝚌𝚒𝚙𝚎 𝚒𝚜 𝚏𝚘𝚛 𝚋𝚎𝚎𝚛.",
                "𝙱𝚊𝚗𝚊𝚗𝚊𝚜 𝚊𝚛𝚎 𝚋𝚎𝚛𝚛𝚒𝚎𝚜, 𝚋𝚞𝚝 𝚜𝚝𝚛𝚊𝚠𝚋𝚎𝚛𝚛𝚒𝚎𝚜 𝚊𝚛𝚎 𝚗𝚘𝚝.",
                "𝙲𝚘𝚠𝚜 𝚑𝚊𝚟𝚎 𝚋𝚎𝚜𝚝 𝚏𝚛𝚒𝚎𝚗𝚍𝚜 𝚊𝚗𝚍 𝚌𝚊𝚗 𝚋𝚎𝚌𝚘𝚖𝚎 𝚜𝚝𝚛𝚎𝚜𝚜𝚎𝚍 𝚠𝚑𝚎𝚗 𝚝𝚑𝚎𝚢 𝚊𝚛𝚎 𝚜𝚎𝚙𝚊𝚛𝚊𝚝𝚎𝚍.",
                "𝚃𝚑𝚎 𝚜𝚑𝚘𝚛𝚝𝚎𝚜𝚝 𝚠𝚊𝚛 𝚒𝚗 𝚑𝚒𝚜𝚝𝚘𝚛𝚢 𝚠𝚊𝚜 𝚋𝚎𝚝𝚠𝚎𝚎𝚗 𝙱𝚛𝚒𝚝𝚊𝚒𝚗 𝚊𝚗𝚍 𝚉𝚊𝚗𝚣𝚒𝚋𝚊𝚛 𝚘𝚗 𝙰𝚞𝚐𝚞𝚜𝚝 𝟸𝟽, 𝟷𝟾𝟿𝟼; 𝚉𝚊𝚗𝚣𝚒𝚋𝚊𝚛 𝚜𝚞𝚛𝚛𝚎𝚗𝚍𝚎𝚛𝚎𝚍 𝚊𝚏𝚝𝚎𝚛 𝟹𝟾 𝚖𝚒𝚗𝚞𝚝𝚎𝚜.",
                "𝚃𝚑𝚎 𝚊𝚟𝚎𝚛𝚊𝚐𝚎 𝚙𝚎𝚛𝚜𝚘𝚗 𝚠𝚊𝚕𝚔𝚜 𝚝𝚑𝚎 𝚎𝚚𝚞𝚒𝚟𝚊𝚕𝚎𝚗𝚝 𝚘𝚏 𝚝𝚑𝚛𝚎𝚎 𝚝𝚒𝚖𝚎𝚜 𝚊𝚛𝚘𝚞𝚗𝚍 𝚝𝚑𝚎 𝚠𝚘𝚛𝚕𝚍 𝚒𝚗 𝚊 𝚕𝚒𝚏𝚎𝚝𝚒𝚖𝚎.",
                "𝙿𝚘𝚕𝚊𝚛 𝚋𝚎𝚊𝚛𝚜 𝚊𝚛𝚎 𝚕𝚎𝚏𝚝-𝚑𝚊𝚗𝚍𝚎𝚍.",
                "𝚃𝚑𝚎 𝚞𝚗𝚒𝚌𝚘𝚛𝚗 𝚒𝚜 𝚂𝚌𝚘𝚝𝚕𝚊𝚗𝚍'𝚜 𝚗𝚊𝚝𝚒𝚘𝚗𝚊𝚕 𝚊𝚗𝚒𝚖𝚊𝚕.",
                "𝙰 𝚐𝚛𝚘𝚞𝚙 𝚘𝚏 𝚏𝚕𝚊𝚖𝚒𝚗𝚐𝚘𝚜 𝚒𝚜 𝚌𝚊𝚕𝚕𝚎𝚍 𝚊 '𝚏𝚕𝚊𝚖𝚋𝚘𝚢𝚊𝚗𝚌𝚎'.",
                "𝚃𝚑𝚎𝚛𝚎 𝚊𝚛𝚎 𝚖𝚘𝚛𝚎 𝚙𝚘𝚜𝚜𝚒𝚋𝚕𝚎 𝚒𝚝𝚎𝚛𝚊𝚝𝚒𝚘𝚗𝚜 𝚘𝚏 𝚊 𝚐𝚊𝚖𝚎 𝚘𝚏 𝚌𝚑𝚎𝚜𝚜 𝚝𝚑𝚊𝚗 𝚝𝚑𝚎𝚛𝚎 𝚊𝚛𝚎 𝚊𝚝𝚘𝚖𝚜 𝚒𝚗 𝚝𝚑𝚎 𝚔𝚗𝚘𝚠𝚗 𝚞𝚗𝚒𝚟𝚎𝚛𝚜𝚎.",
                "𝚃𝚑𝚎 𝚜𝚖𝚎𝚕𝚕 𝚘𝚏 𝚏𝚛𝚎𝚜𝚑𝚕𝚢-𝚌𝚞𝚝 𝚐𝚛𝚊𝚜𝚜 𝚒𝚜 𝚊𝚌𝚝𝚞𝚊𝚕𝚕𝚢 𝚊 𝚙𝚕𝚊𝚗𝚝 𝚍𝚒𝚜𝚝𝚛𝚎𝚜𝚜 𝚌𝚊𝚕𝚕.",
                "𝙰 𝚍𝚊𝚢 𝚘𝚗 𝚅𝚎𝚗𝚞𝚜 𝚒𝚜 𝚕𝚘𝚗𝚐𝚎𝚛 𝚝𝚑𝚊𝚗 𝚒𝚝𝚜 𝚢𝚎𝚊𝚛.",
                "𝙷𝚘𝚗𝚎𝚢𝚋𝚎𝚎𝚜 𝚌𝚊𝚗 𝚛𝚎𝚌𝚘𝚐𝚗𝚒𝚣𝚎 𝚑𝚞𝚖𝚊𝚗 𝚏𝚊𝚌𝚎𝚜.",
                "𝚆𝚘𝚖𝚋𝚊𝚝 𝚙𝚘𝚘𝚙 𝚒𝚜 𝚌𝚞𝚋𝚎-𝚜𝚑𝚊𝚙𝚎𝚍.",
                "𝚃𝚑𝚎 𝚏𝚒𝚛𝚜𝚝 𝚘𝚛𝚊𝚗𝚐𝚎𝚜 𝚠𝚎𝚛𝚎𝚗'𝚝 𝚘𝚛𝚊𝚗𝚐𝚎.",
                "𝚃𝚑𝚎 𝚕𝚘𝚗𝚐𝚎𝚜𝚝 𝚝𝚒𝚖𝚎 𝚋𝚎𝚝𝚠𝚎𝚎𝚗 𝚝𝚠𝚘 𝚝𝚠𝚒𝚗𝚜 𝚋𝚎𝚒𝚗𝚐 𝚋𝚘𝚛𝚗 𝚒𝚜 𝟾𝟽 𝚍𝚊𝚢𝚜.",
                "𝙰 𝚋𝚘𝚕𝚝 𝚘𝚏 𝚕𝚒𝚐𝚑𝚝𝚗𝚒𝚗𝚐 𝚒𝚜 𝚜𝚒𝚡 𝚝𝚒𝚖𝚎𝚜 𝚑𝚘𝚝𝚝𝚎𝚛 𝚝𝚑𝚊𝚗 𝚝𝚑𝚎 𝚜𝚞𝚗.",
                "𝙰 𝚋𝚊𝚋𝚢 𝚙𝚞𝚏𝚏𝚒𝚗 𝚒𝚜 𝚌𝚊𝚕𝚕𝚎𝚍 𝚊 𝚙𝚞𝚏𝚏𝚕𝚒𝚗𝚐.",
                "𝙰 𝚓𝚒𝚏𝚏𝚢 𝚒𝚜 𝚊𝚗 𝚊𝚌𝚝𝚞𝚊𝚕 𝚞𝚗𝚒𝚝 𝚘𝚏 𝚝𝚒𝚖𝚎: 𝟷/𝟷𝟶𝟶𝚝𝚑 𝚘𝚏 𝚊 𝚜𝚎𝚌𝚘𝚗𝚍.",
                "𝚃𝚑𝚎 𝚠𝚘𝚛𝚍 '𝚗𝚎𝚛𝚍' 𝚠𝚊𝚜 𝚏𝚒𝚛𝚜𝚝 𝚌𝚘𝚒𝚗𝚎𝚍 𝚋𝚢 𝙳𝚛. 𝚂𝚎𝚞𝚜𝚜 𝚒𝚗 '𝙸𝚏 𝙸 𝚁𝚊𝚗 𝚝𝚑𝚎 𝚉𝚘𝚘'.",
                "𝚃𝚑𝚎𝚛𝚎'𝚜 𝚊 𝚜𝚙𝚎𝚌𝚒𝚎𝚜 𝚘𝚏 𝚓𝚎𝚕𝚕𝚢𝚏𝚒𝚜𝚑 𝚝𝚑𝚊𝚝 𝚒𝚜 𝚋𝚒𝚘𝚕𝚘𝚐𝚒𝚌𝚊𝚕𝚕𝚢 𝚒𝚖𝚖𝚘𝚛𝚝𝚊𝚕.",
                "𝚃𝚑𝚎 𝙴𝚒𝚏𝚏𝚎𝚕 𝚃𝚘𝚠𝚎𝚛 𝚌𝚊𝚗 𝚋𝚎 𝟼 𝚒𝚗𝚌𝚑𝚎𝚜 𝚝𝚊𝚕𝚕𝚎𝚛 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝚜𝚞𝚖𝚖𝚎𝚛 𝚍𝚞𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚎𝚡𝚙𝚊𝚗𝚜𝚒𝚘𝚗 𝚘𝚏 𝚝𝚑𝚎 𝚒𝚛𝚘𝚗.",
                "𝚃𝚑𝚎 𝙴𝚊𝚛𝚝𝚑 𝚒𝚜 𝚗𝚘𝚝 𝚊 𝚙𝚎𝚛𝚏𝚎𝚌𝚝 𝚜𝚙𝚑𝚎𝚛𝚎; 𝚒𝚝'𝚜 𝚜𝚕𝚒𝚐𝚑𝚝𝚕𝚢 𝚏𝚕𝚊𝚝𝚝𝚎𝚗𝚎𝚍 𝚊𝚝 𝚝𝚑𝚎 𝚙𝚘𝚕𝚎𝚜 𝚊𝚗𝚍 𝚋𝚞𝚕𝚐𝚒𝚗𝚐 𝚊𝚝 𝚝𝚑𝚎 𝚎𝚚𝚞𝚊𝚝𝚘𝚛.",
                "𝙰 𝚑𝚞𝚖𝚖𝚒𝚗𝚐𝚋𝚒𝚛𝚍 𝚠𝚎𝚒𝚐𝚑𝚜 𝚕𝚎𝚜𝚜 𝚝𝚑𝚊𝚗 𝚊 𝚙𝚎𝚗𝚗𝚢.",
                "𝙺𝚘𝚊𝚕𝚊𝚜 𝚑𝚊𝚟𝚎 𝚏𝚒𝚗𝚐𝚎𝚛𝚙𝚛𝚒𝚗𝚝𝚜 𝚝𝚑𝚊𝚝 𝚊𝚛𝚎 𝚗𝚎𝚊𝚛𝚕𝚢 𝚒𝚍𝚎𝚗𝚝𝚒𝚌𝚊𝚕 𝚝𝚘 𝚑𝚞𝚖𝚊𝚗𝚜'.",
                "𝚃𝚑𝚎𝚛𝚎'𝚜 𝚊 𝚝𝚘𝚠𝚗 𝚒𝚗 𝙽𝚘𝚛𝚠𝚊𝚢 𝚠𝚑𝚎𝚛𝚎 𝚝𝚑𝚎 𝚜𝚞𝚗 𝚍𝚘𝚎𝚜𝚗'𝚝 𝚛𝚒𝚜𝚎 𝚏𝚘𝚛 𝚜𝚎𝚟𝚎𝚛𝚊𝚕 𝚠𝚎𝚎𝚔𝚜 𝚒𝚗 𝚝𝚑𝚎 𝚠𝚒𝚗𝚝𝚎𝚛, 𝚊𝚗𝚍 𝚒𝚝 𝚍𝚘𝚎𝚜𝚗'𝚝 𝚜𝚎𝚝 𝚏𝚘𝚛 𝚜𝚎𝚟𝚎𝚛𝚊𝚕 𝚠𝚎𝚎𝚔𝚜 𝚒𝚗 𝚝𝚑𝚎 𝚜𝚞𝚖𝚖𝚎𝚛.",
                "𝙰 𝚐𝚛𝚘𝚞𝚙 𝚘𝚏 𝚘𝚠𝚕𝚜 𝚒𝚜 𝚌𝚊𝚕𝚕𝚎𝚍 𝚊 𝚙𝚊𝚛𝚕𝚒𝚊𝚖𝚎𝚗𝚝.",
                "𝚃𝚑𝚎 𝚏𝚒𝚗𝚐𝚎𝚛𝚙𝚛𝚒𝚗𝚝𝚜 𝚘𝚏 𝚊 𝚔𝚘𝚊𝚕𝚊 𝚊𝚛𝚎 𝚜𝚘 𝚒𝚗𝚍𝚒𝚜𝚝𝚒𝚗𝚐𝚞𝚒𝚜𝚑𝚊𝚋𝚕𝚎 𝚏𝚛𝚘𝚖 𝚑𝚞𝚖𝚊𝚗𝚜' 𝚝𝚑𝚊𝚝 𝚝𝚑𝚎𝚢 𝚑𝚊𝚟𝚎 𝚘𝚗 𝚘𝚌𝚌𝚊𝚜𝚒𝚘𝚗 𝚋𝚎𝚎𝚗 𝚌𝚘𝚗𝚏𝚞𝚜𝚎𝚍 𝚊𝚝 𝚊 𝚌𝚛𝚒𝚖𝚎 𝚜𝚌𝚎𝚗𝚎.",
                "𝚃𝚑𝚎 𝙷𝚊𝚠𝚊𝚒𝚒𝚊𝚗 𝚊𝚕𝚙𝚑𝚊𝚋𝚎𝚝 𝚑𝚊𝚜 𝚘𝚗𝚕𝚢 𝟷𝟹 𝚕𝚎𝚝𝚝𝚎𝚛𝚜.",
                "𝚃𝚑𝚎 𝚊𝚟𝚎𝚛𝚊𝚐𝚎 𝚙𝚎𝚛𝚜𝚘𝚗 𝚜𝚙𝚎𝚗𝚍𝚜 𝚜𝚒𝚡 𝚖𝚘𝚗𝚝𝚑𝚜 𝚘𝚏 𝚝𝚑𝚎𝚒𝚛 𝚕𝚒𝚏𝚎 𝚠𝚊𝚒𝚝𝚒𝚗𝚐 𝚏𝚘𝚛 𝚛𝚎𝚍 𝚕𝚒𝚐𝚑𝚝𝚜 𝚝𝚘 𝚝𝚞𝚛𝚗 𝚐𝚛𝚎𝚎𝚗.",
                "𝙰 𝚗𝚎𝚠𝚋𝚘𝚛𝚗 𝚔𝚊𝚗𝚐𝚊𝚛𝚘𝚘 𝚒𝚜 𝚊𝚋𝚘𝚞𝚝 𝟷 𝚒𝚗𝚌𝚑 𝚕𝚘𝚗𝚐.",
                "𝚃𝚑𝚎 𝚘𝚕𝚍𝚎𝚜𝚝 𝚔𝚗𝚘𝚠𝚗 𝚕𝚒𝚟𝚒𝚗𝚐 𝚝𝚛𝚎𝚎 𝚒𝚜 𝚘𝚟𝚎𝚛 𝟻,𝟶𝟶𝟶 𝚢𝚎𝚊𝚛𝚜 𝚘𝚕𝚍.",
                "𝙲𝚘𝚌𝚊-𝙲𝚘𝚕𝚊 𝚠𝚘𝚞𝚕𝚍 𝚋𝚎 𝚐𝚛𝚎𝚎𝚗 𝚒𝚏 𝚌𝚘𝚕𝚘𝚛𝚒𝚗𝚐 𝚠𝚊𝚜𝚗'𝚝 𝚊𝚍𝚍𝚎𝚍 𝚝𝚘 𝚒𝚝.",
                "𝙰 𝚍𝚊𝚢 𝚘𝚗 𝙼𝚊𝚛𝚜 𝚒𝚜 𝚊𝚋𝚘𝚞𝚝 𝟸𝟺.𝟼 𝚑𝚘𝚞𝚛𝚜 𝚕𝚘𝚗𝚐.",
                "𝚃𝚑𝚎 𝙶𝚛𝚎𝚊𝚝 𝚆𝚊𝚕𝚕 𝚘𝚏 𝙲𝚑𝚒𝚗𝚊 𝚒𝚜 𝚗𝚘𝚝 𝚟𝚒𝚜𝚒𝚋𝚕𝚎 𝚏𝚛𝚘𝚖 𝚜𝚙𝚊𝚌𝚎 𝚠𝚒𝚝𝚑𝚘𝚞𝚝 𝚊𝚒𝚍.",
                "𝙰 𝚐𝚛𝚘𝚞𝚙 𝚘𝚏 𝚌𝚛𝚘𝚠𝚜 𝚒𝚜 𝚌𝚊𝚕𝚕𝚎𝚍 𝚊 𝚖𝚞𝚛𝚍𝚎𝚛.",
                "𝚃𝚑𝚎𝚛𝚎'𝚜 𝚊 𝚙𝚕𝚊𝚌𝚎 𝚒𝚗 𝙵𝚛𝚊𝚗𝚌𝚎 𝚠𝚑𝚎𝚛𝚎 𝚢𝚘𝚞 𝚌𝚊𝚗 𝚠𝚒𝚝𝚗𝚎𝚜𝚜 𝚊𝚗 𝚘𝚙𝚝𝚒𝚌𝚊𝚕 𝚒𝚕𝚕𝚞𝚜𝚒𝚘𝚗 𝚝𝚑𝚊𝚝 𝚖𝚊𝚔𝚎𝚜 𝚢𝚘𝚞 𝚊𝚙𝚙𝚎𝚊𝚛 𝚝𝚘 𝚐𝚛𝚘𝚠 𝚊𝚗𝚍 𝚜𝚑𝚛𝚒𝚗𝚔 𝚊𝚜 𝚢𝚘𝚞 𝚠𝚊𝚕𝚔 𝚍𝚘𝚠𝚗 𝚊 𝚑𝚒𝚕𝚕.",
                "𝚃𝚑𝚎 𝚠𝚘𝚛𝚕𝚍'𝚜 𝚕𝚊𝚛𝚐𝚎𝚜𝚝 𝚍𝚎𝚜𝚎𝚛𝚝 𝚒𝚜 𝙰𝚗𝚝𝚊𝚛𝚌𝚝𝚒𝚌𝚊, 𝚗𝚘𝚝 𝚝𝚑𝚎 𝚂𝚊𝚑𝚊𝚛𝚊.",
                "𝙰 𝚋𝚕𝚞𝚎 𝚠𝚑𝚊𝚕𝚎'𝚜 𝚑𝚎𝚊𝚛𝚝 𝚒𝚜 𝚜𝚘 𝚋𝚒𝚐 𝚝𝚑𝚊𝚝 𝚊 𝚑𝚞𝚖𝚊𝚗 𝚌𝚘𝚞𝚕𝚍 𝚜𝚠𝚒𝚖 𝚝𝚑𝚛𝚘𝚞𝚐𝚑 𝚒𝚝𝚜 𝚊𝚛𝚝𝚎𝚛𝚒𝚎𝚜.",
                "𝚃𝚑𝚎 𝚕𝚘𝚗𝚐𝚎𝚜𝚝 𝚠𝚘𝚛𝚍 𝚒𝚗 𝚝𝚑𝚎 𝙴𝚗𝚐𝚕𝚒𝚜𝚑 𝚕𝚊𝚗𝚐𝚞𝚊𝚐𝚎 𝚠𝚒𝚝𝚑𝚘𝚞𝚝 𝚊 𝚟𝚘𝚠𝚎𝚕 𝚒𝚜 '𝚛𝚑𝚢𝚝𝚑𝚖𝚜'.",
                "𝙿𝚘𝚕𝚊𝚛 𝚋𝚎𝚊𝚛𝚜' 𝚏𝚞𝚛 𝚒𝚜 𝚗𝚘𝚝 𝚠𝚑𝚒𝚝𝚎; 𝚒𝚝'𝚜 𝚊𝚌𝚝𝚞𝚊𝚕𝚕𝚢 𝚝𝚛𝚊𝚗𝚜𝚙𝚊𝚛𝚎𝚗𝚝.",
                "𝚃𝚑𝚎 𝚎𝚕𝚎𝚌𝚝𝚛𝚒𝚌 𝚌𝚑𝚊𝚒𝚛 𝚠𝚊𝚜 𝚒𝚗𝚟𝚎𝚗𝚝𝚎𝚍 𝚋𝚢 𝚊 𝚍𝚎𝚗𝚝𝚒𝚜𝚝.",
                "𝙰𝚗 𝚘𝚜𝚝𝚛𝚒𝚌𝚑'𝚜 𝚎𝚢𝚎 𝚒𝚜 𝚋𝚒𝚐𝚐𝚎𝚛 𝚝𝚑𝚊𝚗 𝚒𝚝𝚜 𝚋𝚛𝚊𝚒𝚗.",
                "𝚆𝚘𝚖𝚋𝚊𝚝 𝚙𝚘𝚘𝚙 𝚒𝚜 𝚌𝚞𝚋𝚎-𝚜𝚑𝚊𝚙𝚎𝚍."."
        ];

 const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

                const randomTexts = [ 
"Even a small amount of alcohol poured on a scorpion will drive it crazy and sting itself to death.",
" The crocodile can't stick its tongue out.","The oldest known animal in the world is a 405-year-old male, discovered in 2007.","Sharks, like other fish, have their reproductive organs located in the ribcage.","The eyes of the octopus have no blind spots. On average, the brain of an octopus has 300 million neurons. When under extreme stress, some octopuses even eat their trunks.","An elephant's brain weighs about 6,000g, while a cat's brain weighs only approximately 30g.","Cats and dogs have the ability to hear ultrasound.","Sheep can survive up to 2 weeks in a state of being buried in snow.","The smartest pig in the world is owned by a math teacher in Madison, Wisconsin (USA). It has the ability to memorize worksheets multiplying to 12.","Statistics show that each rattlesnake's mating lasts up to ... more than 22 hours", "Studies have found that flies are deaf.","In a lack of water, kangaroos can endure longer than camels.","","Dogs have 4 toes on their hind legs and 5 toes on each of their front paws.","The average flight speed of honey bees is 24km/h. They never sleep.","Cockroaches can live up to 9 days after having their heads cut off.","If you leave a goldfish in the dark for a long time, it will eventually turn white.","The flying record for a chicken is 13 seconds.","The mosquito that causes the most deaths to humans worldwide is the mosquito.","TThe quack of a duck doesn't resonate, and no one knows why.","Sea pond has no brain. They are also among the few animals that can turn their stomachs inside out.","Termites are active 24 hours a day and they do not sleep. Studies have also found that termites gnaw wood twice as fast when listening to heavy rock music.","Baby giraffes usually fall from a height of 1.8 meters when they are born.", "A tiger not only has a striped coat, but their skin is also streaked with stripes.."," Vultures fly without flapping their wings.","Turkeys can reproduce without mating.","Penguins are the only birds that can swim, but not fly. Nor have any penguins been found in the Arctic."," The venom of the king cobra is so toxic that just one gram can kill 150 people.","The venom of a small scorpion is much more dangerous than the venom of a large scorpion.","The length of an oyster's penis can be so 'monstrous' that it is 20 times its body size!","Rat's heart beats 650 times per minute.","The flea can jump 350 times its body length. If it also possessed that ability, a human would be able to jump the length of a football field once.","The faster the kangaroo jumps, the less energy it consumes.","Elephants are among the few mammals that can't jump! It was also discovered that elephants still stand after death.","Spiders have transparent blood."," Snails breathe with their feet.","Some lions mate more than 50 times a day.","Chuột reproduce so quickly that in just 18 months, from just 2 mice, the mother can give birth to 1 million heirs.","Hedgehog floats on water.","Alex is the world's first African gray parrot to question its own existence: What color am I?.","The reason why flamingos are pink-red in color is because they can absorb pigments from the shells of shrimp and shrimp that they eat every day."," Owls and pigeons can memorize human faces", "Cows are more dangerous than sharks","The single pair of wings on the back and the rear stabilizer help the flies to fly continuously, but their lifespan is not more than 14 days.","With a pair of endlessly long legs that can be up to 1.5 m high and weigh 20-25 kg, the ostrich can run faster than a horse. In addition, male ostriches can roar like a lion.","Kangaroos use their tails for balance, so if you lift a Kangaroo's tail off the ground, it won't be able to jump and stand.","Tigers not only have stripes on their backs but also printed on their skin. Each individual tiger is born with its own unique stripe.","If you are being attacked by a crocodile, do not try to get rid of their sharp teeth by pushing them away. Just poke the crocodile in the eye, that's their weakness.","Fleas can jump up to 200 times their height. This is equivalent to a man jumping on the Empire State Building in New York.","A cat has up to 32 muscles in the ear. That makes them have superior hearing ability","Koalas have a taste that does not change throughout life, they eat almost nothing but .. leaves of the eucalyptus tree.","The beaver's teeth do not stop growing throughout its life. If you do not want the teeth to be too long and difficult to control, the beaver must eat hard foods to wear them down.","Animals living in coastal cliffs or estuaries have extremely weird abilities. Oysters can change sex to match the mating method.","Butterflies have eyes with thousands of lenses similar to those on cameras, but they can only see red, green, and yellow..","Don't try this at home, the truth is that if a snail loses an eye, it can recover.","Giraffes do not have vocal cords like other animals of the same family, their tongues are blue-black.","Dog nose prints are like human fingerprints and can be used to identify different dogs."
                ];
        /*var data = ["https://i.imgur.com/XetbfAe.jpg", "https://i.imgur.com/4dwdpG9.jpg", "https://i.imgur.com/9My3K5w.jpg", "https://i.imgur.com/vK67ofl.jpg", "https://i.imgur.com/fGwlsFL.jpg"];
let link = data[Math.floor(Math.random() * data.length)];
let path = __dirname + `/cache/help.png`;
        let image = (
                await axios.get(link, {
                        responseType: "arraybuffer",
                })
        ).data;
        fs.writeFileSync(path, Buffer.from(image, "utf-8"));*/
                const text = `𝗧𝗼𝘁𝗮𝗹 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀:『${arrayInfo.length}』\n𝗣𝗢𝗚𝗜 𝗣𝗔 𝗞𝗜𝗦𝗦 𝗣𝗪𝗘𝗗𝗘?\n\n𝗥𝗔𝗡𝗗𝗢𝗠 𝗙𝗔𝗖𝗧: ${randomQuote}`;
                return api.sendMessage(`🔴🟡🟢\n\n░░░░█▄█ ▄▀█ ▀█ █▄▀ █▄█░░░
░░░░░█░ █▀█ █▄ █░█ ░█░░░░\n\n◦❭❯❱ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 & 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬 ❰❮❬◦\n\n 𝖯𝖺𝗀𝖾 『 ${page} /${Math.ceil(arrayInfo.length/numberOfOnePage)} 』` + "\n" + msg + "\n" + text, threadID, async (error, info) => {
                        if (autoUnsend) {
                                await new Promise(resolve => setTimeout(resolve, delayUnsend * 10000));
                                return api.unsendMessage(info.messageID);
                        } else return;
                });
        }
        return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = async function({ api, event }) {};