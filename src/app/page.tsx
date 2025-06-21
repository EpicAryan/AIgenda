import { HomeView } from "@/components"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session){
    redirect("/auth/sign-in")
  }

  return (
    <HomeView/>
  )
}

export default Home
