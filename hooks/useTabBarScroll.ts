import {create} from "zustand"

interface tabBarScrollProps{
    status:number
    onScroll():void
}

export  const useTabBarScroll=create<tabBarScrollProps>((set)=>({
    status:0,
    onScroll:()=>set((state)=> (
        state.status==0 ? {status:-100}:{status:0}
    ))
})
)