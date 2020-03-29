import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    bio: '',
    fb_id: '',
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        bio: this.state.bio,
        fb_id: this.state.fb_id,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        bio: this.state.bio,
        fb_id: this.state.fb_id,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.updateState(item[0]);
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  };

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, name, bio, fb_id } = this.props.item;
      this.setState({ id, name, bio, fb_id })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
          <Label for="first">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
          <FormGroup>
        </FormGroup>
        <FormGroup>
          <Label for="last">Bio</Label>
          <Input type="text" name="bio" id="bio" onChange={this.onChange} value={this.state.bio === null ? '' : this.state.bio}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">FB id</Label>
          <Input type="text" name="fb_id" id="fb_id" onChange={this.onChange} value={this.state.fb_id === null ? '' : this.state.fb_id}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
