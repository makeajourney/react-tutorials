import React, { Component } from 'react';

class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        // prevent page reloading 
        e.preventDefault();
        // pass state value to parents via onCreate
        this.props.onCreate(this.state);
        // initialize state
        this.setState({
            name: '',
            phone: ''
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="이름" 
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"/>
                <input placeholder="전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"/>
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;