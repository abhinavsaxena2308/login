import Link from "next/link";
import { getSession } from 'next-auth/react'

export default () => {
    return (
        <section className="container mx-auto text-center">
                <h3 className="text-4xl font-bold text-white">Profile Page</h3>

                <Link href={"/"}><span className="text-orange-600 cursor-pointer">Home Page</span></Link>
        </section>
    )
}

export async function getServerSideProps({ req }){
    const session = await getSession({ req })

    if(!session){
        return {
            redirect : {
                destination : "/login",
                premanent: false
            }
        }
    }
    // authorize user return session
    return {
        props: { session }
    }
}