import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

// This is an ex of class component used instead of function component 
export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };
    // The usual syntax won’t work is because the method will be invoked as a 
    // callback and thus won’t have this bound to the component instance as necessary.
    // The object passed to setState is merged with the current state object
handleChange = (evt) => {
    this.setState({
        // objects provided here are merged into the current state object
        // We need to use the objects we are typing into
        [evt.target.name]: evt.target.value,
        // errors will clear if an error is found
        error: ''
    });
}
handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        // Most modern approach that uses destructuring assignment
        // to create new variables for use as shorthand properties
        const {name, email, password} = this.state;
        const formData = {name, email, password};
        // The promise returned by the signUp service method 
        // will resolve to the user object included in the
        // payload of the JSON Web Token (JWT)
        const user = await signUp(formData);
        // Baby step!
        // TODO: Update user state in App: we used this.props<name of the prop> 
        // as there is no destructuring necessary

        this.props.setUser(user);

        // or...

        // Create a copy then delete the unwanted properties
        // const formData = {...this.state};
        // delete formData.error;
        // delete formData.confirm;

        // // or...

        // // Old school approach
        // const formData = {
        //   name: this.state.name,
        //   emai: this.state.email,
        //   password: this.state.password
        // };
    } catch {
        this.setState({error: 'Sign Up Failed - Try Again'});
    }
};  

    render() {
        // disable prop is used to compare password and confirm for validation for the sign up button 
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <div className="form-container">
                {/* this.state: Accesses the class component’s state object, e.g., this.state.email */}
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
}