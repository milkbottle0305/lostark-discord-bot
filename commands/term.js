const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('용어')
		.setDescription('로스트아크 관련 용어정보를 제공합니다.')
        .addStringOption(option =>
            option.setName('단어')
                .setDescription('궁금한 단어')
                .setRequired(true)),
	async execute(interaction) {
        const user_term = interaction.options.getString('단어'); 

        await fs.readFile('./terms/response.json', 'utf-8', (err, respone) => {
            if (err) return console.log(err);
            const terms = JSON.parse(respone);

            if(user_term in terms){
                const termembed = new MessageEmbed()
                .setColor('#FFD700')
                .setTitle('단어 정보 제공')
                .setDescription(`${user_term}: ${terms[user_term]}`)
                interaction.reply({ embeds: [termembed], allowedMentions: {repliedUser: false} });
            } else{
                const termembed = new MessageEmbed()
                .setColor('#FFD700')
                .setTitle('단어 정보 제공')
                .setDescription(`${user_term}에 대한 정보가 없어요\n사용자가 많이 입력하는 단어 일수록 정보가 빠르게 추가됩니다!`)

                fs.readFile('./terms/request.json', 'utf-8', (err, request) => {
                    if (err) return console.log(err);
                    let req_terms = JSON.parse(request);

                    if(user_term in req_terms){
                        req_terms[user_term] += 1;
                        let reqtermJsion = JSON.stringify(req_terms);
                        fs.writeFile('./terms/request.json', reqtermJsion, (err) => {
                            if (err) return console.log(err);
                        })
                    }else{
                        req_terms[user_term] = 0;
                        let reqtermJsion = JSON.stringify(req_terms);
                        fs.writeFile('./terms/request.json', reqtermJsion, (err => {
                            if (err) return console.log(err);
                        }))
                    }
                })
                interaction.reply({ embeds: [termembed], allowedMentions: {repliedUser: false} });
            }
        })
	},
};