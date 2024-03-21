import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

const FileList = ({files, onFilePress}) => {
  return (
    <FlatList
      data={files}
      keyExtractor={item => item.path}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onFilePress(item)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}>
            <Image
              source={
                item.isDirectory()
                  ? {
                      uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20240116233908/icons8-folder.gif',
                    }
                  : {
                      uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20240116233844/file.gif',
                    }
              }
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default FileList;
