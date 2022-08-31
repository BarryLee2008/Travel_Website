import React from "react";
import logo from '../../assets/logo.svg'
import { Layout, Typography, Menu, Dropdown, Button, Input } from 'antd';
// 导入自定义的高阶函数。
import { withRouter, RouteComponentProps } from '../../helpers/withRouter'
// 导入i18n模块的高阶函数
import{ withTranslation,WithTranslation } from 'react-i18next'
// 引入connect高阶函数。他有两个参数分别是两个函数，两个函数的返回会值传入子组件，分别是store的数据和dispatch方法
import { connect } from 'react-redux'
// 引入store数据仓库，和state的类型
import store, { RootState } from '../../redux/store'
// 引入dispatch方法的类型
import {Dispatch} from 'redux'
// 引入action构造函数
import {changeLanguageActionCtreator,addNewLanguageActionCreator, Add_New_Language} from '../../redux/reducerLanguage/LanguageActions'

import { GlobalOutlined } from '@ant-design/icons'; //引入icon模块
import styles from './header.module.css'
// 引入RootState，它是store中state的类型，用来规范mapStateToProps中的参数
// 定义组件中state得接口.使用react-redux后store中state的值直接被传入了props中
/* interface State {
    language: 'en' | 'zh',
    languageList: {name:string,code:string}[]
} */
// 定义mapStateToProps。它是一个函数返回当前store中的数据
const mapStateToProps = (state:RootState) => {
    return {
        language:state.language,
        languageList:state.languageList
    }
} 
// 定义mapStateToDispatch。 它是一个函数返回封装好的方法可以直接调用dispatch
const mapStateToDispatch = (dispatch:Dispatch) => {
    return {
        changeLanguage: (code: 'zh' | 'en') => {
            const action = changeLanguageActionCtreator(code)
            dispatch(action)
        },
        addNewLanguage : (name:string,code:string) => {
            const action = addNewLanguageActionCreator(name,code)
            dispatch(action)
        }
    }
} 


// 改造成类组件
class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation&ReturnType<typeof mapStateToProps>&ReturnType<typeof mapStateToDispatch>> { //这里要让类组件中的props能够接收各种高阶组件的传入的参数
    // 所有react-redux后利用高阶函数的返回值来处理store
    /* constructor(props) {
        super(props)
        // store.getState方法就是获得当前得state
        const storeState = store.getState()
        this.state = {
            language: storeState.language,
            languageList: storeState.languageList
        }
        // dispatch action 是异步的，所以说如果想让store中得state变化后页面中得数据也变化得使用回调函数。这个过程也被叫做订阅
        // 这个回调函数被叫做subscribe。它的作用是被组件订阅的state的值发生变化的时候，回调函数就会触发，然后可以获得最新的值
        // 每个组件只需要订阅一次store就可以，一直获得最新数据了，所以放在构造函数里
        store.subscribe(()=>{
            const newState = store.getState()
            console.log(newState)
            this.setState({language:newState.language})
            this.setState({languageList:newState.languageList})
        })
    } */
    handleChangeLang = (e) => {
        const t = this.props.t
        // e.key是menu组件中被选中项的key值
        // 要改变store中的state需要用到action,即向store发送修改state的指令
        // action是一个对象。有两个属性一个是type,它是修改的指令。另一个是e.key它是要修改对象的新的值
      
        // 然后通过dispatch方法来向store传递这条信息
        // 要传递多个action的话，要通过if-else语句判断，是要修改哪个state
        if(e.key === 'new') {
           // 使用react-redux后可以直接使用传入props中的方法完成action生成和dispatch
           this.props.addNewLanguage(`${t('header.add_new_language')}`,'new_lang')
          /*   // action用构造函数生成，避免错误
            const action = addNewLanguageActionCreator(`${t('header.add_new_language')}`,'new_lang')
            store.dispatch(action) */
        } else {
            this.props.changeLanguage(e.key)
            /* const action = changeLanguageActionCtreator(e.key)
            store.dispatch(action) */
        }
        
    }
    render() {
        // 使用高阶函数通过props传入的navigate
        const navigate = this.props.navigate
        const t = this.props.t
        return (
            <div>
                {/* 页面中的topheader，即语言选择的那一个bar */}
                <div className={styles['top-header']}>
                    <div className={styles['top-header-container']}>
                        {/* 控制字体的样式，如粗细 */}
                        <Typography.Text style={{ marginRight: 15 }}>{t('header.slogan')}</Typography.Text>
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
                               [ ...this.props.languageList.map((item)=>{return{key:item.code,label:item.name}}),{key:'new',label:`${t('header.add_new_language')}`}]
                            }
                            />
                        }
                            icon={<GlobalOutlined />}
                        >
                            {this.props.language === 'en' ? 'English' : '中文'}
                        </Dropdown.Button >
                        <Button.Group className={styles["button-group"]}>
                            <Button onClick={() => { navigate('/signup') }}>{t('header.register')}</Button>
                            <Button onClick={() => { navigate('/login') }}>{t('header.signin')}</Button>
                        </Button.Group>
                    </div>
                </div>
                <div className={styles['app-header']}>
                    {/* 表示布局layout中的header标签 */}
                    <Layout.Header className={styles['main-header']}>
                        <span onClick={() => { navigate('/') }}>
                            <img src={logo} alt="logo" className={styles['App-logo']} />
                            <Typography.Title className={styles.title}>{t('header.title')}</Typography.Title>
                        </span>
                        <Input.Search className={styles['search-input']} placeholder={'请输入目的地、主题或关键字'} />
                    </Layout.Header>
                    {/* menu标签用来设置垂直或者水平的导航栏，mode用来控制方向。items是导航的类容 */}
                    <Menu className={styles['main-menu']} mode='horizontal' items={
                        [{ key: "1", label: `${t('header.home_page')}` },
                        { key: "2", label: `${t('header.weekend')}` },
                        { key: "3", label: `${t('header.group')}` },
                        { key: "4", label: `${t('header.backpack')}` },
                        { key: "5", label: `${t('header.private')}` },
                        { key: "6", label: `${t('header.cruise')}` },
                        { key: "7", label: `${t('header.hotel')}` },
                        { key: "8", label: `${t('header.local')}` },
                        { key: "9", label: `${t('header.theme')}` },
                        { key: "10", label: `${t('header.custom')}` },
                        { key: "11", label: `${t('header.study')}` },
                        { key: "12", label: `${t('header.visa')}` },
                        { key: "13", label: `${t('header.enterprise')}` },
                        { key: "14", label: `${t('header.high_end')}` },
                        { key: "15", label: `${t('header.outdoor')}`},
                        { key: "16", label: `${t('header.insurance')}` }]
                    }>
                    </Menu>
                </div>
            </div>
        )
    }
    // return 只能返回一个DIV,如果要返回多个需要在最外层包裹一层父级div

}
// 套了三层高阶组件
export const Header = connect(mapStateToProps,mapStateToDispatch)(withTranslation()(withRouter(HeaderComponent)))