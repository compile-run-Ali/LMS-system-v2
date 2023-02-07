import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

let userAccount = null;

const configuration = {
    cookie: {
        secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                try
                {
                  if (credentials.role === "student") {
                    const studentData = await axios.post("http://localhost:3000/api/auth/student_login", {
                      P_number: credentials.username,
                      password: credentials.password
                    })

                    if (studentData.status === 200) {
                      return {
                        ...studentData.data,
                        role: "student"
                      }
                    } else {
                      throw new Error("An Error has occured")
                    }
                  } else if (credentials.role === "admin") {
                    const adminData = await axios.post("http://localhost:3000/api/auth/admin_login", {
                      email: credentials.username,
                      password: credentials.password
                    })

                    if (adminData.status === 200) {
                      return {
                        ...adminData.data,
                        role: "admin"
                      }
                    } else {
                      throw new Error("An Error has occured")
                    }
                  } else {
                    const facultyData = await axios.post("http://localhost:3000/api/auth/faculty_login", {
                      email: credentials.username,
                      password: credentials.password
                    })

                    if (facultyData.status === 200) {
                      return {
                        ...facultyData.data,
                        role: "faculty"
                      }
                    } else {
                      throw new Error("An Error has occured")
                    }
                  }
                }
                catch (err)
                {
                    console.log("Authorize error:", err);
                }

            }
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            try
            {
                res.send(user, account, profile)
            }
            catch (err)
            {
                console.error("Signin callback error:", err);
            }

        },
        async session(session, token) {
            if (userAccount !== null)
            {
                //session.user = userAccount;
                session.user = {
                    userId: userAccount.userId,
                    name: `${userAccount.firstName} ${userAccount.lastName}`,
                    email: userAccount.email
                }

            }
            else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined
                || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined)))
            {
                session.user = token.user;
            }
            else if (typeof token !== typeof undefined)
            {
                session.token = token;
            }
            return session;
        },
        async jwt(token, user, account, profile, isNewUser) {
            console.log("JWT callback. Got User: ", user);
            if (typeof user !== typeof undefined)
            {
                token.user = user;
            }
            return token;
        }
    }
}

export default auth = (req, res) => NextAuth(req, res, configuration)