import passport from "passport";
import User from "./model/user";
import dotenv from "dotenv";
dotenv.config();

passport.use((User as any).createStrategy());

passport.serializeUser((User as any).serializeUser());
passport.deserializeUser((User as any).deserializeUser());
