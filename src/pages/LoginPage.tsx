import { Component } from "react";
import RegisterForm from "../comp/RegisterForm";

class LoginPage extends Component {
    constructor(arg: any) {
        super(arg)
    }

    render() {
        return (
            <>
                <div className='fixed float-right'>
                    <header className='z-10 border-b-2 border-x-black shadow-sm '>
                        <div className='flex items-center justify-center my-6  w-screen'>
                            <div className='text-6xl mr-6 text-black'>Student</div>  <div className='text-6xl bg-yellow-500 p-2 text-white rounded-md'>Hub</div>
                        </div>
                    </header>

                    <div className='relative w-screen h-screen'>
                        <RegisterForm />
                    </div>
                </div>
            </>
        );
    }

}

export default LoginPage;