const { UserService } = require('../services/index');
const { frontendUrl } = require('../utils/constants');


class UserController {
    /**
    * method: GET
    * router(/api/v1/user)
    * author: HiepTH
    */
    getAllUsers = async (req, res, next) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    /**
    * method: GET
    * router(/api/v1/user/authenticated)
    * author: HiepTH
    */
    getAllAuthenticatedUsers = async (req, res, next) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({
                data: users
            });
        } catch (error) {
            next(error);
        }
    }

    /**
    * method: GET
    * router(/api/v1/user/get-current-user)
    * author: HiepTH
    */
    getCurrentUser = async (req, res, next) => {
        try {
            const user = req.user;
            return res.status(200).json({
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * method: POST
     * router(/api/v1/user/register-customer-account)
     * author: HiepTH
     */
    registerCustomerAccount = async (req, res, next) => {
        try {
            const { fname, lname, dob, phoneNumber, email, gender, password, address } = req.body;
            const role = "CUSTOMER";
            const newUser = await UserService.signUp(fname, lname, dob, phoneNumber, email,
                gender, role, password, address);
            return res.status(200).json({
                data: newUser
            });
        } catch (error) {
            next(error);
        }
    }

    /**
    * method: POST
    * router(/api/v1/user/verify-email)
    * author: HiepTH
    */
    verifyEmail = async (req, res, next) => {
        try {
            const { uid } = req.query;
            await UserService.verifyEmail(uid);
            return res.redirect(`${frontendUrl}/verification-success`);
        } catch (error) {
            next(error);
        }
    }

    /**
    * method: PATCH
    * router(/api/v1/user/update-customer-info)
    * author: HiepTH
    */
    updateCustomerInfo = async (req, res, next) => {
        try {
            const { fname, lname, dob, phoneNumber, gender, address } = req.body;
            const user = req.user;
            const data = await UserService.updateCustomerInfo(fname, lname, dob, phoneNumber, gender, user?.firebaseUID, address);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
    * method: POST
    * router(/api/v1/user/send-email-verification)
     * author: HiepTH
     */
    sendEmailVerification = async (req, res, next) => {
        try {
            const { email } = req.body;
            const data = await UserService.sendEmailVerification(email);
            return res.status(200).json(data);;
        } catch (error) {
            next(error);
        }
    }

    /**
    * method: POST
    * router(/api/v1/user/reset-password)
    * author: HiepTH
    */
    resetPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const data = await UserService.resetPassword(email);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    getPaginatedUsers = async (req, res, next) => {
        try {
            const { page, limit, search, role } = req.query;
            const users = await UserService.getPaginatedUsers(page, limit, search, role);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    registerAndVerifyAccount = async (req, res, next) => {
        try {
            const { fname, lname, dob, phoneNumber, email, gender, password,role,address } = req.body;
            const newUser = await UserService.signUpAndVerify(fname, lname, dob, phoneNumber, email, gender, role, password, address);
            return res.status(200).json({
                data: newUser
            });
        } catch (error) {
            next(error);
        }
    }
    updateAccountInfo = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { fname, lname, dob, phoneNumber, gender, role, address } = req.body;
            const data = await UserService.updateAccountInfo(id, fname, lname, dob, phoneNumber, gender, role, address);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    getEmailByFirebaseUID = async (req, res, next) => {
        try {
            const { firebaseUID } = req.params;
            const email = await UserService.getEmailByFirebaseUID(firebaseUID);
            res.status(200).json({ email });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController;
