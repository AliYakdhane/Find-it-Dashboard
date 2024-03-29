import $ from 'jquery';
import React, { Component } from 'react';
import 'jquery-ui-sortable';
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
let Tools = [
    {
        title : 'Single Field',
        name : 'SINGLE_FIELD',
        icon : 'fa fa-wpforms'
    },
    {
        title : 'Drop Down',
        name : 'SELECT_FIELD',
        icon : 'fa fa-chevron-circle-down'
    },
    {
        title : 'Check Boxes',
        name : 'CHECK_BOXES',
        icon : 'fa fa-check-square'
    },
    {
        title : 'Radio Buttons',
        name : 'RADIO_BUTTONS',
        icon : 'fa fa-circle'
    },
    {
        title : 'Paragraph',
        name : 'PARAGRAPH',
        icon : 'fa fa-paragraph'
    },
    {
        title : 'Duration Picker',
        name : 'DURATION_PICKER',
        icon : 'fa fa-calendar'
    },
    {
        title : 'Duration Picker',
        name : 'DURATION_PICKER',
        icon : 'fa fa-calendar'
    }
];
class ToolBox extends Component {
    render() {
        return (
            <div className="toolbox" style={{width:'25rem',marginLeft:'3rem'}} >
                <div  className="card card-default" style={{maxWidth:'100%'}}>
                    <div className="card-header">
                        Drag to add a Field
                    </div>
                    <div className="card-body toolbox-list ">
                        <ul className="list-group" ref={(tools) => this._tools = tools}>
                            {
                                Tools.map((types) => {
                                    return <li data-tool={types.name}
                                               onDragStart={(e) => this.dragField(e, types.name)}
                                               key={types.name}
                                               className='list-group-item singleField'>
                                        <i className={types.icon + " mr-3"}></i>
                                        {types.title}
                                        </li>
                                })
                            }
                            {
                                this.renderCustomTools()
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    renderCustomTools(){
        if(this.props.custom) {
            return this.props.custom.map((types) => {
                return <li data-tool={types.toolbox.name}
                           onDragStart={(e) => this.dragField(e, types.toolbox.name)}
                           key={types.toolbox.name}
                           className='list-group-item singleField'>
                    <i className={types.toolbox.icon + " mr-3"}/>
                    {types.toolbox.title}
                </li>
            })
        }
    }

    componentDidMount(){
        let tools = this._tools;
        let $ = window.$;
        $(tools).children().each((i, l) => {
            $(l).draggable({helper: "clone"});
        });
    }

    dragField(e, types){
        e.dataTransfer.setData("dragField", types);
    }
}

export default ToolBox;
