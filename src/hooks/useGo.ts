import { useRouter,RouteLocationRaw } from "vue-router"


const useGo = ()=>{
    const router = useRouter()
    const go = (to:RouteLocationRaw)=>{
        router.push(to)
    }
    return {go}
}


export default useGo