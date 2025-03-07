'use client'
import Image from "next/image";
import {useState, useEffect} from 'react';
import {firestore} from "@/firebase";
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material';
import {collection,deleteDoc, getDocs, query, setDoc, doc, getDoc} from 'firebase/firestore';
//import {Stack } from "@mui/system";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

const updateInventory = async() =>
{
  const snapshot = query(collection(firestore, 'inventory'));
  const docs = await getDocs(snapshot);
  const inventoryList =[];
  docs.forEach((doc) =>{
    inventoryList.push({
      name: doc.id,
      ...doc.data(),

    })
  })
  setInventory(inventoryList);
}

const addItem = async(item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { quantity } = docSnap.data()
    await setDoc(docRef, { quantity: quantity + 1 })
  } else {
    await setDoc(docRef, { quantity: 1 })
  }
  await updateInventory()
}

const removeItem = async(item) =>{
  const docRef = doc(collection(firestore,'inventory'),item)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()){
    const{quantity} = docSnap.data()
    if(quantity === 1 ){
      await deleteDoc(docRef)
    } else {
      await setDoc(docRef, {quantity: quantity -1})
    }
  }
  await updateInventory()
}
useEffect(() =>{
  updateInventory();
}, [])

const handleOpen = () => setOpen(true)
const handleClose = () =>setOpen(false)
  return (
   <Box 
    width="100vw" 
    height="100vh" 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center"
    gap={2}
   >
     <Modal open={open} onClose={handleClose}>
       <Box
       position = "absolute"
       top="50%"
       left="50%"
       width = {400}
       bgcolor = "white"
       border = "2px solid #000"
       boxShadow = {24}
       p = {4}
       display = "flex"
       flexDirection = "column"
       gap={3}
       sx = {{
        transform: "translate(-50%,-50%)"
       }}
       >
         <Typography variant = "h6"> Add Item</Typography>
         <Stack
         width = "100%" 
         direction = "row"
         spacing ={2}
         > 
         <TextField
         variant = 'outlined'
         fullWidth
         value ={itemName}
         onChange={(e) => setItemName(e.target.value)}
         />
        <Button 
        variant="outlined" 
        onClick={() => {
          addItem(itemName)
          setItemName('')
          handleClose()
        }}
        >
          Add 
        </Button>
         </Stack>
       </Box>
     </Modal>
     <Button variant = "contained" onClick = {handleOpen}>Add New Item</Button>
        <Box border = "1px solid #345">
          <Box 
          width = "800px"
          height = "100px"
          bgcolor = "#ADD8E6"
          display = "flex"
          alignItems = "center"
          justifyContent={"center"}
          >
            <Typography 
            variant = "h2"
            color= "#345"

            >Inventory Items </Typography>
             </Box>
          
          <Stack width = "800px" height = "300px" spacing = {2} overflow = "auto">
          {
            inventory.map(({name,quantity} )=>(
                <Box key={name} 
                width = "100%" 
                minHeight="150px" 
                display = "flex" 
                alignItems="center" 
                justifyContent="space-between" 
                bgcolor = "#f0f0f0" 
                padding ={5} 
                >
                    <Typography variant ="h3" 
                    color = "#345" 
                    textAlign="center"> {name.charAt(0).toUpperCase() + name.slice(1)}
                     </Typography>
                     <Typography variant ="h3" 
                    color = "#345" >
                    {quantity}
                     </Typography>
                     <Button variant = "contained" 
                    onClick = {() => addItem(name)}
                    > Add</Button>
                     <Button variant = "contained" 
                    onClick = {() => removeItem(name)}
                    > Remove</Button>
                </Box>

            ))}
            </Stack> 
             </Box>
     </Box>

  );
}








/*


 <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>



*/