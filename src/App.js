import List from './components/List'
import Alert from './components/Alert'
import { useState } from 'react';


function App() {

  const [name, setName] = useState('');
  const [list ,setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert , setAlert] = useState({ show: false , msg: '', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
     showAlert(true, 'danger','Please enter an item')
    }else if (name && isEditing){
      // allow editing
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
  return (
    <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} />}
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
        <List items={list} />
        <button className='clear-btn'>Clear Items</button>
      </div>) }

    </section>
  );
}

export default App;
