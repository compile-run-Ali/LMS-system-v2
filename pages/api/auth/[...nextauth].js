import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacultyLogin from "./faculty_login";
import StudentLogin from "./student_login";
import AdminLogin from "./admin_login";

const configuration = {
  session: {
    jwt: true,
    maxAge: 4 * 60 * 60, // 3 hours
  },
  jwt: {
    maxAge: 4 * 60 * 60, // 3 hours
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          if (req.body.role === "student") {
            const studentData = await StudentLogin(
              credentials.username,
              credentials.password
            );
            if (studentData) {
              return {
                ...studentData,
                role: "student",
              };
            } else {
              throw new Error("An Error has occured");
            }
          } else if (req.body.role === "admin") {
            const adminData = await AdminLogin(
              credentials.username,
              credentials.password
            );
            if (adminData) {
              return {
                ...adminData,
                role: "admin",
              };
            } else {
              throw new Error("An Error has occured");
            }
          } else {
            const facultyData = await FacultyLogin(
              credentials.username,
              credentials.password
            );
            if (facultyData) {
              return {
                ...facultyData,
                role: "faculty",
              };
            } else {
              throw new Error("An Error has occured");
            }
          }
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  callbacks: {

    async session({ session, token }) {
      session.user.name = token.name;
      session.user.image = token.user.profile_picture;
      session.user.role = token.user.role;
      if (token.user.faculty_id) {
        session.user.level = token.user.level;
        session.user.position = token.user.position;
        session.user.pa_number = token.user.pa_number;
      } else {
        session.user.cgpa = token.user.cgpa;
        session.user.DOB = token.user.DOB;
      }
      session.user.phone_number = token.user.phone_number;
      session.user.rank = token.user.rank;
      session.user.id = token.user.faculty_id
        ? token.user.faculty_id
        : token.user.p_number
          ? token.user.p_number
          : token.user.admin_id;
      return session;
    },
    async signIn(user, account, profile) {
      try {
        if (user) {
          return user;
        } else {
          return false;
        }
      } catch (err) {
        console.error("Signin callback error:", err);
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${url}`
      
      return url
    },

  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const auth = (req, res) => NextAuth(req, res, configuration);

export default auth;
