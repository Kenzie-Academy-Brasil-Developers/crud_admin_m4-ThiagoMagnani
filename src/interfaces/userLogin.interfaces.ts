interface userLogin {
    email: string,
    password: string,
}

type iToken = {
    token: string,
}

export { userLogin, iToken };
