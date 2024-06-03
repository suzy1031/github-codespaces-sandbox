const createUser = ({
  firstName,
  lastName,
  email,
}: {
  firstName: string;
  lastName: string;
  email: string;
}) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});

const john = createUser({
  firstName: "john",
  lastName: "doe",
  email: "john@doe.com",
});
const jane = createUser({
  firstName: "jane",
  lastName: "doe",
  email: "jane@doe.com",
});
console.log(john.fullName());
console.log(jane.fullName());
