import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {postCategory} from '../redux/actions/category'
import Spinner from '../Spinner/Spinner';

class AddCategory extends Component {
  state = {
    name: '',
  };

  onSubmit = async () => {
    await this.props.dispatch(postCategory(this.state));

    if (!this.props.categories.isLoading) {
      this.props.navigation.navigate('Category');
    }
  };

  render() {
    return (
      <Container>
        <Spinner isLoading={this.props.categories.isLoading} />
        <Content>
          <Form style={{marginRight: 10}}>
            <Item>
              <Input
                placeholder="name"
                onChangeText={text => this.setState({name: text})}
              />
            </Item>
          </Form>
          <Button primary style={{margin: 10}} onPress={this.onSubmit}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(AddCategory);
