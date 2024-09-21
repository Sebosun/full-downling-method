import { app } from "@/server";

const PORT = process.env.PORT

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
