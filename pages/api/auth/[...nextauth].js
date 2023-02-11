import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import FacultyLogin from "./faculty_login"
import StudentLogin from "./student_login"
import AdminLogin from "./admin_login"

let userAccount = null;

const configuration = {
    session: {
        jwt: true,
        maxAge: 3 * 60 * 60, // 3 hours
  },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
          credentials: {},
          async authorize(credentials, req) {
                try
                {
                  if (req.role === "student") {
                    const studentData = await StudentLogin(credentials.username, credentials.password)
                    if (studentData) {
                      return {
                        ...studentData,
                        role: "student"
                      }
                    } else {
                      throw new Error("An Error has occured")
                    }
                  } else if (req.role === "admin") {
                    const adminData = await AdminLogin(credentials.username, credentials.password)
                    if (adminData) {
                      return {
                        ...adminData,
                        role: "admin"
                      }
                    } else {
                      throw new Error("An Error has occured")
                    }
                  } else {
                    const facultyData = await FacultyLogin(credentials.username, credentials.password)
                    if (facultyData) {
                      return {
                        ...facultyData,
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
              if (user) {
                  return user
              } else {
                return false
                }
            }
            catch (err)
            {
                console.error("Signin callback error:", err);
            }

        },
      async jwt({ token, user, account, profile, isNewUser }) {
            console.log("JWT callback. Got User: ", user);
            if (typeof user !== typeof undefined)
            {
                token.user = user;
            }
            return token;
        }
  },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/',
    },
}

const auth = (req, res) => NextAuth(req, res, configuration)

export default auth