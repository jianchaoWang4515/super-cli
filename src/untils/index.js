/**
 * 克隆一个对象
 * @param {object|array} obj 要克隆的对象
 * @returns {object|array} 克隆后的对象
 */
export const clone = (obj) => {
    if (obj && typeof obj === 'object') {
        return JSON.parse(JSON.stringify(obj));
    }
    return obj;
};

/**
   * 字符串转驼峰命名  'came-case' ==> 'cameCase'
   * @param {String} str 待转字符串
   * @returns {String} 转换后的字符串
   */
export const camelCase = (str) => {
    if (typeof str !== 'string') return str;
    const re = /-(\w)/g;
    return str.replace(re, ($0, $1) => {
        return $1.toUpperCase();
    });
};

/**
   * 字符串去首尾空格 ' aaa ' ===> 'aaa'
   * @param {String} str 待处理字符串
   * @returns {String} 处理后的字符串
   */
export const trimSpace = (str) => {
    if (!str || (str && typeof str !== 'string')) return '';
    const reg = /(^\s*)|(\s*$)/g;
    return str.replace(reg, '');
};
