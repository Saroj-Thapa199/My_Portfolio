export const generateToken = (user, message, statusCode, res) => {
   const token = user.generateWebToken();
   res.status(statusCode)
      .cookie("token", token, {
         expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
         ),
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "None",
         path: "/",
      })
      .json({
         success: true,
         token,
         message,
         user,
      });
};
