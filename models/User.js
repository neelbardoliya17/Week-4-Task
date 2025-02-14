let users = [
  {
    id: 1,
    name: "Neel",
    email: "neel.b@eclateng.com",
    age: 21,
  },
  {
    id: 2,
    name: "Dev",
    email: "dev@gmail.com",
    age: 21,
  },
];

const getUsers=()=>users;
const addUser=(user)=>users.push(user);

module.exports = {getUsers,addUser};
