import $ from 'jquery';
import React, { Component } from 'react';
import ToolBox from './ToolBox';
import FormContainer from './FormContainer';
import './App.css';
import axios from 'axios'

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
class TestComponent extends  Component{
    constructor(props){
        super(props)
        this.state = {
            toolType: 'CUSTOM_COM',
            num1 : 1,
            num2 : 2
        }
    }

    changeValue(value){
        this.setState({
            num1 : value
        })
        setTimeout(() => {
            return this.props.changeState(this.state, this.props.index);
        }, 0)
    }

    render(){
        return (
            <div className="container">
                <span className='pull-right cross' onClick={() => this.props.removeField(this.props.index)}>x</span>
                <input onChange={(e) => this.changeValue(e.target.value)} type="text"/>
            </div>
        )
    }
}

class TestPreview extends  Component{
    render(){
        return <h3>{ this.props.toolType }</h3>
    }
}


const myCustoms = [
    {
        container : <TestComponent />,
        preview : <TestPreview />,
        toolbox : {
            title : 'Test',
            icon : 'fa fa-user',
            name : 'CUSTOM_COM'
        },
        states : {
            toolType: 'CUSTOM_COM',
            num1 : 1,
            num2 : 2
        }
    }
]

class FormBuilder extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <FormContainer
                        loader={false}
                        debug={false}
                        updateOnMount={true}
                        updateForm={this.updateForm}
                        onSave={this.myForm}
                        custom={ myCustoms } />
                </div>
                <div className="col-md-5">
                    <ToolBox custom={ myCustoms } />
                </div>
            </div>
        </div>
      </div>
    );
  }

  updateForm(callback){
     // let rawForm = '[{"title":"ADS","toolType":"RADIO_BUTTONS","multiple":false,"inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"radios":[]},{"title":"Title","toolType":"CHECK_BOXES","inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"checkBoxes":[]}]';
      //let form = JSON.parse(rawForm);
    //  callback(form);
  }

  myForm(form){
      console.log(form);
      const options = {
        url: 'http://localhost:5000/form',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          name: 'ali',
          formData: form
        }
      };
      
      axios(options)
        .then(response => {
          console.log(response.status);
        });
  }
}

export default FormBuilder;