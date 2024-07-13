import server from "@/_boot/server";
import app from "@/presentation/application";
import database from "@/_boot/database";
import GlobalConsumer from "@/_boot/consumer";

export const main = async () => {
  try {
    await server(app);

    await database();
    await GlobalConsumer.listen();
    process.on("SIGTERM", async () => {
      console.info("SIGTERM received");
      // stopConsumer();
    });
  } catch (error: any) {
    console.log(`Oops!`, error?.message);
  }
};
