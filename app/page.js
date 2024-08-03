'use client';
import React, {useState, useEffect} from "react";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query$napshot, 
  query, 
  onSnapshot, 
  deleteDoc,
  doc,
 } from 'firebase/firestore';
import {db} from './firebase';

export default function Home() {
  const [items, setItems] = useState([
    // {name: 'item1', price: 10.50},
    // {name: 'item2', price: 12.20}, 
    // {name: 'item3', price: 15.00},
  ]);

  const [newItem, setNewItem] = useState({name: '', price: ''})
  const [total, setTotal] = useState(0)

  //add item to database
  const addItem = async(e) => {
    e.preventDefault()
    if (newItem.name !== '' && newItem.price !== '') {
      // setItems([...items, newItem]);
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({name: '', price: ''})
    }
  }

  //read items from database
  useEffect(() => {
    const q =query(collection(db, 'items'))
    const unsubsrcibe = onSnapshot(q, (querySnapshot) => {
      let itemsArray = []

      querySnapshot.forEach((doc) => {
        itemsArray.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArray);

      //reading from intemsArray to get total
      const calculateTotal = () => {
        const totalPrice = itemsArray.reduce((sum, item) => sum + parseFloat(item.price), 0)
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubsrcibe()
    });
  }, [])

  //delete item from database
  const deleteItem = async(id) => {
    await deleteDoc(doc(db, 'items', id))
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className = 'bg-slate-800 p-4 rounded-lg'> 
          <form className='grid grid-cols-6 items-center text-black'>
            <input 
              value = {newItem.name}
              onChange = {(e) => setNewItem({...newItem, name: e.target.value})}
              className = 'col-span-3 p-3 border rounded-md' 
              type="text" 
              placeholder = 'Enter item' 
            />
            <input 
              value = {newItem.price}
              onChange = {(e) => setNewItem({...newItem, price: e.target.value})}
              className = 'col-span-2 p-3 border mx-3 rounded-md'
              type="number" 
              placeholder = 'Enter $'
            />
            <button 
            onClick = {addItem}
            className = 'text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded-xl' 
            type = "submit">
              add
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-slate-950'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ?('') : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
