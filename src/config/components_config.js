//图片资源
import input_png from '../images/build/input.png';
import text_png from '../images/build/text.png';
import img_png from '../images/build/img.png';
//text

const attrconfig = {};
attrconfig.fontFamily = "微软雅黑";//字体
attrconfig.fontSize = "16px";//字体大小
attrconfig.color = "#333";//字体颜色
attrconfig.borderColor = "";//边框颜色
attrconfig.bgColor = "";//
attrconfig.verticalAlign = "normal";
attrconfig.fontWeight = "normal";
attrconfig.fontStyle = "normal";
attrconfig.align = "normal";

const config = [];

config[0] = {
    code: '0001',
    name: '文本框',
    ctype: 'text',
    img: input_png,
    nodeName:"text",
    className: 'normal-component',
    styles: {
        "font-family":attrconfig.fontFamily,
        "font-size":attrconfig.fontSize,
        "color":attrconfig.color,
        "border-color":attrconfig.borderColor,
        "background-color":attrconfig.bgColor,
        "align-items": attrconfig.verticalAlign,
        "font-weight":attrconfig.fontWeight,
        "font-style":attrconfig.fontStyle,
        "justify-content": attrconfig.align,
        "width":"auto",
        "height":"auto"
    },
    attrs: {
        innerHtml:"文本内容"
    },
    contextmenu: {
        copy:true,
        cut:true,
        stick:true,
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

config[1] = {
    code: '0002',
    name: '图片',
    ctype: 'image',
    img: img_png,
    nodeName:"img",
    styles: {
        "border-color":attrconfig.borderColor,
        "width":"200px",
        "height":"200px",
        "background-color":attrconfig.bgColor
    },
    attrs: {
        srcs:[]
    },
    contextmenu: {
        copy:true,
        cut:true,
        stick:true,
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

config[2] = {
    code: '0003',
    name: '滚动文本',
    ctype: 'marquee',
    img: text_png,
    styles: {
        "font-family":attrconfig.fontFamily,
        "font-size":attrconfig.fontSize,
        "color":attrconfig.color,
        "border-color":attrconfig.borderColor,
        "background-color":attrconfig.bgColor,
        "font-weight":attrconfig.fontWeight,
        "font-style":attrconfig.fontStyle,
        "width":"100px",
        "height":"18px"
    },
    attrs: {
        content:"滚动文本",
        direction:"left"
    },
    contextmenu: {
        copy:true,
        cut:true,
        stick:true,
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

export default config;