import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
// import { useContext } from 'react';
// import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import UseAuth from '../../Hook/UseAuth';

const Login = () => {
    // const { signIn } = useContext(AuthContext)
    const {signIn} = UseAuth();
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log( email, password)
        signIn(email,password)
        .then(res => {
            const loggedInUser = res.user;
            console.log(loggedInUser);
            const user = {email}
            axios.post('http://localhost:4000/jwt',user,{withCredentials:true})
            .then(res => {
                console.log(res.data);
            })
            
        })
        .catch(error => {
            console.log(error);
        }) 
       
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>New to Car Doctors <Link className='text-orange-600 font-bold' to="/signUp">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;