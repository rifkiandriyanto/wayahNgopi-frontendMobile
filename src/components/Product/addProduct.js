import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import { postProduct} from '../redux/actions/product';
import Spinner from '../Spinner/Spinner';

class AddProduct extends Component{

        state = {
            name: "",
            description: "",
            image: "",
            category: 0,
            price: 0,
            stock: 0        
    };

    onSubmit = async() => {
        await this.props.dispatch(postProduct(this.state));
        
        if(!this.props.products.products.isLoading){
            this.props.navigation.navigate('Product');
        }
    }

    render(){
        return(
            <Container>
            <Spinner isLoading={this.props.products.isLoading} />
            <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name books" onChangeText={(text) => this.setState({ name: text })} value="hahhaa" />
                        </Item>
                        <Item>
                            <Input placeholder="description" onChangeText={(text) => this.setState({ description: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="Category" onChangeText={(text) => this.setState({ category: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="price" onChangeText={(text) => this.setState({ price: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="stock" onChangeText={(text) => this.setState({ stock: text })} />
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
       products: products.products
    }
}

export default connect(mapStateToProps)(AddProduct);