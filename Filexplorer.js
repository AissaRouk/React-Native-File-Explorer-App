import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FileList from './FileList';
import RNFS from 'react-native-fs';

const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState(
    RNFS.ExternalStorageDirectoryPath,
  );
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles(currentPath);
  }, [currentPath]);

  const loadFiles = async path => {
    try {
      const result = await RNFS.readDir(path);
      setFiles(result);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const handleFilePress = file => {
    if (file.isDirectory()) {
      setCurrentPath(file.path);
    } else {
      console.log('File pressed:', file);
      // Add your logic to open/view the file
    }
  };

  const navigateUp = () => {
    const parts = currentPath.split('/');
    parts.pop(); // Remove the last part to go up one level

    // Join the parts back together to form the new path
    const parentPath = parts.join('/');

    setCurrentPath(parentPath);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Explorer</Text>
      <View style={styles.pathContainer}>
        <TouchableOpacity
          onPress={navigateUp}
          disabled={currentPath === RNFS.ExternalStorageDirectoryPath}>
          <Image
            source={{
              uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20240116233844/back_icon.gif',
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.path}>{currentPath}</Text>
      </View>
      <FileList files={files} onFilePress={handleFilePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  pathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  path: {
    fontSize: 16,
  },
});

export default FileExplorer;
