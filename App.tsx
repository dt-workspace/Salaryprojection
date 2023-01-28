import React,{useCallback, useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Dimensions
  
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const {width,height} = Dimensions.get('window')


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [salary,setSalary] = useState<number>(22000)
  const [hike,setHike] = useState<number>(36)
  const [targetYear,setTargetYear] = useState<number>(40)
  const currentDate = new Date()

  let Salary = useCallback(()=> {
    let list = []
    let a = (hike +100)/100
    for (let i = 1; i <= targetYear; i++) {
        let newSalary = (salary * Math.pow(a, i)).toFixed()
        list.push({salary: newSalary, isTarget: false, isOnTime: false, year: currentDate.getFullYear() + i});
    }

    let nextThresholds = [1000000, 10000000, 100000000, 1000000000, 10000000000];
    let nextThresholdYears = [2040, 2060, 2080, 2100, 2120];

    for (const [index, threshold] of nextThresholds.entries()) {
        let nextThreshold = list.findIndex(item => parseInt(item.salary) > threshold);
        if(nextThreshold != -1){
          list[nextThreshold] = {...list[nextThreshold], isTarget: true, isOnTime: list[nextThreshold].year <= nextThresholdYears[index]};
        }
    }

    return {
        salaries: list,
    }

  },[hike,salary,targetYear])

  let { salaries } = Salary()

  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      <StatusBar hidden={true}/>
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', marginVertical:10}}>
        <View style={{borderWidth:1,borderColor:'rgba(51,51,51,.5)',marginRight:5,width:'45%'}}></View>
        <Text style={{textAlign:'center',fontSize:18,fontWeight:'600', marginVertical:10,color:'green'}}>Salary</Text>
        <View style={{borderWidth:1,borderColor:'rgba(51,51,51,.5)',marginLeft:5,width:'45%'}}></View>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#D1F0D2',borderRadius:20,marginHorizontal:10,paddingTop:20,elevation:20,shadowColor:'green'}}>
        <View style={{alignItems:'center'}}>
            
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'green',borderRadius:10,paddingHorizontal:20,paddingVertical:5}}>Next</Text>
            <TextInput 
              defaultValue={targetYear.toString()}
              style={{textAlign:'center',marginTop:10,color:'black',fontWeight:'600',width:100,borderBottomWidth:1,borderBottomColor:'green',borderBottomLeftRadius:20}}
              keyboardType='number-pad'
              placeholder='40'
              maxLength={2}
              placeholderTextColor={'gray'}
              onChangeText={(text)=> setTargetYear(text.length>0 ? parseInt(text):0)}
            />
            
          </View>
          <View style={{alignItems:'center'}}>
            
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'green',borderRadius:10,paddingHorizontal:20,paddingVertical:5}}>Current</Text>
            <TextInput 
              defaultValue={salary.toString()}
              style={{textAlign:'center',marginTop:10,color:'black',fontWeight:'600',width:150,borderBottomWidth:1,borderBottomColor:'green'}}
              keyboardType='number-pad'
              placeholder='Enter Salary'
              placeholderTextColor={'gray'}
              onChangeText={(text)=> setSalary(text.length>0 ? parseInt(text):0)}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'green',borderRadius:10,paddingHorizontal:20,paddingVertical:5}}>Hike</Text>
            <TextInput 
              defaultValue={hike.toString()}
              style={{textAlign:'center',marginTop:10,color:'black',fontWeight:'600',width:100,borderBottomWidth:1,borderBottomColor:'green',borderBottomRightRadius:20}}
              keyboardType='number-pad'
              placeholder='Enter Hike'
              placeholderTextColor={'gray'}
              onChangeText={(text)=> setHike(text.length>0 ? parseInt(text):0)}
            />
          </View>
      </View>
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', marginVertical:10}}>
        <View style={{borderWidth:1,borderColor:'rgba(51,51,51,.5)',marginRight:5,width:'45%'}}></View>
        <Text style={{textAlign:'center',fontSize:18,fontWeight:'600', marginVertical:10,color:'green'}}>Targets</Text>
        <View style={{borderWidth:1,borderColor:'rgba(51,51,51,.5)',marginLeft:5,width:'45%'}}></View>
      </View>
      <View style={{backgroundColor:'#D1F0D2',borderTopRightRadius:40,borderTopLeftRadius:40,paddingVertical:40,paddingHorizontal:20,minHeight:height/1.4}}>
        {salaries.map((item,index)=>{
          return(
            <Pressable key={index} style={{flexDirection:'row', alignItems:'center',height:40,elevation:3,marginVertical:10,marginHorizontal:10,backgroundColor:item.isTarget ? item.isOnTime ? 'green':'red': 'rgba(243,243,243,1)',paddingHorizontal:10,borderRadius:10,justifyContent:'space-between',shadowColor:'green' }}>
              <View style={{flexDirection:'row', alignItems:'center', }}>
                <Text style={{color:item.isTarget ? 'white':'black'}}>{ item.year}</Text>
                <Text style={{marginLeft:10,color:item.isTarget ?  'white':'black'}}>₹ {item.salary}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                {item.isTarget && <Text style={{color:'white',fontWeight:'500'}}>{item.isOnTime ? 'Success':'Failure'}</Text>}
                <Text style={{color:item.isTarget? 'white':'black',fontWeight:'600', marginLeft:10}}>Source</Text>
              </View>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
