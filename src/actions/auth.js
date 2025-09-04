"use server"

export async function register(state,formData){
        const email=formData.get("email");
        const password=formData.get("password")
        const confirmpassword=formData.get("confirmpassword")
        console.log(email,password,confirmpassword)
}