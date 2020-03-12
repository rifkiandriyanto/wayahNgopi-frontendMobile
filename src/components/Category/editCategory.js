import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {updateCategory} from '../redux/actions/category';
import Spinner from '../Spinner/Spinner';

class EditCategory extends Component{
    state = {
        name: '',
      };

      componentDidMount(){
          const category = this.props.navigation.getParam("category");
          this.setState({
              name: category.name,
          });
      }

      onSubmit = async() =>{
          const category = this.props.navigation.getParam("category")
          await this.props.dispatch(updateCategory(category.id, this.state));

          if(!this.props.categories.categories.isLoading){
              this.props.navigation.navigate('Category');
          }
      }
      render(){
          console.log(this.state);
          return(
              <Container>
                  <Spinner isLoading={this.props.categories.isLoading} />
                  <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="Category Name" onChangeText={(text) => this.setState({ name: text })} value= {`${this.state.name}`}/>
                        </Item>
                    </Form>
                    <Button primary style={{ margin: 10 }} onPress={this.onSubmit}>
                        <Text>Save</Text>
                    </Button>
                </Content>
              </Container>

          )
      }

}

const mapStateToProps = (state) => {
    return{
        categories: state.categories
    }
}

export default connect(mapStateToProps)(EditCategory);