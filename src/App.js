import List from './components/List'
import Alert from './components/Alert'
import { useEffect, useState } from 'react';

const getLocalStorage = () => {
  let savedItems = localStorage.getItem('list');
  if(savedItems){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return [] 
  }
}
function App() {

  const [name, setName] = useState('');
  const [list ,setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert , setAlert] = useState({ show: false , msg: '', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
     showAlert(true, 'danger','Please enter an item')
    }else if (name && isEditing){
      setList(list.map((item) => {
        if(item.id === editID){
            return {...item, title: name}
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'item updated')
    }else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem]);
      showAlert(true, 'success', 'Item successfully added')
      setName('');
    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type,msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'List empty');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
  const itemToEdit = list.find((item) => item.id === id);
  setIsEditing(true);
  setEditID(id);
  setName(itemToEdit.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
          <h3>Shopping Buddy</h3>
          <div className='form-control'>

            <input 
            type='text' 
            className='grocery' 
            placeholder='e.g. milk' 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>

            <button type='submit' className='submit-btn'>
              {isEditing? 'edit' : 'submit'}
            </button>
          </div>
      </form>
     { list.length > 0 && (<div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>Clear Items</button>
      </div>) }

    </section>
  );
}

export default App;
