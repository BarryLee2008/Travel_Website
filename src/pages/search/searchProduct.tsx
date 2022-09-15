import styles from './SearchProduct.module.css'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { useDispatch, useSelector } from '../../redux/hooks'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { searchProductThunk } from '../../redux/search/SearchSlice'
type keywordType = {
    keyword: string
}
export const SearchProduct: React.FC = () => {
    const onPageChange = (currentPage, pageSize) => {
        if (keyword) {
            dispatch(searchProductThunk({currentPage,pageSize,keyword}))
        } else {
            console.log('执行我')
            dispatch(searchProductThunk({currentPage,pageSize,keyword:null}))
        }
    }
    // 获得dispatch
    const dispatch = useDispatch()
    // 获得url参数
    const { keyword } = useParams<keywordType>()
    // 获得store中的数据
    const loading = useSelector((state) => {
        return state.searchProduct.loading
    })
    const error = useSelector((state) => {
        return state.searchProduct.error
    })
    const pagination = useSelector((state) => {
        return state.searchProduct.pagination
    })
    const productList = useSelector((state) => {
        return state.searchProduct.productList
    })
    // 获取当前页面的url
    const location = useLocation()
    // 只要url改变就重新渲染页面
    useEffect(() => {
        // 当有值得时候
        if (keyword) {
            // 指定了当前页面和每页中有多少个数据。也就是说redux只返回第一页的10个数据
            dispatch(searchProductThunk({ currentPage: 1, pageSize: 10, keyword }))
        } else {
            dispatch(searchProductThunk({currentPage:1,pageSize:10,keyword:null}))
        }
    }, [location])
    if (loading) {
        return (<Spin />)

    }
    if (error) {
        return (
            <>
                <Header />
                <div>出错了：${error}</div>
                <Footer />
            </>
        )
    }
    return (
        <>
            <Header />
            <div className={styles['page-content']}>
                {/* 过滤项 */}
                <div className={styles['product-list-container']}>
                    <FilterArea />
                </div>
                <div className={styles['product-list-container']}>
                    < ProductList
                        data={productList}
                        paging={pagination}// pagination中包含了当前搜索的结果的总量，当前页数，每页有多少数据。这些数据被将被用于形成分页
                        onPageChange={onPageChange}// 换页的时候重新调用 dispatch方法获取不同页面的数据，再重新渲染数据
                    />
                </div>

            </div>
            <Footer />
        </>
    )
}
