import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {useTaskStore} from '../store/TaskStore'
import {useEffect, useState} from 'react'

export  const Detail = ({route, navigation}: any) => {
    const {changeStatus, deleteTask} = useTaskStore((state) => state)
  const { detail = {} } = route.params

    const [data, setData] = useState(detail)

  useEffect(() => {
    setData(detail);
    navigation.setOptions({ title: detail.title })
  }, [detail])
  
  const onChangeStatus = () => {
    changeStatus(data.id, !data?.completed);
    setData({
        ...data,
        completed:!data?.completed 
    })
  }

  const onDelete = () => {
    deleteTask(detail.id);
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
          <View>
            <Text>{data?.title}</Text>
            <Text>{data?.description}</Text>
            <Text style={{  color: data?.completed ? 'green': 'red'}}>{data?.completed ? 'complete': 'incomplete'}</Text>
            <Button title={data?.completed ? 'Make Incomplete': 'Make Complete'} onPress={onChangeStatus}/>
            <Button title={'Delete'} onPress={onDelete}/>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});
