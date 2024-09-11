import config from "../../config";
import catchAsync from "../../utility/catchAsync";
import { authServices } from "./auth.service";



const loginUser = catchAsync(async (req, res) => {

    const result = await authServices.loginUser(req.body)
    const { refreshToken, accessToken, needsPasswordChange } = result

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'User logged Successfully.',
        data: {
            accessToken,
            needsPasswordChange
        }
    })
})

const refreshToken = catchAsync(async (req, res) => {

    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken)
    res.status(200).json({
        success: true,
        message: 'Token retrieved Successfully.',
        data: result
    })
})



const changePassword = catchAsync(async (req, res) => {

    const user = req.user;
    const data = req.body;
    const result = await authServices.changePassword(user, data)
    res.status(200).json({
        success: true,
        message: 'Password changed Successfully.',
        data: result
    })
})



export const authControllers = {
    loginUser,
    refreshToken,
    changePassword
}