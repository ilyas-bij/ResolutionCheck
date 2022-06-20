import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View,Image ,Pressable} from "react-native";

//import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary} from 'react-native-image-picker';
import MediaMeta from 'react-native-media-meta';



export default function Home() {

  const [filePath, setFilePath] = useState();


 
  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    
    launchImageLibrary(options, (response) => {
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', response);
        setFilePath(response.assets[0])
       
       
      }
     });
     
  };


 

  return (
    <View style={styles.container}>

    <Image
      style={styles.img}
      source={filePath ? {uri: filePath.uri} :{uri: ''}}
    />
     <View>
      <Text style={styles.title}>image info</Text>
      <Text> pixels    :{filePath && filePath.width * filePath.height } px </Text>
      <Text >width    : {filePath && filePath.width} </Text>
      <Text >height   : {filePath && filePath.height} </Text>
      <Text >size     : {filePath && Number(filePath.fileSize)}  </Text>
      <Text >url      : {filePath && filePath.uri}  </Text>
      
 </View>
  
 
 
        <Pressable style={styles.btn} onPress={chooseFile}>
                <Text  style={styles.titlebtn}>upload</Text>
        </Pressable>
  </View>
  )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea"
      },
      img:{
        width: 340, 
        height: 360,
      },
      btn: {
        paddingVertical: 8,
        width:200,
        padding:10,
        borderWidth: 2,
        borderColor: "#20232a",
        borderRadius: 6,
        color: "#20232a",
        fontSize: 30,
        position:"absolute",
        bottom:20,
        left:'30%'
      },
      title: {
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 18,
        
      },
      titlebtn:{
          textAlign:"center",
          fontSize:20
      }

});

