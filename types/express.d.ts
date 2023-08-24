declare namespace Express {
  interface Request {
    user: {
      id: user.id;
      name: user.name;
      email: user.email;
      username: user.username;
    };
  }
}
