import passport from "passport";
import User from "./model/user";
import dotenv from "dotenv";
dotenv.config();
const KakaoStrategy = require("passport-kakao").Strategy;

passport.use((User as any).createStrategy());

passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAOCLIENTID,
            callbackURL: process.env.KAKAOCALLBACKURL,
        },
        async (
            accessToken: any,
            refreshToken: any,
            profile: any,
            done: any
        ) => {
            console.log(profile, done);
            try {
                const exUser = await User.findOne({
                    email: profile.__json.account_email,
                });
                if (exUser) {
                    done(null, exUser);
                } else {
                    //     const newUser = await User.create({
                    //         email: profile._json.account_email,
                    //         userId: profile.displayName,
                    //         snsId: profile.id,
                    //     });
                    //     done(null, newUser);
                    //
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    )
);

passport.serializeUser((User as any).serializeUser());
passport.deserializeUser((User as any).deserializeUser());
