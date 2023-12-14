import { useState } from "react"

const Login = () => {
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: ""
    })
    const onChangeUserInfo = (e) => {
        const {name, value} = e.target;
        setUserLoginInfo(() => ({
            ...userLoginInfo,
            [name]: value
        }))
    }
    console.log(userLoginInfo)
    const onSubmitLogin = (e) => {
        e.preventDefault;
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmitLogin}>
                <div>
                    <label>email</label>
                    <input onChange={onChangeUserInfo} type="email" id="email" name="email" required/>
                </div>

                <div >
                    <label>Password</label>
                    <input onChange={onChangeUserInfo} type="password" id="password" name="password" required/>
                </div>

                <div >
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}
export default Login