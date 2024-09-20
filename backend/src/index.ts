import { createPerson, findPeople } from "./repositories/PersonRepository";
import { app } from "./server";

// const port = 3000;

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });


async function testRun(): Promise<void> {
  // const dupa = await createPerson({
  //   first_name: 'Test',
  //   last_name: 'Test',
  //   gender: 'man',
  // })
  // console.log(dupa)

  const person = await findPeople({ first_name: "Test" })
  console.log(person)
}

testRun()
