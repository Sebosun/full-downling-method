import { app } from "@/server";
import { configDotenv } from "dotenv";
configDotenv()

const PORT = process.env.PORT

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
