//图片资源
import input_png from '../images/build/input.png';
import text_png from '../images/build/text.png';
import img_png from '../images/build/img.png';
import date_png from '../images/build/datepicker.png';
import timer_png from '../images/build/timer.png';
import video_png from '../images/build/video.png';
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
    title: '文本框',
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
        "width":"200px",
        "height":"100px"
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
    title: '图片',
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
    title: '滚动文本',
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
        "width":"200px",
        "height":"100px"
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


config[3] = {
    code: '0004',
    title: '时间和日期',
    ctype: 'dateformat',
    img: date_png,
    styles: {
        "font-family":attrconfig.fontFamily,
        "font-size":attrconfig.fontSize,
        "color":attrconfig.color,
        "border-color":attrconfig.borderColor,
        "background-color":attrconfig.bgColor,
        "font-weight":attrconfig.fontWeight,
        "font-style":attrconfig.fontStyle,
        "align-items": attrconfig.verticalAlign,
        "justify-content": attrconfig.align,
        "width":"200px",
        "height":"100px"
    },
    attrs: {
        pattern: ''
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

config[4] = {
    code: '0005',
    title: '计时器',
    ctype: 'timer',
    img: timer_png,
    styles: {
        "font-family":attrconfig.fontFamily,
        "font-size":attrconfig.fontSize,
        "color":attrconfig.color,
        "border-color":attrconfig.borderColor,
        "background-color":attrconfig.bgColor,
        "font-weight":attrconfig.fontWeight,
        "font-style":attrconfig.fontStyle,
        "align-items": attrconfig.verticalAlign,
        "justify-content": attrconfig.align,
        "width":"200px",
        "height":"100px"
    },
    attrs: {
        way:'2',
        getTime:'',
        endTime: ''
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

config[5] = {
    code: '0006',
    title: '视频',
    ctype: 'video',
    img: video_png,
    styles: {
        "background-color":attrconfig.bgColor,
        "align-items": attrconfig.verticalAlign,
        "justify-content": attrconfig.align,
        "width":"200px",
        "height":"100px"
    },
    attrs: {
        videosrc:'http://jq22com.qiniudn.com/jq22-sp.mp4'
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

config[6] = {
    code: '0007',
    title: '网页',
    ctype: 'iframe',
    img: video_png,
    styles: {
        "width":"100%",
        "height":"100%"
    },
    attrs: {
        writeurl:'http://',
        url:'http://',
        refresh:''
    },
    contextmenu: {
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

config[7] = {
    code: '0008',
    title: '二维码',
    ctype: 'qrcode',
    img: video_png,
    styles: {
        "width":"200px",
        "height":"200px"
    },
    attrs: {
        qrWc:'Hello Qrcode',
        qrContent:'Hello Qrcode',
        logo:''
    },
    contextmenu: {
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

config[8] = {
    code: '0009',
    title: '按钮',
    ctype: 'button',
    img: video_png,
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
        "width":"100px",
        "height":"25px"
    },
    attrs: {
        content:'按钮内容',
        url:'http://',
    },
    contextmenu: {
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};
export default config;