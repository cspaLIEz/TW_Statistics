import allComponents from '../../config/components_config';
import { SaveProgram } from '../../api/api';
import { num_random } from '../../libs/helper';

export default {
    data(){
        return {
            leftCollapse:[1,2,3],
            componentCollapse:[1],
            programTreeData:[
                {
                    title: '节目名',
                    expand: true,
                    type: '普通节目',
                    duration: '',
                    fbl:'1920*1080',
                    bgAudio:'',
                    bgColor:'#fff',
                    nodeType: 'programTitle',
                    children: [
                        {
                            title: '页面1',
                            expand: true,
                            nodeType: 'page',
                            children: [
                                
                            ]
                        }
                    ]
                }
            ],
            allComponents:allComponents,
            htmlNodes:[],
            attrList:[],
            activeNode:null,
            activeNodes:[],
            ctrl_press:false
        }
    },
    watch:{
        allComponents(){
            this.onComponentsReload();
        },
        activeNode:{
            handler(){
                if(this.activeNode && this.activeNode.styles && this.activeNode.styles.left){
                    this.activeNode.styles.left = parseInt(this.activeNode.styles.left) + "px";
                    this.activeNode.styles.top = parseInt(this.activeNode.styles.top) + "px";
                }
            },
            deep:true
        },
        htmlNodes:{
            handler(){
                console.log(this.htmlNodes);
                this.htmlNodes.forEach(function(item){

                }.bind(this))
            },
            deep:true,
        }
    },
    mounted(){
        var self = this;
        this.onComponentsReload();
        $(".build-page").droppable({
            accept: ".component-group-item",
            drop: function( event, ui ) {
                var code = ui.draggable.find("img").attr("componentCode");
                var node = self.findComponent(code);
                // console.log(node);
                self.addNodeToView(event, node);
            }
        });
        $(document).on("keyup",function(event){
            this.ctrl_press = false;
        }.bind(this))
    },
    methods:{
        onTreeSelectChange(item){
            console.log(item);
        },
        onComponentsReload(){
            setTimeout(() => {
                $(".component-group-item").draggable({
                    appendTo: ".build-page",
                    helper: "clone",
                    addClasses: false,
                    drag: function(event, ui){
                        if(ui && ui.position.left>0 && ui.position.top>0){
                            if(ui && ui.position){
                                // ui.position.left = ui.position.left/$(".build-page").css("scale");
                                // ui.position.top=ui.position.top/$(".build-page").css("scale")
                            }
                        }
                        
                    }
                });
            }, 100);
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        findComponent(code){
            if(!code) return;
            var node;
            this.allComponents.forEach(function(item){
                if(code==item.code){
                    node = item;
                }
            }.bind(this));
            return node;
        },
        refreshNodeToView(){
            //htmlNodes
            this.htmlNodes.forEach(element => {
                //静态组件
                if(element.nodeName){
                    var node_html = $(element.cloneTag);
                    $(".build-page").append(node_html);
                }
            });
        },
        addNodeToView(event, node){
            if(!node) return;
            if(node.nodeName){
                let node_html = $(node.cloneTag);

                var l = event.clientX-$(".build-page").eq(0).offset().left-node_html.width()/2;
                l = l>0?l:0;
                var w = event.clientY-$(".build-page").eq(0).offset().top-node_html.height()/2;
                w = w>0?w:0;
                
                var style = {
                    "position":"absolute",
                    "left":parseInt(l/$(".build-page").css("scale")) +"px",
                    "top":parseInt(w/$(".build-page").css("scale")) +"px"
                }
                style = $.extend({},node.styles,style);
                var attrs = $.extend({},node.attrs);
                var contextmenu = $.extend({},node.contextmenu);
                let code = num_random(100000,999999);
                this.htmlNodes.push({
                    code:code,
                    nodeHtml:node.cloneTag,
                    className:node.className,
                    styles:style,
                    attrs:attrs,
                    contextmenu:contextmenu,
                    isActive:false
                });
                this.checkNode(this.htmlNodes[this.htmlNodes.length-1]);
                this.setBuildPageNode();
            }
        },
        checkNode(item,index){
            if(this.ctrl_press){
                item.isActive = true;
                this.activeNodes.push(item);
            } else {
                this.clearNodeActive();
                item.isActive = true;
                this.activeNode = item;
                this.activeNodes.length = 0;
                this.activeNodes.push(this.activeNode);
            }
            this.$refs.buildPageContainer.focus();
        },
        clearNodeActive(){
            this.htmlNodes.forEach(function(ele){
                ele.isActive = false;
            })
        },
        setBuildPageNode(){
            var self = this;
            setTimeout(function(){
                $(".build-page-node").draggable({
                    grid: [ 10, 10 ],
                    drag: function(event, ui){
                        window.ui = ui;
                        if(ui && ui.position){
                            ui.position.left = ui.position.left/$(".build-page").css("scale");
                            ui.position.top=ui.position.top/$(".build-page").css("scale")
                        }
                        if(self.activeNode && self.activeNode.styles){
                            self.activeNode.styles.left = ui.position.left+"px";
                            self.activeNode.styles.top = ui.position.top+"px";
                        }
                        
                    }
                });
                $(".build-page-node").resizable({
                    handles: "all",
                    aspectRatio: false
                });
            },10)
        },
        componentConentChange(){
            $(".build-page-node.active>p").html(this.activeNode.attrs.innerHtml);
        },
        // tool func
        containerFocus(event){
            
            $(event.target).off("keydown");
            $(event.target).on("keydown",function(evo){
                if(evo.ctrlKey){
                    this.ctrl_press = true;
                }
            }.bind(this))
        },
        alignAction(direction){
            if(this.activeNodes.length>1){
                switch (direction) {
                    case "top" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                item.styles.top = this.activeNodes[0].styles.top;
                            }
                        }.bind(this));
                        break;
                    case "bottom" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                let top = parseInt(this.activeNodes[0].styles.top)+$(this.$refs['compontent'+this.activeNodes[0].code]).height()-$(this.$refs['compontent'+item.code]).height();
                                item.styles.top = top+"px";
                            }
                        }.bind(this));
                        break;
                    case "left" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                item.styles.left = this.activeNodes[0].styles.left;
                            }
                        }.bind(this));
                        break;
                    case "right" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                let left = parseInt(this.activeNodes[0].styles.left)+$(this.$refs['compontent'+this.activeNodes[0].code]).width()-$(this.$refs['compontent'+item.code]).width();
                                item.styles.left = left + "px";
                            }
                        }.bind(this));
                        break;
                }
            }
            
        },
        changeIndex(action){
            var result = [];
            // var len = this.htmlNodes.length;
            // var lastIndex;
            // for(var i=0;i<len;i++){
            //     console.log(this.htmlNodes[i].index);
            //     if(action == "top"){
            //         if(this.activeNodes[0].code==this.htmlNodes[i].code){
            //             // this.htmlNodes[i].index
            //             // lastIndex = i;
            //             // this.htmlNodes[len] = JSON.parse(JSON.stringify(this.htmlNodes[i]));
            //             // this.$set(this.htmlNodes,len,JSON.parse(JSON.stringify(this.htmlNodes[i])))

            //             // this.htmlNodes.splice(i,1);
            //         } else {
                        
            //         }
            //     }
            // }
            // this.$delete(this.htmlNodes,lastIndex,this.htmlNodes[lastIndex]);
            // this.htmlNodes.splice(lastIndex,1);
            
            // this.htmlNodes.forEach(function(a,b){
            //     console.log(a.code,b.code)
            //     if(action == "top"){
            //         if(this.activeNodes[0].code==a.code){
            //             return 1;
            //         } else {
            //             return -1;
            //         }
                    
            //     }
                
            //     return 0;
            // }.bind(this))

            this.htmlNodes = this.htmlNodes.filter(function(item){
                if(action == "top"){
                    if(this.activeNodes[0].code==item.code){
                        return false;
                    } else {
                        return true;
                    }
                    
                }
                return true;
            }.bind(this));
            this.htmlNodes.push(this.activeNodes[0]);
            // this.setBuildPageNode();
        },
        equilAction(attr){
            this.activeNodes.forEach(function(item,index){
                if(index>0){
                    if(attr == "width"){
                        item.styles.width = $(this.$refs['compontent'+this.activeNodes[0].code]).width()+"px";
                    } else if(attr == "height"){
                        item.styles.height = $(this.$refs['compontent'+this.activeNodes[0].code]).height()+"px";
                    }
                }
            }.bind(this));
        },
        scaleAction(action){
            if(action=="biger"){
                $(".build-page").css({ scale: '+=0.1' });
                if($(".build-page").width()*$(".build-page").css("scale")>$(".build-page").parent().width()){
                    $(".build-page").css("left",($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10)
                    $(".build-page-container").scrollLeft(($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10);
                    
                } else {
                    $(".build-page").css("left",0)
                }
                if($(".build-page").height()*$(".build-page").css("scale")>$(".build-page").parent().height()){
                    $(".build-page").css("top",($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10)
                    $(".build-page-container").scrollTop(($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10);
                    
                } else {
                    $(".build-page").css("top",0)
                }
            } else if(action=="smaller") {
                $(".build-page").css({ scale: '-=0.1' });
                if($(".build-page").width()*$(".build-page").css("scale")>$(".build-page").parent().width()){
                    $(".build-page").css("left",($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10)
                    $(".build-page-container").scrollLeft(($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10);
                } else {
                    $(".build-page").css("left",0)
                }
                if($(".build-page").height()*$(".build-page").css("scale")>$(".build-page").parent().height()){
                    $(".build-page").css("top",($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10)
                    $(".build-page-container").scrollTop(($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10);
                    
                } else {
                    $(".build-page").css("top",0)
                }
            }
            
        },
        fullPageAction(){
            if(this.activeNodes.length>0){
                this.activeNodes[0].styles.width = "100%";
                this.activeNodes[0].styles.height = "100%";
                this.activeNodes[0].styles.left = 0;
                this.activeNodes[0].styles.top = 0;
            }
        },
        preview(){
            localStorage.setItem("previewHtml","<div class='build-page'>"+$(".build-page")[0].innerHTML+"</div>");
            window.open("#/buildpreview")
        },
        saveProgram(){
            var self = this;
            var progCode = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <title>麦子科技</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
                </head>
                <body>
                    ${"<div class='build-page'>"+$(".build-page")[0].innerHTML+"</div>"}
                </body>
                </html>
            `;
            let data = {
                progCode:progCode,
                progName: this.programTreeData[0].title,
                resolutionCode: "1",
                progTime: "100",
                progSourceCode: "1",
                progDesc: "",
                progTypeCode: "1",
                userCode: "123",
                progId:this.programTreeData[0].progId,
            };
            SaveProgram(data).then(function(res){
                console.log(res);
                if(res.data && res.data.progId){
                    self.programTreeData[0].progId = res.data.progId;
                }
            })
        },
        cancel(){
            this.$router.go(-1);
        }
    }
}