import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View,Image ,Pressable} from "react-native";
import {launchImageLibrary} from 'react-native-image-picker';
import DefaultImage from './images.jpg';

import axios from "axios";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;




export default function Home() {

  const [filePath, setFilePath] = useState();
  const [quality,setquality] = useState();

 
  const chooseFile = () => {


 

    let options = {
      title: 'Select Image',
      selectionLimit: 1,
      mediaType: 'photo',
      quality: 1,
      exif: true,

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      //console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //console.log('response', response);
        setFilePath(response.assets[0])
        setquality()
        let img =response.assets[0]
        const formData = new FormData();
        formData.append('file', {
                                  uri: img.uri, //Your Image File Path
                                type: img.type, 
                                name: img.fileName,
                              });

        //console.log("formData,",img);
        // url: "http://10.0.2.2:5000/upload",
        axios({
          url: "http://ilyasbij.pythonanywhere.com/upload",
          method : 'POST',
          data   : formData,
          headers: {
                       Accept: 'application/json',
                       'Content-Type': 'multipart/form-data',
                       'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
                   }
               })
               .then(function (response) {
                       console.log("response :", response.data);
                       setquality(response.data.quality)
              })
              .catch(function (error) {
                       console.log("error from image :",error);
              })

       }
     });

   
     
  };

  



  useEffect(() => {
    const removeFirst =filePath &&  filePath.uri.replace('file://', '');
    //console.log(removeFirst); // 👉️ ",one,two"
    
    // var formData = new FormData();
    // formData.append("file", filePath);

   
    //console.log(filePath);

      
  },[filePath]);

 
 
 

  return (
    <View style={styles.container}>

    <Image
      style={styles.img}
      source={quality ? {uri: filePath.uri} :{uri: DEFAULT_IMAGE}  
    }
    />
     <View>
        <Text style={styles.title}>image info</Text>
        <Text>pixels   :{quality && `${filePath.width * filePath.height}px` }  </Text>
        <Text >width    : {quality && filePath.width} </Text>
        <Text >height   : {quality && filePath.height} </Text>
        <Text >size     : {quality && Number(filePath.fileSize)}  </Text>
        {quality >40 && quality <60 ? <Text style={{color:'#ffc107'}}>image quality  : {quality && quality }</Text>
         :quality <40 ? <Text style={{color:'red'}} >image quality  : {quality && quality }</Text> 
        : quality >60 ?<Text style={{color:'#4caf50'}}>image quality  : {quality && quality }</Text> 
      : <Text >image quality  : {quality && quality }</Text> }
        
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
        width: '100%', 
        height: 360,
        marginBottom:2
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

