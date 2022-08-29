// 自定义得高阶组件来实现被R6废弃的withRouter方法
import { useNavigate, NavigateFunction } from 'react-router-dom'
export interface RouteComponentProps{
    navigate:NavigateFunction
}
 export const withRouter = (Component) =>{
    const Wrapper = (props) => {
        const navigate = useNavigate()
        /* 高阶组件中特别要注意的是，在给子组件传新参数的时候一定要确保子组件P泛型定义要被更新，否则传入的新参数会报错 */
        return (<Component {...props} navigate={navigate}/>)
    }
    return Wrapper
 }