import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {updateProduct} from '../redux/actions/product';
import Spinner from '../Spinner/Spinner';

class EditProduct extends Component{
    state = {
        name: '',
        description: '',
        // image: '',
        category: 0,
        price: 0,
        stock: 0,
      };

      componentDidMount(){
          const product = this.props.navigation.getParam("product");
          this.setState({
              name: product.name,
              description: product.description,
              category: product.category,
              price: product.price,
              stock: product.stock
          });
      }

      onSubmit = async() =>{
          const product = this.props.navigation.getParam("product")
          await this.props.dispatch(updateProduct(product.id, this.state));

          if(!this.props.products.products.isLoading){
              this.props.navigation.navigate('Product');
          }
      }
      render(){
          console.log(this.state);
          return(
              <Container>
                  <Spinner isLoading={this.props.products.isLoading} />
                  <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="Name Product" onChangeText={(text) => this.setState({ name: text })} value= {`${this.state.name}`}/>
                        </Item>
                        <Item>
                            <Input placeholder="description" onChangeText={(text) => this.setState({ description: text })} value={this.state.description} />
                        </Item>
                        <Item>
                            <Input placeholder="category" onChangeText={(text) => this.setState({ category: text })} value={this.state.category} />
                        </Item>
                        <Item>
                            <Input placeholder="price" onChangeText={(text) => this.setState({ price: text })} value= {`${this.state.price}`} />
                        </Item>
                        <Item>
                            <Input placeholder="stock" onChangeText={(text) => this.setState({ stock: text })} value= {`${this.state.stock}`}/>
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
        products: state.products
    }
}

export default connect(mapStateToProps)(EditProduct);