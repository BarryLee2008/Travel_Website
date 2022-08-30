import React from "react";
import logo from '../../assets/logo.svg'
import { Layout, Typography, Menu, Dropdown, Button, Input } from 'antd';
// 导入自定义的高阶函数。
import { withRouter, RouteComponentProps } from '../../helpers/withRouter'
// 引入store数据仓库
import store from '../../redux/store'


import { GlobalOutlined } from '@ant-design/icons'; //引入icon模块
import styles from './header.module.css'
// 定义组件中state得接口
interface State {
    language: 'En' | 'Zh',
    languageList: {name:string,code:string}[]
}
// 改造成类组件
class HeaderComponent extends React.Component<RouteComponentProps,State> { //这里要让类组件中的props能够接收withRouter这个函数npm
    constructor(props) {
        super(props)
        // store.getState方法就是获得当前得state
        const storeState = store.getState()
        this.state = {
            language: storeState.language,
            languageList: storeState.languageList
        }
        // dispatch action 是异步的，所以说如果想让store中得state变化后页面中得数据也变化得使用回调函数。这个过程也被叫做订阅
        // 这个回调函数被叫做subscribe。它的作用是被组件订阅的state的值发生变化的时候，回调函数就会触发，然后可以获得最新的值
        store.subscribe(()=>{
            const newState = store.getState()
            console.log(newState)
            this.setState({language:newState.language})
            this.setState({languageList:newState.languageList})
        })
    }
    handleChangeLang = (e) => {
        // e.key是menu组件中被选中项的key值
        // 要改变store中的state需要用到action,即向store发送修改state的指令
        // action是一个对象。有两个属性一个是type,它是修改的指令。另一个是e.key它是要修改对象的新的值
      
        // 然后通过dispatch方法来向store传递这条信息
        // 要传递多个action的话，要通过if-else语句判断，是要修改哪个state
        if(e.key === 'new') {
            const action = {type:'add_new_language',payload:{name:'New Language',code:'New Language'}}
            store.dispatch(action)
        } else {
            const action = {type:'change_language',payload:e.key}
            store.dispatch(action)
        }
        
    }
    render() {
        // 使用高阶函数通过props传入的navigate
        const navigate = this.props.navigate
        return (
            <div>
                {/* 页面中的topheader，即语言选择的那一个bar */}
                <div className={styles['top-header']}>
                    <div className={styles['top-header-container']}>
                        {/* 控制字体的样式，如粗细 */}
                        <Typography.Text style={{ marginRight: 15 }}>旅游让生活更美好</Typography.Text>
                        {/* 下拉按钮菜单 */}
                        {/* Dropdown.Button左边有一个按钮，右边是额外的下拉菜单,并且有一个icon
                  属性中overlay对应的是menu组件，表示下拉的类容
                  而menu组件中items属性的值是一个数组，数组的元素就是下拉菜单的类容。而具体的元素格式是一个对象，有两个属性key和lable。都是string类型
                  属性icon表示图标，通过引入@ant-design/icons的方式来引入图标。所有图标都是组件
              */}
                        <Dropdown.Button overlay={
                            <Menu onClick={this.handleChangeLang}
                                  items={
                                    /* 这里用数组展开拼接的方式添加了一个新元素 */
                               [ ...this.state.languageList.map((item)=>{return{key:item.code,label:item.name}}),{key:'new',label:'添加新语言'}]
                            }
                            />
                        }
                            icon={<GlobalOutlined />}
                        >
                            {this.state.language === 'En' ? 'English' : '中文'}
                        </Dropdown.Button >
                        <Button.Group className={styles["button-group"]}>
                            <Button onClick={() => { navigate('/signup') }}>注册</Button>
                            <Button onClick={() => { navigate('/login') }}>登录</Button>
                        </Button.Group>
                    </div>
                </div>
                <div className={styles['app-header']}>
                    {/* 表示布局layout中的header标签 */}
                    <Layout.Header className={styles['main-header']}>
                        <span onClick={() => { navigate('/') }}>
                            <img src={logo} alt="logo" className={styles['App-logo']} />
                            <Typography.Title className={styles.title}>旅游网</Typography.Title>
                        </span>
                        <Input.Search className={styles['search-input']} placeholder={'请输入目的地、主题或关键字'} />
                    </Layout.Header>
                    {/* menu标签用来设置垂直或者水平的导航栏，mode用来控制方向。items是导航的类容 */}
                    <Menu className={styles['main-menu']} mode='horizontal' items={
                        [{ key: "1", label: "旅游首页" },
                        { key: "2", label: "周末游" },
                        { key: "3", label: "跟团游" },
                        { key: "4", label: "自由行" },
                        { key: "5", label: "私家团" },
                        { key: "6", label: "邮轮" },
                        { key: "7", label: "酒店+景点" },
                        { key: "8", label: "当地玩乐" },
                        { key: "9", label: "主题游" },
                        { key: "10", label: "定制游" },
                        { key: "11", label: "游学" },
                        { key: "12", label: "签证" },
                        { key: "13", label: "企业游" },
                        { key: "14", label: "高端游" },
                        { key: "15", label: "爱玩户外" },
                        { key: "16", label: "保险" }]
                    }>
                    </Menu>
                </div>
            </div>
        )
    }
    // return 只能返回一个DIV,如果要返回多个需要在最外层包裹一层父级div

}
export const Header = withRouter(HeaderComponent)