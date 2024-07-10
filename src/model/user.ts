import { User } from "../interfaces/User";

// Array to store users, 1 dummy user for testing
export const users: User[] = [
  {
    name: "rashik",
    email: "rkoirala43@gmail.com",
    password: "$2b$10$TGpMkx0Vrux.jO30w88BceN1Tb8IN6MApt7uoNFt8ufiNG8gi4gyy",
    id: "1",
    permissions: ["users.post"],
  },
  {
    name: "super",
    email: "super@super.com",
    password: "$2b$10$Ufl/DBoTufW19vdgbieE9uEgzaWvKJAg556y.qFLLy5pVZ0KmtarC",
    id: "2",
    permissions: ["user.post", "users.get", "users.put", "users.delete"],
  },
];

export function getUsers() {
  return users;
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
  });
}

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export const updateUser = (id: number, updatedData: User, index: number) => {
  users[index] = { ...users[index], ...updatedData };
};

export const deleteUser = (index: number): void => {
  users.splice(index, 1);
};

export const findUserIndexById = (id: number): number => {
  return users.findIndex((user) => parseInt(user.id) === id);
};

export const findUserById = (id: number): User | undefined => {
  return users.find((user) => parseInt(user.id) === id);
};
