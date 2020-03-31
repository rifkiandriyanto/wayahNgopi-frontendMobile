import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Picker,
  Icon
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {postProduct} from '../redux/actions/product';
import Spinner from '../Spinner/Spinner';

class AddProduct extends Component {

  state = {
    name: '',
    description: '',
    image: '',
    category: 0,
    price: '',
    stock: '',
    iimageName: ''
  };


  uploadImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response, imageName: response.fileName});
      }
    });
  };

  onChangeValue = value => {
    this.setState({
      category: value,
    });
  };

  onSubmit = async () => {
    var formData = new FormData();
    const file = {
      name: this.state.image.fileName,
      uri: this.state.image.uri,
      type: this.state.image.type,
    };
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('category', this.state.category);
    formData.append('price', parseInt(this.state.price));
    formData.append('stock', parseInt(this.state.stock));
    formData.append('image', file);
    await this.props.dispatch(postProduct(formData));
    if (!this.props.products.isLoading) {
      this.props.navigation.navigate('Product');
    }
  };

  render() {
    return (
      <Container>
        <Spinner isLoading={this.props.products.isLoading} />
        <Content>
          <Form style={{marginRight: 10}}>
            <Item>
              <Input
                placeholder="Name"
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                onChangeText={text => this.setState({description: text})}
                value={this.state.description}
              />
            </Item>
            <Item style={{flexDirection: 'row'}}>
              <Button onPress={() => this.uploadImage()}>
                <Text>Image</Text>
              </Button>
              <Text>{this.state.imageName}</Text>
            </Item>
            <Item>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-dropdown-circle" 
                style={{ color: "#007aff", fontSize: 25 }} />}
                placeholder="Select Category"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                style={{width: undefined}}
                selectedValue={this.state.category}
                onValueChange={this.onChangeValue.bind(this)}>
                <Picker.Item label="Choose Category" value={0} />
                <Picker.Item label="Food" value={1} />
                <Picker.Item label="Drink" value={2} />
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="Price"
                onChangeText={text => this.setState({price: text})}
                value={`${this.state.price}`}
              />
            </Item>
            <Item>
              <Input
                placeholder="Stock"
                onChangeText={text => this.setState({stock: text})}
                value={`${this.state.stock}`}
              />
            </Item>
          </Form>
          <Button
            primary
            style={{margin: 10}}
            onPress={() => this.onSubmit(this.state.id)}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(AddProduct);
