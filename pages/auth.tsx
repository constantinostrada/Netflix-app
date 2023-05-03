import axios from "axios";
import { useCallback, useState } from "react";
import Input from "@/components/Input";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/router";
import {FcGoogle} from 'react-icons/fc'

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");

  //iNTERCAMBIAR ENTRE INICIAR SESION Y CREAR NUESTRA CUENTA
  const [Variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);
  const login = useCallback(async()=>{
    try{
        await signIn('credentials',{
            email,
            password,
            redirect:false,
            callbackUrl:'/'
        });
        router.push('/')
    }catch(error){
        console.log(error)
    }
  },[email,password,router]) 

  //Antes que nada quiero registar un usuario
  const register = useCallback(async () => {
    try {

        await axios.post('/api/register',{
            email,
            name,
            password
        })
        login()
    } catch (error) {
      console.log(error);
    }
  }, [email,name,password]);

  

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div
        className="bg-black w-full
            h-full lg:bg-opacity-50"
      >
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold ">
                {Variant == "login" ? "Sing in" : "Create account"}
              </h2>
              <div className="flex flex-col gap-4">
                {Variant == "register" && (
                  <Input
                    label="Username"
                    onChange={(ev: any) => {
                      setName(ev.target.value);
                    }}
                    id="name"
                    type="text"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(ev: any) => {
                    setEmail(ev.target.value);
                  }}
                  type="text"
                  id="email"
                  value={email}
                />

                <Input
                  label="password"
                  onChange={(ev: any) => {
                    setPasword(ev.target.value);
                  }}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button onClick={Variant == 'login'? login : register}  className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition ">
                {Variant == "login" ? "Login" : "Sing Up"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center" >
               <div
               className="
               w-10
               h-10
               bg-white
               rounded-full
               flex
               items-center
               justify-center
               cursor-pointer
               hover:opacity-80
               transition
               "
               >
                <FcGoogle size={30} />
               </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {Variant == "login"
                  ? "First Time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {Variant == "login" ? "Create account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Auth;
