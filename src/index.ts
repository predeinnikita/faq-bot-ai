import 'dotenv/config';
import { createBot } from './bot';

async function main(): Promise<void> {
  const token = process.env.BOT_TOKEN;
  if (!token) {
    console.error('BOT_TOKEN is not set in environment variables');
    process.exit(1);
  }

  const bot = createBot(token);

  try {
    await bot.launch();
    // eslint-disable-next-line no-console
    console.log('Bot is up and running');
  } catch (error) {
    console.error('Failed to launch bot', error);
    process.exit(1);
  }

  // Graceful stop
  const stopSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of stopSignals) {
    process.once(signal, async () => {
      // eslint-disable-next-line no-console
      console.log(`Received ${signal}. Stopping bot...`);
      await bot.stop();
      process.exit(0);
    });
  }
}

main();

