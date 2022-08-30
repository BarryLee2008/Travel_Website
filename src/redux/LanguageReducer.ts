// reducer还需要初始化state的值
//先定义state值得接口，以规范state
interface LaguageState {
    /* 语言选择栏中的初始值 */
    language: 'En' | 'Zh',
    /* 语言选择下拉菜单中得两个选项 */
    languageList: { name: string, code: string }[]

}
// 定义默认值
const defaultLanguageState: LaguageState = {
    language: 'Zh',
    languageList: [{ name: '中文', code: 'Zh' }, { name: 'English', code: 'En' }]
}
// 一个reducer就是一个函数,有两个参数，一个是本来的state数据，另一个是用来修改state数据的指令。并返回一个新的state数据
// 在store被创建时，render自行给state赋予了初值，并且只要没有action这里state就一直是这个值
export default (state = defaultLanguageState, action) => {
    // store并不能处理action,而是把旧state和action一起传给对应的reducer进行处理
    // console.log(state,action)
    // 先判断type得内容，看是否是修改指令
    // 然后特别注意的是store中每个state都是immutable的所以说不能修改，只能声明新的state然后销毁旧的state
    switch (action.type) {
        case 'change_language': return { ...state, language: action.payload }
        case 'add_new_language': return { ...state, languageList: [...state.languageList, action.payload] }
        default: return state // 这里没有action,所以就返回初始值。
    }


}