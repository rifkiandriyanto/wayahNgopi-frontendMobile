import React from 'react';
import { ActivityIndicator, View, Modal } from 'react-native';
// import { View } from 'native-base';

const Spinner = ({isLoading}) => (
    <Modal
        transparent={true}
        animationType={'none'}  
        visible={isLoading}  
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator style={{marginTop: 15}} size="large" color="#233240" />
        </View>
    </Modal>
)

export default Spinner;