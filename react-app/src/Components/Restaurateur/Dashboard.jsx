import React, {Component} from 'react';
import "../../Stylesheets/navbar.scss";

class Dashboard extends Component {
    state = {
        curState :'menu',
        functions:[
            {
                id:1,
                title: 'dress code'
            },
            {
                id:2,
                title: 'employees'
            },
            {
                id:3,
                title: 'menu'
            },
            {
                id:4,
                title: 'general infos'
            }
        ]

    };
    components = {
        'menu':'menu',
        'dressC':'dressCode',
        'employee':'employee'

    };

     curState = 'menu';

    showComponent = (componentName) =>{
        console.log(componentName)
        this.curState = componentName;
        this.setState({
           curState : this.curState
        })
    }
    // this.state.functions.map((fun)=>(
    // <button className="nav-item" onClick={this.switchBoard}>{fun.title}</button>
    // ))
    render() {
        return (
            <div>
                <div>
                    {this.state.functions.map((fun)=>(
                        <button className="nav-item" onClick={this.showComponent.bind(this,fun.title)}>{fun.title}</button>
                    ))}
                    {/*<button className="nav-item" onClick={this.showComponent.bind(this,'menu')}><span>Menu</span></button>*/}
                    {/*<button className="nav-item" onClick={this.showComponent.bind(this,'dressC')}><span>General Infos</span></button>*/}
                    {/*<button className="nav-item" onClick={this.showComponent.bind(this,'menu')}><span>Employees</span></button>*/}
                    {/*<button className="nav-item" onClick={this.showComponent.bind(this,'menu')}><span>Dress Code</span></button>*/}
                </div>
                <div>
                    {this.state.curState}
                </div>
            </div>

        )
    }
}

export default Dashboard;
