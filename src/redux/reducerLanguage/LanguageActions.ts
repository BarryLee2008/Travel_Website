export const Change_Language = 'change_language'
export const Add_New_Language = 'add_new_language'
// 创建action的interface来规范传入的action
 interface changeLanguageAction {
    type: typeof Change_Language,
    payload: 'zh' | 'en'
}
 interface addNewLanguageAction {
    type: typeof Add_New_Language,
    payload: {name:string,code:string}
 }
 // 导出interface. 这里是type的混合类型表示或是
 export type actionTypes = changeLanguageAction | addNewLanguageAction
// 创建不同action的构建函数
export const changeLanguageActionCtreator = (languageCode:'zh' | 'en'):changeLanguageAction => { // 定义构造函数返回类型
    return {
        type: Change_Language,
        payload:languageCode
    }
}

export const addNewLanguageActionCreator = (name:string,code:string):addNewLanguageAction => { // 定义构造函数返回类型
    return {
        type: Add_New_Language,
        payload:{name,code}
    }
}