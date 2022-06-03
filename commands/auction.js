const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('경매')
		.setDescription('경매에서 최대로 이득을 볼 수 있는 입찰가를 계산합니다.')
        .addStringOption((option)=>
            option
                .setName("경매가")
                .setDescription("경매 물품의 경매장 최저가")
                .setRequired(true)
        )
        .addStringOption((option)=>
            option
                .setName("인원")
                .setDescription("경매에 참여하는 인원")
                .setRequired(true)
                .addChoice("4인", "4인")
                .addChoice("8인", "8인")
                .addChoice("16인", "16인")
                .addChoice("30인(필보/카게)", "30인(필보/카게)")
        ),
	async execute(interaction) {
        const buyValue = parseInt(parseInt(interaction.options.getString("경매가"))*0.95);
        const manyPeopleChoice = interaction.options.getString("인원");
        let manyPeople;
        if(manyPeopleChoice == "4인")
            manyPeople = 4;
        else if(manyPeopleChoice == "8인")
            manyPeople = 8;
        else if(manyPeopleChoice == "16인")
            manyPeople = 16;
        else if(manyPeopleChoice == "30인(필보/카게)")
            manyPeople = 30;
        const equalBid = parseInt(buyValue * (manyPeople - 1) / manyPeople);
        const benefitBid = parseInt(equalBid / 11 * 10);
        const embed = new MessageEmbed()
        .setTitle(":moneybag: 경매 분배금 계산기")
        .setDescription(`경매가: ${parseInt(interaction.options.getString("경매가"))}<:gold:952804483237289994> 인원: ${manyPeople}인`)
        .setColor("#FAA8F0")
        .addFields(
            {name: "이 가격에 내가 입찰했는데 다른사람이 입찰하면 내가 이득이에요!", value: `입찰가: ${benefitBid}<:gold:952804483237289994> 이득: ${buyValue-benefitBid}<:gold:952804483237289994>`},
            {name: "이 가격 이상부터 입찰하면 손해에요!", value:`입찰가: ${equalBid}<:gold:952804483237289994> 이득: ${buyValue-equalBid}<:gold:952804483237289994>`}
        )
        await interaction.reply({ embeds: [embed], allowedMentions: {repliedUser: false} });
	},
};