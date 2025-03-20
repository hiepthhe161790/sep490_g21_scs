const nodemailer = require("nodemailer");
const { passwordApp, emailApp } = require('../utils/constants');
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: emailApp,
        pass: passwordApp
    }
});

async function sendVerificationEmail(email, verificationLink) {
    const mailOptions = {
        from: emailApp,
        to: email,
        subject: "Xác minh tài khoản ứng dụng HaChinhLCD.io.vn",
        text: `HaChinhLCD xin chào bạn!\n\nBạn vui lòng vào liên kết sau để xác thực tài khoản: ${verificationLink}\n\nCảm ơn bạn!`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #333;">Chào bạn!</h2>
                <p>Cảm ơn bạn đã đăng ký tài khoản trên ứng dụng <strong>HaChinhLCD.io.vn</strong>. Để hoàn tất quá trình đăng ký, bạn vui lòng nhấn vào liên kết dưới đây để xác thực tài khoản của mình:</p>
                <a href="${verificationLink}" style="display: inline-block; background-color:rgb(0, 0, 0); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Xác thực tài khoản</a>
                <p style="margin-top: 20px;">Nếu bạn không phải là người đăng ký, bạn có thể bỏ qua email này.</p>
                <p>Cảm ơn bạn!</p>
                <p>Đội ngũ hỗ trợ của HaChinhLCD.io.vn</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function sendResetPasswordEmail(email, resetPasswordLink) {
    const mailOptions = {
        from: emailApp,
        to: email,
        subject: "Đặt lại mật khẩu tài khoản trên ứng dụng HaChinhLCD.io.vn",
        text: `HaChinhLCD xin chào bạn!\n\nVui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu của bạn:\n\n${resetPasswordLink}\n\nNếu bạn không yêu cầu đặt lại mật khẩu này, vui lòng bỏ qua email này.\n\nCảm ơn bạn!`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #333;">Chào bạn!</h2>
                <p>Vui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu của bạn:</p>
                <a href="${resetPasswordLink}" style="display: inline-block; background-color:rgb(0, 0, 0); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
                <p style="margin-top: 20px;">Nếu bạn không yêu cầu đặt lại mật khẩu này, vui lòng bỏ qua email này.</p>
                <p>Cảm ơn bạn!</p>
                <p>Đội ngũ hỗ trợ của HaChinhLCD.io.vn</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail
}
