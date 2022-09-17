import {ref} from "vue"
const useLoading = ()=>{
    const loading = ref(false)
    const loadingTip = ref("加载中...")
    const showLoading = (tip="加载中...")=>{
        loadingTip.value = tip
        loading.value=true
    }
    const hideLoading = ()=>{
        loading.value=false
    }
    return {loading,showLoading,hideLoading,loadingTip}
}

export default useLoading