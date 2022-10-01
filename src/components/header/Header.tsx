import React, { useEffect, useState } from "react";
import logo from '../../assets/logo.svg'
import { Layout, Typography, Menu, Dropdown, Button, Input } from 'antd';
// 引入antd-design的标签
// layout 是布局标签用来控制页面的整体布局。其中包括header， sider, content和footer。layout中可以嵌套layout实现多种页面布局
// typography是控制段落（paragraph），标题(title)，字体(text)，链接(link)等
// input 就是输入框
// 引入action构造函数
import {addNewLanguageActionCreator,changeLanguageActionCtreator} from '../../redux/reducerLanguage/LanguageActions'
import { userSlice } from '../../redux/user/userSlice'
// 引入钩子函数
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import {useSelector} from '../../redux/hooks'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import { GlobalOutlined } from '@ant-design/icons'; //引入icon模块
import jwtDecode, {JwtPayload as defaultJwtPayload} from "jwt-decode";
import styles from './header.module.css'
// 声明解码后的jwt的类型,加上username这个属性
interface JwtPayload extends defaultJwtPayload {
    username: string 
} 
export const Header: React.FC = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    // 使用useSlector函数获得store中的数据
    const language = useSelector((state)=>(state.language.language))
    const languageList = useSelector((state)=>(state.language.languageList))
    const JWT = useSelector((state)=>(state.userLogin.token))
    const error = useSelector((state) => (state.ShoppingCart.error))
    const lang = useSelector((state)=>{ return state.language.language})
    // 获得dispatch方法
    const dispatch = useDispatch()
    // 获得t方法来使用i18n,返回的是个对象
    const {t} = useTranslation()
    // 获得购物车的数据和loading信息
    const shoppingCartItems = useSelector((state)=>{return state.ShoppingCart.itemsInShoppingCart})
    const shoppingCartLoading  = useSelector((state)=>(state.ShoppingCart.loading))
    // 使用副作用函数，在jwt变化的时候调用
    useEffect(()=>{
        // 当jwt不为空的时候，即成功登录的时候，解码jwt,获得用户名
        if(JWT !== null) {
            const decodedToken = jwtDecode<JwtPayload>(JWT)
            setUsername(decodedToken.username)
        }
       
    },[JWT])
    useEffect(()=>{
        const action = changeLanguageActionCtreator(lang)
            dispatch(action)
    },[])
    // 用来控制语言切换的函数
    const handleMenuClick = (e) => {
        if(e.key === 'new') {
            const action = addNewLanguageActionCreator('New Language','new_language')
            dispatch(action)
        }else {
            const action = changeLanguageActionCtreator(e.key)
            dispatch(action)
        }
    }
    // 用来控制登出的函数
    const onLogOut = () => {
        dispatch(userSlice.actions.logOut())
        // 登出后重新定向到主页
        navigate('/')
        
    }
    // return 只能返回一个DIV,如果要返回多个需要在最外层包裹一层父级div
    if(error) {
        if(error.response.status === 401) {
            navigate('/login')
        }
    }
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
                        // 用展开运算符，获得新的数组
                        <Menu onClick={handleMenuClick} items={[...languageList.map((item) =>{return{key:item.code,label:item.name}}),{key:'new',label:`${t('header.add_new_language')}`}]}
                        />
                    }
                        icon={<GlobalOutlined />}
                    >
                        {language === 'en' ? 'English' : '中文'}
                    </Dropdown.Button >
                    {/* 二元表达式，判断JWT是否存在 */}
                    {JWT ? (
                        <Button.Group className={styles["button-group"]}>
                            <span>{t('header.welcome')}<Typography.Text strong>{username}</Typography.Text></span>
                            <Button onClick={onLogOut}>{t('header.signOut')}</Button>
                            <Button onClick={()=>{ navigate('/shoppingCart')}} loading={shoppingCartLoading}>{t('header.shoppingCart')}{shoppingCartItems.length}</Button>
                        </Button.Group>):
                        <Button.Group className={styles["button-group"]}>
                           <Button onClick={() => { navigate('/signup') }}>{t('header.register')}</Button>
                           <Button onClick={() => { navigate('/login') }}>{t('header.signin')}</Button>
                        </Button.Group>}
                </div>
            </div>
            <div className={styles['app-header']}>
                {/* 表示布局layout中的header标签 */}
                <Layout.Header className={styles['main-header']}>
                    <span onClick={()=>{navigate('/')}}>
                        <img src={logo} alt="logo" className={styles['App-logo']} />
                        <Typography.Title className={styles.title}>{t('header.title')}</Typography.Title>
                    </span>
                    <Input.Search className={styles['search-input']} placeholder={'请输入目的地、主题或关键字'} onSearch={(keyword)=>{navigate(`/search/${keyword}`)}}/>
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