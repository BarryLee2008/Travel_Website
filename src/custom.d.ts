// 用于声明编译器无法识别的模块，否则无法import
// 声明如何导出和导入后缀为.css的文件（模块）
declare module "*.css" {
    // 这是导出对象，包括整个CSS3文件都是一个对象，某个选择器也是一个对象。这些对象包括原始的类名和值都会被导入一个JS对象
    const css: { [key: string]: string }
    export default css
}
