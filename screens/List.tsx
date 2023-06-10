import { StatusBar } from 'expo-status-bar';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {ITask, useTaskStore} from '../store/TaskStore'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export  const List = ({navigation}: any) => {
  const {tasks} = useTaskStore((state) => state)
  const [isShowForm, setIsShowForm] = useState(false)

  const onDetail = (detail: ITask) => {
    navigation.navigate('Detail', { detail})
  }


  return (
    <View style={styles.container}>
      {
        tasks.map(task => (
          <TouchableOpacity onPress={() => onDetail(task)}>
            <Text>Title: {task.title}</Text>
            <Text>Description: {task.description}</Text>
            <Text style={{  color: task?.completed ? 'green': 'red'}}>{task.completed ? 'Complete': 'Incomplete'}</Text>
          </TouchableOpacity>
        ))
      }

<Button title="Create new task" onPress={() => setIsShowForm(!isShowForm)} />


<Modal
        animationType="slide"
        visible={isShowForm}
        onRequestClose={() => {
            setIsShowForm(!isShowForm);
        }}>
<View>
<CreateTaskForm setIsShowForm={setIsShowForm} />

<Button title="Close" onPress={() => setIsShowForm(!isShowForm)} />

</View>

        </Modal>
   
    </View>
  );
}

const CreateTaskForm = ({setIsShowForm}: any) => {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const {tasks, addNewTask} = useTaskStore((state) => state)

  const onSubmit = () => {
    if(!title || !description) return alert('Please fill title and description')

    addNewTask({
      title,
      description,
      id: tasks?.length + 1,
      completed: false
    })

    // reset form
    setTitle('');
    setDesc('');

    setIsShowForm(false)
  }

  return  <SafeAreaView><View style={{ padding: 20, flexDirection: 'column', gap: 16}}>
  <Text>Create new Task</Text>
  <View style={{ flexDirection: 'column', gap: 16}}>
    <TextInput placeholder='Title' value={title} onChangeText={(value) => setTitle(value)} style={{ paddingHorizontal: 10, height: 50, borderColor: 'green', borderWidth: 1}}  />
    <TextInput placeholder='Description' value={description} style={{ paddingHorizontal: 10, height: 50, borderColor: 'green', borderWidth: 1}} onChangeText={(value) => setDesc(value)}  />

    <Button title="Create new task" onPress={onSubmit} />
  </View>
</View></SafeAreaView>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
    gap: 20
  },
});
