import React from 'react';
import {View} from 'react-native';
import FileExplorer from './Filexplorer';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FileExplorer />
    </View>
  );
};

export default App;
